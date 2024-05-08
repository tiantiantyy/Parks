<template>
	<div id="olmap" ref="olmap" style="width: 100%; height: 100%;">
		<el-select class="mapselect" v-model="value" placeholder="切换地图底图" @change="changeBaseMap(value)">
			<el-option-group v-for="group in options" :key="group.label" :label="group.label">
				<el-option
					v-for="item in group.options"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				></el-option>
			</el-option-group>
		</el-select>
	</div>
</template>

<script>
import geoparks from "@/assets/geoparks.geojson";
import Map from 'ol/Map';
import View from 'ol/View';
import { Heatmap as HeatmapLayer } from 'ol/layer.js';
import TileLayer from 'ol/layer/Tile';
import { transform } from 'ol/proj';
import VectorSource from 'ol/source/Vector.js';
import mapSources from './modules/maplist';



//导入框选相关模块
import axios from 'axios';
import { GeoJSON, WFS } from 'ol/format.js';
import Intersects from 'ol/format/filter/Intersects.js';
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import TileWMS from 'ol/source/TileWMS.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

//导入点选相关模块
import { transformExtent } from 'ol/proj';

//导入实现时间轴相关模块
import EqualTo from 'ol/format/filter/EqualTo.js';
import Vector from 'ol/layer/Vector.js';
export default {
	components: {},
	data() {
		return {
			options: mapSources.basemapLabel,
			value: '',    
      tdtdz: mapSources.tdtdz,
      tdtlabeldz: mapSources.tdtlabeldz,
      tdtwx: mapSources.tdtwx,
      tdtlabelwx: mapSources.tdtlabelwx,
      gaodedz: mapSources.gaodedz,
      gaodewx: mapSources.gaodewx,
      gaodelabelwx: mapSources.gaodelabelwx,
      // geoqcs: mapSources.geoqcs,
      // geoqns: mapSources.geoqns,
      // geoqhs: mapSources.geoqhs,
      // geoqlh: mapSources.geoqlh,
			proj: 'EPSG:4326', //定义wgs84地图坐标系
			proj_m: 'EPSG:3857', //定义墨卡托地图坐标系
      layers: {}, // 用于存储图层的对象
			map: null,
			mapLayer: null,
			mapLayerlabel: null,
      geojson:geoparks,
      selectTableData:[],//点选中的park信息
      refreshInterval: 5000,//渲染间隔时间
      PointSelectPark:null
		}
	},
  watch: {
    selectTableData() {
      // 当 selectTableData 发生变化时调用 updateTableData 方法
      this.updateTableData();
    }
  },
	mounted() {
     this.initMap()
     this.$bus.$on('LoadGeoJson',(checked)=>{
				this.loadjson(checked)
			})
    this.$bus.$on('LoadHeatMap',(checked)=>{
      this.HeatMap(checked)
    })
    this.$bus.$on('LoadNotesMap',(checked)=>{
      this.NotesMap(checked)
    })
    this.$bus.$on('StartPolygonSelect',()=>{
      this.startDrawing()
    })
    this.$bus.$on('StopPolygonSelect',()=>{
      this.stopDrawing()
    })
    this.$bus.$on('ApprovalYear',()=>{
      this.ApprovalYear()
    })
    this.$bus.$on('QueryPark',(NAME)=>{
      this.QueryPark(NAME)
    })
    this.$bus.$on('resetMapCenter',()=>{
      this.resetMapCenter()
    })
    this.$bus.$on('LoadProvince',(NAME)=>{
      this.LoadProvince(NAME)
    })
    this.$bus.$on('clearJson',()=>{
      let jsonName='json'
      this.removeLayerByName(jsonName)
    })
  },
  beforeDestroy() {
        // 组件销毁前移除事件监听器
        this.$bus.$off('LoadGeoJson');
        this.$bus.$off('LoadHeatMap');
        this.$bus.$off('LoadNotesMap');
        this.$bus.$off('StartPolygonSelect');
        this.$bus.$off('StopPolygonSelect');
        this.$bus.$off('ApprovalYear');
        this.$bus.$off('QueryPark');
    },
  methods: {
    initMap(){
       //初始化地图
       this.map = new Map({
          target: 'olmap',  //目标容器
          projection: this.proj,  //定义wgs84地图坐标系
          view: new View({
              center: transform(
                [101.46912, 36.24274],
                this.proj,
                this.proj_m
              ),
          zoom: 4
        })
      })
      //初始化地图图层
      this.mapLayer = new TileLayer({
        source: this.tdtdz,
        className:'blueLayer',//增加className属性
      })
      //初始化标签图层
      this.mapLayerlabel = new TileLayer({
        source: this.tdtlabelwx,
        projection: this.proj
      })
     
      this.map.addLayer(this.mapLayer)
    
      this.loadjson()
      const self = this;
      this.map.on('click',event=>{
      
        //点选交互
        let coor=event.coordinate;
        // 计算容差范围
        let tolerance = 40000; // 容差值，单位为像素
        let extent = [
        coor[0] - tolerance,
        coor[1] - tolerance,
        coor[0] + tolerance,
        coor[1] + tolerance
        ];
        // 将容差范围转换为地图投影坐标系下的范围
        let mapExtent = transformExtent(extent, 'EPSG:3857', 'EPSG:4326');
  
        /// 创建 WFS GetFeature 请求对象
        const featureRequest = new WFS().writeGetFeature({
          srsName: 'EPSG:4326',
          featureNS: 'http://geoserver/geoparks',
          featurePrefix: 'GeoParks',
          featureTypes: ['GeoParks:geoparks'],
          outputFormat: 'application/json',
          geometryName:'the_geom',
          bbox: mapExtent, // 添加转换后的范围作为 bbox 参数
        });
        // console.log(featureRequest);  //打印已选择的Feature

        // 发送请求
        fetch('http://localhost:8080/geoserver/' + 'wfs', {
          method: 'POST',
          body: new XMLSerializer().serializeToString(featureRequest),
      })
        .then(function (response) {
          // console.log(response)
          return response.json();
        })
        .then(function (json) {
          const feature = new GeoJSON().readFeatures(json);
          // console.log(feature)
          const NAME = feature[0].values_['NAME']; //获取点选的公园名称
          self.QueryPark(NAME)
        })
    }
  );

    },
    /******************根据省份名称查询json***************/
    LoadProvince(NAME)
    {
      console.log("LoadProvince的NAME：",NAME)
      // 使用 Axios 加载 JSON 数据
      axios.get('/china.json')
      .then(response => {
        // 将响应数据传递给 GeoJSON 格式器并读取要素
        // const features = new GeoJSON().readFeatures(response.data);
        const features = new GeoJSON().readFeatures(response.data, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        });
         // 遍历要素并筛选出符合条件的要素
    const filteredFeatures = features.filter(feature => feature.get('name') === NAME);

    // 输出符合条件的要素
    console.log(filteredFeatures);

        // 创建 GeoJSON 图层并添加到地图上
        const geoJSONLayer = new VectorLayer({
          zIndex: 10,
          source: new VectorSource({
            features: filteredFeatures
          }),
          style: new Style({
            stroke: new Stroke({
              color: "#ff0000", // 描边红色
              width: 2 // 设置描边宽度为 1 像素
            }),
            fill: new Fill({
              color: "#ff000020" // 填充红色透明
            })
          })
        });
        // console.log(geoJSONLayer)
        this.addLayer(geoJSONLayer,'json');
        // 缩放地图至适合要素
        this.map.getView().fit(geoJSONLayer.getSource().getExtent(), {
          padding: [20, 20, 20, 20], // 可选项，指定地图边缘的填充
          duration: 1000 // 可选项，动画持续时间
        });
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error);
      });

    },
    /******************根据公园名称向查询后端公园信息***************/
    QueryPark(NAME){
      // console.log("ol_Home接收",NAME)
      let self=this
          //向后端传参框选得到的地质公园名称
          axios.get('http://localhost:3000/api/user/PointSelect', {
                params: {
                    parameter: NAME
                }
            })
            .then(function (response) {
                // console.log(response.data)
                self.PointSelectPark=response.data[0];
                let parkInfo=self.PointSelectPark;
                self.delayParkInfo(parkInfo);
                let LON=self.PointSelectPark["LONGITUDE"];
                let LAT=self.PointSelectPark["LATITUDE"];
                self.setMapCenter(LON,LAT)
                // console.log(self.PointSelectPark['DETAILS']);

            })
            .catch(function (error) {
              self.PointSelectPark=[];
                console.log(error);
            });
    },
    /******************加载Geoserver图层***************/
    loadjson:function(checked=true){
      if(checked){
        let layer = new TileLayer({
        source: new TileWMS({
          //不能设置为0，否则地图不展示。
          ratio: 1,
          url: "http://localhost:8080/geoserver/GeoParks/wms",
          params: {
            LAYERS: "GeoParks:geoparks",
            STYLES: "geoparks_poi_style",
            VERSION: "1.1.0",
            tiled: true
          },
          serverType: "geoserver",
        }),
        zIndex: 9999 // 让图层始终添加到底图之上
      });
          this.addLayer(layer,'POI')
        }
          
          else{
            this.removeLayerByName('POI')
          }
      
//       this.map.on('click', (evt) => {
//     if (this.map.hasFeatureAtPixel(evt.pixel)) {
//         this.map.getTargetElement().style.cursor = "pointer";
//         this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
//             // console.log(feature);
//             let name = feature.get("name");
//             let province =feature.get("province")
//             console.log(name);
//             let parkInfo = {
//                 name,
//                 province
//             };
//             // this.showOverlayOnClick(name,province, evt);
//             this.showOverlayOnClick(parkInfo);
//         });
//     } else {
//         this.map.getTargetElement().style.cursor = "default";
//         // 首先销毁之前的 overlay
//     if (this.overlay) {
//     console.log("消除overlay")

//         this.map.removeOverlay(this.overlay);
//         this.overlay = null;
//     }
//     }
// }
// );

    
    },

		/******************地图切换方法***************/
		changeBaseMap: function(value) {
      this.map.removeLayer(this.mapLayer)
      this.map.removeLayer(this.mapLayerlabel)
			switch (value) {
        case 'tdtdz':
          this.mapLayer = new TileLayer({
            source: this.tdtdz,
            projection: this.proj,
            zIndex: 0 // 底图的zIndex设置为最小值
          })
          this.mapLayerlabel = new TileLayer({
            source: this.tdtlabeldz,
            projection: this.proj,
            zIndex: 0 // 底图的zIndex设置为最小值
          })
          this.map.addLayer(this.mapLayer)
          this.map.addLayer(this.mapLayerlabel)
          break;
        case 'tdtwx':
          this.mapLayer = new TileLayer({
            source: this.tdtwx,
            projection: this.proj,
            zIndex: 0 // 底图的zIndex设置为最小值
          })
          this.mapLayerlabel = new TileLayer({
            source: this.tdtlabelwx,
            projection: this.proj,
            zIndex: 0 // 底图的zIndex设置为最小值
          })
          this.map.addLayer(this.mapLayer)
          this.map.addLayer(this.mapLayerlabel)
          break;
        case 'gaodedz':
          this.mapLayer = new TileLayer({
            source: this.gaodedz,
            projection: this.proj,
            zIndex: 0 // 底图的zIndex设置为最小值
          })
          this.map.addLayer(this.mapLayer)
          break;
        case 'gaodewx':
          this.mapLayer = new TileLayer({
            source: this.gaodewx,
            projection: this.proj,
            zIndex: 0 // 底图的zIndex设置为最小值
          })
          this.mapLayerlabel = new TileLayer({
            source: this.gaodelabelwx,
            projection: this.proj,
            zIndex: 0 // 底图的zIndex设置为最小值
          })
          this.map.addLayer(this.mapLayer)
          this.map.addLayer(this.mapLayerlabel)
          break;
        // case 'geoqcs':
        //   this.mapLayer = new TileLayer({
        //     source: this.geoqcs,
        //     projection: this.proj,
        //     zIndex: 0 // 底图的zIndex设置为最小值
        //   })
        //   this.map.addLayer(this.mapLayer)
        //   break;
        // case 'geoqns':
        //   this.mapLayer = new TileLayer({
        //     source: this.geoqns,
        //     projection: this.proj,
        //     zIndex: 0 // 底图的zIndex设置为最小值
        //   })
        //   this.map.addLayer(this.mapLayer)
        //   break;
        // case 'geoqhs':
        //   this.mapLayer = new TileLayer({
        //     source: this.geoqhs,
        //     projection: this.proj,
        //     zIndex: 0 // 底图的zIndex设置为最小值
        //   })
        //   this.map.addLayer(this.mapLayer)
        //   break;
        // case 'geoqlh':
        //   this.mapLayer = new TileLayer({
        //     source: this.geoqlh,
        //     projection: this.proj,
        //     zIndex: 0 // 底图的zIndex设置为最小值
        //   })
        //   this.map.addLayer(this.mapLayer)
        //   break;
			}


		},
    /******************框选开启和关闭***************/
    startDrawing() {
      // 启动绘制状态
      this.PolygonSelect();
    },
    stopDrawing() {
      // 停止绘制状态的逻辑
      const drawInteraction = this.map.getInteractions().getArray().find(interaction => interaction instanceof Draw);
      if (drawInteraction) {
        this.map.removeInteraction(drawInteraction);
      }
    },
    PolygonSelect(){
        console.log("PolygonSelect被调用了")
       // 创建一个矢量图层用于显示绘制的几何图形
        const vectorSource = new VectorSource();
        const vectorLayer = new VectorLayer({
          source: vectorSource,
          style: new Style({
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new Stroke({
              color: '#ffcc33',
              width: 2
            }),
            image: new CircleStyle({
              radius: 7,
              fill: new Fill({
                color: '#ffcc33'
              })
            })
          })
        });
        // 添加绘制交互
      const draw = new Draw({
        source: vectorSource,
        type: 'Polygon' // 框选类型，可以根据需求修改
      });

      // 将绘制图层和交互添加到地图中
      this.map.addLayer(vectorLayer);
      this.map.addInteraction(draw);
      //将vue的this保存到一个变量中,防止后续丢失
     const self = this;
    // 监听绘制结束事件
    draw.on('drawend', event => {
    // 将绘制的多边形转换投影坐标
    const polygonGeometry = event.feature.getGeometry().transform('EPSG:3857', 'EPSG:4326');
    //创建几何过滤器，注意几何名称必须写'the_geom'，否则报错
    const polygonFilter = new Intersects('the_geom', polygonGeometry);
    /// 创建 WFS GetFeature 请求对象
    const featureRequest = new WFS().writeGetFeature({
      srsName: 'EPSG:4326',
      featureNS: 'http://geoserver/geoparks',
      featurePrefix: 'GeoParks',
      featureTypes: ['GeoParks:geoparks'],
      outputFormat: 'application/json',
      filter:polygonFilter // 使用几何过滤器作为查询条件
    });
    

    // 发送请求
    fetch('http://localhost:8080/geoserver/' + 'wfs', {
      method: 'POST',
      body: new XMLSerializer().serializeToString(featureRequest),
  })
    .then(function (response) {
      console.log(response)
      return response.json();
    })
    .then(function (json) {
      const features = new GeoJSON().readFeatures(json);
      let nameArray=[]
      for (let i = 0; i < features.length; i++) {
        const feature = features[i];
        const NAME = feature.values_['NAME']; //获取框选的公园名称
        nameArray.push(NAME)
        // console.log(NAME);
      }
        console.log(nameArray);
      //向后端传参框选得到的地质公园名称
        axios.get('http://localhost:3000/api/user/PolygonSelect', {
            params: {
                parameter: nameArray
            }
        })
        .then(function (response) {
            console.log(response.data);
            self.selectTableData=response.data
        })
        .catch(function (error) {
          self.selectTableData=[]
            console.log(error);
        });
    }
  ).then(function(){
      self.stopDrawing() //框选结束后自动结束绘制
  });
  });
},

    /******************添加图层并存储到 layers 对象中***************/ 
    addLayer(layer, name) {
      this.map.addLayer(layer);
      this.layers[name] = layer;
      // console.log("添加了图层")
    },
    /******************通过名称移除图层***************/ 
    removeLayerByName(name) {
      this.hideOverlay()//消除overlay
      const layer = this.layers[name];
      if (layer) {
        this.map.removeLayer(layer);
        delete this.layers[name];
        // console.log("移除了图层")
      }
  },
    updateTableData(){
      this.$bus.$emit('update-tabledata', this.selectTableData);
    },
  /******************创建一个热力图层***************/ 
    HeatMap (checked) {
      if(checked){
      let vector = new HeatmapLayer({
        zIndex: 9999, // 让图层始终添加到底图之上
      // 矢量数据源
        source: new VectorSource({
          features: (new GeoJSON()).readFeatures(this.geojson, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857',

      }),
        }),
        blur: 20, // 模糊尺寸
        radius: 20 // 热点半径
      })

        //将图层加载到地图对象
        this.addLayer(vector,'HeatMap')}
        else{
          this.removeLayerByName('HeatMap')

        }
    },
  /******************创建一个笔记分级符号图层***************/

   ApprovalYear(){
    let self=this
    // console.log('ApprovalYear被调用了',self)
    //创建属性查询过滤器
      const Filter = new EqualTo('YEAR','2004');
    /// 创建 WFS GetFeature 请求对象
    const featureRequest = new WFS().writeGetFeature({
          srsName: 'EPSG:4326',
          featureNS: 'http://geoserver/geoparks',
          featurePrefix: 'GeoParks',
          featureTypes: ['GeoParks:geoparks'],
          outputFormat: 'application/json',
          geometryName:'the_geom',
          filter:Filter
        });
        // console.log(featureRequest);  //打印已选择的Feature

        // 发送请求
        fetch('http://localhost:8080/geoserver/' + 'wfs', {
          method: 'POST',
          body: new XMLSerializer().serializeToString(featureRequest),
      })
        .then(function (response) {
          // console.log(response)
          return response.json();
        })
        .then(function (json) {
          // self.geojson=json
          // console.log(self.geojson)
          const features = new GeoJSON().readFeatures(json,{ featureProjection: 'EPSG:4326' });
          let vectorSource = new Vector({
        features: features
      });
          let vector = new VectorLayer({
             zIndex: 9999, // 让图层始终添加到底图之上
            // 矢量数据源
            source: vectorSource,
            projection: 'EPSG:4326',
      })



          // console.log(json)
    // 转换 JSON 数据为 OpenLayers 的要素
    // const features = new GeoJSON().readFeatures(json);
    //       console.log(features)

    //  // 创建矢量图层并添加到地图上
    //  const vectorSource = new VectorSource({
    //         features: features
    //       });
    //       const vectorLayer = new VectorLayer({
    //         source: vectorSource,
    //         style: new Style({
    //           image: new CircleStyle({
    //             radius: 6,
    //             fill: new Fill({color: 'red'}),
    //             stroke: new Stroke({color: 'white', width: 2})
    //           })
    //         })
    //       });
    //       self.addLayer(vectorLayer)
    // 遍历要素并输出名称到控制台
    let nameArray = [];
    for (let i = 0; i < features.length; i++) {
      const feature = features[i];
      const NAME = feature.get('NAME'); //获取点要素的名称
      nameArray.push(NAME);
      console.log(NAME);
      }
    })
     

   },

     /******************方法用于设置地图视图的中心点***************/
  setMapCenter(longitude, latitude) {
    // 将经纬度转换为地图坐标系的中心点
    let zoom=7;
    const center = transform([longitude, latitude], this.proj, this.proj_m,);
    this.map.getView().setZoom(zoom);
    // 更新地图视图的中心点
    this.map.getView().setCenter(center);
  },
     /******************方法用于设置地图默认视图的中心点***************/
  resetMapCenter() {
    // 将经纬度转换为地图坐标系的中心点
    let zoom=4;
    const center = transform([101.46912, 36.24274], this.proj, this.proj_m,);
    this.map.getView().setZoom(zoom);
    // 更新地图视图的中心点
    this.map.getView().setCenter(center);
  },
  /******************创建一个笔记分级符号图层***************/
  NotesMap(checked){
    if(checked){
        let layer = new TileLayer({
        source: new TileWMS({
          //不能设置为0，否则地图不展示。
          ratio: 1,
          url: "http://localhost:8080/geoserver/GeoParks/wms",
          params: {
            LAYERS: "GeoParks:geoparks",
            STYLES: "geoparks_notes_style",
            VERSION: "1.1.0",
            tiled: true
          },
          serverType: "geoserver",
        }),
        zIndex: 9999 // 让图层始终添加到底图之上
      });
          this.addLayer(layer,'Notes')
        }
          
          else{
            this.removeLayerByName('Notes')
          }
  },
  
  // 隐藏 overlay
  hideOverlay() {
    if (this.overlay) {
      this.map.removeOverlay(this.overlay);
      this.overlay = null;
    }
  },
  delayParkInfo(parkInfo){
    this.$bus.$emit('park', parkInfo);
  }

	}
}
</script>

<style scoped>
#olmap {
	position: relative;
	z-index: 1;
}
.mapselect {
	position: absolute;
	top: 3%;
	right: 2%;
	z-index: 2;
}

/*=S 自定义鹰眼样式 */
.ol-custom-overviewmap, .ol-custom-overviewmap.ol-uncollapsible {
  bottom:auto;
  left:auto;
  /* 右侧显示 */
  right: 0;
  /* 底部显示 */
  bottom:0;
}
  /* 鹰眼控件展开时空间外框的样式 */
  .ol-custom-overviewmap:not(.ol-collapsed){
      border:1px solid black;
  }
  /* 鹰眼控件中地图容器的样式 */
  .ol-custom-overviewmap .ol-overviewmap-map {
      border:none;
      width: 300px;
  }
  /* 鹰眼控件中显示当前窗口中主图区域的边框 */
  .ol-custom-overviewmap .ol-overviewmap-box {
      border:2px solid red
  }
  /* 鹰眼控件展开时其控件按钮图标的样式 */
  .ol-custom-overviewmap:not(.ol-collapsed) button {
      bottom:auto;
      left: auto;
      right:1px;
      top:1px;
  }
</style>
