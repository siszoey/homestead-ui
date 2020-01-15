<template>
  <div id="app" style="width:97%;height:96%">
    <div class="left-side">
      <!-- <hr /> -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="card-title">各县市用地情况统计排行</span>
        </div>
        <div class="text item">
          <label class="year-column-x">年份</label>
          <el-select v-model="year" class="select-item-year panelitem">
            <el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <label class="xzq-column-x">行政区</label>
          <el-select v-model="city" class="select-item-xzq panelitem" v-on:change="changeCity(city)">
            <el-option
              v-for="item in cities"
              :key="item.id"
              :label="item.properties.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="text item">
          <!-- <div v-for="o in 5" :key="o" class="text item"> -->
          <span class="demonstration">龙华区（亩）</span>
          <span class="demonstration" style="float:right">
            <span class="color-box-blue"></span>实际用地
          </span>
          <br />
          <span class="demonstration">1518.69</span>
          <span class="demonstration" style="float:right">
            <span class="color-box-gray"></span>计划用地
          </span>
          <el-progress :percentage="11"></el-progress>
        </div>
        <div class="text item">
          <!-- <div v-for="o in 5" :key="o" class="text item"> -->
          <span class="demonstration">美兰区（亩）</span>
          <span class="demonstration" style="float:right">
            <div class="color-box-blue"></div>实际用地
          </span>
          <br />
          <span class="demonstration">76564.45</span>
          <span class="demonstration" style="float:right">
            <div class="color-box-gray"></div>计划用地
          </span>
          <el-progress :percentage="67"></el-progress>
        </div>
        <div class="text item">
          <!-- <div v-for="o in 5" :key="o" class="text item"> -->
          <span class="demonstration">琼山区（亩）</span>
          <span class="demonstration" style="float:right">
            <div class="color-box-blue"></div>实际用地
          </span>
          <br />
          <span class="demonstration">647.21</span>
          <span class="demonstration" style="float:right">
            <div class="color-box-gray"></div>计划用地
          </span>
          <el-progress :percentage="21"></el-progress>
        </div>
        <div class="text item">
          <!-- <div v-for="o in 5" :key="o" class="text item"> -->
          <span class="demonstration">秀英区（亩）</span>
          <span class="demonstration" style="float:right">
            <div class="color-box-blue"></div>实际用地
          </span>
          <br />
          <span class="demonstration">9776.88</span>
          <span class="demonstration" style="float:right">
            <div class="color-box-gray"></div>计划用地
          </span>
          <el-progress :percentage="35"></el-progress>
        </div>
        <div class="text item">
          <!-- <div v-for="o in 5" :key="o" class="text item"> -->
          <span class="demonstration">琼山区（亩）</span>
          <span class="demonstration" style="float:right">
            <div class="color-box-blue"></div>实际用地
          </span>
          <br />
          <span class="demonstration">543.97</span>
          <span class="demonstration" style="float:right">
            <div class="color-box-gray"></div>计划用地
          </span>
          <el-progress :percentage="15"></el-progress>
        </div>
        <div class="text item">
          <el-table :data="tableData" style="width: 100%" class="panelitem" :row-class-name="tableRowClassName">
            <el-table-column prop="xzq" label="行政区"></el-table-column>
            <el-table-column prop="jhyd" label="计划用地"></el-table-column>
            <el-table-column prop="sjyd" label="实际用地"></el-table-column>
            <el-table-column prop="szbl" label="所占比例"></el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
    <div id="maplandindex" class="mapDiv"></div>
    <timeline></timeline>
  </div>
</template>

