<template>
  <div id="app" style="width:100%;height:100%;">
    <div class="left-side" id="leftPanel">
      <div style="text-align:center;background-color: #f7f7f7d1;">
        <el-switch
          style="height:50px;"
          inactive-text="审批管理"
          active-text
          v-model="hiddenToolbar"
          @change="changeToolbar()"
        ></el-switch>
      </div>
      <el-card class="box-card" id="mapPanel">
        <div slot="header" class="clearfix">
          <span class="card-title">审批情况一览表</span>
        </div>
        <!-- <div class="text item">
          <label class="year-column-l">年份</label>
          <el-select v-model="year" class="select-item-year panelitem">
            <el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <label class="xzq-column-l">行政区</label>
          <el-select v-model="city" class="select-item-xzq panelitem" v-on:change="changeCity(city)">
            <el-option v-for="item in cities" :key="item.id" :label="item.properties.name" :value="item.id"></el-option>
          </el-select>
        </div>-->
        <div class="text item">
          <el-table :data="tableData" style="width: 100%" class="panelitem" @row-click="zoomtoZD">
            <el-table-column prop="project" label="项目名称" />
            <el-table-column prop="proposer" label="申请人" />
            <el-table-column prop="address" label="地址" />
            <el-table-column prop="status" label="审批状态" />
          </el-table>
        </div>
      </el-card>
    </div>

    <div id="pic-map" class="mapDiv"></div>
    <el-card class="box-card right-side" id="popup">
      <div slot="header" class="clearfix">
        <span>申请信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="closeCard">关闭</el-button>
      </div>
      <div class="text item">{{'坐落：' + ZJDInfo.Szz }}</div>
      <div class="text item">{{'宗地面积：' + ZJDInfo.Zdmj+'(㎡)' }}</div>
      <div class="text item">{{'宗地用途：' + ZJDInfo.Ytmc }}</div>
      <div class="text item">{{'权利人名称：' + ZJDInfo.Qlrmc }}</div>
      <div class="text item"></div>
      <div class="text item">照片资料：</div>
      <el-image
        style="width: 300px; height: 150px"
        src="/image/mapicon/testimage1.png"
        :preview-src-list="srcList"
      ></el-image>
    </el-card>
    <ToolBar id="toolbar" v-on:switchXzqh="zoomToXzqh"></ToolBar>
    <timeline></timeline>
  </div>
</template>

<script>
import BaseMap from "../spatialData/mapBase.js";
import timeline from "../spatialData/components/timeline";
import { getExaminePic } from "../../../../api/res.implprocess";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import { TileWMS } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { getCenter, getBottomRight, getTopRight } from "ol/extent";
import { Overlay } from "ol";

import ToolBar from "../spatialData/components/toolbar";

