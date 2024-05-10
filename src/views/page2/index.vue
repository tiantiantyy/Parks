<template>
  <section class="container">
    <panel :width="470" :height="970" position="absolute" :top="0" :left="0" class="scroll">
    <ParksMediaList/>
    </panel>

    <panel :width="940" :height="560" position="absolute" :top="0" :left="490" >
      <MapControls/>
      <ol_Media/>
    </panel>
    <panel :width="470" :height="970" position="absolute" :top="0" :left="1450" class="scroll">
      <ParksPost/>
      
    </panel>

    <panel :width="940" :height="380" position="absolute" :top="590" :left="490" class="p20">
  <echartsHot/>
    </panel>

  
  </section>
</template>

<script>

import echartsAreas from '@/components/common/chartStatistics/echartsAreas.vue';
import echartsRank from '@/components/common/chartStatistics/echartsRank.vue';
import echartsHot from '@/components/common/chartStatistics/echartsHot.vue';

import ParksMediaList from '@/components/common/ParksMediaList.vue';
import ParksPost from '@/components/common/ParksPost.vue';
import statisticsByBar from '@/components/common/chartStatistics/statisticsByBar';
import statisticsByBarAndLine from '@/components/common/chartStatistics/statisticsByBarAndLine';
import statisticsByLine from '@/components/common/chartStatistics/statisticsByLine';
import galleryBox from '@/components/common/galleryBox';
import ganttChart from '@/components/common/ganttChart';
// import ol_Home from '@/components/openlayers/ol_Home';
import MapControls from '../../components/common/MapControls.vue';
import ol_Media from '../../components/openlayers/ol_Media.vue';

export default {
  components: {
    ganttChart,
    galleryBox,
    statisticsByLine,
    statisticsByBar,
    statisticsByBarAndLine,
    echartsAreas,
    echartsRank,
    ParksPost,
    ol_Media,
    ParksMediaList,
    MapControls,
    echartsHot
   
  },
}
</script>

<style lang="less" scoped>
.scroll{
  // padding: 10px;
  overflow: scroll!important;;
}
</style>

