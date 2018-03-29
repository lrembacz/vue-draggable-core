<template>
  <div>
    <vue-draggable-core
      :onStart="onDragStart"
      :onDrag="onDrag"
      :onStop="onDragStop"
      :disabled="false"
      :handle="null"
      :cancel="null"
      :grid="[5,5]"
      :allowAnyClick="false"
      :noSelection="true"
      :className="'draggable'"
    >
      <div style="background:blue;width:100px;height:100px;">Test</div>
    </vue-draggable-core>
  </div>
</template>
 
<script type="text/javascript">
import VueDraggableCore from '../src/index.js'
 
export default{
  components:{
    VueDraggableCore
  },
  methods:{
    onDragStart(e, { node, deltaX, deltaY }){
        console.log('onDragStart');
        console.log('e', e);
        console.log('deltaX', deltaX);
        console.log('deltaX', deltaY);
    },
    onDrag(e, { node, deltaX, deltaY }){
        console.log('onDrag');
        console.log('e', e);
        console.log('deltaX', deltaX);
        console.log('deltaX', deltaY);
    },
    onDragStop(e, { node, deltaX, deltaY }){
        console.log('onDragStop');
        console.log('e', e);
        console.log('deltaX', deltaX);
        console.log('deltaX', deltaY);
    },
  }
  
}
</script>
