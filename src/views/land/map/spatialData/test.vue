<template>
  <div>
    <div
      style="width:150px;height:200px;color:white;position:absolute;z-index:150;right:20px;bottom:20px;padding:10px;border:double;font-size:18px"
    >
      <div>土地利用现状分类</div>
      <div>
        <span id="0702" style="background-color:#FF0000;border:1px solid">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp; 农村宅基地
      </div>
      <div>
        <span
          id="0701"
          style="background-color:rgba(255,20,147,0.7);border:1px solid"
        >&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp; 城镇住宅用地
      </div>
      <div>
        <span id="0000" style="background-color:#CDCDB4;border:1px solid">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp; 其他
      </div>
    </div>
    <div id="maptest" style="width:1700px;height:840px;background-color:#00161F"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import MVT from "ol/format/MVT";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import { Fill, Icon, Stroke, Style, Text } from "ol/style";

import BaseMap from "../spatialData/mapBase.js";
import { TileWMS, Cluster } from "ol/source";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import CircleStyle from "ol/style/Circle";
import { getCenter } from "ol/extent";
import TileLayer from 'ol/layer/Tile';

export default {
  data() {
    return {
      map: null
    };
  },
  mounted() {
    var currentRegionLayer;
    var xzqhdm = "469005110";
    this.map = BaseMap.BaseInitMap("maptest");
    this.map.addLayer(BaseMap.img_wLayer);
    currentRegionLayer=BaseMap.BaseAddPoints(this.map, xzqhdm,currentRegionLayer);
    ChangeDK(this.map, xzqhdm, "0702");

    function ChangeDK(map, xzqhdm, dlbm) {
    var wmsLayer = new TileLayer({
      source: new TileWMS({
          url: BaseMap.geoserverURL + "TDLYXZ/wms",
          params: {
            layers: "TDLYXZ:DLTB",
            QUERY_LAYERS: "TDLYXZ:DLTB",
            CQL_FILTER: "QSDWDM LIKE '" + xzqhdm + "%'"
          },
          serverType: "geoserver"
        }),
        zindex: 4
      });
      map.addLayer(vector);
    }
  }
};
</script>

<style>
#map {
  height: 100%;
}
/*隐藏ol的一些自带元素*/
.ol-attribution,
.ol-zoom {
  display: none;
}
</style>