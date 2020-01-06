<template>
  <div class="container">
    <div id="mapsurvey" class="mapDiv"></div>

    <div class="toolbarContainer">
      <div class="toolbar">
        <div class="toolButton top" title="切换图例显示" @click="show = !show">
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
        <div :class="layerOn ?'toolButton top selected':'toolButton top '" @click="showLayer"  title="选择图层">
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

    <div class="legendContainer"  v-show="show" id="legendContainer">
      <div class="legendBox">
        <div class="title">农用地</div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0101.png" />水田
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0102.png" />水浇地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0103.png" />旱地
        </div>

        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0201.png" />果园
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0202.png" />茶园
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0203.png" />橡胶园
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0204.png" />其他园地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0301.png" />乔木林地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0302.png" />竹林地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0303.png" />红树林地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0304.png" />森林沼泽
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0305.png" />灌木林地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0306.png" />灌丛沼泽
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0307.png" />其他林地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0401.png" />天然牧草地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0402.png" />沼泽草地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0403.png" />人工牧草地
        </div>

        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1006.png" />农村道路
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1103.png" />水库水面
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1104.png" />坑塘水面
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1107.png" />沟渠
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1202.png" />设施农用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1203.png" />田坎
        </div>
        <div class="title">建设用地</div>

        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0508.png" />物流仓储用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0601.png" />工业用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0602.png" />采矿用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0603.png" />盐田
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0701.png" />城镇住宅用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0702.png" />农村宅基地
        </div>

        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/08H2.png" />科教文卫用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0809.png" />公共设施用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0810.png" />公园与绿地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/09.png" />特殊用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1001.png" />铁路用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1002.png" />轨道交通用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1003.png" />公路用地
        </div>

        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1007.png" />机场用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1008.png" />港口码头用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1009.png" />管道运输用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1109.png" />水工建筑用地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1201.png" />空闲地
        </div>
        <div class="legendItem" style="width:240px">
          <img class="img" src="../assets/dltbstyle/05H1.png" />商业服务业设施用地
        </div>
        <div class="legendItem" style="width:240px">
          <img class="img" src="../assets/dltbstyle/1004.png" />城镇村道路用地
        </div>
        <div class="legendItem" style="width:240px">
          <img class="img" src="../assets/dltbstyle/1005.png" />交通服务场站用地
        </div>
        <div class="legendItem" style="width:240px">
          <img class="img" src="../assets/dltbstyle/08H1.png" />机关团体新闻出版用地
        </div>
        <div class="title">未利用地</div>

        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/0403.png" />其他草地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1101.png" />河流水面
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1102.png" />湖泊水面
        </div>

        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1105.png" />沿海滩涂
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1106.png" />内陆滩涂
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1108.png" />沼泽地
        </div>

        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1204.png" />盐碱地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1205.png" />沙地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1206.png" />裸土地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1207.png" />裸岩石砾地
        </div>
        <div class="legendItem">
          <img class="img" src="../assets/dltbstyle/1110.png" />冰川及永久积雪
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
import LayerList from "./components/LayerList";
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
    var xzqhdm = "469005";
    this.map = BaseMap.BaseInitMap("mapsurvey");
    this.map.addLayer(BaseMap.img_wLayer);

    var wmsLayer = new TileLayer({
      source: new TileWMS({
        url: BaseMap.geoserverURL + "TDLYXZ/wms",
        params: {
          LAYERS: "TDLYXZ:DLTB",
          QUERY_LAYERS: "TDLYXZ:DLTB",
          CQL_FILTER: "QSDWDM LIKE '" + xzqhdm + "%'"
        },
        serverType: "geoserver",
        VERSION: "1.1.1"
      }),
      zIndex: 19
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
    },
    switchPanel() {
      var id = "legendContainer";
      if (
        document.getElementById(id).style.display == "flex" ||
        document.getElementById(id).style.display == ""
      ) {
        document.getElementById(id).style.display = "none";
        document.getElementById("BUTTON").innerHTML = "查看图例";
      } else {
        document.getElementById(id).style.display = "flex";
        document.getElementById("BUTTON").innerHTML = "收起图例";
      }
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
  z-index: 9;
  .legendcontainer {
    //border: rgb(200, 200, 200) 1px solid;
    width: 480px;
    //padding-left: 10px;
    color: rgb(240, 240, 240);
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
  }
  .legendBox {
    border: rgb(200, 200, 200) 1px solid;
    width: 480px;
    padding-left: 10px;
    color: rgb(240, 240, 240);
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    .title {
      font-size: 18px;
      width: 480px;
      height: 30px;
    }
    .legendItem {
      display: flex;
      align-items: center;
      font-size: 15px;
      height: 25px;
      line-height: 25px;
      min-width: 120px;

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