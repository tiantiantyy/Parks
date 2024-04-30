<template>
  <div class="container-all" >
    <ul>
      <li>
        <div class="content-all">
          <div class="image">
            <div class="top"><span>1</span></div>
            <img src="https://imagepphcloud.thepaper.cn/pph/image/77/502/524.jpg" alt="">
          </div>
          <div class="content">
            <h1>地质公园</h1>
            <p>省份</p>
            <p><span>查看更多</span></p>
          </div>
          
          <div class="number">
            <span>面积</span>
            <i>44432</i>
            <span>km2</span>
            
          </div>
          
        </div>

      </li>
    </ul>
  </div>

  
</template>

<script>
export default{
  data(){
    return{
     
}
  },
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
    position: relative;
    width:40%;
    height: 40%;
    img{
    width:100%;
    height: 100%;
    border-radius: 10px;
  }
  span{
    color:#fff;
  }
  
    .top{
    width: 20px;
    height: 20px;
    background-color: #fe2d46;
    line-height: 20px;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
  }
  
  }
  .content{
    padding: 10px;
    flex:1;
    h1{
      margin-bottom: 10px;
    }
    p{
      color:rgb(169, 163, 163);
      margin-bottom: 10px;

    }
  }
  .number{
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    i{
      line-height: 30px;
      color: green;
      font-size: 22px;
    }
  }
  
}

li{
  margin-bottom:10px ;
  position: relative;
  
}


</style>