<template>
  <div id="app" style="width:100%;height:100%">
    <div class="left-side" id="leftPanel">
      <div style="text-align:center;background-color: #f7f7f7d1;">
        <el-switch
          style="height:50px;"
          inactive-text="各村/居用地情况统计排行"
          active-text
          v-model="hiddenToolbar"
          @change="changeToolbar()"
        ></el-switch>
      </div>
      <!-- <hr /> -->
      <el-card class="box-card" id="mapPanel">
        <div style="height:50%;overflow-y: auto;">
          <div class="text item" v-for="(item,index) in progressData" :key="index">
            <!-- <div v-for="o in 5" :key="o" class="text item"> -->
            <span class="demonstration">{{item.label}}</span>
            <span class="demonstration" style="float:right">
              <span class="color-box-blue"></span>实际用地
            </span>
            <br />
            <span class="demonstration">{{item.usedArea}}</span>
            <span class="demonstration" style="float:right">
              <span class="color-box-gray"></span>计划用地
            </span>
            <el-progress :percentage="item.percentage"></el-progress>
          </div>
        </div>
        <div style="height:50%;overflow-y: auto;margin-top: 10px;">
          <div class="text item">
            <el-table
              :data="tableData"
              style="width: 100%"
              class="panelitem"
              :row-class-name="tableRowClassName"
            >
              <el-table-column prop="xzq" label="行政区"></el-table-column>
              <el-table-column prop="jhyd" label="计划用地"></el-table-column>
              <el-table-column prop="sjyd" label="实际用地"></el-table-column>
              <el-table-column prop="szbl" label="所占比例"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
    </div>
    <div id="maplandindex" class="mapDiv"></div>
    <ToolBar id="toolbar" v-on:switchXzqh="zoomToXzqh"></ToolBar>
    <timeline></timeline>
  </div>
</template>

<script>
import echarts from "echarts";

import Region from "@/views/land/mixnis/region-mixin.js";
import jsonFileHandler from "@/libs/util.jsonfile.js";

import timeline from "../spatialData/components/timeline";
import BaseMap from "../spatialData/mapBase.js";
import ToolBar from "../spatialData/components/toolbar";

