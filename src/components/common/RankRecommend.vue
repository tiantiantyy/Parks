<template>
  <div class="container-all">
    <div class="top">
      <img src="http://www.globalgeopark.org.cn/UploadFiles/2019_10_29/bsi201911197115841.jpg" >
    </div>
    <div class="foot">
      <div class="tags">
        <i>标签1</i>
      <i>标签2</i>
    </div>
     <div class="title">黄山世界地质公园</div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
    
    };
  },
};
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
  .title{
    font-size: 20px;
  }
}
</style>
