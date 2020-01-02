<template>
  <div>
    <div
      style="width:150px;height:200px;color:white;position:absolute;z-index:150;right:20px;bottom:20px;padding:10px;border:double;font-size:18px"
    >
      <div>土地利用现状分类</div>
      <div>
        <span
          id="0702"
          style="background-color:rgba(0,0,255,0.7);border:1px solid"
        >&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp; 农村宅基地
      </div>
      <div>
        <span
          id="0701"
          style="background-color:rgba(255,20,147,0.7);border:1px solid"
        >&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp; 城镇住宅用地
      </div>
      <div>
        <span
          id="0000"
          style="background-color:rgba(230,230,250,0.7);border:1px solid"
        >&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp; 其他
      </div>
    </div>
    <div id="map" ref="rootmap" style="width:1700px;height:840px;background-color:#00161F"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import GeoJSON from "ol/format/GeoJSON";
import { Tile as TileLayer, Vector as VectorLayer, Vector } from "ol/layer";
import { Stroke, Style, Fill } from "ol/style";
import { XYZ, TileWMS } from "ol/source";
import { Overlay } from "ol";
import VectorSource from "ol/source/Vector";

import BaseMap from "../spatialData/mapBase.js";

export default {
  data() {
    return {
      map: null
    };
  },
  mounted() {
    var xzqhdm = "469005110";
    this.map = BaseMap.BaseInitMap();
    this.map.addLayer(BaseMap.img_wLayer);
    BaseMap.BaseChangeRegionVector(this.map, xzqhdm);
    ChangeDK(this.map, xzqhdm,'0702');

    function ChangeDK(map, xzqhdm,dlbm) {
      var url =
        BaseMap.geoserver +
        "&typeName=TDLYXZ%3ADLTB" +
        "&CQL_FILTER=ZLDWDM LIKE %27" +
        xzqhdm +
        "%25%27"
        //+"and DLBM LIKE %27"+dlbm+"%25%27"
        ;
      var vector = new Vector({
        source: new VectorSource({
          url: url,
          format: new GeoJSON()
        }),
        // style: function(feature, resolution) {
        //   var DLBM = feature.get("DLBM");
        //   var style = new Style({
        //     fill: new Fill({
        //       //矢量图层填充颜色，以及透明度
        //     })
        //     // ,
        //     // stroke: new Stroke({
        //     //   //边界样式
        //     //   color: "rgba(0,0,0, 1)",
        //     //   width: 1
        //     // })
        //   });
        //   var color = "rgba(230,230,250,0.7)";
        //   if (document.getElementById(DLBM) != undefined)
        //     color = document.getElementById(DLBM).style.backgroundColor; //根据行政区划代码获取背景色
        //   style.getFill().setColor(color);
        //   return style;
        // },
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