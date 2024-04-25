<!-- ParkInfoWindow.vue -->
<template>
  <div class="info-window">
    <h2>{{ parkInfo.name }} </h2>
    <p>park.slogan</p>
    <p>park.description </p>
    <button @click="close">x</button>
    <!-- <img :src="park.imageUrl" alt="Park Image" /> -->
  </div>
</template>

<script>
export default {
  props: {
    // 定义一个名为park的prop，用来接收selectedPark数据
    parkInfo: null
  },

 methods:{
  close(){
    console.log("窗口关闭了")
    this.$emit('close');
  }
 }
};
</script>

<style scoped>
.info-window{
  font-size: 16px;
  color:red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 600px;
  height: 500px;
  background-color: pink;
  z-index: 9999;
}
</style>
