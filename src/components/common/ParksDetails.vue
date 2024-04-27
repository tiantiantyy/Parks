<template>
  <div class="container-all" >
    <h1>{{park['NAME']}}</h1>
    <br>
    <p>{{park['DETAILS']}}</p>
    <a :href="park['URL']" target="_blank">{{park['URL']}}</a>
  <!-- <div v-for="(note, index) in notesData" :key="index"  class="container" @click="showcomments">
    <a class="link" :href="note['笔记链接']" target="_blank"><img src="../../assets/icon/link.svg"/></a>
    <img class="coverimg" :src="note['封面']" alt="">
    <div class="box-card" >
      <div class="title">
        <span>{{ note['笔记标题']}}</span>
       
      </div>
      <div  class="text">
        {{ truncateContent(note['笔记内容']) }}
      </div>
      <div class="info">
        <span><img src="../../assets/icon/like.svg"/><i>{{note['点赞数']}}</i></span>
        <span><img src="../../assets/icon/collect.svg"/><i>{{note['收藏数']}}</i></span>
        <span><img src="../../assets/icon/comments.svg"/><i>{{note['评论数']}}</i></span>
      </div>
    </div> 
  </div>-->
  
  
</div>
  
</template>

<script>
import axios from 'axios';
export default{
  data(){
    return{
      park:[],
}
  },
  mounted(){
    this.$bus.$on('park', this.parkInfo);
  },
  methods:{
    parkInfo(parkInfo){
      this.park=parkInfo
    }
  }
}
</script>

<style lang="less" scoped>

</style>