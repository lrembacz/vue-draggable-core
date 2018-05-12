<template>
  <div id="wrapper" style="align-items: stretch;width: 100%; height: 100%;">
    <div id="box">
      <box
        :xpos="0"
        :ypos="0"
        :handler="null"
      >
        Handler is not set so you can drag everywhere
      </box>
      <box
        :xpos="500"
        :ypos="0"
        :handler="'.panel-heading'"
      >
        Handler is set to .panel-heading so you can drag only with it
      </box>
      <box
        :xpos="1000"
        :ypos="0"
        :handler="'.panel-head'"
      >
        Handler is not found so you cant drag
      </box>
    </div>
  </div>
</template>
 
<script type="text/javascript">
import Box from './Box.vue'
 
export default{
  components:{
    Box
  },
  
}
</script>

<style>
  #box {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position:relative;
    display:block;
    margin: 0 0 0 0;
  }
</style>
