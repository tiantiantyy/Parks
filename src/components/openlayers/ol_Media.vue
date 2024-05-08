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
    },
  methods:{
      // 改变 ol_Home 的底图
    someMethod() {
      this.$refs.olHomeRef.changeBaseMap("tdtdz");
}
  }
}
</script>

<style>
</style>