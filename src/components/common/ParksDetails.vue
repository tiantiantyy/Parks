<template>
  <div>
    <div class="container-index" v-show="!ifShow" >
    <div class="title">
    <h1 >热门推荐</h1>
    <p class="slogan">这47个中国世界地质公园，你打卡了几处？</p>
    </div>
   <div class="content">
    <!-- <img src="https://imagepphcloud.thepaper.cn/pph/image/77/502/524.jpg" alt="">
    <img src="http://www.globalgeopark.org.cn/UploadFiles/2024_4_16/bsi202404163064589.JPG" alt="">
    <img src="http://www.globalgeopark.org.cn/UploadFiles/2024_4_16/bsi202404166390038.jpg" alt=""> -->
    <div class="container-all">
    <div class="top">
      <img src="http://www.globalgeopark.org.cn/UploadFiles/2019_10_29/bsi201911197115841.jpg" >
    </div>
    <div class="foot">
      <div class="tags">
        <i>标签1</i>
      <i>标签2</i>
    </div>
     <div class="name">黄山世界地质公园</div>
    </div>

  </div>
  </div>
  



  
</div>
  <div class="container-all" v-show="ifShow" >
    <div class="title">
    <h1 >{{park['NAME']}}</h1>
    <p class="slogan">{{park['SLOGAN']}}</p>
    </div>
   <div class="content">
    <img :src="park['IMAGE']" alt="">
    <EchartsWordcloud/>
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
  <div class="worldcloud ">
  </div>
</div>
</div>
  
</template>

<script>
import EchartsWordcloud from '@/components/common/EchartsWordcloud';
export default{
  components:{
    EchartsWordcloud
  },
  data(){
    return{
      park:[],
      ifShow:false
}
  },
  mounted(){
    this.$bus.$on('park', this.parkInfo);
    this.$bus.$on('park', this.parkWordCloud);
  },
  methods:{
    parkInfo(parkInfo){
      this.park=parkInfo
      this.ifShow=true
    },
    parkWordCloud(){
      let NAME=this.park['NAME']
      this.$bus.$emit('parkWordCloud', NAME);
    }
  }
}
</script>

<style lang="less" scoped>
.container-all{
  width: 100%;
  height: 100%;
  img{
    width: 100%;
    height: 100%;
    border-radius: 10px 10px 0px 0px;
  }
  .top{
    margin-bottom:20px ;
  }
  .foot{
    
  }
  .tags{
    margin-bottom:20px ;
    i{
      padding: 10px;
      margin-right: 10px;
      border-radius: 10px;
      background-color:rgb(60, 60, 67);
      color: white;
    }
  }
  .name{
    font-size: 20px;
  }
}
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

.worldcloud{
  width: 100%;
  height: 100%;
}
}
</style>