<template>
  <div class="container">
    <div id="mapyear" class="mapDiv"></div>

    <div class="toolbarContainer">
      <div class="toolbar">
        <div class="toolButton top">
          <img :src="`${$baseUrl}image/mapicon/sldt.png`" />
        </div>
        <div class="toolButton bottom highlight">
          <img :src="`${$baseUrl}image/mapicon/yxdt.png`" />
        </div>
      </div>
      <div class="toolbar" style="margin-top:10px">
        <div class="toolButton top">
          <img :src="`${$baseUrl}image/mapicon/sjjc.png`" />
        </div>
        <div class="toolButton bottom">
          <img :src="`${$baseUrl}image/mapicon/cggx.png`" />
        </div>
      </div>
      <div class="toolbar" style="margin-top:10px">
        <div :class="layerOn ?'toolButton top selected':'toolButton top '" @click="showLayer">
          <img :src="`${$baseUrl}image/mapicon/tcgl.png`" />
        </div>
        <div class="toolButton">
          <img :src="`${$baseUrl}image/mapicon/sqgl.png`" />
        </div>
        <div class="toolButton">
          <img :src="`${$baseUrl}image/mapicon/fpdb.png`" />
        </div>
        <div class="toolButton bottom">
          <img :src="`${$baseUrl}image/mapicon/zbdw.png`" />
        </div>
      </div>
    </div>

    <!-- <div class="legendContainer"  v-show="show">
      <div class="legendBox">
        <div class="title">图例</div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/保护林地.png" />保护林地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/公路用地.png" />公路用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/后备林地.png" />后备林地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/基本农田.png" />基本农田
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/旅游建设用地.png" />旅游建设用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/其他独立建设用地.png" />其他建设用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/其他农用地.png" />其他农用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/其他设施用地.png" />其他设施用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/水工建筑用地.png" />水工建筑用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/水库水面.png" />水库水面
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/滩涂.png" />滩涂
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/未计入水库水面的河流湖泊水面.png" />河流湖泊水面
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/乡村建设用地.png" />乡村建设用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/一般耕地.png" />一般耕地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/园地.png" />园地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/czghstyle/自然保留地.png" />自然保留地
        </div>
      </div>
    </div> -->

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
import LayerList from "./components/LayerList_CZGH";
import BaseMap from "../spatialData/mapBase.js";
import TileLayer from "ol/layer/Tile";
import { TileWMS } from "ol/source";
export default {
  name: "survey",
  data() {
    return {
      map: null,
      layerOn: false,
      show:true
    };
  },
  components: {
    LayerList
  },
  mounted() {
    var currentRegionLayer;
    var xzqhdm = "469005115201";
    this.map = BaseMap.BaseInitMap("mapyear");
    this.map.addLayer(BaseMap.img_wLayer);
    
    var wmsLayer = new TileLayer({
      source: new TileWMS({
        url: BaseMap.geoserverURL + "TDLYXZ/wms",
        params: {
          LAYERS: "TDLYXZ:CZGH"
          //,
          //QUERY_LAYERS: "TDLYXZ:DLTB",
          //CQL_FILTER: "QSDWDM LIKE '" + xzqhdm + "%'"
        },
        serverType: "geoserver",
        VERSION: "1.1.1"
      })
    });

    this.map.addLayer(wmsLayer);
    currentRegionLayer = BaseMap.BaseChangeRegionVector(
      this.map,
      xzqhdm,
      currentRegionLayer
    );
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
    width: 360px;
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
      width: 360px;
      height: 30px;
    }
    .legendItem {
      display: flex;
      align-items: center;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      min-width: 120px;
      .img {
        background-color: yellow;
        margin-right: 5px;
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>