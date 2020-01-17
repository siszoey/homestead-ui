<template>
  <div class="container">
    <div class="mapPanel" ref="leftPanel">
      <div style="text-align:center">
        <el-switch
          style="height:50px;"
          inactive-text="展开菜单"
          active-text="收起菜单"
          v-model="hiddenToolbar"
          @change="changeToolbar()"
        ></el-switch>
      </div>
      <div ref="mapPanel">
        <el-menu
          default-active="1"
          class="el-menu"
          :unique-opened="true"
          style="height:100%;background-color: lightgrey;"
        >
          <el-submenu index="1">
            <template slot="title">
              <div @click.stop="stop()">
                <el-switch
                  inactive-text="现状调查成果"
                  v-model="XZDCCG.Visible"
                  @change="changeLayer('XZDCCG')"
                ></el-switch>
              </div>
            </template>
            <el-menu-item-group>
              <div class="itembox">
                <div class="listItem">
                  <el-checkbox @change="checkALL('XZDCCG')" v-model="XZDCCG.CheckAll"></el-checkbox>
                  <span class="img" style="visibility: hidden;"></span>
                  全选
                </div>
                <div class="listItem" v-for="box in XZDCCG.Boxs" :key="box.code">
                  <el-checkbox @change="changeFeature('XZDCCG',box.code)" v-model="box.checked"></el-checkbox>
                  <span class="img" :style="box.icon"></span>
                  {{box.name}}
                </div>
              </div>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <div @click.stop="stop()">
                <el-switch
                  inactive-text="村庄用地规划"
                  v-model="CZGH.Visible"
                  @change="changeLayer('CZGH')"
                ></el-switch>
              </div>
            </template>

            <el-menu-item-group>
              <el-scrollbar>
                <div class="itembox">
                  <div class="listItem">
                    <el-checkbox @change="checkALL('CZGH')" v-model="CZGH.CheckAll"></el-checkbox>
                    <span class="img" style="visibility: hidden;"></span>
                    全选
                  </div>
                  <div class="listItem" v-for="box in CZGH.Boxs" :key="box.code">
                    <el-checkbox @change="changeFeature('CZGH',box.code)" v-model="box.checked"></el-checkbox>
                    <img class="img" :src="`${$baseUrl}image/czghstyle/`+box.name+'.png'" />
                    {{box.name}}
                  </div>
                </div>
              </el-scrollbar>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="5">
            <template slot="title">
              <div @click.stop="stop()">
                <el-switch inactive-text="行政区划" v-model="XZQ.Visible" @change="changeLayer('XZQ')"></el-switch>
              </div>
            </template>
          </el-menu-item>
          <el-menu-item index="6">
            <template slot="title">
              <div @click.stop="stop()">
                <el-switch inactive-text="影像底图" v-model="DT.Visible" @change="changeLayer('DT')"></el-switch>
              </div>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div :id="mapid" class="mapDiv"></div>

    <!-- <div class="toolbarContainer">
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
    </div>-->

    <LayerList style="position:absolute;top:180px;right:80px" v-show="layerOn"></LayerList>
  </div>
</template>
<script>
import LayerList from "./components/LayerList_ZJD";
import BaseMap from "../spatialData/mapBase.js";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import GeoJSON from "ol/format/GeoJSON";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import { XYZ, TileWMS, Cluster } from "ol/source";
import { Overlay, Feature } from "ol";
import VectorSource from "ol/source/Vector";
import { getCenter, getBottomLeft } from "ol/extent";
import Point from "ol/geom/Point";