<script>
import echarts from "echarts";
// import JSON_WHS from "@/plugin/echarts-map/city/json/hubei/420100.json"; //武汉市
// import JSON_HSS from "@/plugin/echarts-map/city/json/hubei/420200.json"; //黄石市
// import JSON_SYS from "@/plugin/echarts-map/city/json/hubei/420300.json"; //十堰市
// import JSON_YCS from "@/plugin/echarts-map/city/json/hubei/420500.json"; //宜昌市
// import JSON_XYS from "@/plugin/echarts-map/city/json/hubei/420600.json"; //襄阳市
// import JSON_EZS from "@/plugin/echarts-map/city/json/hubei/420700.json"; //鄂州市
// import JSON_JMS from "@/plugin/echarts-map/city/json/hubei/420800.json"; //荆门市
// import JSON_XGS from "@/plugin/echarts-map/city/json/hubei/420900.json"; //孝感市
// import JSON_JZS from "@/plugin/echarts-map/city/json/hubei/421000.json"; //荆州市
// import JSON_HGS from "@/plugin/echarts-map/city/json/hubei/421100.json"; //黄冈市
// import JSON_XNS from "@/plugin/echarts-map/city/json/hubei/421200.json"; //咸宁市
// import JSON_SZS from "@/plugin/echarts-map/city/json/hubei/421300.json"; //随州市
// import JSON_ESTJZMZZZZ from "@/plugin/echarts-map/city/json/hubei/422800.json"; //恩施土家族苗族自治州
// import JSON_HBSZXXS from "@/plugin/echarts-map/city/json/hubei/429000.json"; //湖北省直辖县市

import JSON_WHS from "@/plugin/echarts-map/city/json/hainan/460100.json"; //海口市
import JSON_HSS from "@/plugin/echarts-map/city/json/hainan/460200.json"; //三亚市
import JSON_SYS from "@/plugin/echarts-map/city/json/hainan/460300.json"; //三沙市
import JSON_YCS from "@/plugin/echarts-map/city/json/hainan/469000.json"; //其它自治市县

import timeline from "../spatialData/components/timeline";
import BaseMap from "../spatialData/mapBase.js";

