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
import geoparks from "@/assets/geoparks.geojson"
import Map from 'ol/Map'
import Overlay from 'ol/Overlay'
import View from 'ol/View'
import GeoJSON from "ol/format/GeoJSON"
import { Heatmap as HeatmapLayer } from 'ol/layer.js'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { transform } from 'ol/proj'
import { Vector } from 'ol/source'
import VectorSource from 'ol/source/Vector.js'
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import RegularShape from 'ol/style/RegularShape.js'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import Text from 'ol/style/Text'
import mapSources from './modules/maplist'

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
      geoqcs: mapSources.geoqcs,
      geoqns: mapSources.geoqns,
      geoqhs: mapSources.geoqhs,
      geoqlh: mapSources.geoqlh,
			proj: 'EPSG:4326', //定义wgs84地图坐标系
			proj_m: 'EPSG:3857', //定义墨卡托地图坐标系
      layers: {}, // 用于存储图层的对象
			map: null,
			mapLayer: null,
			mapLayerlabel: null,
      geojson: geoparks,
      overlay:null,//弹窗
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
          zoom: 5
        })
      })
      //初始化地图图层
      this.mapLayer = new TileLayer({
        source: this.tdtdz,
      })
      //初始化标签图层
      this.mapLayerlabel = new TileLayer({
        source: this.tdtlabelwx,
        // projection: this.proj
      })
   
      //将图层加载到地图对象
      this.mapLayer = new TileLayer({
            source: this.geoqcs,
            projection: this.proj
          })
          this.map.addLayer(this.mapLayer)
      // this.map.addLayer(this.mapLayerlabel)
      // this.loadjson()
     
     

      //实例化一个自定义样式的鹰眼空间并加入地图中
      // this.map.addControl(
      //   new OverviewMap({
      //       //鹰眼控件样式 overviewmap-custom
      //       className:'ol-overviewmap ol-custom-overviewmap',
      //       //鹰眼中加载同坐标系下不同数据源的图层
      //       layers:[this.mapLayer],                               //要获取当前图层
      //       //鹰眼控件展开时功能按钮上的标识(网页的JS字符编码)
      //       collapseLabel:'\u00BB',
      //       //鹰眼控件折叠时功能按钮上的标识(网页的JS字符编码)
      //       label:'\u00AB',
      //       //功能按钮的初始显示方式设置为展开
      //       collapsed:false
      //   }))
    },
    /******************加载GeoJSON图层***************/
    loadjson:function(checked=true){
      if(checked){

      //初始化json图层
      let features = (new GeoJSON()).readFeatures(this.geojson);
          for (let i = 0; i < features.length; i++) {
            let _geom = features[i].getGeometry();
            _geom.transform("EPSG:4326", "EPSG:3857");
          }
          let vectorSource = new Vector({
            features: features
          });
          let vector = new VectorLayer({
            source: vectorSource,
            style: this.styleFunction,
            renderMode: "vector"
          });
          this.addLayer(vector,'POI')
        
        }
          
          else{
            this.removeLayerByName('POI')
          }
             // 添加地图点击事件监听器
      // this.map.on('click', this.showOverlayOnClick);
      
      this.map.on('click', (evt) => {
    if (this.map.hasFeatureAtPixel(evt.pixel)) {
        this.map.getTargetElement().style.cursor = "pointer";
        this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
            // console.log(feature);
            let name = feature.get("name");
            let province=feature.get("province")
            console.log(name);
            this.showOverlayOnClick(name,province, evt);
        });
    } else {
        this.map.getTargetElement().style.cursor = "default";
    }
});

    
    },
		/******************地图切换方法***************/
		changeBaseMap: function(value) {
      console.log(value)
      this.map.removeLayer(this.mapLayer)
      this.map.removeLayer(this.mapLayerlabel)
			switch (value) {
        case 'tdtdz':
          this.mapLayer = new TileLayer({
            source: this.tdtdz,
            projection: this.proj
          })
          this.mapLayerlabel = new TileLayer({
            source: this.tdtlabeldz,
            projection: this.proj
          })
          this.map.addLayer(this.mapLayer)
          this.map.addLayer(this.mapLayerlabel)
          break;
        case 'tdtwx':
          this.mapLayer = new TileLayer({
            source: this.tdtwx,
            projection: this.proj
          })
          this.mapLayerlabel = new TileLayer({
            source: this.tdtlabelwx,
            projection: this.proj
          })
          this.map.addLayer(this.mapLayer)
          this.map.addLayer(this.mapLayerlabel)
          break;
        case 'gaodedz':
          this.mapLayer = new TileLayer({
            source: this.gaodedz,
            projection: this.proj
          })
          this.map.addLayer(this.mapLayer)
          break;
        case 'gaodewx':
          this.mapLayer = new TileLayer({
            source: this.gaodewx,
            projection: this.proj
          })
          this.mapLayerlabel = new TileLayer({
            source: this.gaodelabelwx,
            projection: this.proj
          })
          this.map.addLayer(this.mapLayer)
          this.map.addLayer(this.mapLayerlabel)
          break;
        case 'geoqcs':
          this.mapLayer = new TileLayer({
            source: this.geoqcs,
            projection: this.proj
          })
          this.map.addLayer(this.mapLayer)
          break;
        case 'geoqns':
          this.mapLayer = new TileLayer({
            source: this.geoqns,
            projection: this.proj
          })
          this.map.addLayer(this.mapLayer)
          break;
        case 'geoqhs':
          this.mapLayer = new TileLayer({
            source: this.geoqhs,
            projection: this.proj
          })
          this.map.addLayer(this.mapLayer)
          break;
        case 'geoqlh':
          this.mapLayer = new TileLayer({
            source: this.geoqlh,
            projection: this.proj
          })
          this.map.addLayer(this.mapLayer)
          break;
			}
      this.loadjson()

		},
    /******************改变JSON样式***************/ 
    styleFunction(feature) {
      let stroke = new Stroke({
        color: 'black',
        width: 2
      });
      let fill = new Fill({
        color: 'red'
      });
      let _name = feature.get("name");
      // _name = this.map.getView().getZoom() > 5 ? _name : "";
      _name = _name;
      let _radius = 8,
        _radius2 = 8;
      if (_name === "北京") {
        _radius = 12;
        _radius2 = 6;
      }
      let styles = [];
      styles.push(new Style({
        stroke: stroke,
        fill: fill,
        image: new RegularShape({
          fill: fill,
          stroke: stroke,
          points: 5,
          radius: _radius,
          radius2: _radius2,
          angle: 0
        }),
        text: new Text({
          text: _name,
          textAlign: "left",
          offsetX: 12,
          font: "bold 11px sans-serif",
          fill: new Fill({
            color: 'red'
          }),
          stroke: new Stroke({
            color: 'white',
            width: 2
          })
        })
      }));
      styles.push(new Style({
        geometry: feature.getGeometry(),
        image: new Circle({
          radius: 4,
          fill: new Fill({
            color: "white"
          })
        })
      }));

      return styles;
    },
    /******************添加图层并存储到 layers 对象中***************/ 
    addLayer(layer, name) {
      this.map.addLayer(layer);
      this.layers[name] = layer;
      // console.log("添加了图层")
    },
    /******************通过名称移除图层***************/ 
    removeLayerByName(name) {
     
      const layer = this.layers[name];
      if (layer) {
        this.map.removeLayer(layer);
        delete this.layers[name];
        // console.log("移除了图层")
      }
  },
  /******************创建一个热力图层***************/ 
  HeatMap (checked) {
    if(checked){
     let vector = new HeatmapLayer({
     // 矢量数据源
       source: new VectorSource({
         features: (new GeoJSON()).readFeatures(this.geojson, {
         dataProjection: 'EPSG:4326',
         featureProjection: 'EPSG:3857'
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
  /******************鼠标点击geojson的响应函数***************/ 
   showOverlayOnClick(name,province,event) {
    // 首先销毁之前的 overlay
    if (this.overlay) {
        this.map.removeOverlay(this.overlay);
        this.overlay = null;
    }

    console.log("进入了showOverlayOnClick")
  // 获取点击坐标
  const coordinates = event.coordinate;
console.log(coordinates)
  // 创建 overlay 元素
  const overlayElement = document.createElement('div');
  overlayElement.className = 'custom-overlay';
  overlayElement.innerHTML = `<div class="overlay-content">${name}</div><br><p>${province}</p>`;
  overlayElement.style.background = 'white';
  overlayElement.style.padding = '10px';
  overlayElement.style.border = '1px solid black';

  // 创建 overlay
  this.overlay = new Overlay({
    element: overlayElement,
    positioning: 'bottom-center',
    offset: [0, -20], // 偏移量，用于调整 overlay 的位置
  });

  // 将 overlay 添加到地图上，并设置其位置为点击的坐标
  this.map.addOverlay(this.overlay);
  this.overlay.setPosition(coordinates);
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
