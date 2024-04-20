<template>
  <div class="container-all" >
  <div v-for="(note, index) in notesData" :key="index"  class="container" @click="showcomments">
    <a class="link" :href="note['笔记链接']" target="_blank"><img src="../../assets/icon/link.svg"/></a>
    <img class="coverimg" :src="note['封面']" alt="">
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
        <span><img src="../../assets/icon/collect.svg"/><i>{{note['评论数']}}</i></span>
        <span><img src="../../assets/icon/comments.svg"/><i>{{note['收藏数']}}</i></span>
      </div>
    </div>
  </div>
  
  
</div>
  
</template>

<script>
import axios from 'axios';
export default{
  data(){
    return{
      notesData:[],
}
  },
  mounted(){
    this.queryInfo()
  },
  methods:{
    //用于后端数据库的查询
    queryInfo () {
             axios.get('http://localhost:3000/api/user/notes').then((response) => {
            this.notesData=response.data
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
    //展示帖子对应的评论
    showcomments(){
      console.log("这里是showcomments")
    }
  }
}
</script>

<style lang="less" scoped>
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
    .coverimg{
      width: 150px;
      height: 200px;
      object-fit: cover;
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