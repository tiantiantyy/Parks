<template>
  <div class="panel-wrapper"
       :style="{
         width: width + 'px', 
         height: height > 0 ? height + 'px' : 'auto', 
         position: position,
         top: top ? top + 'px' : 'auto',
         left: left ? left + 'px' : 'auto'
       }">
    <slot></slot>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
export default {
  props: {
    width: VueTypes.number.def(600),
    height: VueTypes.number.def(400),
    top: VueTypes.number,
    left: VueTypes.number,
    position: VueTypes.string.def('relative')
  }
}
</script>

<style lang="less" scoped>
  .panel-wrapper{
    background-color: #fff;
    box-sizing: border-box;
    height: auto;
    overflow: hidden;
    &:after{
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      top: -1px;
      left: 0;
      z-index: 1;
    }
  }

</style>
