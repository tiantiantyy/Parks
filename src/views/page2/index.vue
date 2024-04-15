<template>
  <section class="container">
    <panel :width="470" :height="970" position="absolute" :top="0" :left="0" class="p20">
    </panel>

    <panel :width="940" :height="560" position="absolute" :top="0" :left="490" >
    </panel>
    <panel :width="470" :height="970" position="absolute" :top="0" :left="1450" class="p20">
    
    </panel>

    <panel :width="940" :height="380" position="absolute" :top="590" :left="490" class="p20">
      <p class="panel-title">echart图表</p>
  
    </panel>

  
  </section>
</template>

<script>

import echartsAreas from '@/components/common/chartStatistics/echartsAreas.vue';
import echartsRank from '@/components/common/chartStatistics/echartsRank.vue';

import statisticsByBar from '@/components/common/chartStatistics/statisticsByBar';
import statisticsByBarAndLine from '@/components/common/chartStatistics/statisticsByBarAndLine';
import statisticsByLine from '@/components/common/chartStatistics/statisticsByLine';
import galleryBox from '@/components/common/galleryBox';
import ganttChart from '@/components/common/ganttChart';


export default {
  components: {
    ganttChart,
    galleryBox,
    statisticsByLine,
    statisticsByBar,
    statisticsByBarAndLine,
    echartsAreas,
    echartsRank,
   
  },
}
</script>

<style lang="less" scoped>

</style>

