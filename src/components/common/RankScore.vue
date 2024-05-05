<template>
  <div class="container-all" >
    <h1>这里是高德评分榜单</h1>
    <div class="block-all">
      <el-button @click="decreaseValue(value)">-</el-button>
      <div class="block">
        <el-slider
          v-model="value"
          range
          :max="5"
          :marks="marks"
          :step="0.5"
          @change="handleSliderChange">
        </el-slider>
      </div>
    <el-button @click="increaseValue(value)">+</el-button>
  </div>
  <ul v-for="(score, index) in scoreData" :key="index" >
      <li>
        <div class="content-all">
          <div class="image">
            <!-- <div class="icon" :style="getbgc(index)"><span>{{index+1}}</span></div> -->
            <img :src="score['IMAGE']" alt="">
          </div>
          <div class="content">
            <h1>{{score['NAME']}}</h1>
            <p>{{score['PROVINCE']  }}</p>
            <p><button @click="QueryPark(score['NAME'])">查看更多</button></p>
          </div>
          
          <div class="number">
            <i>{{score['SCORE']}}</i>
            <span>分</span>
            
          </div>
          
        </div>

      </li>
    </ul>
    <!-- <ul v-for="(area, index) in areaData" :key="index" >
      <li>
        <div class="content-all">
          <div class="image">
            <div class="icon" :style="getbgc(index)"><span>{{index+1}}</span></div>
            <img :src="area['IMAGE']" alt="">
          </div>
          <div class="content">
            <h1>{{area['NAME']}}</h1>
            <p>{{area['PROVINCE']  }}</p>
            <p><button @click="QueryPark(area['NAME'])">查看更多</button></p>
          </div>
          
          <div class="number">
            <span>约</span>
            <i>{{area['AREA']}}</i>
            <span>km2</span>
            
          </div>
          
        </div>

      </li>
    </ul> -->
  </div>

  
</template>

<script>
import axios from 'axios';
export default{
  data(){
    return{
      scoreData:[],//存储评分的变量
      value: [4,5],
      marks: {
          1: '1',
          2: '2',
          3: '3',
          4: '4',},
        }
      
  },
  watch:{
    value(){
      this.queryInfo()
    }
  },
  mounted(){
    this.queryInfo()
  },
  methods:{
     //用于后端数据库的查询
     queryInfo () {
      console.log("queryInfo被调用了")
             axios.get('http://localhost:3000/api/user/queryScoreRank').then((response) => {
            // this.scoreData=response.data
            // 获取数据成功后进行筛选
            let value=this.value
            let min=value[0]
            let max=value[1]
            this.scoreData = response.data.filter(item => item.SCORE >= min&&item.SCORE<=max);
         })
      },
      handleSliderChange(value){
        console.log("handleSliderChange被调用了，val发生变化")
        this.value=value
      },
      // getbgc(index){
      //   if (index+1 === 1) {
      //   return { backgroundColor: '#fe2d46' };
      // } else if (index+1 === 2) {
      //   return { backgroundColor: '#f60' };
      // } else  {
      //   return { backgroundColor: '#faa90e' };
      // }
      // },
      QueryPark(NAME){
        console.log("RA发送信号",NAME)
        this.$bus.$emit('QueryPark', NAME);
      },
      // 当左侧按钮点击时，减小左侧滑块的值
      decreaseValue(value) {
        // 确保滑块的值不小于最小值
        if (value[0] >= 0.5) {
          let min=value[0]-0.5
          let max=value[1]-0.5
          console.log("decreaseValue被调用了",min,max)
          this.value=[min,max]
        }
        
      },
      // 当右侧按钮点击时，增加右侧滑块的值
      increaseValue(value) {
        if (value[1] <= 4.5) {
          let min=value[0]+0.5
          let max=value[1]+0.5
          console.log("increaseValue被调用了",min,max)
          this.value=[min,max]
        }
      }
  }
}
</script>


<style lang="less">
.container-all{
  width:100%;
  height: 100%;
  }

  .container-all{

font-size: 16px;
font-weight: 400;
}
.content-all{
display: flex;
width:100%;
height: 100%;

.image{
  padding: 10px;
  position: relative;
  width:30%;
  // height: 30%;
  justify-content: center;
  img{
  width:100%;
  height: 100%;
  border-radius: 10px;
}
span{
  color:#fff;
}

  .icon{
  width: 20px;
  height: 20px;
  line-height: 20px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
}

}
.content{
  padding: 10px;
  flex:2;
  h1{
    margin-bottom: 10px;
  }
  p{
    color:rgb(169, 163, 163);
    margin-bottom: 10px;

  }
}
.number{
  flex:1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  i{

    line-height: 30px;
    color: orange;
    font-size: 25px;
  }
}

}

li{
margin-bottom:10px ;
position: relative;

}
.block-all{
  display: flex;
  justify-content: space-between;
  padding: 15px;
  .block{
    flex: 1;
  }
}
</style>