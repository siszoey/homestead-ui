<template>
  <div class="container">
    <div class="mapPanel" id="leftPanel">
      <div style="text-align:center">
        <el-switch
          style="height:50px;"
          inactive-text="图层控制"
          active-text
          v-model="hiddentoolbar"
          @change="changeToolbar()"
        ></el-switch>
      </div>

      <div id="mapPanel">
        <el-menu
          default-active="1"
          class="el-menu"
          :unique-opened="true"
          style="height:100%;background-color: lightgrey;"
        >
          <el-submenu index="1-1">
            <template slot="title">现状调查数据</template>
            <el-submenu index="1">
              <template slot="title">
                <div @click.stop="stop()">
                  <el-switch
                    inactive-text="农村宅基地情况"
                    v-model="XZDCCG.Visible"
                    @change="changeLayer('XZDCCG')"
                  ></el-switch>
                </div>
              </template>
              <el-menu-item-group>
                <div class="itembox">
                  <div class="listItem">
                    <el-checkbox @change="checkALL('XZDCCG')" v-model="XZDCCG.CheckAll[0]"></el-checkbox>
                    <span class="img" style="visibility: hidden;"></span>
                    全选
                  </div>
                  <div class="listItem" v-for="box in XZDCCG.Boxs[0]" :key="box.code">
                    <el-checkbox @change="changeFeature('XZDCCG',box.code)" v-model="box.checked"></el-checkbox>
                    <span class="img" :style="box.icon"></span>
                    {{box.name}}
                  </div>
                </div>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <div @click.stop="stop()">
                  <el-switch
                    inactive-text="农村住宅情况"
                    v-model="NFJSFB.Visible"
                    @change="changeLayer('NFJSFB')"
                  ></el-switch>
                </div>
              </template>
              <el-menu-item-group>
                <div class="itembox">
                  <div class="listItem">
                    <el-checkbox @change="checkALL('NFJSFB')" v-model="NFJSFB.CheckAll[0]"></el-checkbox>
                    <span class="img" style="visibility: hidden;"></span>
                    全选
                  </div>
                  <div class="listItem" v-for="box in NFJSFB.Boxs[0]" :key="box.code">
                    <el-checkbox v-model="box.checked"></el-checkbox>
                    <span class="img" :style="box.icon"></span>
                    {{box.name}}
                  </div>
                </div>
              </el-menu-item-group>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <div @click.stop="stop()">
                <el-switch
                  inactive-text="土地利用现状"
                  v-model="GTKJGH.Visible"
                  @change="changeLayer('GTKJGH')"
                ></el-switch>
              </div>
            </template>
            <el-submenu index="2-1">
              <template slot="title">农用地</template>
              <el-menu-item-group>
                <div class="itembox">
                  <div class="listItem">
                    <el-checkbox @change="checkALL('GTKJGH',0)" v-model="GTKJGH.CheckAll[0]"></el-checkbox>
                    <span class="img" style="visibility: hidden;"></span>
                    全选
                  </div>
                  <div class="listItem" v-for="box in GTKJGH.Boxs[0]" :key="box.code">
                    <el-checkbox @change="changeFeature('GTKJGH',box.code)" v-model="box.checked"></el-checkbox>
                    <img class="img" :src="`${$baseUrl}image/dltbstyle/`+box.code+'.png'" />
                    {{box.name}}
                  </div>
                </div>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2-2">
              <template slot="title">建设用地</template>
              <el-menu-item-group>
                <div class="itembox">
                  <div class="listItem">
                    <el-checkbox @change="checkALL('GTKJGH',1)" v-model="GTKJGH.CheckAll[1]"></el-checkbox>
                    <span class="img" style="visibility: hidden;"></span>
                    全选
                  </div>
                  <div class="listItem" v-for="box in GTKJGH.Boxs[1]" :key="box.code">
                    <el-checkbox @change="changeFeature('GTKJGH',box.code)" v-model="box.checked"></el-checkbox>
                    <img class="img" :src="`${$baseUrl}image/dltbstyle/`+box.code+'.png'" />
                    {{box.name}}
                  </div>
                </div>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2-3">
              <template slot="title">未利用地</template>
              <el-menu-item-group>
                <div class="itembox">
                  <div class="listItem">
                    <el-checkbox @change="checkALL('GTKJGH',2)" v-model="GTKJGH.CheckAll[2]"></el-checkbox>
                    <span class="img" style="visibility: hidden;"></span>
                    全选
                  </div>
                  <div class="listItem" v-for="box in GTKJGH.Boxs[2]" :key="box.code">
                    <el-checkbox @change="changeFeature('GTKJGH',box.code)" v-model="box.checked"></el-checkbox>
                    <img class="img" :src="`${$baseUrl}image/dltbstyle/`+box.code+'.png'" />
                    {{box.name}}
                  </div>
                </div>
              </el-menu-item-group>
            </el-submenu>
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
                    <el-checkbox @change="checkALL('CZGH')" v-model="CZGH.CheckAll[0]"></el-checkbox>
                    <span class="img" style="visibility: hidden;"></span>
                    全选
                  </div>
                  <div class="listItem" v-for="box in CZGH.Boxs[0]" :key="box.code">
                    <el-checkbox @change="changeFeature('CZGH',box.code)" v-model="box.checked"></el-checkbox>
                    <img class="img" :src="`${$baseUrl}image/czghstyle/`+box.name+'.png'" />
                    {{box.name}}
                  </div>
                </div>
              </el-scrollbar>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-submenu index="1-2">
            <template slot="title">土地规划数据</template>

          </el-submenu>-->
          <el-submenu index="1-3">
            <template slot="title">其他数据</template>
            <el-menu-item index="5">
              <template slot="title">
                <div @click.stop="stop()">
                  <el-switch
                    inactive-text="行政区划"
                    v-model="XZQ.Visible"
                    @change="changeLayer('XZQ')"
                  ></el-switch>
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
          </el-submenu>
          <!-- <el-menu-item index="7">
              <template slot="title">
                <div @click.stop="stop()">
                  <el-switch
                    inactive-text="基本农田"
                    v-model="XZQ.Visible"
                  ></el-switch>
                </div>
              </template>
          </el-menu-item>-->
        </el-menu>
      </div>
    </div>

    <div id="maponemap" class="mapDiv"></div>
    <ToolBar id="toolbar" style="padding-right:400px;" v-on:switchXzqh="zoomToXzqh"></ToolBar>
    <RightChart
      v-if="flag"
      :ChartIndex="ChartIndex"
      :tabs="tabs"
      v-on:switchPanel="changeToolbarPosition"
    ></RightChart>
    <LayerList style="position:absolute;top:180px;right:80px" v-show="layerOn"></LayerList>
    <el-dialog
      class="box-card right-side"
      id="popup_onemap"
      title="宗地信息"
      :visible.sync="dialogVisible"
      v-dialogDrag
      :modal="false"
      width="25%"
    >
      <!-- <el-card> -->
      <!-- <div slot="header" class="clearfix">
        <span>宗地信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="closeCard">关闭</el-button>
      </div>-->
      <div class="text item">{{'权属单位名称：' + CZGHInfo.QSDWMC }}</div>
      <div class="text item">{{'地类名称：' + CZGHInfo.DLMC }}</div>
      <div class="text item">{{'地块编号：' + CZGHInfo.OBJECTID }}</div>
      <div class="text item">{{'面积：' + (CZGHInfo.TBDLMJ*0.0015).toFixed(2)+'亩' }}</div>
      <div class="text item">{{'数据年份：' + CZGHInfo.SJNF }}</div>
      <div class="text item"></div>
      <div class="text item">照片资料：</div>
      <el-image
        style="width: 300px; height: 150px"
        :src="imgsrc"
        :preview-src-list="srcList"
        z-index:9999
      ></el-image>
      <!-- </el-card> -->
    </el-dialog>
  </div>
