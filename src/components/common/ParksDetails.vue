<template>
  <div>
    <div class="container-index" v-show="!ifShow" >
      
    <div>
    
    <h1 class="title">热门推荐</h1>
     <p class="slogan">截至2024年，我国共拥有47处世界地质公园，这47座包罗万象的世界地质公园，为旅行爱好者提供了一个自然与人文完美契合的打卡目的地。 这47个中国世界地质公园，你打卡了几处？</p>
      <!-- <img src="https://cdn.pixabay.com/photo/2014/08/14/11/14/explosion-417894_1280.png" alt=""> -->
    <br>
  

  </div>
  <div class="content">
    <!-- <img src="https://imagepphcloud.thepaper.cn/pph/image/77/502/524.jpg" alt="">
    <img src="http://www.globalgeopark.org.cn/UploadFiles/2024_4_16/bsi202404163064589.JPG" alt="">
    <img src="http://www.globalgeopark.org.cn/UploadFiles/2024_4_16/bsi202404166390038.jpg" alt=""> -->
    <div class="container-all">
    <div class="top">
      <img src="http://www.globalgeopark.org.cn/UploadFiles/2019_10_29/bsi201911197115841.jpg" >
    </div>
    <h1 class="title">世界地质公园小史 </h1>
      <p class="text">19世纪中叶，著名艺术家乔治·卡特林提出了“基于保护政策设立大公园，所有的一切都处于原生状态”的设想；1999年，世界地质公园这一概念被联合国教科文组织正式确立；2004年，经联合国教科文组织世界地质公园专家评审会审议，第一批世界地质公园就此诞生。
      </p>
      <p class="text">必须具备明确的边界线、足够大的面积和稀有的世界级价值的地质遗迹才有机会入选世界级地质公园。</p>
    
    <!-- <div class="foot">
      <div class="tags">
        <i>标签1</i>
      <i>标签2</i>
    </div>
     <div class="name">黄山世界地质公园</div>
    </div> -->

  </div>
  </div>
  <div class="statistics">
        <!-- <h1 class="title" >中国世界地质公园大数据</h1> -->
        <ul>
          <li>
            <div class="s_img"><img src="../../assets/icon/parks.svg"  />
            </div>
            <div class="s_num"><i>中国世界地质公园数</i><p class="num">47处</p></div>
          </li>
          <li>
            <div class="s_img"><img src="../../assets/icon/parksnum.svg"  /></div>
            <div class="s_num"><i>攻略总数</i><p class="num">约11073篇</p></div>
          </li>
          <li>
            <div class="s_img"><img src="../../assets/icon/parkslocation.svg"  /></div>
            <div class="s_num"><i>分布省份</i><p class="num">23个</p></div>
          </li>
        </ul>
     </div>
  
  



  
</div>

  <div class="container-all" v-show="ifShow" >
    <div class="title">
    <h1 >{{park['NAME']}}</h1>
  </div>
    <p class="slogan">{{park['SLOGAN']}}</p>

   <div class="content">
    <img :src="park['IMAGE']" alt="">
    <EchartsWordcloud/>
    <p class="introduce">{{park['DETAILS']}}</p>
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
.container-index{
  // padding:0 15px ;
}
 img{
  margin-bottom:5px;
  width: 100%;
  height: 100%;
}
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
  padding:10px 25px 0 25px;
 
  .preface{
    line-height: 20px;
  font-size: 16px;
  font-weight: 400;
  }
}
.slogan{
  padding:0 25px 15px 25px;
  line-height: 20px;
  font-size: 16px;
  font-weight: 400;
  margin-top:10px ;
  color: rgb(169, 163, 163);
  }
.text{
  padding:0 25px 15px 25px;
  line-height: 20px;
  font-size: 16px;
  font-weight: 400;
  margin-top:10px ;
  // border: 1px solid ;
}
.content{
  .introduce{
    margin: 5px 0px;
    padding:15px 25px;
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    text-indent: 2em;
    // border: 1px dotted;
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

.statistics{
  li{
      display: flex;
      margin-bottom: 5px;
    
      p{
        font-weight: 400;
        font-size: 25px;
        color: rgba(76, 73, 70, 0.911);
      }
    .s_img{
      padding: 15px 20px 0 20px ;
      img{
        width: 50px;
        height: 50px;

      }
    }
    .s_num{
      padding: 20px;
      flex: 1;
      color:rgb(169, 163, 163) ;
      .num{
        margin-top:5px;
      }
     
    }
  }
}
</style>