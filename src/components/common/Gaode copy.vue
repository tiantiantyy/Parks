<template>
<div class="container-all">
  <div class="float">
    <div class="left">
    出发地：<el-input id="start" v-model="startName"></el-input>
    目的地：<el-input id="end" v-model="endName"> <el-button slot="append" @click="myloacation">我的位置</el-button></el-input>
   
    <el-button @click="goView">查询</el-button>
 
  </div>
  <div class="right">
    <div id="my-panel"></div>
  </div>

  </div>
  <div id="container" />
</div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  data(){
	return {
		map:null,
    startName: '',
      endName: ''
  	}
  },
  mounted() {
      window._AMapSecurityConfig = {
        securityJsCode:'ea5a24c6b36180a9428bf38b88a981a0'
    }
    //DOM初始化完成进行地图初始化
    this.initMap()
  },

  methods:{

    myloacation(){
      console.log("myloacation被调用了")
     let options = {
        'showButton': true,//是否显示定位按钮
		'position': 'LB',//定位按钮的位置
		/* LT LB RT RB */
		'offset': [10, 20],//定位按钮距离对应角落的距离
		'showMarker': true,//是否显示定位点
		'markerOptions':{//自定义定位点样式，同Marker的Options
		  'offset': new AMap.Pixel(-18, -36),
		  'content':'<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
		},
		'showCircle': true,//是否显示定位精度圈
		'circleOptions': {//定位精度圈的样式
			'strokeColor': '#0093FF',
			'noSelect': true,
			'strokeOpacity': 0.5,
			'strokeWeight': 1,
			'fillColor': '#02B0FF',
			'fillOpacity': 0.25
		}
    }
    AMap.plugin(["AMap.Geolocation"], function() {
        
      let geolocation = new AMap.Geolocation(options);
        this.map.addControl(geolocation);
        geolocation.getCurrentPosition()
    });
    },
    goView() {
      // eslint-disable-next-line no-undef
      const driving = new AMap.Driving({
        map: this.map,
         //panel 指定将结构化的路线详情数据显示的对应的 DOM 上，传入值需是 DOM 的 ID
        panel: "my-panel",
        // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
        // eslint-disable-next-line no-undef
        policy: AMap.DrivingPolicy.LEAST_TIME
      })
      const points = [
        { keyword: this.startName, city: '全国' },
        { keyword: this.endName, city: '全国' }
      ]
 
      driving.search(points, (status, result) => {
        // 未出错时，result即是对应的路线规划方案
        console.log('status=', status)
        console.log('result=', result)

      })
    },
//     goView() {
// // 线路查询

//      const lineSearch = new this.AMap.LineSearch({
//         pageIndex: 1, //页码，默认值为1
//         pageSize: 20, //单页显示结果条数，默认值为20，最大值为50
//         city: '全国', //限定查询城市，可以是城市名（中文/中文全拼）、城市编码，默认值为『全国』
//         extensions: 'all', //是否返回公交线路详细信息，默认值为『base』
//       });
//       const points = [
//         { keyword: this.startName, city: '全国' },
//         { keyword: this.endName, city: '全国' }
//       ]
    
//       //执行公交路线关键字查询
//       lineSearch.search(points, (status, result)=> {
//         //打印状态信息status和结果信息result
//         console.log(status, result);
//       });
    
  
// },
    initMap(){
        AMapLoader.load({
            key:"29c7f15386a9204544b833cb6422d9ae",             // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ['AMap.ToolBar', 'AMap.Driving', 'AMap.AutoComplete'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            AMapUI: {
                version: "1.1",
                plugins: [],
              },
            Loca: {
                version: "2.0.0"}

          }).then((AMap)=>{
            this.map = new AMap.Map("container",{  //设置地图容器id
                // viewMode:"3D",    //是否为3D地图模式
                zoom:4.5,           //初始化地图级别
                center:[101.46912, 36.24274], //初始化地图中心点位置
                mapStyle: "amap://styles/whitesmoke"
            });

            // 高德添加geoserve图层
          let layer = new AMap.TileLayer.WMS({
          url: "http://localhost:8080/geoserver/GeoParks/wms",
          params: {
            LAYERS: "GeoParks:geoparks",
            STYLES: "geoparks_poi_style",
            VERSION: "1.1.0",
            tiled: true
          },
          serverType: "geoserver",
            })
          this.map.add(layer)
           
      


          
      //路径规划
      const autoOptions = {
          // city 限定城市，默认全国
          city: '全国',
          input: 'start'
        }
        // 实例化AutoComplete
        const autoComplete = new AMap.AutoComplete(autoOptions)
        const autoOptions2 = {
          // city 限定城市，默认全国
          city: '全国',
          input: 'end'
        }
        // 实例化AutoComplete
        const autoComplete2 = new AMap.AutoComplete(autoOptions2)
        // 根据关键字进行搜索
        /* autoComplete.search(this.startName, (status, result) => {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result)
        }) */
        }).catch(e=>{
            console.log(e);
        })
    },
},


}


</script>



<style lang="less" scoped>
.container-all{
  height: 100%;
  position: relative;
  .float{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    .left{
      margin-left: 20px;
    }
    .right{
      height: 960px;
      position: absolute;
      top: 0;
      left: 1400px;
      
      #my-panel{
        width:500px;
        height: 100%;
        overflow-y: scroll;
      }
  }
  }
  
  
}
#container{
  padding:0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#panel {
  position: fixed;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 10px;
  right: 10px;
  width: 280px;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
</style>
