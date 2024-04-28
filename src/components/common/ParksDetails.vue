<template>
  <div class="container-all" v-show="ifShow" >

    <div class="title">
    <h1 >{{park['NAME']}}</h1>
    <p class="slogan">{{park['SLOGAN']}}</p>
    </div>
   <div class="content">
    <img src="http://www.globalgeopark.org.cn/UploadFiles/2021_3_30/bsi202108173050847.jpg" alt="">
    <p class="introduce">{{park['DETAILS']}}</p>
  </div>
  <div class="info">
    <span>高德评分</span>
        <el-rate
      v-model="park['SCORE']"
      disabled
      show-score
      text-color="#ff9900"
      score-template="{value}">
    </el-rate>
  </div>

  <div class="link" v-show="park['URL']">
    <span>官方网站：<a :href="park['URL']" target="_blank">{{park['URL']}}</a></span>
  </div>
 
    

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
export default{
  data(){
    return{
      park:[],
      ifShow:false
}
  },
  mounted(){
    this.$bus.$on('park', this.parkInfo);
  },
  methods:{
    parkInfo(parkInfo){
      this.park=parkInfo
      this.ifShow=true
    }
  }
}
</script>

<style lang="less" scoped>

.title{
  font-size: 20px;
  font-weight: 700;
  padding:15px 25px;
  .slogan{
  line-height: 20px;
  font-size: 16px;
  font-weight: 400;
  margin-top:10px ;
  color: rgb(169, 163, 163);
}
}

.content{
  .introduce{
    margin: 10px 0px;
    padding:15px 25px;
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    text-indent: 2em;
    // border: 1px dotted;
  }
  img{
  width: 100%;
  height: 100%;
}

.link{
  margin-top: 10px;
  font-size: 16px;
  line-height: 20px;

}
.info{
  display: flex;
}
}
</style>