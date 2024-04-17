<template>
  <div class="parent-comment">
    <div v-for="(comment, index) in comments" :key="index" class="comment-item">
      <div class="comment-inner-container">
        <div class="avatar"></div>
        <div class="right">
          <div class="username">{{ comment.username }}</div>
          <div class="comment-content">{{ comment.content }}</div>
          <div class="comment-time">{{ comment.time }}</div>
          <div class="comment-info">
            <ul>
              <li>
                <i class="el-icon-s-comment"></i> {{ comment.commentCount }}
              </li>
              <li>
                <i class="el-icon-caret-top"></i> {{ comment.likeCount }}
              </li>
            </ul>
        
        </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      comments: [
        {
          username: "User1",
          userId: "123",
          content: "This is a comment.",
          time: "2024-04-12 10:00:00",
          commentCount: 5,
          likeCount: 10
        },
        {
          username: "User2",
          userId: "456",
          content: "Another comment here.",
          time: "2024-04-12 11:00:00",
          commentCount: 3,
          likeCount: 8
        },
        {
          username: "User3",
          userId: "456",
          content: "Another comment here.",
          time: "2024-04-12 11:00:00",
          commentCount: 3,
          likeCount: 8
        },
        {
          username: "User4",
          userId: "456",
          content: "Another comment here.",
          time: "2024-04-12 11:00:00",
          commentCount: 3,
          likeCount: 8
        },
        {
          username: "User5",
          userId: "456",
          content: "Another comment here.",
          time: "2024-04-12 11:00:00",
          commentCount: 3,
          likeCount: 8
        },
        {
          username: "User6",
          userId: "456",
          content: "Another comment here.",
          time: "2024-04-12 11:00:00",
          commentCount: 3,
          likeCount: 8
        },
        {
          username: "User7",
          userId: "456",
          content: "Another comment here.",
          time: "2024-04-12 11:00:00",
          commentCount: 3,
          likeCount: 8
        },
        {
          username: "User8",
          userId: "456",
          content: "Another comment here.",
          time: "2024-04-12 11:00:00",
          commentCount: 3,
          likeCount: 8
        },
        {
          username: "User9",
          userId: "456",
          content: "Another comment here.",
          time: "2024-04-12 11:00:00",
          commentCount: 3,
          likeCount: 8
        },

        // Add more comments as needed
      ]
    };
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

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc; /* Placeholder for avatar */
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
