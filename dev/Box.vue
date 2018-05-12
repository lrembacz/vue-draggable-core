<template>
    <vue-draggable-core
            :onStart="onDragHandler('onDragStart')"
            :onDrag="onDragHandler('onDrag')"
            :onStop="onDragHandler('onDragStop')"
            :disabled="false"
            :handle="handle"
            :cancel="null"
            :grid="[5,5]"
            :allowAnyClick="false"
            :noSelection="true"
            :className="'draggable'"
            :noTouchAction="true"
            :style="styles"
    >
        <div class="panel panel-default">
            <div class="panel-heading">
                <slot>Test head</slot>
            </div>
            <div class="panel-body">
                Test body
            </div>
        </div>
    </vue-draggable-core>
</template>

<script>
    import VueDraggableCore from '../src/index.js'

    export default{
        components:{
            VueDraggableCore
        },
        data() {
            return {
                x: 0,
                y: 0,
                handle: null,
                dragging: null
            }
        },
        created() {
            this.x = this.xpos;
            this.y = this.ypos;
            this.handle = this.handler;
        },
        props: {
            xpos: {
                type: Number,
                required: false
            },
            ypos: {
                type: Number,
                required: false
            },
            handler: {
                type: String,
                required: false
            }
        },
        computed: {
            styles() {
                return {
                    width: '25%',
                    height: '25%',
                    top: this.y + 'px',
                    left: this.x + 'px',
                    position: 'absolute'
                }
            }
        },
        methods:{
            onDragHandler(handlerName) {
                return (e, { node, deltaX, deltaY }) => {
                    let newPosition = { top: this.y, left: this.x };
                    // Get new XY
                    switch (handlerName) {
                        case "onDragStart": {
                            const {offsetParent}  = node.offsetParent;
                            if (!offsetParent) return;
                            const parentRect = offsetParent.getBoundingClientRect();
                            const clientRect = node.getBoundingClientRect();
                            newPosition.left =
                                clientRect.left - parentRect.left + offsetParent.scrollLeft;
                            newPosition.top =
                                clientRect.top - parentRect.top + offsetParent.scrollTop;

                            this.dragging = newPosition;
                            break;
                        }
                        case "onDrag":
                            if (!this.dragging)
                                throw new Error("onDrag called before onDragStart.");
                            newPosition.left = this.dragging.left + deltaX;
                            newPosition.top = this.dragging.top + deltaY;
                            this.dragging = newPosition;
                            break;
                        case "onDragStop":
                            if (!this.dragging)
                                throw new Error("onDragEnd called before onDragStart.");
                            newPosition.left = this.dragging.left;
                            newPosition.top = this.dragging.top;
                            this.dragging = null;
                            break;
                        default:
                            throw new Error(
                                "onDragHandler called with unrecognized handlerName: " + handlerName
                            );
                    }

                    this.x = newPosition.left;
                    this.y = newPosition.top;
                };
            },
        }

    }
</script>

<style>
    .panel {
        width: 100%;
        height: 100%;
    }
</style>