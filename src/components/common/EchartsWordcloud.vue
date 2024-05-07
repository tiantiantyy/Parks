<template>
  <div id="mywordcloud"   :style="{width: '100vh', height: '300px'}" :data="worddata"></div>
</template>
<script>
import axios from 'axios';
import echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
    export default {
      name: "VueWordCloud",
      data () {
        return {
          combinedTags:[],
          allword:[],
          worddata: [],
          wordData:[]
        }
      },
      mounted(){
        this.$bus.$on('QueryPark',(NAME)=>{
          console.log("queryWord收到的NAME:",NAME)
          this.queryWord(NAME)
            })
      },
      methods: {
        initChart() {
        
          this.chart = echarts.init(document.getElementById("mywordcloud"));
          console.log('lll');
          const option = {
            backgroundColor: "#fff",
            // tooltip: {
            //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
            // },
            series: [
              {
                type: "wordCloud",
                //用来调整词之间的距离
                gridSize: 10,
                //用来调整字的大小范围
                // Text size range which the value in data will be mapped to.
                // Default to have minimum 12px and maximum 60px size.
                sizeRange: [10, 40],
                // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
                //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
                // rotationRange: [-45, 0, 45, 90],
                // rotationRange: [ 0,90],
                rotationRange: [0, 0],
                //随机生成字体颜色
                // maskImage: maskImage,
                textStyle: {
                  normal: {
                    color: function() {
                      return (
                        "rgb(" +
                        Math.round(Math.random() * 255) +
                        ", " +
                        Math.round(Math.random() * 255) +
                        ", " +
                        Math.round(Math.random() * 255) +
                        ")"
                      );
                    }
                  }
                },
                //位置相关设置
                // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
                // Default to be put in the center and has 75% x 80% size.
                // left: "center",
                // top: "center",
                // right: null,
                // bottom: null,
                width: "200%",
                height: "200%",
                //数据
                data: this.worddata
              }
            ]
          };
          this.chart.setOption(option);
        },

        queryWord(NAME){
          this.combinedTags=[]
          console.log( this.combinedTags)
          let self=this
            axios.get('http://localhost:3000/api/user/notes', {
                params: {
                    parameter: NAME
                }
            }).then((response) => {
            this.wordData = response.data;

            //遍历获得的数据库数据，获取标签字段
            this.wordData.forEach(item => {
           // 将每个item['标签']数组转换为字符串
            let itemTagsString = JSON.stringify(item['标签']);
           // 将字符串转换为数组
            const itemTagsArray = itemTagsString.slice(2, -2).split(', ');
            itemTagsArray.forEach(element => {
               if(element.slice(2, -1)!='')
                this.combinedTags.push(element.slice(2, -1));
            });

           
        })
        
    
        }).then(
          function(){
            console.log("combinedTags", self.combinedTags);
        // console.log("combinedTags[0]", self.combinedTags[0]);
        const topWords = self.topTenWords(self.combinedTags);
        console.log("前十名",topWords);
        console.log("queryWord开始构建词云")
        // 将原始字符串数组转换为 worddata 数组对象
        self.worddata = topWords.map(tag => {
            return {
                name: tag[0],
                // 为 value 设置一个随机值，可以根据实际需求调整
                value: tag[1]
            };
        });

        console.log(self.worddata);
        self. initChart()
          }
        )
  
       

      
      },


    // 取出四十个频次最高的词语及其频次
      topTenWords(arr) {
    console.log("调用了topTenWords")

    // 创建一个 Map 对象来存储词语及其频次
    let wordCount = new Map();
    console.log("arr:",arr)

    // console.log("arr[1]:",arr[1])

    // 遍历数组，统计词语频次
    arr.forEach(word => {
        // 将单词转换为小写，并去除首尾空格
        word = word.toLowerCase().trim();
        // console.log("word",word)

        // 获取词语的频次，如果不存在则初始化为 0
        let count = wordCount.get(word) || 0;

        // 将词语及其频次存入 Map
        wordCount.set(word, count + 1);
    });

    // 将 Map 转换为数组，便于排序
    let wordCountArray = Array.from(wordCount);
    console.log(wordCountArray)
    // 按照频次降序排序
    wordCountArray.sort((a, b) => b[1] - a[1]);

    // 取出四十个频次最高的词语及其频次
    let topTen = wordCountArray.slice(0, 40);

    // 返回结果
    return topTen;
}



      }
    }
</script>

<style lang="less" scoped>
#mywordcloud{
  width: 100%;
  height: 100%;
  margin-top:20px ;
}
</style>