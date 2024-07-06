<template>
  <div class="container-all">
    <div class="float">
      <div class="left">
        <ul>
          <li>
            <span>出发地</span><el-input id="start" placeholder="请输入出发地" v-model="startName"></el-input>
          </li>
          <li>
            <span>目的地</span><el-input id="end" placeholder="请输入目的地" v-model="endName"></el-input>
          </li>
          <li>
            <el-select v-model="value" clearable placeholder="请选择出行方式">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>



        <el-button @click="goView">查询</el-button>
          </li>
        </ul>
        
        
    
        
      </div>
      <div class="right">
        <div id="my-panel"></div>
      </div>
    </div>
    <div id="container"/>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  data() {
    return {
      map: null,
      startName: '',
      endName: '',
      options: [{
          value: '驾车',
          label: '驾车'
        }, {
          value: '选项2',
          label: '步行'
        }, {
          value: '选项3',
          label: '骑车'
        }, {
          value: '选项4',
          label: '公交'
        }
      ],
      value: ''
    }
  },
  mounted() {
    window._AMapSecurityConfig = {
      securityJsCode: 'ea5a24c6b36180a9428bf38b88a981a0'
    }
    // DOM初始化完成进行地图初始化
    this.initMap()
  },
  methods: {
    myLocation() {
      console.log("myLocation被调用了")
      let options = {
        'showButton': true,
        'position': 'LB',
        'offset': [10, 20],
        'showMarker': true,
        'markerOptions': {
          'offset': new AMap.Pixel(-18, -36),
          'content': '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
        },
        'showCircle': true,
        'circleOptions': {
          'strokeColor': '#0093FF',
          'noSelect': true,
          'strokeOpacity': 0.5,
          'strokeWeight': 1,
          'fillColor': '#02B0FF',
          'fillOpacity': 0.25
        }
      }
      AMap.plugin(["AMap.Geolocation"], () => {
        let geolocation = new AMap.Geolocation(options);
        this.map.addControl(geolocation);
        geolocation.getCurrentPosition()
      });
    },
    goView() {
      const transit = new AMap.Transfer({
        map: this.map,
        panel: "my-panel",
        city: '全国',
        policy: AMap.TransferPolicy.LEAST_TIME
      });

      const points = [
        { keyword: this.startName },
        { keyword: this.endName }
      ];

      transit.search(points, (status, result) => {
        if (status === 'complete') {
          console.log('Transit route:', result);
        } else {
          console.error('Failed to get transit route. Status:', status);
        }
      });
    },
    initMap() {
      AMapLoader.load({
        key: "29c7f15386a9204544b833cb6422d9ae",
        version: "2.0",
        plugins: ['AMap.ToolBar', 'AMap.Transfer', 'AMap.AutoComplete'],
        AMapUI: {
          version: "1.1",
          plugins: [],
        },
        Loca: {
          version: "2.0.0"
        }
      }).then((AMap) => {
        this.map = new AMap.Map("container", {
          zoom: 4.5,
          center: [101.46912, 36.24274],
          mapStyle: "amap://styles/whitesmoke"
        });

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

        const autoOptions = {
          city: '全国',
          input: 'start'
        }
        const autoComplete = new AMap.AutoComplete(autoOptions)
        const autoOptions2 = {
          city: '全国',
          input: 'end'
        }
        const autoComplete2 = new AMap.AutoComplete(autoOptions2)
      }).catch(e => {
        console.log(e);
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container-all {
  height: 100%;
  position: relative;
  .float {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    .left {
      margin-left: 20px;
      li{
        display: flex;
        padding: 10px;
        span{
          line-height:30px;
          width: 80px;
          height: 30px;
          text-align: center;
        }
        #start{
          flex: 1;
        }
      }
    }
    .right {
      height: 960px;
      position: absolute;
      top: 0;
      left: 1400px;
      #my-panel {
        width: 500px;
        height: 100%;
        overflow-y: scroll;
      }
    }
  }
}
#container {
  padding: 0px;
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
