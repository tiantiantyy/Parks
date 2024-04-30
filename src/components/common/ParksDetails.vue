<template>
  <div>
    <div class="container-index" v-show="!ifShow" >
    <div class="title">
    <h1 >这里是公园详情页</h1>
    <p class="slogan">这47个中国世界地质公园，你打卡了几处？</p>
    </div>
   <div class="content">
    <img src="https://imagepphcloud.thepaper.cn/pph/image/77/502/524.jpg" alt="">
    <img src="http://www.globalgeopark.org.cn/UploadFiles/2024_4_16/bsi202404163064589.JPG" alt="">
    <img src="http://www.globalgeopark.org.cn/UploadFiles/2024_4_16/bsi202404166390038.jpg" alt="">
    <p class="introduce">{{park['DETAILS']}}</p>
  </div>
  

  <div class="link" v-show="park['URL']">
    <span>官方网站：<a :href="park['URL']" target="_blank">{{park['URL']}}</a></span>
  </div>

  
</div>
  <div class="container-all" v-show="ifShow" >
    <div class="title">
    <h1 >{{park['NAME']}}</h1>
    <p class="slogan">{{park['SLOGAN']}}</p>
    </div>
   <div class="content">
    <img :src="park['IMAGE']" alt="">
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

  
</div>
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
  margin-bottom:5px;
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