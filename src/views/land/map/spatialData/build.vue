<template>
  <div class="container">
    <div id="mapbuild" class="mapDiv"></div>

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

    <LayerList style="position:absolute;top:180px;right:80px" v-show="layerOn"></LayerList>
<timeline></timeline>

  </div>
</template>
<script>
import LayerList from "./components/LayerList";
import timeline from "./components/timeline";
import BaseMap from "../spatialData/mapBase.js";
export default {
  name: "survey",
  data() {
    return {
      map: null,
      layerOn: false
    };
  },
  components: {
    LayerList,
    timeline
  },
  mounted() {
    var currentRegionLayer;
    var xzqhdm = "469005115201";
    this.map = BaseMap.BaseInitMap("mapbuild");
    this.map.addLayer(BaseMap.img_wLayer);

    currentRegionLayer = BaseMap.BaseChangeRegionVector(
      this.map,
      xzqhdm,
      currentRegionLayer
    );
    BaseMap.BaseAddTruePoints(this.map, "#E58C2A");
  },
  methods: {
    showLayer() {
      //this.layerOn = !this.layerOn;
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
    width: 200px;
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
      width: 200px;
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