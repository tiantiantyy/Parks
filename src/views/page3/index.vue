<template>
  <section class="container">
    <panel :width="1920" :height="970" position="absolute" :top="0" :left="0"  class="scroll">
    <Gaode/>
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
import Gaode from '@/components/common/Gaode';


export default {
  components: {
    ganttChart,
    galleryBox,
    statisticsByLine,
    statisticsByBar,
    statisticsByBarAndLine,
    echartsAreas,
    echartsRank,
    Gaode
  },
}
</script>

<style lang="less" scoped>
.scroll{
  overflow: scroll!important;
}
</style>

