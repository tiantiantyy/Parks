<template>
  <div class="container-all" >
 
    <RankMedia v-show="!show"/>

    <div class="elbutton" v-show="show">
      <el-row >
  <el-button round @click="Home">主页</el-button>
  <el-button round @click="RankLike">点赞最高</el-button>
  <el-button round @click="RankCollect">收藏最高</el-button>
  <el-button round @click="RankDiscussion">评论最多</el-button>
 
</el-row>
    </div>
  

  <div v-for="(note, index) in notesData" :key="index"  class="container" @click="showcomments">
    <a class="link" :href="note['笔记链接']" target="_blank"><img src="../../assets/icon/link.svg"/></a>
    <div><img class="coverimg" :src="note['作者头像']" alt=""> <p class="author">{{ note['作者'] }}</p></div>
    <div class="box-card" >
      <div class="title">
        <span>{{ note['笔记标题']}}</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
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
  </div>
  
  
</div>
  
</template>

<script>
import RankMedia from '@/components/common/RankMedia';
import axios from 'axios';
export default{
  data(){
    return{
      notesData:null,
      show:false
}
  },
  components:{
    RankMedia
  },
  mounted(){
    this.$bus.$on('QueryPark',(NAME)=>{
      this.queryInfo(NAME)
    })
  },
  methods:{
    //回到主页
    Home(){
      this.show=false
      console.log("主页")
     
    },
    //用于后端数据库的查询
    queryInfo (NAME) {
      axios.get('http://localhost:3000/api/user/notes', {
                params: {
                    parameter: NAME
                }
            }).then((response) => {
            this.notesData=response.data
            this.notesData=this.likeSortedNotes
            this.show=true
            // console.log(this.notesData)
            // console.log(this.commentsData[0]['评论者昵称'])
//          console.log(response.data)
//          console.log('--------')
         })
      },
      //笔记内容太长，显示不美观，此函数用于截取字符串
      truncateContent(content) {
      if (content) {
        return content.substring(0, 60) + '...';
      } else {
        return '';
      }
    },
    RankLike(){
      this.notesData=this.likeSortedNotes

    },
    RankCollect(){
      this.notesData=this.collectSortedNotes
    },
    RankDiscussion(){
      this.notesData=this.discussionSortedNotes
    }
  },
  computed: {  
    likeSortedNotes() {  
      // 使用数组的sort方法，并传入一个比较函数来根据'点赞数'排序  
      return this.notesData.sort((a, b) => {  
        // 假设'点赞数'是一个数字，如果它是字符串，你可能需要先将它们转换为数字  
        return b['点赞数'] - a['点赞数']; // 降序排序  
        // 如果需要升序排序，则交换a和b的位置  
        // return a['点赞数'] - b['点赞数']; // 升序排序  
      });  
    },  
    collectSortedNotes() {  
      // 使用数组的sort方法，并传入一个比较函数来根据'收藏数'排序  
      return this.notesData.sort((a, b) => {  
        // 假设'收藏数'是一个数字，如果它是字符串，你可能需要先将它们转换为数字  
        return b['收藏数'] - a['收藏数']; // 降序排序  
        // 如果需要升序排序，则交换a和b的位置  
        // return a['收藏数'] - b['收藏数']; // 升序排序  
      });  
    },  
    discussionSortedNotes() {  
      // 使用数组的sort方法，并传入一个比较函数来根据'评论数'排序  
      return this.notesData.sort((a, b) => {  
        // 假设'评论数'是一个数字，如果它是字符串，你可能需要先将它们转换为数字  
        return b['评论数'] - a['评论数']; // 降序排序  
        // 如果需要升序排序，则交换a和b的位置  
        // return a['评论数'] - b['评论数']; // 升序排序  
      });  
    },  
  },  
}
</script>

<style lang="less" scoped>
.elbutton{
  margin: 10px 5px;
}
  .container-all{
    a{
      text-decoration: none;
    }

  }
  .container{
    margin-bottom: 10px;
    width: 450px;
    height: 200px;
    display: flex;
    position: relative;
    border-radius: 4px;
    box-shadow: 4px 4px 10px 1px rgba(171, 171, 171,0.2);
    .link img{
      top:5px;
      right:10px;
      width: 15px;
      height: 15px;
      position: absolute;
    }
    .author{
   
      width: 100px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #fff;
      bottom:30px;
      left:0;
      font-size: 10px;
      position: absolute;
      background-color: rgba(76, 72, 72,0.7);

    }
    .coverimg{
      margin-top: 30px;
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    display: flex;
    flex-direction: column; /* 将交叉轴设置为默认轴 */
    flex-wrap: wrap;
    overflow: hidden;
    padding: 20px;
    .title{
      flex:1;
      // padding-top: 5px;
      padding-bottom: 10px;
      line-height: 20px;
    }
    .text{
      line-height: 20px;
      text-overflow: ellipsis; /* 超出容器的文本以省略号的形式显示 */
      color: #888;
      font-size: 14px;
      flex:3;
    }
    .info{
      height:30px;
      flex:1;
      padding:10px 0px;
      text-align: right;
      display: flex;
      justify-content: space-between;
      span{

        // width: 20px;
        height: 20px;
        margin: 10px;
      
        img{
          margin-right:5px ;
		      height: 20px;
          align-items: center;
        }
        i{
          font-size:15px ;
          text-align: center;
          line-height: 30px;
  
        }
      }
    }
  }

</style>