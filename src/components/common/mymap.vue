<template>
  <div class="content row-flex-start" style="min-width:1500px;overflow-x:auto">
    <div id="left_map" @click="showChinaMap"></div>
    <div class="right_opetate row-center" id="right_opetate">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)
  let provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan']
  let provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾']
export default {
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.initMap()
    })
  },
  data () {
    return {
      map: {}
    }
  },
  props: {},
  methods: {
    getMapOpt (place) {
      const option = {
      backgroundColor: '#F3F3F3', //地图背景颜色
      //以下是地图标题，我在此处设空，需要的可以自己加上
      title: {
          text: '',
          subtext: '',
          left: 'center'
        },
        //以下是地图右侧“还原”“下载”工具框
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
      geo: {
        map: place || 'china',
        label: {
            emphasis: {
                show: false
            },
            // 不需要显示地名可直接删除normal此项
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                  color: 'rgba(0,0,0)'
              }
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#6FA7CE', //地图颜色
                borderColor: '#fff' //地图边线颜色
            },
            emphasis: {
                areaColor: '#B7DFED' //鼠标移入颜色
            }
        }
       }
      }
      return option
    },
    // 显示中国地图
    showChinaMap () {
       const option = this.getMapOpt()
        this.map.setOption(option, true)
    },
    // 显示各省地图，这里使用axios请求本地文件，provice文件夹存在的位置为public/province（旧版本是static）
    getProvinceMapOpt (provinceAlphabet) {
      axios.get('province/' + provinceAlphabet + '.json').then((s) => {
        echarts.registerMap(provinceAlphabet, s.data)
        const option = this.getMapOpt(provinceAlphabet)
        this.map.setOption(option, true)
      })
    },
    initMap () {
    let dom = document.getElementById('left_map')
     this.map = echarts.init(dom)
      const option = this.getMapOpt()
      
      if (option && typeof option === 'object') {
        this.map.setOption(option, true)
      }
      this.map.on('click', (param) => {
        // console.log(param)
        event.stopPropagation()// 阻止冒泡
        // 找到省份名
        const provinceIndex = provincesText.findIndex(x => {
          return param.name === x
        })
        //在这里判断provincesText中是否包含点击的省份名，有则渲染省级地图，无则无处理（需要可从此获得）
        if (provinceIndex === -1) return
        const provinceAlphabet = provinces[provinceIndex]
        // 重新渲染各省份地图
        this.getProvinceMapOpt(provinceAlphabet)
      })
    }
  },
  computed: {}
}
</script>

<style>
#left_map {
  width: 940px;
  height: 560px;
}
.right_opetate {
  flex: 1;
  height: 100%;
  background: #404a59
}
</style>

