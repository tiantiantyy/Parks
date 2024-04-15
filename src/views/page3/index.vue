<template>
  <section class="container">
    <panel :width="1300" :height="970" position="absolute" :top="0" :left="0" class="p20">
    </panel>

    <panel :width="600" :height="970" position="absolute" :top="0" :left="1320" >
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

