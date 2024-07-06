<template>
  <div id="echartsRank" style="width: 440px; height: 410px;padding-top:50px ;"></div>
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
      const echart = echarts.init(document.getElementById('echartsRank'))
     // 地质公园数据
    let option = {
    backgroundColor: 'rgb(255, 255,255)',
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: true
            },
            // dataView: {
            //     show: true,
            //     readOnly: false
            // },
            magicType: {
                show: true,
                type: ['pie', 'funnel']
            },
            // restore: {
            //     show: true
            // },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    "tooltip": {
        "trigger": "item",
        "formatter": "{a}：{c}个"
    },
    "calculable": true,
    "legend": {
        "icon": "circle",
        "x": "center",
        "y": "82%",
        "data": [
            "4.9",
            "4.8",
            "4.7",
            "4.6",
            "4.5",
            "4.4",
            "4.3",
            "4.2",
            "4.1",
            "3.8",
        ],
        "textStyle": {
            "color": "#000"
        }
    },
    "series": [{
        "name": "公园数",
        "type": "pie",
        "radius": [
            37,
            155
        ],
        "avoidLabelOverlap": false,
        "startAngle": 0,
        "center": [
            "50.1%",
            "34%"
        ],
        "roseType": "area",
        "selectedMode": "single",
        "label": {
            "normal": {
                "show": true,
                "formatter": "{c}个"
            },
            "emphasis": {
                "show": true
            }
        },
        "labelLine": {
            "normal": {
                "show": true,
                "smooth": false,
                "length": 20,
                "length2": 10
            },
            "emphasis": {
                "show": true
            }
        },
        "data": [{
                "value": 10,
                "name": "4.9",
                "itemStyle": {
                    "normal": {
                        "color": "#f845f1"
                    }
                }
            },
            {
                "value": 10,
                "name": "4.8",
                "itemStyle": {
                    "normal": {
                        "color": "#ad46f3"
                    }
                }
            },
            {
                "value": 4,
                "name": "4.7",
                "itemStyle": {
                    "normal": {
                        "color": "#5045f6"
                    }
                }
            },
            {
                "value": 8,
                "name": "4.6",
                "itemStyle": {
                    "normal": {
                        "color": "#4777f5"
                    }
                }
            },
            {
                "value": 4,
                "name": "4.5",
                "itemStyle": {
                    "normal": {
                        "color": "#44aff0"
                    }
                }
            },
            {
                "value": 2,
                "name": "4.4",
                "itemStyle": {
                    "normal": {
                        "color": "#45dbf7"
                    }
                }
            },
            {
                "value": 3,
                "name": "4.4",
                "itemStyle": {
                    "normal": {
                        "color": "#f6d54a"
                    }
                }
            },
            {
                "value": 2,
                "name": "4.2",
                "itemStyle": {
                    "normal": {
                        "color": "#f69846"
                    }
                }
            },
            {
                "value": 3,
                "name": "4.1",
                "itemStyle": {
                    "normal": {
                        "color": "#ff4343"
                    }
                }
            },
            {
                "value": 1,
                "name": "3.8",
                "itemStyle": {
                    "normal": {
                        "color": "green"
                    }
                }
            },
            // {
            //     "value": 1,
            //     "name": "3.8",
            //     "itemStyle": {
            //         "normal": {
            //             "label": {
            //                 "show": false
            //             },
            //             "labelLine": {
            //                 "show": false
            //             }
            //         }
            //     }
            // },
         
           
         
          
          

            
        ]
    }]
};

      echart.setOption(option)
    }
  }
}
</script>
<style>
