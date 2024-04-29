<template>
  <div id="app">
    <div id="map"></div>
  </div>
</template>

<script>
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import { XYZ, TileWMS } from 'ol/source';
import TimeSlider from 'ol-ext/control/TimeSlider';
import { fromLonLat } from 'ol/proj.js';

export default {
  name: 'App',
  data() {
    return {
      map: null,
      wmsLayer: null,
      timeSlider: null,
    };
  },
  mounted() {
    this.initMap();
    this.initWMSLayer();
    this.initTimeSlider();
  },
  methods: {
    initMap() {
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
          })
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2
        })
      });
    },
    initWMSLayer() {
      const wmsSource = new TileWMS({
        url: 'http://localhost:8080/geoserver/wms', // Replace with your GeoServer WMS URL
        params: {
          'LAYERS': 'GeoParks:geoparks', // Replace with your GeoServer layer name
          'TILED': true,
        },
        serverType: 'geoserver',
      });

      this.wmsLayer = new TileLayer({
        source: wmsSource
      });

      this.map.addLayer(this.wmsLayer);
    },
    initTimeSlider() {
      // Assuming you have a function to get the available years from your database
      const availableYears = this.getAvailableYears();

      this.timeSlider = new TimeSlider({
        showTicks: true,
        style: 'line',
        values: availableYears,
        reverse: false,
        start: availableYears[0],
        end: availableYears[availableYears.length - 1],
        padding: [0, 0],
      });

      this.timeSlider.on('time', (evt) => {
        const year = evt.time;
        this.updateWMSLayerTime(year);
      });

      this.map.addControl(this.timeSlider);
    },
    getAvailableYears() {
      // Your logic to fetch available years from your database
      // For example, you can make an HTTP request to your backend API
      // and retrieve the years from the response
      return [2010, 2011, 2012, 2013, 2014]; // Dummy data for demonstration
    },
    updateWMSLayerTime(year) {
      const wmsParams = this.wmsLayer.getSource().getParams();
      wmsParams['TIME'] = year;
      this.wmsLayer.getSource().updateParams(wmsParams);
    }
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 100vh;
}
</style>
