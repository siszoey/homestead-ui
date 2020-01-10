<template>
  <div class="container">
    <div class="mapPanel">
      <el-menu
        default-active="1"
        class="el-menu"
        unique-opened="true"
        style="height:100%;background-color: gray;"
      >
        <el-submenu index="1">
          <template slot="title">
            <div @click.stop="stop()">
              <el-switch
                inactive-text="现状调查成果"
                v-model="XZDCCG_Visible"
                @change="changeLayer('XZDCCG_Layer',XZDCCG_Visible)"
              ></el-switch>
            </div>
          </template>

          <el-menu-item-group>
            <div class="itembox" id="XZDCCG_Features">
              <div class="listItem">
                <input type="checkbox" checked @change="changeFeature('XZDCCG','01')" />
                <span class="img" style="background-color:#F58D8B"></span>
                未批已建
              </div>
              <div class="listItem">
                <input type="checkbox" checked @change="changeFeature('XZDCCG','02')" />
                <span class="img" style="background-color:#FAFF14"></span>
                已建无人居
              </div>
              <div class="listItem">
                <input type="checkbox" checked @change="changeFeature('XZDCCG','03')" />
                <span class="img" style="background-color:#3DB344"></span>
                已批未建
              </div>
              <div class="listItem">
                <input type="checkbox" checked @change="changeFeature('XZDCCG','05')" />
                <span class="img" style="background-color:#D6FCC7"></span>
                已批已建
              </div>
              <div class="listItem">
                <input type="checkbox" checked @change="changeFeature('XZDCCG','04')" />
                <span class="img" style="background-color:#6FE020"></span>
                已建季节性居住
              </div>
            </div>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <div @click.stop="stop()">
              <el-switch
                inactive-text="国土空间规划"
                v-model="GTKJGH_Visible"
                @change="changeLayer('GTKJGH_Layer',GTKJGH_Visible)"
              ></el-switch>
            </div>
          </template>

          <el-menu-item-group>
            <el-submenu index="2-1">
              <template slot="title">农用地</template>
              <div class="itembox">
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0101')" />
                  <img class="img" src="../assets/dltbstyle/0101.png" />水田
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0102')" />
                  <img class="img" src="../assets/dltbstyle/0102.png" />水浇地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0103')" />
                  <img class="img" src="../assets/dltbstyle/0103.png" />旱地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0201')" />
                  <img class="img" src="../assets/dltbstyle/0201.png" />果园
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0202')" />
                  <img class="img" src="../assets/dltbstyle/0202.png" />茶园
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0203')" />
                  <img class="img" src="../assets/dltbstyle/0203.png" />橡胶园
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0204')" />
                  <img class="img" src="../assets/dltbstyle/0204.png" />其他园地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0301')" />
                  <img class="img" src="../assets/dltbstyle/0301.png" />乔木林地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0302')" />
                  <img class="img" src="../assets/dltbstyle/0302.png" />竹林地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0303')" />
                  <img class="img" src="../assets/dltbstyle/0303.png" />红树林地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0304')" />
                  <img class="img" src="../assets/dltbstyle/0304.png" />森林沼泽
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0305')" />
                  <img class="img" src="../assets/dltbstyle/0305.png" />灌木林地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0306')" />
                  <img class="img" src="../assets/dltbstyle/0306.png" />灌丛沼泽
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0307')" />
                  <img class="img" src="../assets/dltbstyle/0307.png" />其他林地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0401')" />
                  <img class="img" src="../assets/dltbstyle/0401.png" />天然牧草地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0303')" />
                  <img class="img" src="../assets/dltbstyle/0303.png" />红树林地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0402')" />
                  <img class="img" src="../assets/dltbstyle/0402.png" />沼泽草地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0403')" />
                  <img class="img" src="../assets/dltbstyle/0403.png" />人工牧草地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1006')" />
                  <img class="img" src="../assets/dltbstyle/1006.png" />农村道路
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1103')" />
                  <img class="img" src="../assets/dltbstyle/1103.png" />水库水面
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1104')" />
                  <img class="img" src="../assets/dltbstyle/1104.png" />坑塘水面
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1107')" />
                  <img class="img" src="../assets/dltbstyle/1107.png" />沟渠
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1202')" />
                  <img class="img" src="../assets/dltbstyle/1202.png" />设施农用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1203')" />
                  <img class="img" src="../assets/dltbstyle/1203.png" />田坎
                </div>
              </div>
            </el-submenu>

            <el-submenu index="2-2">
              <template slot="title">建设用地</template>
              <div class="itembox">
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0508')" />
                  <img class="img" src="../assets/dltbstyle/0508.png" />物流仓储用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0601')" />
                  <img class="img" src="../assets/dltbstyle/0601.png" />工业用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0602')" />
                  <img class="img" src="../assets/dltbstyle/0602.png" />采矿用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0603')" />
                  <img class="img" src="../assets/dltbstyle/0603.png" />盐田
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0701')" />
                  <img class="img" src="../assets/dltbstyle/0701.png" />城镇住宅用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0702')" />
                  <img class="img" src="../assets/dltbstyle/0702.png" />农村宅基地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','08H2')" />
                  <img class="img" src="../assets/dltbstyle/08H2.png" />科教文卫用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0809')" />
                  <img class="img" src="../assets/dltbstyle/0809.png" />公共设施用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0810')" />
                  <img class="img" src="../assets/dltbstyle/0810.png" />公园与绿地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','09')" />
                  <img class="img" src="../assets/dltbstyle/09.png" />特殊用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1001')" />
                  <img class="img" src="../assets/dltbstyle/1001.png" />铁路用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1002')" />
                  <img class="img" src="../assets/dltbstyle/1002.png" />轨道交通用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1003')" />
                  <img class="img" src="../assets/dltbstyle/1003.png" />公路用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1007')" />
                  <img class="img" src="../assets/dltbstyle/1007.png" />机场用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1008')" />
                  <img class="img" src="../assets/dltbstyle/1008.png" />港口码头用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1009')" />
                  <img class="img" src="../assets/dltbstyle/1009.png" />管道运输用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1109')" />
                  <img class="img" src="../assets/dltbstyle/1109.png" />水工建筑用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1201')" />
                  <img class="img" src="../assets/dltbstyle/1201.png" />空闲地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','05H1')" />
                  <img class="img" src="../assets/dltbstyle/05H1.png" />商业服务业设施用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1004')" />
                  <img class="img" src="../assets/dltbstyle/1004.png" />城镇村道路用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1005')" />
                  <img class="img" src="../assets/dltbstyle/1005.png" />交通服务场站用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','08H1')" />
                  <img class="img" src="../assets/dltbstyle/08H1.png" />机关团体新闻出版用地
                </div>
              </div>
            </el-submenu>
            <el-submenu index="2-3">
              <template slot="title">未利用地</template>
              <div class="itembox">
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','0403')" />
                  <img class="img" src="../assets/dltbstyle/0403.png" />其他草地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1101')" />
                  <img class="img" src="../assets/dltbstyle/1101.png" />河流水面
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1102')" />
                  <img class="img" src="../assets/dltbstyle/1102.png" />湖泊水面
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1105')" />
                  <img class="img" src="../assets/dltbstyle/1105.png" />沿海滩涂
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1106')" />
                  <img class="img" src="../assets/dltbstyle/1106.png" />内陆滩涂
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1108')" />
                  <img class="img" src="../assets/dltbstyle/1108.png" />沼泽地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1204')" />
                  <img class="img" src="../assets/dltbstyle/1204.png" />盐碱地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1205')" />
                  <img class="img" src="../assets/dltbstyle/1205.png" />沙地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1206')" />
                  <img class="img" src="../assets/dltbstyle/1206.png" />裸土地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1207')" />
                  <img class="img" src="../assets/dltbstyle/1207.png" />裸岩石砾地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('GTKJGH','1110')" />
                  <img class="img" src="../assets/dltbstyle/1110.png" />冰川及永久积雪
                </div>
              </div>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <div @click.stop="stop()">
              <el-switch
                inactive-text="村庄用地规划"
                v-model="CZGH_Visible"
                @change="changeLayer('CZGH_Layer',CZGH_Visible)"
              ></el-switch>
            </div>
          </template>

          <el-menu-item-group>
            <el-scrollbar>
              <div class="itembox" id="CZGH_Features">
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','保护林地')" />
                  <img class="img" src="../assets/czghstyle/保护林地.png" />保护林地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','公路用地')" />
                  <img class="img" src="../assets/czghstyle/公路用地.png" />公路用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','后备林地')" />
                  <img class="img" src="../assets/czghstyle/后备林地.png" />后备林地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','基本农田')" />
                  <img class="img" src="../assets/czghstyle/基本农田.png" />基本农田
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','旅游建设用地')" />
                  <img class="img" src="../assets/czghstyle/旅游建设用地.png" />旅游建设用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','其他独立建设用地')" />
                  <img class="img" src="../assets/czghstyle/其他独立建设用地.png" />其他建设用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','其他农用地')" />
                  <img class="img" src="../assets/czghstyle/其他农用地.png" />其他农用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','其他设施用地')" />
                  <img class="img" src="../assets/czghstyle/其他设施用地.png" />其他设施用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','水工建筑用地')" />
                  <img class="img" src="../assets/czghstyle/水工建筑用地.png" />水工建筑用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','水库水面')" />
                  <img class="img" src="../assets/czghstyle/水库水面.png" />水库水面
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','滩涂')" />
                  <img class="img" src="../assets/czghstyle/滩涂.png" />滩涂
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','未计入水库水面的河流湖泊水面')" />
                  <img class="img" src="../assets/czghstyle/未计入水库水面的河流湖泊水面.png" />河流湖泊水面
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','乡村建设用地')" />
                  <img class="img" src="../assets/czghstyle/乡村建设用地.png" />乡村建设用地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','一般耕地')" />
                  <img class="img" src="../assets/czghstyle/一般耕地.png" />一般耕地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','园地')" />
                  <img class="img" src="../assets/czghstyle/园地.png" />园地
                </div>
                <div class="listItem">
                  <input type="checkbox" checked @change="changeFeature('CZGH','自然保留地')" />
                  <img class="img" src="../assets/czghstyle/自然保留地.png" />自然保留地
                </div>
              </div>
            </el-scrollbar>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <div @click.stop="stop()">
              <el-switch
                inactive-text="农房建设分布"
                v-model="NFJSFB_Visible"
                @change="changeLayer('NFJSFB_Layer',NFJSFB_Visible)"
              ></el-switch>
            </div>
          </template>

          <el-menu-item-group></el-menu-item-group>
        </el-submenu>
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
      XZDCCG_Visible: true,
      GTKJGH_Visible: true,
      CZGH_Visible: true,
      NFJSFB_Visible: true,
      XZDCCG_Features: ["*"],
      GTKJGH_Features: ["*"],
      CZGH_Features: ["*"],
      NFJSFB_Features: ["*"],
      XZDCCG_Layer: null,
      GTKJGH_Layer: null,
      CZGH_Layer: null,
      NFJSFB_Layer: null,
      Region_Layer: null,
      zdLayer: null,
      xzqhdm: "469005115201"
    };
  },
  components: {
    LayerList
  },
  mounted() {
    this.map = BaseMap.BaseInitMap("maponemap");
    this.map.addLayer(BaseMap.img_wLayer);
    this.XZDCCG_Layer = this.InitXZDCCG();
    this.GTKJGH_Layer = this.InitGTKJGH();
    this.CZGH_Layer = this.InitCZGH();
    this.NFJSFB_Layer = this.InitNFJSFB();
    this.map.addLayer(this.XZDCCG_Layer);
    this.map.addLayer(this.GTKJGH_Layer);
    this.map.addLayer(this.CZGH_Layer);
    this.map.addLayer(this.NFJSFB_Layer);
    this.Region_Layer = BaseMap.BaseChangeRegionVector(this.map, this.xzqhdm);
    this.Region_Layer.setZIndex(20);
  },
  methods: {
    showLayer() {
      //this.layerOn = !this.layerOn;
    },
    stop() {},
    changeLayer(LayerName, visible) {
      if (visible) {
        this.map.addLayer(this[LayerName]);
      } else {
        this.map.removeLayer(this[LayerName]);
      }
    },
    changeFeature(LayerName, Code) {
      var visible = this[LayerName + "_Visible"];
      if (!visible) return;
      var features = this[LayerName + "_Features"];
      var index = features.indexOf(Code);
      if (index > 0) {
        features.splice(index, 1);
      } else {
        features.push(Code);
      }
      if (LayerName == "XZDCCG") {
        this.map.removeLayer(this.XZDCCG_Layer);
        this.XZDCCG_Layer = this.InitXZDCCG();
        this.map.addLayer(this.XZDCCG_Layer);
      } else if (LayerName == "GTKJGH") {
        this.map.removeLayer(this.GTKJGH_Layer);
        this.GTKJGH_Layer = this.InitGTKJGH();
        this.map.addLayer(this.GTKJGH_Layer);
      } else if (LayerName == "CZGH") {
        this.map.removeLayer(this.CZGH_Layer);
        this.CZGH_Layer = this.InitCZGH();
        this.map.addLayer(this.CZGH_Layer);
      } else if (LayerName == "NFJSFB") {
        this.map.removeLayer(this.NFJSFB_Layer);
        this.NFJSFB_Layer = this.InitNFJSFB();
        this.map.addLayer(this.NFJSFB_Layer);
      }
    },
    getFeatures(LayerName) {
      var result = " NOT IN (";
      var features = this[LayerName + "_Features"];
      for (var i = 0; i < features.length; i++) {
        result += "'" + features[i] + "'";
        if (i != features.length - 1) {
          result += ",";
        }
      }
      result += ")";
      return result;
    },
    InitXZDCCG() {
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
      return wmsLayer;
    },
    InitGTKJGH() {
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
      return wmsLayer;
    },
    InitCZGH() {
      var wmsLayer = new TileLayer({
        source: new TileWMS({
          url: BaseMap.geoserverURL + "TDLYXZ/wms",
          params: {
            LAYERS: "TDLYXZ:CZGH",
            QUERY_LAYERS: "TDLYXZ:DLTB",
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
      return wmsLayer;
    },
    InitNFJSFB() {
      var color = "#3399CC";
      var styleCache = {};
      var clusters = new VectorLayer({
        source: new Cluster({
          distance: 50,
          geometryFunction: function(features) {
            //return getCenter(features.getGeometry().getExtent());
            var coord = getCenter(features.getGeometry().getExtent());
            return new Feature(new Point(coord)).getGeometry();
            //return features.getGeometry();
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
      return clusters;
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
  background-color: aqua;
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
</style>