export default {
  name: "ygdc_dbfx",
  props: {
    hiddenToolbar: {
      type: Boolean,
      default: false
    },
    mapid: String
  },
  data() {
    return {
      map: null,
      layerOn: false,
      NFJSFB_Layer: null,
      Region_Layer: null,
      zdLayer: null,
      xzqhdm: "469005115201",
      XZDCCG: {
        Layer: null,
        Visible: true,
        CheckAll: true,
        Features: [],
        Boxs: [
          {
            name: "未批已建",
            code: "01",
            icon: "background-color:#F58D8B",
            checked: true
          },
          {
            name: "已建无人居",
            code: "02",
            icon: "background-color:#FAFF14",
            checked: true
          },
          {
            name: "已批未建",
            code: "03",
            icon: "background-color:#3DB344",
            checked: true
          },
          {
            name: "已建季节性居住",
            code: "04",
            icon: "background-color:#6FE020",
            checked: true
          },
          {
            name: "已批已建",
            code: "05",
            icon: "background-color:#D6FCC7",
            checked: true
          }
        ]
      },
      CZGH: {
        Layer: null,
        Visible: true,
        CheckAll: true,
        Features: [],
        Boxs: [
          {
            name: "乡村建设用地",
            code: "乡村建设用地",
            checked: true
          },
          {
            name: "基本农田",
            code: "基本农田",
            checked: true
          }
        ]
      },
      XZQ: {
        Layer: null,
        Visible: true,
        CheckAll: true,
        Features: [],
        Boxs: []
      },
      DT: {
        Layer: null,
        Visible: true,
        CheckAll: true,
        Features: [],
        Boxs: []
      }
    };
  },
  components: {
    LayerList
  },
  mounted() {
    //是否显示工具栏
    //this.changeToolbar();
    this.map = BaseMap.BaseInitMap(this.mapid);
    //console.log(this.map);
    this.checkALL("XZDCCG");
    this.checkALL("CZGH");
    this.InitLayer("XZDCCG");
    this.InitLayer("CZGH");
    this.InitLayer("XZQ");
    this.InitLayer("DT");
    this.XZQ.Layer.setZIndex(20);
  },

  methods: {
    showLayer() {
      //this.layerOn = !this.layerOn;
    },
    stop() {},
    changeLayer(LayerName) {
      if (this[LayerName].Visible) {
        this.map.addLayer(this[LayerName].Layer);
      } else {
        this.map.removeLayer(this[LayerName].Layer);
      }
    },
    //切换面板显示
    changeToolbar() {
      if (this.hiddenToolbar) {
        this.$refs.mapPanel.style.display = "none";
        this.$refs.leftPanel.style.height = "50px";
        //document.getElementById("mapPanel").style.display = "none";
        //document.getElementById("leftPanel").style.height = "50px";
      } else {
        this.$refs.mapPanel.style.display = "block";
        this.$refs.leftPanel.style.height = "100%";
        //document.getElementById("mapPanel").style.display = "block";
        //document.getElementById("leftPanel").style.height = "100%";
      }
    },
    checkALL(LayerName) {
      var config = this[LayerName];
      config.Features = [];
      for (var i = 0; i < config.Boxs.length; i++) {
        if (config.CheckAll) {
          config.Features.push(config.Boxs[i].code);
        }
        config.Boxs[i].checked = config.CheckAll;
      }
      this.InitLayer(LayerName);
    },
    changeFeature(LayerName, Code) {
      var features = this[LayerName].Features;
      var index = features.indexOf(Code);
      if (index > -1) {
        features.splice(index, 1);
      } else {
        features.push(Code);
      }
      this.InitLayer(LayerName);
    },
    getFeatures(LayerName) {
      var result = " IN (";
      var features = this[LayerName].Features;
      if (features.length == 0) {
        result += "'*'";
      } else {
        for (var i = 0; i < features.length; i++) {
          if (features[i] == "0307") result += "'0307K',";
          if (features[i] == "1104") result += "'1104A',";
          result += "'" + features[i] + "'";
          if (i != features.length - 1) {
            result += ",";
          }
        }
      }

      result += ")";
      return result;
    },
    InitLayer(LayerName) {
      if (!this[LayerName].Visible) {
        return;
      }
      if (LayerName == "XZDCCG") {
        this.XZDCCG.Layer = this.InitXZDCCG();
      } else if (LayerName == "GTKJGH") {
        this.GTKJGH.Layer = this.InitGTKJGH();
      } else if (LayerName == "CZGH") {
        this.CZGH.Layer = this.InitCZGH();
      } else if (LayerName == "NFJSFB") {
        this.NFJSFB.Layer = this.InitNFJSFB();
      } else if (LayerName == "XZQ") {
        this.XZQ.Layer = this.InitXZQ();
      } else if (LayerName == "DT") {
        this.DT.Layer = this.InitDT();
      }
    },
    InitXZDCCG() {
      this.map.removeLayer(this.XZDCCG.Layer);
      var wmsLayer = new TileLayer({
        source: new TileWMS({
          url: BaseMap.geoserverURL + "TDLYXZ/wms",
          params: {
            LAYERS: "TDLYXZ:ZD",
            QUERY_LAYERS: "TDLYXZ:ZD",
            CQL_FILTER: "DCQK" + this.getFeatures("XZDCCG")
          },
          serverType: "geoserver",
          VERSION: "1.1.1"
        }),
        zIndex: 20
      });
      this.map.addLayer(wmsLayer);
      return wmsLayer;
    },
    InitGTKJGH() {
      this.map.removeLayer(this.GTKJGH.Layer);
      var wmsLayer = new TileLayer({
        source: new TileWMS({
          url: BaseMap.geoserverURL + "TDLYXZ/wms",
          params: {
            LAYERS: "TDLYXZ:DLTB",
            QUERY_LAYERS: "TDLYXZ:DLTB",
            CQL_FILTER:
              "QSDWDM LIKE '" +
              this.xzqhdm +
              "%'" +
              " AND DLBM" +
              this.getFeatures("GTKJGH")
          },
          serverType: "geoserver",
          VERSION: "1.1.1"
        }),
        zIndex: 19
      });
      this.map.addLayer(wmsLayer);
      return wmsLayer;
    },
    InitCZGH() {
      this.map.removeLayer(this.CZGH.Layer);
      var wmsLayer = new TileLayer({
        source: new TileWMS({
          url: BaseMap.geoserverURL + "TDLYXZ/wms",
          params: {
            LAYERS: "TDLYXZ:CZGH",
            QUERY_LAYERS: "TDLYXZ:CZGH",
            CQL_FILTER:
              "ZLDWDM LIKE '" +
              this.xzqhdm +
              "%'" +
              " AND DLMC" +
              this.getFeatures("CZGH")
          },
          serverType: "geoserver",
          VERSION: "1.1.1"
        }),
        zIndex: 19
      });
      this.map.addLayer(wmsLayer);
      return wmsLayer;
    },
    InitNFJSFB() {
      this.map.removeLayer(this.NFJSFB.Layer);
      var color = "#3399CC";
      var styleCache = {};
      var clusters = new VectorLayer({
        source: new Cluster({
          distance: 10,
          geometryFunction: function(features) {
            var coord = getCenter(features.getGeometry().getExtent());
            return new Feature(new Point(coord)).getGeometry();
          },
          source: new VectorSource({
            url: BaseMap.geoserver + "&typeName=TDLYXZ:ZD",
            format: new GeoJSON()
          })
        }),
        style: function(feature) {
          var size = feature.get("features").length;
          var style = styleCache[size];
          if (!style) {
            style = new Style({
              image: new CircleStyle({
                radius: 10,
                stroke: new Stroke({
                  color: "#fff"
                }),
                fill: new Fill({
                  color: color
                })
              }),
              text: new Text({
                text: size.toString(),
                fill: new Fill({
                  color: "#fff"
                })
              })
            });
            styleCache[size] = style;
          }
          return style;
        },
        zIndex: 21
      });
      this.map.addLayer(clusters);
      return clusters;
    },
    InitXZQ() {
      var _this = this;
      if (this.XZQ.Layer != null) this.map.removeLayer(this.XZQ.Layer);
      var Region_Layer = BaseMap.BaseCreateRegionVectorFromServer(this.xzqhdm);
      Region_Layer.getSource().on("change", function(evt) {
        var source = evt.target; //图层矢量数据是异步加载的，所以要在事件里做缩放
        if (source.getState() === "ready") {
          _this.map.values_.view.fit(source.getExtent()); //自动缩放
        }
      });
      this.map.addLayer(Region_Layer); //加载图层
      return Region_Layer;
    },
    InitDT() {
      let layer = new TileLayer({
        source: new TileWMS({
          url: BaseMap.geoserverURL + "TDLYXZ/wms",
          params: {
            FORMAT: "image/png",
            VERSION: "1.1.1",
            tiled: true,
            LAYERS: "TDLYXZ:Puqian",
            exceptions: "application/vnd.ogc.se_inimage"
          }
        }),
        name: "东坡村影像底图",
        zindex: 1
      });
      this.map.addLayer(layer);
      return layer;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  position: relative;
  display: flex;
  overflow: hidden;
}
.mapPanel {
  height: 100%;
  padding: 0px;
  padding: 0px;
  margin: 0px;
  width: 13%;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 1;
  opacity: 0.7;
  min-width: 230px;
  overflow: auto;
  background-color: lightgray;
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

.listItem {
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 23px;
  //min-width: 120px;
  width: 100%;
  color: black;
  font-size: 16px;
  padding-left: 10px;
  &:hover {
    background-color: rgb(241, 243, 247);
  }
}

.img {
  width: 16px;
  height: 16px;
  background-size: contain;
  border: solid 1px black;
}

.itembox {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
}
.el-checkbox {
  margin: 3px;
}
</style>
<style scoped>
.el-switch__label {
  min-width: 85px;
}
</style>