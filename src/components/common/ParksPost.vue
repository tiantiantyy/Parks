<template>
  <div class="container-all" >
    <a href="https://www.xiaohongshu.com/explore/660985cf000000001b00b27e" target="_blank">
  <div class="container" >
    <img :src="link1" alt="">
    <el-card class="box-card" >
      <div class="title">
        <spsan>黄山旅游攻略拿走不谢</spsan>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div  class="text">
        {{this.data1.substring(0, 100) +'....."'}}
       

      </div>
    </el-card>
  </div></a>
  <a href="https://www.xiaohongshu.com/explore/6613e3ca000000001b0118c5" target="_blank">
  <div class="container">
    <img :src="link2" alt="">
    <el-card class="box-card" >
      <div class="title">
        <spsan>大学生淡季爬黄山别太爽！（附详细攻略版！）</spsan>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div  class="text">
        {{this.data2.substring(0, 100) +'....."'}}
       

      </div>
    </el-card>
  </div></a>
</div>
  
</template>

<script>
export default{
  data(){
    return{
      data1:` "黄山门票：190元，时效3天，可二次预约进山
上山路线：
①后山上前山下：
云谷索道上-白鹅岭-石笋峰-始信峰-梦笔生花-猴子观海-狮子峰-丹霞峰-排云亭-西海大峡谷-光明顶-鳌鱼峰-百步云梯-迎客松-玉屏索道下
热门路线，要去西海大峡谷的选它，下坡多，
②前山上后山下：
玉屏索道上-迎客松-天都峰-百步云梯-鳌鱼峰-光明顶-飞来石-排云亭-丹霞峰-狮子峰-猴子观海-梦笔生花-始信峰-石笋峰-白鹅岭-云谷索道下
经典路线，要去天都峰的选它，上坡多
衣食住行各方面介绍一下。
一.衣：三层原则吧，
1.上身：内速干衣，中抓绒保暖，外防风，山上风大，白天晚上温差也大，山上温度比山下低十度左右，建议做好准备
2.下身：内速干裤，外防风裤或运动裤，可以带条德绒秋裤(怕冷的可以带上)
另外记得带遮阳帽，手套，和一次性雨衣，预防下雨淋成落汤鸡。
登山杖建议山脚买，5元一根，上下山很有必要。
带护膝或髌骨带记得带，可减少膝盖磨损和疼痛。
我自己是3月28号爬的，带了羽绒服和德绒秋裤的，好处是保暖，缺点是太占空间了，3/28看日落和3/29日出可以用得上，这两个时间还是很冷的。白天爬山什么的就很热，速干衣+防风外套就可以
二.食：
1.建议山下吃饱在上去，带好干粮，如压缩饼干，士力架，巧克力，自热小火锅等高热量的食物，爬山消耗挺大的，
注：山上吃饭最低要60多 一餐
2.水的话，带一瓶或两瓶就行，可以带红牛，爬山喝，公厕处有免费直饮水，可以带个杯子或保温杯
三.住：
晚上到的可以山脚住一晚(山脚住宿相对便宜一些)，然后白天进山，晚上山上住一晚。
中午到的可以直接上山六点看日落，晚上山上住一晚
1.山上住宿单人床铺要三百左右(一晚)，还有标间(一千五)一晚，实在是住不起
2.省钱小妙招：可以去白云美食广场餐厅过夜(只要进去买瓶水就行最低8元)，
缺点是人多，可能没位置，晚上接近0℃比较冷，冻的都睡不着，都在聊天，比较吵，有条件的可以带睡袋和耳塞会睡的比较好
四.行：
高铁坐到黄山北站，
黄山北站~黄山南大门的大巴(30元)，
黄山南大门~到南山或北山的大巴(19元)。
景区巴士：19元/次
玉屏索道：90元/次
云谷索道：80元/次
西海小火车：100元/次
注意事项：
①下行巴士需要现场排队购买
②注意下行索道最晚关闭时间
五.最后建议各位特种兵：
提前锻炼，一定要提前锻炼，最起码1~2周，尤其是准备全程徒步的特种兵们，注重腿部肌肉锻炼，5公里长跑，深蹲，或者爬楼梯等
#黄山#黄山旅游攻略#特种兵旅游"`
    ,data2:`大学生穷游第一站：安徽黄山！相比厦门、威海那些热门景点，先去爬山是我做过最正确的选择！

路线🗺️：
Day1:杭州-高铁-黄山北-跟订的酒店联系接车到酒店-打车去翡翠谷-回酒店

Day2:酒店徒步10-15分钟到乘大巴的地方-坐索道-爬黄山（云谷索道方向上-途径梦笔生花、猴子观海、始信峰、莲花峰、迎客松-玉屏索道方向下）-宏村民宿

Day3:宏村-高铁返程-杭州

从高铁站到黄山脚下的酒店路程大概是有40分钟的所以可以提前联系酒店订车价格一般30-50左右

门票🎫：
翡翠谷门票60/人 在👟🍊上订
（有关黄山的在微🌟小程序搜黄山旅游官方平台购买）⬇️
1. 黄山南大门门票：95/人学生票
2.上行票（云谷寺方向）：19换乘巴士+80索道票
3.下行票（玉屏索道方向）：90索道票+19换乘巴士
宏村门票现场买52/人学生票（记得带身份证或学生证❗️）

美食🍥：
吃的其实没有特别推荐的 因为本次去主要就是为了爬山🧗 但是也可以尝一下本地的特色菜（八公山豆腐、臭鳜鱼、毛豆腐等等） 我们是在酒店旁边的小菜馆随便点的 感觉味道都还不错就是普通的农家小炒菜的味道哈哈🤓

爬一次黄山真的觉得是很值得的 虽然爬的时候一直在说累不停出汗，但是越爬越高温度也越来越低到山顶的时候大风吹来真的非常爽！！现在翻相册看这些live照片也感觉是历历在目🥹去感受一下自由的风吧！

总的来说这一趟完下来真的很爽！！第一次亲身感受到了大自然的鬼斧神工作为大学生来说这一趟平均下来总共花费在900-1k，真的很划算也很开心，把想玩的都玩到了真的很值得啊！

我的攻略都放在最后咯@薯队长@日常薯

#户外徒步#大自然#徒步好风景#旅行#旅途中的美景#我的徒步日记#徒步丈量世界#灵魂和肉体都在路上#在没有天花板的地方尽情吸氧#黄山#黄山旅行#安徽#大学生#旅游#和大自然亲密接触`
,link1:"http://sns-webpic-qc.xhscdn.com/202404200109/195b2ee6b7bf122194e0e3fcfbf04e05/1040g2sg3110vqejb6e6g5oeoaq1416trufd8vl0!nd_prv_wlteh_webp_3"
,link2:"http://sns-webpic-qc.xhscdn.com/202404200114/78a23c43b36ebb2aeba815e6485dd8eb/1040g008311b3peasmk005n5khf85k05ajasfqo0!nd_dft_wlteh_webp_3"
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
    width: 430px;
    height: 200px;
    display: flex;
    .imgbox{
      overflow: hidden; /* 超出部分隐藏 */
      width: 100%;
      height: 100%;
      
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
    flex-direction: row; /* 将交叉轴设置为默认轴 */
    flex-wrap: wrap;
    overflow: hidden;
    text-overflow: ellipsis; /* 超出容器的文本以省略号的形式显示 */
    .title{
      flex:1;
      padding-bottom: 20px;
    }
    .text{
      line-height: 20px;
      text-overflow: ellipsis; /* 超出容器的文本以省略号的形式显示 */
      color: #888;
      font-size: 14px;
      flex:4;
    }
  }

</style>