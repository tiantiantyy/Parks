<template>
  <section class="container">
    <panel :width="470" :height="460" position="absolute" :top="0" :left="0" class="p20">
      <layerManager/>
    </panel>

    <panel :width="940" :height="560" position="absolute" :top="0" :left="490" >

     <ol_Home/>
    </panel>
    <panel :width="470" :height="460" position="absolute" :top="0" :left="1450" class="p20">
    
    </panel>

    <panel :width="470" :height="480" position="absolute" :top="490" :left="0" >
      
    </panel>

    <panel :width="940" :height="380" position="absolute" :top="590" :left="490" class="p20">
      <p class="panel-title">echart图表</p>
  
    </panel>

    <panel :width="470" :height="480" position="absolute" :top="490" :left="1450" >
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
  </section>
</template>

<script>
import { imgListDataSource, progressDataSource } from '@/common/mockData';
import { randomArray, randomChartList } from '@/common/utils';

import echartsAreas from '@/components/common/chartStatistics/echartsAreas.vue';
import echartsRank from '@/components/common/chartStatistics/echartsRank.vue';
import statisticsByBar from '@/components/common/chartStatistics/statisticsByBar';
import statisticsByBarAndLine from '@/components/common/chartStatistics/statisticsByBarAndLine';
import statisticsByLine from '@/components/common/chartStatistics/statisticsByLine';
import galleryBox from '@/components/common/galleryBox';
import ganttChart from '@/components/common/ganttChart';
import layerManager from '@/components/common/layerManager.vue';
import ol_Home from '@/components/openlayers/ol_Home';
// import ShowGeoJSON from '@/components/openlayers/ShowGeoJSON';

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
    layerManager
  },
  data() {
    return {
      minDate: '2018-02-15',
      maxDate: '2020-05-11',
      progressDataSource: [...progressDataSource],
      dataSource: [...imgListDataSource],
      xAxisData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      dataSourceByChart: [
        {
          name: '项目进度',
          lineColor: '#2E76D6',
          offsetTopColor: 'rgba(46,118,214,0.7)',
          offsetBottomColor: 'rgba(46,118,214,1)',
          data: randomChartList(12, '%')
        },
        {
          name: '项目进度2',
          lineColor: '#02c8dc',
          offsetTopColor: 'rgba(2,200,220,0.7)',
          offsetBottomColor: 'rgba(2,200,220,1)',
          data: randomChartList(12, '%')
        }
      ],
      dataSourceByChart2: [
        {
          type: 'bar',
          name: '项目进度',
          color: '#2E76D6',
          offsetTopColor: 'rgba(46,118,214,0.7)',
          offsetBottomColor: 'rgba(46,118,214,1)',
          data: randomArray(12)
        },
        {
          type: 'line',
          name: '项目进度2',
          color: '#02c8dc',
          offsetTopColor: 'rgba(2,200,220,0.7)',
          offsetBottomColor: 'rgba(2,200,220,1)',
          data: randomArray(12)
        }
      ]
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
</style>

