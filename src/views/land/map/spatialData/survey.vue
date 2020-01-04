<template>
  <div class="container">
    <div id="mapbuild" class="mapDiv"></div>

    <div class="toolbarContainer">
      <div class="toolbar">
        <div class="toolButton top">
          <img src="../assets/sldt.png" />
        </div>
        <div class="toolButton bottom highlight">
          <img src="../assets/yxdt.png" />
        </div>
      </div>
      <div class="toolbar" style="margin-top:10px">
        <div class="toolButton top">
          <img src="../assets/sjjc.png" />
        </div>
        <div class="toolButton bottom">
          <img src="../assets/cggx.png" />
        </div>
      </div>
      <div class="toolbar" style="margin-top:10px">
        <div :class="layerOn ?'toolButton top selected':'toolButton top '" @click="showLayer">
          <img src="../assets/tcgl.png" />
        </div>
        <div class="toolButton">
          <img src="../assets/sqgl.png" />
        </div>
        <div class="toolButton">
          <img src="../assets/cad.png" />
        </div>
        <div class="toolButton">
          <img src="../assets/fpdb.png" />
        </div>
        <div class="toolButton bottom">
          <img src="../assets/zbdw.png" />
        </div>
      </div>
    </div>

    <div class="legendContainer">
      <div class="legendBox">
        <div class="title">图例</div>
        <div class="legendItem">
          <span class="img" style="background-color:#F58D8B"></span>未批已建
        </div>
        <div class="legendItem">
          <span class="img" style="background-color:#FAFF14"></span>已建无人居
        </div>
        <div class="legendItem">
          <span class="img" style="background-color:#3DB344"></span>已批未建
        </div>
        <div class="legendItem">
          <span class="img" style="background-color:#6FE020"></span>已建季节性居住
        </div>
        <div class="legendItem">
          <span class="img" style="background-color:#D6FCC7"></span>已批已建
        </div>
      </div>
    </div>

    <LayerList style="position:absolute;top:180px;right:80px" v-show="layerOn"></LayerList>
  </div>
</template>
<script>
import "ol/ol.css";
import { createTdtImgLayer } from "./ol.tdt";
import { Map, View } from "ol";
import { defaults } from "ol/control";
import ImageLayer from "ol/layer/Image";
import ImageWMS from "ol/source/ImageWMS";
import LayerList from "./components/LayerList_ZJD";
import BaseMap from "../spatialData/mapBase.js";
import TileLayer from "ol/layer/Tile";
import { TileWMS } from "ol/source";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
export default {
  name: "survey",
  data() {
    return {
      map: null,
      layerOn: false
    };
  },
  components: {
    LayerList
  },
  mounted() {
    var currentRegionLayer;
    var xzqhdm = "469005115201";
    this.map = BaseMap.BaseInitMap("mapbuild");
    this.map.addLayer(BaseMap.img_wLayer);

    var wmsLayer = new TileLayer({
      source: new TileWMS({
        url: BaseMap.geoserverURL + "TDLYXZ/wms",
        params: {
          LAYERS: "TDLYXZ:ZD"
          //,
          //QUERY_LAYERS: "TDLYXZ:DLTB",
          //CQL_FILTER: "QSDWDM LIKE '" + xzqhdm + "%'"
        },
        serverType: "geoserver",
        VERSION: "1.1.1"
      })
    });
    this.map.addLayer(wmsLayer);
    BaseMap.AddZD(this.map);
    currentRegionLayer = BaseMap.BaseChangeRegionVector(this.map, xzqhdm);
    currentRegionLayer.setZIndex(20);
  },
  methods: {
    showLayer() {
      this.layerOn = !this.layerOn;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 98%;
  height: 96%;
  padding: 0px;
  margin: 0px;
  position: relative;
}
.mapDiv {
  height: 100%;
  padding: 0px;
  padding: 0px;
  margin: 0px;
  width: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
}
.toolbarContainer {
  right: 30px;
  top: 10px;
  position: absolute;
}
.toolbar {
  width: 40px;
  z-index: 10;
  box-shadow: 0px 0px 1px gray;
  border-radius: 5px;
  .toolButton {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    background-color: gray;

    &:hover {
      opacity: 1;
      background-color: white;
    }
    img {
      width: 24px;
      height: 24px;
      background-size: contain;
    }
  }
  .highlight {
    opacity: 1;
    background-color: rgba(128, 128, 128, 0.5);
  }
  .selected {
    opacity: 1;
    background-color: white;
  }
  .top {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .bottom {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
.legendContainer {
  right: 25px;
  //right: 0px;
  position: absolute;
  bottom: 10px;
  .legendBox {
    border: rgb(200, 200, 200) 1px solid;
    width: 170px;
    padding-left: 10px;
    color: rgb(240, 240, 240);
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    .title {
      font-size: 20px;
      width: 170px;
      height: 30px;
    }
    .legendItem {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 30px;
      line-height: 30px;
      //width: 100px;
      .img {
        background-color: yellow;
        margin-right: 5px;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>