</template>
<script>
// 引入Dialog可拖拽，注意文件所在目录。目前尚未发现引入的先后关系，若有再补充
import "./components/directives.js";
import LayerList from "./components/LayerList_ZJD";
import ToolBar from "./components/toolbar";
import RightChart from "./components/RightChart";
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
import Axios from "axios";
import Region from "@/views/land/mixnis/region-mixin.js";
import mapBase from "../spatialData/mapBase.js";

export default {
  mixins: [Region],
  props: {
    hiddenToolbar: {
      type: Boolean,
      default: false
    },
    zoomToZD: {
      type: Boolean,
      default: false
    }
  },
  name: "survey",
  data() {
    return {
      flag: false,
      dialogVisible: false,
      hiddentoolbar: "",
      srcList: [],
      imgsrc: "",
      map: null,
      layerOn: false,
      currentZD: null,
      xzqhdm: "",
      popup: null,
      ChartIndex: 0,
      tabs: [],
      CZGHInfo: {
        QSDWMC: "",
        OBJECTID: "",
        DLMC: "",
        TBDLMJ: "",
        SJNF: ""
      },
      XZDCCG: {
        Layer: null, //图层
        Visible: false, //可见性
        CheckAll: [true], //全选（全不选不等于不可见）
        Features: [], //当前未选中类别
        XzqhLevel: "5", //默认的行政区划级别,
        Boxs: [
          //选项列表
          [
            {
              name: "农村宅基地",
              code: "02",
              icon: "background-color:#FAFF14",
              checked: true
            },
            {
              name: "闲置宅基地",
              code: "03",
              icon: "background-color:#3DB344",
              checked: true
            },
            {
              name: "未批先建",
              code: "04",
              icon: "background-color:#6FE020",
              checked: true
            },
            {
              name: "已批已建",
              code: "05",
              icon: "background-color:#D6FCC7",
              checked: true
            },
            {
              name: "已批未建",
              code: "01",
              icon: "background-color:#F58D8B",
              checked: true
            }
          ]
        ]
      },
      GTKJGH: {
        Layer: null,
        Visible: false,
        CheckAll: [true, true, true],
        Features: [],
        XzqhLevel: "5",
        Boxs: [
          [
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
            }
          ],
          [
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
            }
          ],
          [
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
        ]
      },
      CZGH: {
        Layer: null,
        Visible: false,
        CheckAll: [true],
        Features: [],
        XzqhLevel: "5",
        Boxs: [
          [
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
        ]
      },
      NFJSFB: {
        Layer: null,
        Visible: false,
        CheckAll: [true],
        Features: [],
        XzqhLevel: "5",
        Boxs: [
          [
            {
              name: "农村住宅",
              code: "02",
              icon: "background-color:#FAFF14",
              checked: true
            },
            {
              name: "季节性闲置住宅",
              code: "03",
              icon: "background-color:#3DB344",
              checked: true
            },
            {
              name: "常年闲置住宅",
              code: "04",
              icon: "background-color:#6FE020",
              checked: true
            },
            {
              name: "盘活利用住宅",
              code: "05",
              icon: "background-color:#D6FCC7",
              checked: true
            },
            {
              name: "一户多宅",
              code: "01",
              icon: "background-color:#F58D8B",
              checked: true
            },
            {
              name: "一宅超限",
              code: "06",
              icon: "background-color:#4169E1",
              checked: true
            }
          ]
        ]
      },
      XZQ: {
        Layer: null,
        Visible: true,
        CheckAll: [true],
        Features: [],
        XzqhLevel: "4",
        Boxs: []
      },
      DT: {
        Layer: null,
        Visible: true,
        CheckAll: [true],
        Features: [],
        XzqhLevel: "",
        Boxs: []
      }
    };
  },
  components: {
    LayerList,
    ToolBar,
    RightChart
  },
  created() {
    this.initData();
    this.hiddentoolbar = this.hiddenToolbar;
  },
  mounted() {
    this.$nextTick(function() {
      //是否显示工具栏
      this.changeToolbar();
      this.changeChartData("XZDCCG");
      this.initMap();
    });
  },

  methods: {
    closeCard() {
      //document.getElementById("popup_onemap").style.visibility = "hidden";
      this.dialogVisible = false;
    },
    initData() {
      let code = this.getRegionCode();
      this.xzqhdm = code;
    },
    initMap: async function() {
      await BaseMap.InitGeoServer(this.xzqhdm);
      //初始化地图
      this.map = BaseMap.BaseInitMap("maponemap");

      //初始化图层
      this.InitLayer("XZDCCG");
      this.InitLayer("GTKJGH");
      this.InitLayer("CZGH");
      this.InitLayer("NFJSFB");

      this.InitLayer("DT");
      //行政区置顶

      if (this.zoomToZD) this.doZoomToZD();
      else {
        this.InitLayer("XZQ");
        this.XZQ.Layer.setZIndex(20);
      }
      //点击事件
      let _this = this;
      this.map.on("singleclick", function(evt) {
        if (_this.GTKJGH.Layer == null) return;
        var view = _this.map.getView();
        var viewResolution = view.getResolution();
        var source = _this.GTKJGH.Layer.getSource();
        var url = source.getFeatureInfoUrl(
          evt.coordinate,
          viewResolution,
          view.getProjection(),
          { INFO_FORMAT: "application/json" }
        );
        if (url) {
          Axios({
            method: "get",
            url: url,
            dataType: "json",
            crossDomain: true,
            cache: false
          })
            .then(res => {
              _this.CZGHInfo = res.data.features[0].properties;
              _this.imgsrc =
                "/image/mapicon/testimage/" +
                _this.getRandomInt(1, 10) +
                ".JPG";
              _this.srcList = [_this.imgsrc];
              _this.dialogVisible = true;
            })
            .catch(error => {});
        }
      });
    },
    stop() {},
    changeToolbarPosition(padding) {
      if (padding) {
        document.getElementById("toolbar").style.paddingRight = "330px";
      } else {
        document.getElementById("toolbar").style.paddingRight = "50px";
      }
    },
    //切换面板显示
    changeToolbar() {
      if (this.hiddentoolbar) {
        document.getElementById("mapPanel").style.display = "block";
        document.getElementById("leftPanel").style.height = "100%";
      } else {
        document.getElementById("mapPanel").style.display = "none";
        document.getElementById("leftPanel").style.height = "50px";
      }
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    doZoomToZD() {
      if (!this.zoomToZD) return;
      var zddm = "469005115003JC99012";
      let _this = this;
      if (this.currentZD != null) this.map.removeLayer(this.currentZD);
      this.currentZD = mapBase.BaseCreateSingleZDLayer(zddm);
      this.currentZD.getSource().on("change", function(evt) {
        var source = evt.target; //图层矢量数据是异步加载的，所以要在事件里做缩放
        if (source.getState() === "ready") {
          var center = getCenter(source.getExtent());
          _this.map.getView().animate(
            {
              center: center,
              duration: 1
            },
            {
              zoom: 20,
              duration: 1
            }
          );
        }
      });
      this.map.addLayer(this.currentZD);
    },
    zoomToXzqh(xzqhdm) {
      if (!this.XZQ.Visible) return;
      var _this = this;
      var layer = BaseMap.BaseCreateRegionVectorFromServer(xzqhdm);
      _this.map.addLayer(layer);
      layer.getSource().on("change", function(evt) {
        var source = evt.target; //图层矢量数据是异步加载的，所以要在事件里做缩放
        if (source.getState() === "ready") {
          _this.map.values_.view.fit(source.getExtent()); //自动缩放
          _this.map.removeLayer(layer);
        }
      });
    },
    //切换图层显示
    changeLayer(LayerName) {
      if (this[LayerName].Visible) {
        if (this[LayerName].Layer == null) {
          this.InitLayer(LayerName);
        } else this.map.addLayer(this[LayerName].Layer);
        this.changeChartData(LayerName, true);
      } else {
        this.map.removeLayer(this[LayerName].Layer);
        this.changeChartData(LayerName, false);
      }
    },
    changeChartData(LayerName, isShow) {
      this.flag = false;
      var index = -1;
      if (LayerName == "XZDCCG") {
        index = 0;
      } else if (LayerName == "GTKJGH") {
        index = 2;
      } else if (LayerName == "CZGH") {
        index = 3;
      } else if (LayerName == "NFJSFB") {
        index = 1;
      }
      if (index == -1) return;
      if (isShow) {
        //增加一个新的tab
        this.tabs.push(index);
        this.ChartIndex = index;
      } else {
        //关闭一个tab
        this.ChartIndex = -1;
        this.tabs.splice(this.tabs.indexOf(index), 1);
      }

      this.flag = true;
    },
    //全选（全不选）
    checkALL(LayerName, index = 0) {
      var config = this[LayerName];
      //设定该分组的选中状态
      for (var j = 0; j < config.Boxs[index].length; j++) {
        config.Boxs[index][j].checked = config.CheckAll[index];
      }
      //根据选中状态重新计算整个图层的查询条件
      config.Features = [];
      for (var i = 0; i < config.Boxs.length; i++) {
        for (var j = 0; j < config.Boxs[i].length; j++) {
          if (!config.CheckAll[i]) {
            config.Features.push(config.Boxs[i][j].code);
          }
        }
      }
      this.InitLayer(LayerName);
    },
    //修改查询条件
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
    //获取并拼接查询条件
    getFeatures(LayerName) {
      var result = " NOT IN (";
      var features = this[LayerName].Features;
      if (features.length == 0) {
        result += "'*'";
      } else {
        for (var i = 0; i < features.length; i++) {
          //添加子类型
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
    //初始化图层
    InitLayer(LayerName) {
      if (!this[LayerName].Visible) {
        return;
      }
      this[LayerName].Layer = BaseMap.BaseInitLayer(
        this.map,
        this[LayerName].Layer,
        LayerName,
        this.getFeatures(LayerName),
        this.xzqhdm,
        this[LayerName].XzqhLevel
      );
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

.listItem {
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 23px;
  //min-width: 120px;
  width: 100%;
  color: black;
  font-size: 14px;
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

.box-card {
  overflow-y: auto;
}

.right-side {
  z-index: 9;
  opacity: 0.9;
}
</style>
<style>
.el-switch__label {
  min-width: 15px;
}
</style>
