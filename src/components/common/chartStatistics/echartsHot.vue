<template>
  <div id="echartsRank" style="width: 100%; height: 100% ;"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'echartsRank',
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const myChart = echarts.init(document.getElementById('echartsRank'))

    //数据
   
    let myData = [
    '黄山世界地质公园',
    '庐山世界地质公园',
    '云台山世界地质公园',
    '石林世界地质公园',
    '丹霞山世界地质公园',
    '张家界世界地质公园',
    '五大连池世界地质公园',
    '嵩山世界地质公园',
    '雁荡山世界地质公园',
    '泰宁世界地质公园',
    '克什克腾世界地质公园',
    '兴文世界地质公园',
    '泰山世界地质公园',
    '王屋山-黛眉山世界地质公园',
    '雷琼世界地质公园',
    '房山世界地质公园',
    '镜泊湖世界地质公园',
    '伏牛山世界地质公园',
    '龙虎山世界地质公园',
    '自贡世界地质公园',
    '秦岭终南山世界地质公园',
    '阿拉善沙漠世界地质公园',
    '乐业-凤山世界地质公园',
    '宁德世界地质公园',
    '天柱山世界地质公园',
    '香港世界地质公园',
    '三清山世界地质公园',
    '延庆世界地质公园',
    '神农架世界地质公园',
    '昆仑山世界地质公园',
    '苍山世界地质公园',
    '敦煌世界地质公园',
    '织金洞世界地质公园',
    '阿尔山世界地质公园',
    '可可托海世界地质公园',
    '光雾山-诺水河世界地质公园',
    '黄冈大别山世界地质公园',
    '沂蒙山世界地质公园',
    '九华山世界地质公园',
    '湘西世界地质公园',
    '张掖世界地质公园',
    '长白山世界地质公园',
    '龙岩世界地质公园',
    '武功山世界地质公园',
    '恩施大峡谷—腾龙洞世界地质公园',
    '兴义世界地质公园',
    '临夏世界地质公园'
];


let databeast = {
    1: [78, 75, 70, 65, 68, 75, 80, 85, 80, 75, 76],
    2: [71, 81, 83, 87, 80, 85, 86, 85, 88, 78, 86],
    3: [64, 67, 72, 75, 77, 80, 81, 82, 83, 85, 90],
    4: [78, 75, 70, 65, 68, 75, 80, 85, 80, 75, 76],
    5: [71, 81, 83, 87, 80, 85, 86, 85, 88, 78, 86],
    6: [64, 67, 72, 75, 77, 80, 81, 82, 83, 85, 90],
    7: [78, 75, 70, 65, 68, 75, 80, 85, 80, 75, 76],
    8: [71, 81, 83, 87, 80, 85, 86, 85, 88, 78, 86],
    9: [64, 67, 72, 75, 77, 80, 81, 82, 83, 85, 90],
    10: [78, 75, 70, 65, 68, 75, 80, 85, 80, 75, 76],
    11: [71, 81, 83, 87, 80, 85, 86, 85, 88, 78, 86],
    12: [64, 67, 72, 75, 77, 80, 81, 82, 83, 85, 90],

};

let timeLineData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function optiontitle(value) {
    if (value > 9) {
        return {
            text:  value + '小红书讨论热度',
            x: 'center',
            top: '2%'
        }
    } else return {
        text: value + '小红书讨论热度',
        x: 'center',
        top: '2%'
    }


}



  
    //图表加载
    let option = {
    baseOption: {

        timeline: {
            show: true,
            left:0,
            bottom: 10,
            width:900,
            axisType: 'category',
            tooltip: {
                show: true,
                formatter: function(params) {
                    console.log(params);
                    return params.name;
                }
            },
            autoPlay: true,
            currentIndex: 0,
            playInterval: 1000,
     
            label: {
                normal: {
                    show: true,
                    interval: 'auto',
                    formatter: function(value) {
                        return value
                    }
                },
            },
            data: [],
        },
        title: {
            //   text:'大北京景点帅哥美女统计', 
            textStyle: {
                fontSize: 16,
            },
        },

        grid: [{
            show: false,
            left: '5%',
            top: '20%',
            bottom: 80,
            containLabel: true,
        }],

        xAxis: [{
            boundaryGap: 0,
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月','12月'],
            axisLabel: {
                show: true,
               
                textStyle: {
                    fontSize: 12,
                },
            },
            splitLine: {
                show: false
            },
        }],
        yAxis: [{
            type: 'value',
            name: '热度',
            min: 50,
            splitLine: {
                show: true
            },
            axisLabel: {
                formatter: function(value) {
                    return value + '0'
                },
            },
            data: myData,
        }],
        series: [],

    },

    options: [],


};

for (var i = 0; i < myData.length; i++) {
    option.baseOption.timeline.data.push(myData[i]);
    option.options.push({
        title: optiontitle(myData[i]),
        series: [{
            name: '总课时',
            type: 'line',
            barGap: 15,
            barWidth: 15,
            label: {
                normal: {
                    show: false,
                },
                emphasis: {
                    show: true,
                    position: 'left',
                    offset: [0, 0],
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                    },
                },
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(137, 189, 27, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(137, 189, 27, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: '#659F83',
                },
                emphasis: {
                    color: '#08C7AE',
                },
            },
            data: databeast[timeLineData[i]],
        }]
    });
}



myChart.setOption(option)
    },


  }
}
</script>
<style>
