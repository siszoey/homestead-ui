<template>
  <div class="container">
    <div class="mapPanel" ref="leftPanel">
      <div style="text-align:center">
        <el-switch
          style="height:50px;"
          inactive-text="图层控制"
          active-text
          v-model="hiddentoolbar"
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
                <el-switch inactive-text="影像底图" v-model="CJYX.Visible" @change="changeLayer('CJYX')"></el-switch>
              </div>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div :id="mapid" class="mapDiv"></div>

    <div class="toolbarContainer">
      <div class="toolbar">
        <div class="toolButton top" @click="changeEditMode">
          <img :src="`${$baseUrl}image/mapicon/sldt.png`" />
        </div>
        <!-- <div class="toolButton bottom highlight">
          <img :src="`${$baseUrl}image/mapicon/yxdt.png`" />
        </div>-->
      </div>
      <!-- <div class="toolbar" style="margin-top:10px">
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
      </div>-->
    </div>
    <el-card class="box-card" ref="popup">
      <el-button style="float: right; padding: 3px 0" type="text" @click="closeCard">关闭</el-button>
      <div class="text item">
        <b>项目名称</b>
      </div>
      <div class="text item">宅基地疑似违法占地</div>
      <div class="text item">
        <b>项目位置</b>
      </div>
      <div class="text item">美宝村民小组</div>
      <div class="text item">
        <b>监察人</b>
      </div>
      <div class="text item">吴坤义</div>
      <div class="text item">
        <b>监察时间</b>
      </div>
      <div class="text item">2019-8-13</div>
      <div class="text item">
        <b>违法事由</b>
      </div>
      <div class="text item">宅基地获批面积为150平方米，实际修建的建筑面积为174平方米</div>
      <div class="text item">
        <b>备注</b>
      </div>
      <div class="text item">暂无</div>
      <el-button type="primary" style="width:100%">发起现场核实</el-button>
    </el-card>
    <el-card class="box-card" ref="popupedit">
      <el-button style="float: right; padding: 3px 0" type="text" @click="closeEditCard">关闭</el-button>
      <div class="text item">
        <b>项目名称</b>
      </div>
      <div class="text item">
        <el-input placeholder="请输入内容"></el-input>
      </div>
      <div class="text item">
        <b>项目位置</b>
      </div>
      <div class="text item">
        <el-input placeholder="请输入内容"></el-input>
      </div>
      <div class="text item">
        <b>监察人</b>
      </div>
      <div class="text item">
        <el-input placeholder="请输入内容"></el-input>
      </div>
      <div class="text item">
        <b>监察时间</b>
      </div>
      <div class="text item">
        <el-input placeholder="请输入内容"></el-input>
      </div>
      <div class="text item">
        <b>违法事由</b>
      </div>
      <div class="text item">
        <el-input placeholder="请输入内容"></el-input>
      </div>
      <div class="text item">
        <b>备注</b>
      </div>
      <div class="text item">
        <el-input placeholder="请输入内容"></el-input>
      </div>
      <el-button type="primary" style="width:100%">发起现场核实</el-button>
    </el-card>
    <LayerList style="position:absolute;top:180px;right:80px" v-show="layerOn"></LayerList>
  </div>
</template>
<script>
import LayerList from "./components/LayerList_ZJD";
import BaseMap from "../spatialData/mapBase.js";

import Region from "@/views/land/mixnis/region-mixin.js";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import GeoJSON from "ol/format/GeoJSON";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import { XYZ, TileWMS, Cluster } from "ol/source";
import { Overlay, Feature } from "ol";
import VectorSource from "ol/source/Vector";
import { getCenter, getBottomLeft, getTopRight } from "ol/extent";
import Point from "ol/geom/Point";
import Axios from "axios";
import { Modify, Draw, Snap } from "ol/interaction";

