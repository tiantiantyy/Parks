<template>
  <div id="echartsAreas" style="width: 440px; height: 410px;"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'echartsAreas',
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const echart = echarts.init(document.getElementById('echartsAreas'))
     // 地质公园数据
const parkData = [
  { name: '昆仑山世界地质公园', area: 7033.17 },
  { name: '阿尔山世界地质公园', area: 3653.21 },
  { name: '雷琼世界地质公园', area: 3050.00 },
  { name: '长白山世界地质公园', area: 2724.00 },
  { name: '湘西世界地质公园', area: 2710.00 },
  { name: '宁德世界地质公园', area: 2660.34 },
  { name: '黄冈大别山世界地质公园', area: 2625.54 },
  { name: '可可托海世界地质公园', area: 2337.90 },
  { name: '龙岩世界地质公园', area: 2175.00 },
  { name: '临夏世界地质公园', area: 2120.00 }
];

// 对地质公园数据按照面积从高到低进行排序
parkData.sort((a, b) => a.area - b.area);
// 获取地质公园名称和面积数据

const parkNames = parkData.map(item => item.name);
const parkAreas = parkData.map(item => item.area);
// 修改地质公园名称为 "top1-top10"
const parkRank = parkData.map((item, index) => `top${10-index}`);

// 柱状图配置项
let option = {
  title: {
    // text: '地质公园面积排行',
    left: 'center'
  },
  yAxis: {
    type: 'category',
    data: parkRank, // 地质公园名称
    // name: "地质公园",
    axisLabel: {
      interval: 0, // 强制显示所有标签
    }
  },
  xAxis: {
    type: 'value',
    name: '面积（km²）'

  },
  series: [{
    data: parkAreas, // 地质公园面积数据
    type: 'bar',
    label: {
      show: true,
      position: 'right'
    },
     // 修改柱状图颜色
     itemStyle: {
      color:'rgb(231,131,54)'// 设置柱状图的颜色
    }
  }],
  tooltip: {
    trigger: 'axis', // 鼠标移动到图表上时触发提示框
     formatter: function (params) { // 自定义提示框内容
      const index = params[0].dataIndex; // 获取当前柱状图的索引
      const parkName = parkNames[index]; // 获取当前地质公园名称
      const parkArea = parkAreas[index]; // 获取当前地质公园面积
      return `${parkName}: ${parkArea}km²`; // 返回地质公园名称和面积
    }
  }
};

      echart.setOption(option)
    }
  }
}
</script>
<style>
