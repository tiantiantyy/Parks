<template>
  <el-checkbox-group v-model="checkList" id="mouse-position">
    <el-checkbox label="公园POI点" checked v-model="isPOIChecked" @change="poi"></el-checkbox>
    <el-checkbox label="热力图" @change="heatmap"></el-checkbox>
    <el-checkbox label="攻略数" @change="yinghuo"></el-checkbox>
   
  </el-checkbox-group>
</template>

<script>
export default {
  data() {
    return {
      isPOIChecked:true,
      checkList: [], // 选中的复选框值 
    };
  },
  mounted(){
    this.$bus.$on('ifStartPolygonSelect',()=>{
      if(this.isPOIChecked){
        this.$bus.$emit('StartPolygonSelect')

      }
     
    })
  },
  methods: {
    poi(isPOIChecked) {
      this.isPOIChecked=isPOIChecked
      // 公园POI点复选框变化时的处理函数
      console.log(isPOIChecked);
      this.$bus.$emit('LoadGeoJson', isPOIChecked);

    },
    heatmap(checked) {
      // 热力图复选框变化时的处理函数
      // console.log(checked);
      this.$bus.$emit('LoadHeatMap', checked);
    },
    yinghuo(checked) {
      // 萤火图复选框变化时的处理函数
      this.$bus.$emit('LoadNotesMap', checked);
    },
    handleClose() {
        // 在这里执行关闭后的逻辑或者函数
        this.ifAlert=false
    }
  }
};
</script>

<style scoped>
.title{
  padding: 10px;
  margin-bottom: 10px;
}
.el-checkbox{
  display: block;
  padding: 10px;

}
#mouse-position{
  font-size: 8px;
}

</style>

