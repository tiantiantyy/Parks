<template>
    <div class="mapNav">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" >
        <el-menu-item index="1" @click="resetMapCenter">
          <i class="el-icon-map-location" ></i>
          <span slot="title">默认视图</span>
        </el-menu-item>

      </el-menu>
      </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true //地图旁控件导航按钮
    }
  },
  methods:{
    resetMapCenter(){
      this.$bus.$emit('resetMapCenter');
    }
  }
}
</script>
<style lang="less" scoped>
.mapNav{
    position: absolute;
    z-index: 100;
    top:92%;
    left:92%;
    transform: translateY(-50%);
    opacity: 0.8;
  }
  
.el-menu-vertical-demo:not(.el-menu--collapse) {
    font-size: 5px;
    width: 50px;
    min-height: 100px;
  }
</style>