export default {
  name: "echart-map",
  mixins: [Region],
  props: {
    hiddenToolbar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [],
      progressData: [],
      years: [],
      cities: [],
      year: "",
      city: "",
      JSON_Data: [],
      xzqhdm: "",
      myFile: "420200",
      id: "echarts_" + new Date().getTime() + Math.floor(Math.random() * 1000),
      echartObj: null,
      radioList: {
        A: "1",
        B: "2",
        C: "3",
        D: "4",
        E: "5"
      },
      radioActive: "A",
      option: {
        title: {
          //text: "各县市用地情况统计排行",
          top: "10%",
          left: "1%",
          textStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#000000"
          }
        },
        tooltip: {
          padding: 0,
          backgroundColor: "transparent",
          formatter: params => {
            // params.data
            return "";
          }
        },
        legend: {
          orient: "vertical",
          top: "9%",
          left: "5%",
          icon: "circle",
          data: [],
          selectedMode: "single",
          selected: {},
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 30,
          inactiveColor: "#b6d7ff",
          textStyle: {
            color: "#ec808d",
            fontSize: 14,
            fontWeight: 300,
            padding: [0, 0, 0, 15]
          }
        },
        visualMap: {
          min: 0,
          max: 500,
          show: false,
          splitNumber: 5,
          inRange: {
            color: [
              "#FACD91",
              "#74DFB2",
              "#81D3F8",
              "#768FDE",
              "#e9969f"
            ].reverse()
          },
          textStyle: {
            color: "#fff"
          }
        },
        geo: {
          map: "武汉市",
          label: {
            normal: {
              show: true,
              color: "#000"
            },
            emphasis: {
              show: true,
              color: "#fff"
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "#8db200",
              borderColor: "#6367ad",
              borderWidth: 1
            },
            emphasis: {
              areaColor: "#feb6aa" // hover效果
            }
          },
          left: "5%",
          right: "5%",
          top: "5%",
          bottom: "5%"
        },
        series: [
          {
            name: "年度总项目数据查询",
            type: "map",
            geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
            data: []
          }
        ]
      }
    };
  },
  components: {
    timeline,
    ToolBar
  },
  created() {
    this.initData();
  },
  mounted() {
    this.changeToolbar();
    //获得当前年份
    var _date = new Date();
    var tYear = _date.getFullYear();
    for (var i = tYear - 4; i <= tYear; i++) {
      //初始化加载年份时间
      this.years.push(i);
    }
    //默认年份为上一年度
    this.year = tYear - 1;
    // console.log(this.years);
    // this.echartObj = echarts.init(document.getElementById(this.id));
    this.initMap();
  },
  methods: {
    initData() {
      this.getRegions().then(datas => {
        this.cities = datas;
      });
      let code = this.getRegionCode();
      this.xzqhdm = code;
      jsonFileHandler
        .getData("test-data/map/landIndex.json", "code", code)
        .then(datas => {
          this.tableData = datas.tableData;
          this.progressData = datas.progressData;
        });
    },
    //切换面板显示
    changeToolbar() {
      if (this.hiddenToolbar) {
        document.getElementById("mapPanel").style.display = "block";
        document.getElementById("leftPanel").style.height = "100%";
      } else {
        document.getElementById("mapPanel").style.display = "none";
        document.getElementById("leftPanel").style.height = "50px";
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

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    initMap: async function() {
      await BaseMap.InitGeoServer(this.xzqhdm);
      this.map = BaseMap.BaseInitMap("maplandindex");
      this.map.addLayer(BaseMap.img_wLayer);

      BaseMap.BaseInitLayer(this.map, null, "XZQ", null, null, "5");
      BaseMap.BaseAddTruePoints(this.map, "#F28965");
    },
    //初始化加载和注册Map
    initMaps(jsonData) {
      this.echartObj = echarts.init(document.getElementById(this.id));
      this.JSON_Data = jsonData;
      echarts.registerMap("武汉市", jsonData);
      this.echartObj.setOption(this.getOptions(), true);
      console.log(this.JSON_Data);
    },
    changeCity(value) {},
    getOptions() {
      this.setOptions("legend", {
        //data: Object.values(this.radioList),
        selected: (list => {
          const obj = {};
          Object.keys(list).map((item, index) => {
            obj[list[item]] = item === this.radioActive;
          });
          return obj;
        })(this.radioList)
      });
      this.setOptions(
        "series",
        (() => {
          const arr = [];
          Object.values(this.radioList).map((item, index) => {
            arr[this.radioList[this.radioActive] === item ? "unshift" : "push"](
              {
                name: item,
                type: "map",
                geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
                data: this.getSeriesData(item)
              }
            );
          });
          return arr;
        })()
      );
      return this.option;
    },
    getSeriesData(item) {
      return this.radioList[this.radioActive] === item
        ? this.JSON_Data.features.map(item => {
            return {
              name: item.properties.name,
              value: Math.ceil(Math.random() * 500),
              obj: {
                a: Math.ceil(Math.random() * 500),
                b: Math.ceil(Math.random() * 500),
                c: Math.ceil(Math.random() * 500),
                d: Math.ceil(Math.random() * 500)
              }
            };
          })
        : [];
    },
    setOptions(objKey, objVal) {
      if (
        this.option[objKey] &&
        typeof this.option[objKey] === "object" &&
        !Array.isArray(this.option[objKey])
      ) {
        this.option[objKey] = Object.assign(this.option[objKey], objVal);
      } else {
        this.option[objKey] = objVal;
      }
      this.$set(this.option, objKey, this.option[objKey]);
    }
  }
};
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.color-box-blue {
  width: 13px;
  height: 13px;
  display: inline-flex;
  margin-left: 5px;
  margin-right: 5px;
  background-color: #409eff;
}

.color-box-gray {
  width: 13px;
  height: 13px;
  display: inline-flex;
  margin-left: 5px;
  margin-right: 5px;
  background-color: #ebeef5;
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

.left-side {
  position: absolute;
  z-index: 99;
  /* width: 25%; */
  min-width: 435px;
  height: 100%;
  color: white;

  /* background-color: #f7f7f7d1; */
  /* margin-top: -0.1rem; */
}

.year-column-x {
  /* position: absolute; */
  z-index: 9999999;
  font-size: 16px;
  color: #303133;
  margin: 7px;
  /* margin-top: 2.8%; */
}

.xzq-column-x {
  /* position: absolute; */
  z-index: 9999999;
  font-size: 16px;
  color: #303133;
  margin: 7px;
  /* margin-left: 1.8rem; */
  /* margin-top: 2.8%; */
}

.panelitem {
  /* opacity: 0.7; */
  background: none;
}

.select-item-year {
  height: 35px !important;
  width: 100px !important;
  /* margin-top: 5%; */
}

.select-item-xzq {
  height: 35px !important;
  width: 160px;
  /* margin-top: 2.5%; */
}

.o-echarts {
  min-width: 30px;
  min-height: 30px;
  width: 100%;
  /* height: 100%; */
  margin-top: -10px;
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

.card-title {
  font-size: 14px;
}

.el-card__body {
  height: 91%;
}
</style>