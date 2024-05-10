<template>
<div class="container" style="width: 100%; height: 100%;">
  <ol_Home ref="olHomeRef"/>
  </div>
</template>

<script>
import ol_Home from './ol_Home.vue';
export default{
  components:{
    ol_Home
  },
  mounted(){
    this.someMethod()
    this.$bus.$on('resetMapCenter',()=>{
      this.resetMapCenter()
    })
    },
  methods:{
      // 改变 ol_Home 的底图
    someMethod() {
      this.$refs.olHomeRef.changeBaseMap("tdtys");
},
    resetMapCenter() {
        // 将经纬度转换为地图坐标系的中心点
        let zoom=4;
        const center = transform([101.46912, 36.24274], this.proj, this.proj_m,);
        this.map.getView().setZoom(zoom);
        // 更新地图视图的中心点
        this.map.getView().setCenter(center);
      },
  }
}
</script>

<style>
</style>