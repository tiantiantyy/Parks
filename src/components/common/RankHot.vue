<template>
  <div class="container-all" >
    <ul v-for="(area, index) in areaData" :key="index" >
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
            <i class="num">{{area['NOTES']}}<span>篇</span></i>
            
            
          </div>
          
        </div>

      </li>
    </ul>
  </div>

  
</template>

<script>
import axios from 'axios';
export default{
  data(){
    return{
      areaData:[],
}
  },
  mounted(){
    this.queryInfo()
  },
  methods:{
     //用于后端数据库的查询
     queryInfo () {
             axios.get('http://localhost:3000/api/user/queryNotesRank').then((response) => {
            this.areaData=response.data
          
         })
      },
      getbgc(index){
        if (index+1 === 1) {
        return { backgroundColor: '#fe2d46' };
      } else if (index+1 === 2) {
        return { backgroundColor: '#f60' };
      } else  {
        return { backgroundColor: '#faa90e' };
      }
      },
      QueryPark(NAME){
        console.log("RA发送信号",NAME)
        this.$bus.$emit('QueryPark', NAME);
      }
  }
}
</script>

<style lang="less" scoped>
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
    justify-content: center;
    .num{
      line-height: 30px;
      color: rgb(24, 150, 223);
      font-size: 22px;
    }
  }
  
}

li{
  margin-bottom:10px ;
  position: relative;
  
}


</style>