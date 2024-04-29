<template>
  <section class="container">
    <!-- 第一个板块 图层管理 -->
    <panel :width="470" :height="460" position="absolute" :top="0" :left="0" class="p20">
      <layerManager/>
    </panel>

    <!-- 第二个板块 主地图-->
    <panel :width="940" :height="560" position="absolute" :top="0" :left="490" >
      <div class="buttons">
      <button @click="StartPolygonSelect">框选</button>
      <button @click="StopPolygonSelect">箭头</button>
      <button @click="ApprovalYear">时间</button>
    </div>
     <ol_Home @one-park-click="showOverlayOnClick"/>
     <ParksInfo v-if="isInfoWindowVisible" :parkInfo="selectedPark" @close="closeInfoWindow"  />
    </panel>

    <!-- 第三个板块 公园详情 -->
    <panel :width="470" :height="970" position="absolute" :top="0" :left="1450" class="p20">
      <ParksDetails/>
    </panel>
    
    <!-- 第四个板块 统计图-->
    <panel :width="470" :height="480" position="absolute" :top="490" :left="0" >
      <el-tabs type="border-card" style="width: 100%; height: 100%;">
          <el-tab-pane class="card-display" label="面积排行" >
            <h1 class="etitle">地质公园面积排行</h1> 
            <echartsAreas/>
          </el-tab-pane>
          <el-tab-pane class="card-display" label="高德评分榜单">
          <h1 class="etitle">高德评分</h1> 
          <echartsRank/>
        </el-tab-pane>
          <el-tab-pane class="card-display" label="热度排行">
            <h1 class="etitle">地质公园热度排行</h1> 
            <echartsRank/>
          </el-tab-pane>
         
          <el-tab-pane class="card-display" label="小红书攻略数">
            <h1 class="etitle">小红书攻略数</h1> 
            <echartsAreas/>
          </el-tab-pane>
  </el-tabs>
    </panel>

    <panel :width="940" :height="380" position="absolute" :top="590" :left="490">
      <!-- <p class="panel-title">echart图表</p> -->
    <ParksTable/>
    </panel>
  </section>
</template>

<script>
import ParksDetails from '@/components/common/ParksDetails';
import ParksInfo from '@/components/common/ParksInfo';
import ParksTable from '@/components/common/ParksTable.vue';
import echartsAreas from '@/components/common/chartStatistics/echartsAreas.vue';
import echartsRank from '@/components/common/chartStatistics/echartsRank.vue';
import statisticsByBar from '@/components/common/chartStatistics/statisticsByBar';
import statisticsByBarAndLine from '@/components/common/chartStatistics/statisticsByBarAndLine';
import statisticsByLine from '@/components/common/chartStatistics/statisticsByLine';
import galleryBox from '@/components/common/galleryBox';
import ganttChart from '@/components/common/ganttChart';
import layerManager from '@/components/common/layerManager.vue';
import ol_Home from '@/components/openlayers/ol_Home';


export default {
  components: {
    ganttChart,
    galleryBox,
    statisticsByLine,
    statisticsByBar,
    statisticsByBarAndLine,
    echartsAreas,
    echartsRank,
    ol_Home,
    layerManager,
    ParksTable,
    ParksInfo,
    ParksDetails
 
  },
  data() {
    return {
      isInfoWindowVisible: false, // 控制信息窗口的显示状态
      selectedPark: null // 存储当前选中的地质公园信息
    }
  },
  methods:{
    // 地图上地质公园点位的点击事件处理函数
    showOverlayOnClick(parkInfo) {
      // 设置当前选中的地质公园信息，并显示信息窗口
    
      this.selectedPark = parkInfo;
      this.isInfoWindowVisible = true;
    },
    closeInfoWindow(){
      console.log("关闭")
      this.isInfoWindowVisible = false;
    },
    StartPolygonSelect(){

      this.$bus.$emit('ifStartPolygonSelect');
    },
    StopPolygonSelect(){
      this.$bus.$emit('StopPolygonSelect');
    },
    ApprovalYear(){
      this.$bus.$emit('ApprovalYear');

    }
  }
}
</script>

<style lang="less" scoped>
.card-display{
  font-size: 22px;
  font-weight: 700;
  position: relative;
  .etitle{
    position: absolute;
    transform: translateX(20px);
  }
}
.buttons{
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
}
</style>

