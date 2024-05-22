<template>
  <div class="container-all" >
    <div class="button">
      <el-button type="info"  round @click="RankLike">点赞最高</el-button>
    <el-button type="info"  round @click="RankCollect">收藏最高</el-button>
    <el-button type="info"  round @click="RankDiscussion">评论最多</el-button>
    <el-button type="info" round @click="RankAll">热度最高</el-button>
    </div>
    <ul v-for="(media, index) in mediaData" :key="index" >
      <li>
        <div class="content-all">
          <div class="image">
            <div class="icon" :style="getbgc(index)"><span>{{index+1}}</span></div>
            <img :src="media['IMAGE']" alt="">
          </div>
          <div class="content">
            <h1>{{media['NAME']}}</h1>
            <div class="data">
              <span><img src="../../assets/icon/like.svg"/><i>{{media['LIKE']}}</i></span>
        <span><img src="../../assets/icon/collect.svg"/><i>{{media['COLLECT']}}</i></span>
        <span><img src="../../assets/icon/comments.svg"/><i>{{media['DISCUSION']}}</i></span>
            </div>
           
          </div>
          
          <!-- <div class="link">
            <el-button  @click="QueryPark(media['NAME'])">查看更多</el-button>
          </div> -->
        
          
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
      mediaData:[],
}
  },
  mounted(){
    this.queryInfo()
  },
  methods:{
     //用于后端数据库的查询
     queryInfo () {
             axios.get('http://localhost:3000/api/user/queryRank').then((response) => {
            this.mediaData=response.data
          
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
      },
      RankLike(){
        
      this.mediaData=this.likeSortedNotes

    },
    RankCollect(){
      this.mediaData=this.collectSortedNotes
    },
    RankDiscussion(){
      this.mediaData=this.discussionSortedNotes
    },
    RankAll(){
      this.mediaData=this.allSortedNotes
    }
  },
  computed: {  
    likeSortedNotes() {  
      // 使用数组的sort方法，并传入一个比较函数来根据'点赞数'排序  
      return this.mediaData.sort((a, b) => {  
        // 假设'点赞数'是一个数字，如果它是字符串，你可能需要先将它们转换为数字  
        return b['LIKE'] - a['LIKE']; // 降序排序  
        // 如果需要升序排序，则交换a和b的位置  
        // return a['点赞数'] - b['点赞数']; // 升序排序  
      });  
    },  
    collectSortedNotes() {  
      // 使用数组的sort方法，并传入一个比较函数来根据'收藏数'排序  
      return this.mediaData.sort((a, b) => {  
        // 假设'收藏数'是一个数字，如果它是字符串，你可能需要先将它们转换为数字  
        return b['COLLECT'] - a['COLLECT']; // 降序排序  
        // 如果需要升序排序，则交换a和b的位置  
        // return a['收藏数'] - b['收藏数']; // 升序排序  
      });  
    },  
    discussionSortedNotes() {  
      // 使用数组的sort方法，并传入一个比较函数来根据'评论数'排序  
      return this.mediaData.sort((a, b) => {  
        // 假设'评论数'是一个数字，如果它是字符串，你可能需要先将它们转换为数字  
        return b['DISCUSION'] - a['DISCUSION']; // 降序排序  
        // 如果需要升序排序，则交换a和b的位置  
        // return a['评论数'] - b['评论数']; // 升序排序  
      });  
    },  
    allSortedNotes(){
      // 使用数组的sort方法，并传入一个比较函数来根据'热度'排序  
      return this.mediaData.sort((a, b) => {  
        // 假设'热度'是一个数字，如果它是字符串，你可能需要先将它们转换为数字  
        return b['HEAT'] - a['HEAT']; // 降序排序  
        // 如果需要升序排序，则交换a和b的位置  
        // return a['热度'] - b['热度']; // 升序排序  
      });  
    }
  },  
}
</script>

<style lang="less" scoped>
.button{
  margin:20px 0;
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
    height: 100px;
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
    .data{
      margin-top: 20px;
      display: flex;
      span{
        flex: 1;
        justify-content: space-between;
    
        i{
        margin-right:20px ;

        }
        img{
      
		  height: 20px;
      align-items: center;
    }
      }
      
    }
    
  }
.link{
  position: absolute;
  top: 0%;
  left: 80%;
}
  
}

li{
  margin-bottom:10px ;
  position: relative;
  
}


</style>