export default {
  name: "ygdc_dbfx",
  props: {
    hiddenToolbar: {
      type: Boolean,
      default: false
    },
    mapid: String
  },
  mixins: [Region],
  data() {
    return {
      popup: null,
      popupedit: null,
      EditMode: false,
      draw: null,
      snap: null,
      source: null,
      map: null,
      layerOn: false,
      NFJSFB_Layer: null,
      Region_Layer: null,
      zdLayer: null,
      xzqhdm: "",
      hiddentoolbar: "",
      ZJDInfo: {
        Szz: "",
        Zdmj: "",
        Ytmc: "",
        Qlrmc: ""
      },
      XZDCCG: {
        Layer: null,
        Visible: true,
        CheckAll: true,
        Features: [],
        XzqhLevel: "5", //默认的行政区划级别,
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
        XzqhLevel: "5", //默认的行政区划级别,
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
        XzqhLevel: "5",
        Boxs: []
      },
      CJYX: {
        Layer: null,
        Visible: true,
        CheckAll: true,
        Features: [],
        XzqhLevel: "",
        Boxs: []
      }
    };
  },
  components: {
    LayerList
  },
  created() {
    this.hiddentoolbar = this.hiddenToolbar;
  },
  mounted() {
    //是否显示工具栏
    this.changeToolbar();
    this.initMap();
  },

  methods: {
    showLayer() {
      //this.layerOn = !this.layerOn;
    },
    initMap: async function() {
      this.xzqhdm = this.getRegionCode();
      await BaseMap.InitGeoServer(this.xzqhdm);
      this.map = BaseMap.BaseInitMap(this.mapid);
      //console.log(this.map);
      this.checkALL("XZDCCG");
      this.checkALL("CZGH");
      this.InitLayer("XZDCCG");
      this.InitLayer("CZGH");
      this.InitLayer("XZQ");
      this.InitLayer("CJYX");
      this.XZQ.Layer.setZIndex(20);

      this.popup = new Overlay({
        element: this.$refs.popup.$el
      });
      this.map.addOverlay(this.popup);
      this.popupedit = new Overlay({
        element: this.$refs.popupedit.$el
      });
      this.map.addOverlay(this.popupedit);
      //点击事件
      let _this = this;
      this.map.on("singleclick", function(evt) {
        var view = _this.map.getView();
        var viewResolution = view.getResolution();
        var source = _this.XZDCCG.Layer.getSource();
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
              if (res.data.features.length == 0) {
                _this.closeCard();
                return;
              }
              _this.popup.setPosition(evt.coordinate);
              _this.ZJDInfo = res.data.features[0].properties;
              _this.openCard();
            })
            .catch(error => {});
        }
      });
      this.source = new VectorSource();
      var vector = new VectorLayer({
        source: this.source,
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)"
          }),
          stroke: new Stroke({
            color: "#ffcc33",
            width: 2
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: "#ffcc33"
            })
          })
        })
      });
      this.source.on("change", function(evt) {
        var source = evt.target; //图层矢量数据是异步加载的，所以要在事件里做缩放
        if (source.getState() === "ready") {
          var center = getCenter(source.getExtent());
          //_this.map.getView().centerOn(center); //自动缩放
          _this.popupedit.setPosition(getTopRight(source.getExtent()));
          _this.openEditCard();
        }
      });
      this.map.addLayer(vector);
      var modify = new Modify({ source: this.source });
      this.map.addInteraction(modify);

      this.$emit("inited");
    },
    changeEditMode() {
      this.EditMode = !this.EditMode;
      if (this.EditMode) {
        this.draw = new Draw({
          source: this.source,
          type: "Polygon"
        });
        this.map.addInteraction(this.draw);
        this.snap = new Snap({ source: this.source });
        this.map.addInteraction(this.snap);
      } else {
        this.map.removeInteraction(this.draw);
        this.map.removeInteraction(this.snap);
      }
    },
    closeCard() {
      this.$refs.popup.$el.style.visibility = "hidden";
      this.$refs.popup.$el.style.width = "1px";
      this.$refs.popup.$el.style.height = "1px";
    },
    closeEditCard() {
      this.$refs.popupedit.$el.style.visibility = "hidden";
      this.$refs.popupedit.$el.style.width = "1px";
      this.$refs.popupedit.$el.style.height = "1px";
    },
    openCard() {
      this.$refs.popup.$el.style.visibility = "visible";
      this.$refs.popup.$el.style.width = "260px";
      this.$refs.popup.$el.style.height = "400px";
    },
    openEditCard() {
      this.$refs.popupedit.$el.style.visibility = "visible";
      this.$refs.popupedit.$el.style.width = "260px";
      this.$refs.popupedit.$el.style.height = "480px";
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
      if (this.hiddentoolbar) {
        this.$refs.mapPanel.style.display = "block";
        this.$refs.leftPanel.style.height = "100%";
      } else {
        this.$refs.mapPanel.style.display = "none";
        this.$refs.leftPanel.style.height = "50px";
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
.box-card {
  background-color: #f7f7f7d1;
  // overflow-y: auto;
  z-index: 9;
  right: 1px;
  visibility: hidden;
  font-size: 14px;
}
.el-card__body {
  padding: 10px;
}
.text {
  padding-bottom: 5px;
}
</style>
<style scoped>
.el-switch__label {
  min-width: 85px;
}
</style>