export default {
  name: "examinePic",
  props: {
    hiddenToolbar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      srcList: ["/image/mapicon/testimage1.png"],
      map: null,
      selectedType: "",
      years: [],
      cities: [],
      city: "",
      year: "",
      currentZD: null,
      popup: null,
      popupvisible: false,
      ZJDInfo: {
        Szz: "",
        Zdmj: "",
        Ytmc: "",
        Qlrmc: ""
      },
      tableData: [
        {
          project: "原址新建项目1",
          proposer: "潘若飞",
          address: "坑上村民小组",
          status: "农经审核",
          zddm: "469005115003JC02307"
        },
        {
          project: "原址新建项目2",
          proposer: "吴多福",
          address: "美宝村民小组",
          status: "农经审核",
          zddm: "469005115003JC01950"
        },
        {
          project: "原址新建项目3",
          proposer: "吴坤桔",
          address: "东排坡村民小组",
          status: "农经审核",
          zddm: "469005115003JC99012"
        },
        {
          project: "改扩建项目1",
          proposer: "许宇林",
          address: "田西村民小组",
          status: "联合审批",
          zddm: "469005115003JC02419"
        },
        {
          project: "改扩建项目2",
          proposer: "陈海芳",
          address: "草洋村民小组",
          status: "乡政府审批",
          zddm: "469005115003JC01329"
        },
        {
          project: "改扩建项目3",
          proposer: "潘家钵",
          address: "坑上村民小组",
          status: "乡政府审批",
          zddm: "469005115003JC02310"
        },
        {
          project: "改扩建项目4",
          proposer: "卢文瑞",
          address: "东塔村民小组",
          status: "村民申请",
          zddm: "469005115003JC01551"
        },
        {
          project: "改扩建项目5",
          proposer: "潘秀荣",
          address: "南林村民小组",
          status: "村民申请",
          zddm: "469005115003JC02046"
        }
      ]
    };
  },
  components: {
    timeline,
    ToolBar
  },
  created() {},
  watch: {
    selectedType(val) {
      this.getTableData();
    }
  },
  methods: {
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
    zoomToXzqh(xzqhdm) {
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
    closeCard() {
      document.getElementById("popup").style.visibility = "hidden";
    },
    //ajax获取本地json文件行政区划
    requestAjax(fileName, level) {
      let _this = this;
      this.$axios
        .get(fileName)
        //then获取成功；response成功后的返回值（对象）
        .then(response => {
          // console.log(response.data.features); //[0].properties.name
          if (level == "3") {
            _this.counties = response.data.features;
          } else if (level == "2") {
            _this.cities = response.data.features;
          }
        })
        //获取失败
        .catch(error => {
          console.log(error);
          alert("网络错误，不能访问");
        });
    },
    getTableData() {
      this.table.listLoading = true;
      getExaminePic(this.selectedType, this.year)
        .then(res => {
          this.table.list = res.list;
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.table.listLoading = false;
        });
    },
    zoomtoZD(row) {
      let _this = this;
      if (this.currentZD != null) this.map.removeLayer(this.currentZD);
      this.currentZD = new VectorLayer({
        source: new VectorSource({
          url:
            BaseMap.geoserver +
            "&typeName=TDLYXZ:ZD" +
            "&CQL_FILTER=zddm_bf = %27" +
            row.zddm +
            "%27",
          format: new GeoJSON()
        }),
        zIndex: 20
      });
      this.currentZD.getSource().on("change", function(evt) {
        var source = evt.target; //图层矢量数据是异步加载的，所以要在事件里做缩放
        if (source.getState() === "ready") {
          var center = getCenter(source.getExtent());
          _this.map.getView().animate(
            {
              zoom: 16,
              duration: 1
              //duration: 1500
            },
            {
              center: center,
              duration: 1
              //duration: 2000
            },
            {
              zoom: 20,
              duration: 1
              //duration: 1500
            },
            _this.animateDone
          );
          // var element = _this.popup.getElement();
          var data = source.getFeatures()[0].getProperties();
          // _this.popup.setPosition(getTopRight(source.getExtent()));
          _this.ZJDInfo = data;
          document.getElementById("popup").style.visibility = "hidden";
        }
      });
      this.map.addLayer(this.currentZD);
    },
    animateDone() {
      document.getElementById("popup").style.visibility = "visible";
    }
  },
  mounted() {
    this.changeToolbar();
    var currentRegionLayer;
    var xzqhdm = "469005115";
    this.map = BaseMap.BaseInitMap("pic-map");
    this.map.addLayer(BaseMap.img_DPCLayer);
    currentRegionLayer = BaseMap.BaseChangeRegionVector(
      this.map,
      xzqhdm,
      currentRegionLayer
    );
    BaseMap.BaseAddTruePoints(this.map, "#E58C2A");
    let sj_fileName = "echarts-map/province/json/hainan.json";
    this.requestAjax(sj_fileName, 2);
    this.city = "460100";
    //获得当前年份
    var _date = new Date();
    var tYear = _date.getFullYear();
    for (var i = tYear - 4; i <= tYear; i++) {
      //初始化加载年份时间
      this.years.push(i);
    }
    //默认年份为上一年度
    this.year = tYear - 1;
    //floatOnMap();

    // this.popup = new Overlay({
    //   element: document.getElementById("popup")
    // });
    // this.map.addOverlay(this.popup);
  }
};
</script>


<style scoped>
.div-table {
  z-index: 1;
  top: 0.5em;
  left: 1em;
}

.el-card__header {
  font-size: 16px;
  font-weight: bold;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 99.5%;
  height: 91.5%;
  /* margin-top: 11%; */
  background-color: #f7f7f7d1;
  overflow-y: auto;
  border-radius: 0px;
}

.year-column-l {
  /* position: absolute; */
  /* z-index: 9999999; */
  font-size: 16px;
  color: #303133;
  margin: 7px;
}

.xzq-column-l {
  /* position: absolute; */
  /* z-index: 9999999; */
  font-size: 16px;
  color: #303133;
  margin: 7px;
  /* margin-left: 1.8rem; */
}

.select-item-year {
  height: 35px !important;
  width: 100px !important;
}

.select-item-xzq {
  width: 160px;
  height: 35px !important;
}

.left-side {
  position: absolute;
  z-index: 9;
  width: 26%;
  min-width: 439px;
  height: 100%;
  /* color: white; */
  /* background-color: #f7f7f7d1; */
  /* margin-top: -0.1rem; */
}

.right-side {
  position: absolute;
  z-index: 9;
  right: 1px;
  width: 350px;
  height: 450px;
  visibility: hidden;
  font-size: 14px;
  /* opacity: 0.7; */
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
  background-color: white;
  /* z-index:10; */
}

.panelitem {
  /* opacity: 0.7; */
  background: none;
}

.card-title {
  font-size: 14px;
}
</style>
<style>
.el-table .cell {
  text-overflow: ellipsis;
  /*超出内容用省略号*/
  overflow: hidden;
  /*内容超出后隐藏*/
  white-space: nowrap;
  /*文本不进行换行*/
}

.el-image-viewer__close {
  color: red;
  top: 60px;
  right: 100px;
}
</style>