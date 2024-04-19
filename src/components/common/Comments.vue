<template>
  <div class="parent-comment">
    <div v-for="(comment, index) in commentsData" :key="index" class="comment-item">
      <div class="comment-inner-container">
        <div class="right">
          <div class="username">{{ commentsData[index]['评论者昵称']}}</div>
          <div class="comment-content">{{ commentsData[index]['评论内容'] }}</div>
          <div class="comment-time">{{  commentsData[index]['评论时间']  }}</div>
          <div class="comment-info">
            <!-- <ul>
              <li>
                <i class="el-icon-s-comment"></i> {{ comment.commentCount }}
              </li>
              <li>
                <i class="el-icon-caret-top"></i> {{ comment.likeCount }}
              </li>
            </ul> -->
        
        </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      commentsData: []
    };
  },
  mounted(){
    this.queryInfo()
  },
  methods:{
    queryInfo () {
             axios.get('http://localhost:3000/api/user/comments').then((response) => {
            this.commentsData=response.data
            console.log(this.commentsData)
            console.log(this.commentsData[0]['评论者昵称'])
//          console.log(response.data)
//          console.log('--------')
         })
      },
  }
};
</script>

<style lang='less' scoped>
.comment-inner-container{
  display: flex;
  .right{
    margin-left: 10px;
    text-align: left;
    .username{
      height:20px;
      line-height: 18px;
      color: #888;
    }
  }
}
.comment-list {
  width: 100%;
}

.comment-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #e4e4e4;
  padding-bottom: 10px;
}

.comment-header {
  display: flex;
  align-items: left;
  margin-bottom: 5px;
}

.user-id {
  color: #888;
}

.comment-info {

  margin-left: auto;
  font-size: 12px;
  ul{
    display: flex;
    color: #888;
    i{
    font-size: 16px;
  }
  }
 
}


.comment-time {
  margin:10px 0px ;
  font-size: 12px;
  line-height: 16px;
  color: #888;
}

.comment-content {
  margin-top:4px;
  word-wrap: break-word; /* 当单词溢出容器时换行 */
}
ul {
  list-style: none; /* 移除项目符号 */
  padding: 0; /* 移除默认的内边距 */
  margin: 0; /* 移除默认的外边距 */
}

li{
  list-style: none; /* 移除项目符号或者数字 */
  margin: 0; /* 移除默认的外边距 */
  padding: 0; /* 移除默认的内边距 */
}
</style>
