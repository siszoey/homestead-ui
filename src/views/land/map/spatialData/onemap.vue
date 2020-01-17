<template>
  <div class="container">
    <div class="mapPanel" id="leftPanel">
      <div style="text-align:center">
        <el-switch
          style="height:50px;"
          inactive-text="展开菜单"
          active-text="收起菜单"
          v-model="hiddenToolbar"
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
    <el-card class="box-card" id="popup_onemap">
      <div slot="header" class="clearfix">
        <span>地块信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="closeCard">关闭</el-button>
      </div>
      <div class="text item">{{'权属单位名称：' + CZGHInfo.QSDWMC }}</div>
      <div class="text item">{{'地类名称：' + CZGHInfo.DLMC }}</div>
      <div class="text item">{{'地块编号：' + CZGHInfo.OBJECTID }}</div>
      <div class="text item">{{'面积：' + (CZGHInfo.TBDLMJ*0.0015).toFixed(2)+'亩' }}</div>
      <div class="text item">{{'数据年份：' + CZGHInfo.SJNF }}</div>
      <div class="text item"></div>
      <div class="text item">照片资料：</div>
      <el-image
        style="width: 300px; height: 150px"
        src="/image/mapicon/testimage.png"
        :fit="contain"
        :preview-src-list="srcList"
        z-index:9999
      ></el-image>
    </el-card>
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
import Axios from "axios";

export default {
  props: {
    hiddenToolbar: {
      type: Boolean,
      default: false
    }
  },
  name: "survey",
  data() {
    return {
      srcList: ["/image/mapicon/testimage.png"],
      map: null,
      layerOn: false,
      xzqhdm: "469005115201",
      popup: null,
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
        Visible: true,
        CheckAll: [true, true, true],
        Features: [],
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
        Boxs: []
      },
      DT: {
        Layer: null,
        Visible: true,
        CheckAll: [true],
        Features: [],
        Boxs: []
      }
    };
  },
  components: {
    LayerList
  },
  mounted() {
    this.$nextTick(function() {
      //初始化地图
      this.map = BaseMap.BaseInitMap("maponemap");
      //是否显示工具栏
      this.changeToolbar();
      //初始化图层
      this.InitLayer("XZDCCG");
      this.InitLayer("GTKJGH");
      this.InitLayer("CZGH");
      this.InitLayer("NFJSFB");
      this.InitLayer("XZQ");
      this.InitLayer("DT");
      //行政区置顶
      this.XZQ.Layer.setZIndex(20);

      this.popup = new Overlay({
        element: document.getElementById("popup_onemap")
      });
      this.map.addOverlay(this.popup);
      //点击事件
      let _this = this;
      this.map.on("singleclick", function(evt) {
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
              var element = _this.popup.getElement();
              _this.popup.setPosition(evt.coordinate);
              document.getElementById("popup_onemap").style.visibility =
                "visible";
            })
            .catch(error => {});
        }
      });
    });
  },

  methods: {
    showLayer() {
      //this.layerOn = !this.layerOn;
    },
    closeCard() {
      document.getElementById("popup_onemap").style.visibility = "hidden";
    },
    stop() {},
    //切换面板显示
    changeToolbar() {
      if (this.hiddenToolbar) {
        document.getElementById("mapPanel").style.display = "none";
        document.getElementById("leftPanel").style.height = "50px";
      } else {
        document.getElementById("mapPanel").style.display = "block";
        document.getElementById("leftPanel").style.height = "100%";
      }
    },
    //切换图层显示
    changeLayer(LayerName) {
      if (this[LayerName].Visible) {
        if (this[LayerName].Layer == null) {
          this.InitLayer(LayerName);
        } else this.map.addLayer(this[LayerName].Layer);
      } else {
        this.map.removeLayer(this[LayerName].Layer);
      }
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
    //现状调查成果（宅基地宗地）
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
    //土地利用规划（三调）
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
    //村庄规划
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
    //农房建设分布（宅基地数据聚合）
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
    //行政区边界
    InitXZQ() {
      var Region_Layer = BaseMap.BaseChangeRegionVector(this.map, this.xzqhdm);
      return Region_Layer;
    },
    //天地图底图
    InitDT() {
      this.map.addLayer(BaseMap.img_wLayer);
      return BaseMap.img_wLayer;
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
<style>
.el-switch__label {
  min-width: 15px;
}
</style>
