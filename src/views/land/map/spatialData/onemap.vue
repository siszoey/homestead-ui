<template>
  <div class="container">
    <div class="mapPanel">
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
        <el-submenu index="2">
          <template slot="title">
            <div @click.stop="stop()">
              <el-switch
                inactive-text="土地利用规划"
                v-model="GTKJGH.Visible"
                @change="changeLayer('GTKJGH')"
              ></el-switch>
            </div>
          </template>

          <el-menu-item-group>
            <div class="itembox">
              <div class="listItem">
                <el-checkbox @change="checkALL('GTKJGH')" v-model="GTKJGH.CheckAll"></el-checkbox>
                <span class="img" style="visibility: hidden;"></span>
                全选
              </div>
              <div class="listItem" v-for="box in GTKJGH.Boxs" :key="box.code">
                <el-checkbox @change="changeFeature('GTKJGH',box.code)" v-model="box.checked"></el-checkbox>
                <img class="img" :src="`${$baseUrl}image/dltbstyle/`+box.code+'.png'" />
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
        <el-menu-item index="4">
          <template slot="title">
            <div @click.stop="stop()">
              <el-switch
                inactive-text="农房建设分布"
                v-model="NFJSFB.Visible"
                @change="changeLayer('NFJSFB')"
              ></el-switch>
            </div>
          </template>
        </el-menu-item>
        <el-menu-item index="5">
          <template slot="title">
            <div @click.stop="stop()">
              <el-switch inactive-text="行政区" v-model="XZQ.Visible" @change="changeLayer('XZQ')"></el-switch>
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
    <div id="maponemap" class="mapDiv"></div>

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
          <img src="../assets/fpdb.png" />
        </div>
        <div class="toolButton bottom">
          <img src="../assets/zbdw.png" />
        </div>
      </div>
    </div>

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
  name: "survey",
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
      GTKJGH: {
        Layer: null,
        Visible: true,
        CheckAll: true,
        Features: [],
        Boxs: [
          {
            name: "水田",
            code: "0101",
            checked: true
          },
          {
            name: "水浇地",
            code: "0102",
            checked: true
          },
          {
            name: "旱地",
            code: "0103",
            checked: true
          },
          {
            name: "果园 ",
            code: "0201",
            checked: true
          },
          {
            name: "茶园",
            code: "0202",
            checked: true
          },
          {
            name: "橡胶园",
            code: "0203",
            checked: true
          },
          {
            name: "其他园地",
            code: "0204",
            checked: true
          },
          {
            name: "乔木林地",
            code: "0301",
            checked: true
          },
          {
            name: "竹林地",
            code: "0302",
            checked: true
          },
          {
            name: "红树林地",
            code: "0303",
            checked: true
          },
          {
            name: "森林沼泽",
            code: "0304",
            checked: true
          },
          {
            name: "灌木林地",
            code: "0305",
            checked: true
          },
          {
            name: "灌丛沼泽",
            code: "0306",
            checked: true
          },
          {
            name: "其他林地",
            code: "0307",
            checked: true
          },
          {
            name: "天然牧草地",
            code: "0401",
            checked: true
          },
          {
            name: "沼泽草地",
            code: "0402",
            checked: true
          },
          {
            name: "人工牧草地",
            code: "0403",
            checked: true
          },
          {
            name: "农村道路",
            code: "1006",
            checked: true
          },
          {
            name: "水库水面",
            code: "1103",
            checked: true
          },
          {
            name: "坑塘水面",
            code: "1104",
            checked: true
          },
          {
            name: "沟渠",
            code: "1107",
            checked: true
          },
          {
            name: "设施农用地",
            code: "1202",
            checked: true
          },
          {
            name: "田坎",
            code: "1203",
            checked: true
          },

          {
            name: "商业服务业设施用地",
            code: "05H1",
            checked: true
          },
          {
            name: "物流仓储用地",
            code: "0508",
            checked: true
          },
          {
            name: "工业用地",
            code: "0601",
            checked: true
          },
          {
            name: "采矿用地",
            code: "0602",
            checked: true
          },
          {
            name: "盐田",
            code: "0603",
            checked: true
          },
          {
            name: "城镇住宅用地",
            code: "0701",
            checked: true
          },
          {
            name: "农村宅基地",
            code: "0702",
            checked: true
          },
          {
            name: "机关团体新闻出版用地",
            code: "08H1",
            checked: true
          },
          {
            name: "科教文卫用地",
            code: "08H2",
            checked: true
          },
          {
            name: "公用设施用地",
            code: "0809",
            checked: true
          },
          {
            name: "公园与绿地",
            code: "0810",
            checked: true
          },
          {
            name: "特殊用地",
            code: "09",
            checked: true
          },
          {
            name: "铁路用地",
            code: "1001",
            checked: true
          },
          {
            name: "轨道交通用地",
            code: "1002",
            checked: true
          },
          {
            name: "公路用地",
            code: "1003",
            checked: true
          },
          {
            name: "城镇村道路用地",
            code: "1004",
            checked: true
          },
          {
            name: "交通服务场站用地",
            code: "1005",
            checked: true
          },
          {
            name: "机场用地",
            code: "1007",
            checked: true
          },
          {
            name: "港口码头用地",
            code: "1008",
            checked: true
          },
          {
            name: "管道运输用地",
            code: "1009",
            checked: true
          },
          {
            name: "水工建筑用地",
            code: "1109",
            checked: true
          },
          {
            name: "空闲地",
            code: "1201",
            checked: true
          },

          {
            name: "其他草地",
            code: "0404",
            checked: true
          },
          {
            name: "河流水面",
            code: "1101",
            checked: true
          },
          {
            name: "湖泊水面",
            code: "1102",
            checked: true
          },
          {
            name: "沿海滩涂",
            code: "1105",
            checked: true
          },
          {
            name: "内陆滩涂",
            code: "1106",
            checked: true
          },
          {
            name: "沼泽地",
            code: "1108",
            checked: true
          },
          {
            name: "冰川及永久积雪",
            code: "1110",
            checked: true
          },
          {
            name: "盐碱地",
            code: "1204",
            checked: true
          },
          {
            name: "沙地",
            code: "1205",
            checked: true
          },
          {
            name: "裸土地",
            code: "1206",
            checked: true
          },
          {
            name: "裸岩石砾地",
            code: "1207",
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
            name: "一般耕地",
            code: "一般耕地",
            checked: true
          },
          {
            name: "乡村建设用地",
            code: "乡村建设用地",
            checked: true
          },
          {
            name: "保护林地",
            code: "保护林地",
            checked: true
          },
          {
            name: "公路用地",
            code: "公路用地",
            checked: true
          },

          {
            name: "其他农用地",
            code: "其他农用地",
            checked: true
          },
          {
            name: "其他独立建设用地",
            code: "其他独立建设用地",
            checked: true
          },
          {
            name: "其他设施用地",
            code: "其他设施用地",
            checked: true
          },
          {
            name: "后备林地",
            code: "后备林地",
            checked: true
          },
          {
            name: "园地",
            code: "园地",
            checked: true
          },
          {
            name: "基本农田",
            code: "基本农田",
            checked: true
          },
          {
            name: "旅游建设用地",
            code: "旅游建设用地",
            checked: true
          },
          {
            name: "水工建筑用地",
            code: "水工建筑用地",
            checked: true
          },
          {
            name: "自然保留地",
            code: "自然保留地",
            checked: true
          },
          {
            name: "滩涂",
            code: "滩涂",
            checked: true
          },
          {
            name: "水库水面",
            code: "水库水面",
            checked: true
          },
          {
            name: "河流湖泊水面",
            code: "未计入水库水面的河流湖泊水面",
            checked: true
          }
        ]
      },
      NFJSFB: {
        Layer: null,
        Visible: true,
        CheckAll: true,
        Features: [],
        Boxs: []
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
    this.map = BaseMap.BaseInitMap("maponemap");

    this.InitLayer("XZDCCG");
    this.InitLayer("GTKJGH");
    this.InitLayer("CZGH");
    this.InitLayer("NFJSFB");
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
    checkALL(LayerName) {
      var config = this[LayerName];
      config.Features = [];
      for (var i = 0; i < config.Boxs.length; i++) {
        if (!config.CheckAll) {
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
      var result = " NOT IN (";
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
      var Region_Layer = BaseMap.BaseChangeRegionVector(this.map, this.xzqhdm);
      return Region_Layer;
    },
    InitDT() {
      this.map.addLayer(BaseMap.img_wLayer);
      return BaseMap.img_wLayer;
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
<style>
.el-switch__label {
  min-width: 85px !important;
}
</style>