export default {
  name: "echart-map",
  data() {
    return {
      tableData: [
        {
          xzq: "龙华区",
          jhyd: "9460.81",
          sjyd: "1518.69",
          szbl: "11%"
        },
        {
          xzq: "美兰区",
          jhyd: "75765.81",
          sjyd: "76564.45",
          szbl: "67%"
        },
        {
          xzq: "琼山区",
          jhyd: "3243.81",
          sjyd: "647.21",
          szbl: "21%"
        },
        {
          xzq: "秀英区",
          jhyd: "9875.81",
          sjyd: "9776.88",
          szbl: "35%"
        },
        {
          xzq: "琼山区",
          jhyd: "7657.81",
          sjyd: "543.97",
          szbl: "15%"
        }
      ],
      years: [],
      cities: [],
      year: "",
      city: "",
      JSON_Data: [],
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
            // `<table class="map__tooltip o_font20">
            //                         <thead>
            //                            <tr>
            //                                <th>行政区</th>
            //                                <th>计划用地</th>
            //                                <th>实际用地</th>
            //                                <th>所占比例</th>
            //                             </tr>
            //                         </thead>
            //                         <tbody>
            //                             <tr>
            //                                 <th>${params.data.obj.a}</th>
            //                                 <th>${params.data.obj.b}</th>
            //                                 <th>${params.data.obj.c}</th>
            //                                 <th>${params.data.obj.d}</th>
            //                              </tr>
            //                         </tbody>
            //                     </table>`;
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
    timeline
  },
  mounted() {
    //获取海南市级行政区
    let sj_fileName = "echarts-map/province/json/hainan.json";
    this.requestAjax(sj_fileName, 2);
    //获取行政区
    // let cities = [
    //   {
    //     value: "420100",
    //     label: "武汉市"
    //   },
    //   {
    //     value: "420200",
    //     label: "黄石市"
    //   },
    //   {
    //     value: "420300",
    //     label: "十堰市"
    //   },
    //   {
    //     value: "420500",
    //     label: "宜昌市"
    //   },
    //   {
    //     value: "420600",
    //     label: "襄阳市"
    //   },
    //   {
    //     value: "420700",
    //     label: "鄂州市"
    //   },
    //   {
    //     value: "420800",
    //     label: "荆门市"
    //   },
    //   {
    //     value: "420900",
    //     label: "孝感市"
    //   },
    //   {
    //     value: "421000",
    //     label: "荆州市"
    //   },
    //   {
    //     value: "421100",
    //     label: "黄冈市"
    //   },
    //   {
    //     value: "421200",
    //     label: "咸宁市"
    //   },
    //   {
    //     value: "421300",
    //     label: "随州市"
    //   },
    //   {
    //     value: "422800",
    //     label: "恩施土家族苗族自治州"
    //   },
    //   {
    //     value: "429000",
    //     label: "湖北省直辖县市"
    //   }
    // ];
    // this.cities = cities;
    //默认行政区为海口市
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
    console.log(this.years);
    // this.echartObj = echarts.init(document.getElementById(this.id));
    var currentRegionLayer;
    var xzqhdm = "469005115201";
    this.map = BaseMap.BaseInitMap("maplandindex");
    this.map.addLayer(BaseMap.img_wLayer);

    currentRegionLayer = BaseMap.BaseChangeRegionVector(
      this.map,
      xzqhdm,
      currentRegionLayer
    );
    BaseMap.BaseAddTruePoints(this.map, "#F28965");
  },
  methods: {
    //ajax获取本地json文件行政区划
    requestAjax(fileName, level) {
      let _this = this;
      this.$axios
        .get(fileName)
        //then获取成功；response成功后的返回值（对象）
        .then(response => {
          console.log(response.data.features); //[0].properties.name
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
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    //初始化加载和注册Map
    initMaps(jsonData) {
      this.echartObj = echarts.init(document.getElementById(this.id));
      this.JSON_Data = jsonData;
      echarts.registerMap("武汉市", jsonData);
      this.echartObj.setOption(this.getOptions(), true);
      console.log(this.JSON_Data);
    },
    changeCity(value) {
      console.log(value);
      switch (value) {
        // case "420100":
        //   this.initMaps(JSON_WHS);
        //   break;
        // case "420200":
        //   this.initMaps(JSON_HSS);
        //   break;
        // case "420300":
        //   this.initMaps(JSON_SYS);
        //   break;
        // case "420500":
        //   this.initMaps(JSON_YCS);
        //   break;
        // case "420600":
        //   this.initMaps(JSON_XYS);
        //   break;
        // case "420700":
        //   this.initMaps(JSON_EZS);
        //   break;
        // case "420800":
        //   this.initMaps(JSON_JMS);
        //   break;
        // case "420900":
        //   this.initMaps(JSON_XGS);
        //   break;
        // case "421000":
        //   this.initMaps(JSON_JZS);
        //   break;
        // case "421100":
        //   this.initMaps(JSON_HGS);
        //   break;
        // case "421200":
        //   this.initMaps(JSON_XNS);
        //   break;
        // case "421300":
        //   this.initMaps(JSON_SZS);
        //   break;
        // case "422800":
        //   this.initMaps(JSON_ESTJZMZZZZ);
        //   break;
        // case "429000":
        //   this.initMaps(JSON_HBSZXXS);
        //   break;
        case "460100":
          this.initMaps(JSON_WHS);
          break;
        case "460200":
          this.initMaps(JSON_HSS);
          break;
        case "460300":
          this.initMaps(JSON_SYS);
          break;
        case "469000":
          this.initMaps(JSON_YCS);
          break;
        default:
          this.initMaps("");
          break;
      }
      //this.initMaps();
    },
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
  height: 99.5%;
  /* margin-top: 11%; */
  background-color: #f7f7f7d1;
  overflow-y: auto;
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

.panelitem{
  opacity: 0.7;
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

.card-title{
  font-size: 14px;
}
</style>