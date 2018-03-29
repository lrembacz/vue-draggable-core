<template>
    <div :class="classes"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @touchstart="onTouchStart"
        @touchstop="onTouchStop"
         :style="styles"
    >
        <slot></slot>
    </div>
</template>

<script>

    import {getControlPosition, createCoreData, snapToGrid} from './utils/PositionFns'
    import {addEvent, getTouchIdentifier, matchesSelectorAndParentsTo, removeEvent} from './utils/domFns'

    const eventsFor = {
        touch: {
            start: 'touchstart',
            move: 'touchmove',
            stop: 'touchend'
        },
        mouse: {
            start: 'mousedown',
            move: 'mousemove',
            stop: 'mouseup'
        }
    };

    export default {
        data() {
            return {
                dragging: false,
                lastX: NaN,
                lastY: NaN,
                dragEventFor: eventsFor.mouse,
                touchIdentifier: null
            }
        },
        props: {
            noSelection : {
                type: Boolean,
                default: true,
            },
            allowAnyClick :{
                type: Boolean,
                default: false
            },
            cancel: {
                type: String,
                default: null
            },
            disabled: {
                type: Boolean,
                default: false
            },
            enableUserSelectHack: {
                type: Boolean,
                default: true
            },
            grid: {
                type: Array,
                default: () => [1,1]
            },
            handle: {
                type: String,
                default: null
            },
           onStart: {
               type: Function,
               default : () => {}
           },
           onDrag: {
               type: Function,
               default : () => {}
           },
           onStop: {
               type: Function,
               default : () => {}
           },
	   className: {
               type: String,
               default: ''
           }
        },
        computed: {
            styles() {
                if (this.noSelection)
                    return { 'user-select': 'none' };
                else
                    return {};
            },
            classes() {
                if (this.className)
                    return { [this.className]: true };
                else
                    return {};
            }
        },
        methods: {
            handleDragStart: function(event) {

                if (!this.allowAnyClick && typeof event.button === 'number' && event.button !== 0) return false;

                const thisNode = this.$el;
                if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
                    throw new Error('<DraggableCore> not mounted on DragStart!');
                }

                if (this.disabled ||
                (this.handle && !matchesSelectorAndParentsTo(event.target, this.handle, thisNode)) ||
                (this.cancel && matchesSelectorAndParentsTo(event.target, this.cancel, thisNode))) {
                    return;
                }
                const {ownerDocument} = thisNode;

                const touchIdentifier = getTouchIdentifier(event);
                this.touchIdentifier = touchIdentifier;

                const position = getControlPosition(event,touchIdentifier, this);

                if (position === null) return; // not possible but satisfies flow
                const {x, y} = position;

                // Create an event object with all the data parents need to make a decision here.
                const coreEvent = createCoreData(this, x, y, this.lastX, this.lastY);

                this.onStart(event, coreEvent);

                this.dragging = true;
                this.lastX = x;
                this.lastY = y;

                addEvent(ownerDocument, this.dragEventFor.move, this.handleDrag);
                addEvent(ownerDocument, this.dragEventFor.stop, this.handleDragStop);
            },
            handleDrag: function(event) {

                if (event.type === 'touchmove') event.preventDefault();

                const position = getControlPosition(event,this.touchIdentifier, this);
                if (position === null) return;
                let {x, y} = position;

                // Snap to grid if prop has been provided
                if (Array.isArray(this.grid)) {
                    let deltaX = x - this.lastX;
                    let deltaY = y - this.lastY;
                    [deltaX, deltaY] = snapToGrid(this.grid, deltaX, deltaY);
                    if (!deltaX && !deltaY) return; // skip useless drag
                    x = this.lastX + deltaX;
                    y = this.lastY + deltaY;
                }

                const coreEvent = createCoreData(this, x, y, this.lastX, this.lastY);

                this.onDrag(event, coreEvent);

                this.lastX = x;
                this.lastY = y;

            },
            handleDragStop: function(event) {

                if (!this.dragging) return;

                const position = getControlPosition(event, this);
                if (position === null) return;
                const {x, y} = position;

                const coreEvent = createCoreData(this, x, y, this.lastX, this.lastY);

                this.dragging = false;
                this.lastX = NaN;
                this.lastY = NaN;

                this.onStop(event, coreEvent);

                const thisNode = this.$el;

                const {ownerDocument} = thisNode;

                if (ownerDocument) {
                    removeEvent(ownerDocument, this.dragEventFor.move, this.handleDrag);
                    removeEvent(ownerDocument, this.dragEventFor.stop, this.handleDrag);
                }
            },
            onMouseDown (event) {
                this.dragEventFor = eventsFor.mouse; // on touchscreen laptops we could switch back to mouse
                return this.handleDragStart(event);
            },

            onMouseUp (event) {
                this.dragEventFor = eventsFor.mouse;
                return this.handleDragStop(event);
            },
            onTouchStart (event) {
                this.dragEventFor = eventsFor.touch; // on touchscreen laptops we could switch back to mouse
                return this.handleDragStart(event);
            },

            onTouchStop (event) {
                this.dragEventFor = eventsFor.touch;
                return this.handleDragStop(event);
            },
        }
    }
</script>
