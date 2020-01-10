<template>
  <div class="container">
    <div id="mapmappanel" class="mapDiv"></div>

    <div class="leftcontainer">
      <div class="panel" style="height:20%;margin-top:0px;">
        <div class="title">辖区行政单位</div>
        <div class="layout-h" style="height:100px">
          <div class="xzq-item">
            <div class="label">17</div>
            <div class="unit">市（州、林区）</div>
          </div>
          <div class="xzq-item">
            <div class="label">103</div>
            <div class="unit">县（市、区）</div>
          </div>
          <div class="xzq-item">
            <div class="label">1249</div>
            <div class="unit">乡镇（街道）</div>
          </div>
          <div class="xzq-item">
            <div class="label" style="color:rgb(0,216,255)">26085</div>
            <div class="unit">行政村</div>
          </div>
        </div>
      </div>

      <div class="panel" style="height:50%">
        <div class="title">农村宅基地面积及户数统计</div>

        <div class="layout-h" style="height:120px">
          <div class="zjdmj-item">
            <div class="icon">
              <img src="../assets/农村宅基地面积.png" />
            </div>
            <div class="content">
              <div class="label">农村宅基地面积</div>
              <div>
                <div class="value">228</div>
                <div class="unit">万亩</div>
              </div>
            </div>
          </div>
          <div class="zjdmj-item">
            <div class="icon">
              <img src="../assets/农村宅基地数量.png" />
            </div>
            <div class="content">
              <div class="label">农村住宅数量</div>
              <div>
                <div class="value">1103</div>
                <div class="unit">万</div>
              </div>
            </div>
          </div>
        </div>

        <div class="layout-h" style="height:120px">
          <div class="zjdmj-item">
            <div class="icon">
              <img src="../assets/农业人口总数.png" />
            </div>
            <div class="content">
              <div class="label">农业人口总数</div>
              <div>
                <div class="value">2349.05</div>
                <div class="unit">万</div>
              </div>
            </div>
          </div>
          <div class="zjdmj-item">
            <div class="icon">
              <img src="../assets/总户数.png" />
            </div>
            <div class="content">
              <div class="label">总户数</div>
              <div>
                <div class="value">886.2</div>
                <div class="unit">万</div>
              </div>
            </div>
          </div>
        </div>

        <div class="layout-h" style="height:120px">
          <div class="zjdmj-item">
            <div class="icon">
              <img src="../assets/户均宅基地面积.png" />
            </div>
            <div class="content">
              <div class="label">户均宅基地面积</div>
              <div>
                <div class="value">140</div>
                <div class="unit">平方米</div>
              </div>
            </div>
          </div>
          <div class="zjdmj-item">
            <div class="icon">
              <img src="../assets/人均宅基地面积.png" />
            </div>
            <div class="content">
              <div class="label">人均宅基地面积</div>
              <div>
                <div class="value">45</div>
                <div class="unit">平方米</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel" style="height:30%;">
        <div class="title">农村闲置宅基地和闲置住宅统计</div>
        <div class="xzzjd-container" style="margin-top:10px">
          <div class="xzzjd-item">
            <span class="label">农村闲置住宅</span>
            <span class="value">174</span>
            <span class="unit">万套</span>
          </div>
        </div>

        <div class="xzzjd-item" style="margin-top:10px">
          <span class="label">农村闲置宅基地</span>
          <span class="value">11.4</span>
          <span class="unit">万亩</span>
        </div>

        <el-progress
          :stroke-width="8"
          :percentage="15.8"
          color="rgb(242,183,5)"
          style="margin-top:10px;text-align:left"
        ></el-progress>

        <div class="xzzjd-item" style="margin-top:10px">
          <span class="label">农村闲置住宅</span>
          <span class="value">174</span>
          <span class="unit">万套</span>
        </div>

        <el-progress
          :stroke-width="8"
          :percentage="5"
          color="rgb(41,238,223)"
          style="margin-top:10px;text-align:left"
        ></el-progress>
      </div>
    </div>

    <div class="rightcontainer">
      <div class="panel" style="height:30%;margin-top:0px;">
        <div class="title">农村闲置宅基地开发利用情况</div>
        <div id="piechart" style="width:100%;height:210px;"></div>
      </div>

      <div class="panel" style="height:35%">
        <div class="title">农村宅基地违法用地统计</div>
        <div id="barchart" style="width:100%;height:220px;"></div>
      </div>

      <div class="panel" style="height:35%;">
        <div class="title">农村宅基地审批统计</div>
        <div class="zjdsp-container">
          <div class="zjdsp-item">
            <div class="icon">
              <img src="../assets/原址新建.png" />
            </div>
            <div class="content">
              <div class="label">原址新建</div>
              <div>
                <span class="value">124</span>
                <span class="unit">宗</span>
                <span class="value split">/</span>
                <span class="value">321</span>
                <span class="unit">亩</span>
              </div>
            </div>
          </div>
          <div class="zjdsp-item">
            <div class="icon">
              <img src="../assets/改扩建.png" />
            </div>
            <div class="content">
              <div class="label">改扩建</div>
              <div>
                <span class="value">2319</span>
                <span class="unit">宗</span>
                <span class="value split">/</span>
                <span class="value">498</span>
                <span class="unit">亩</span>
              </div>
            </div>
          </div>
        </div>
        <div class="zjdsp-container">
          <div class="zjdsp-item">
            <div class="icon">
              <img src="../assets/异址新建.png" />
            </div>
            <div class="content">
              <div class="label">异址新建</div>
              <div>
                <span class="value">1140</span>
                <span class="unit">宗</span>
                <span class="value split">/</span>
                <span class="value">264</span>
                <span class="unit">亩</span>
              </div>
            </div>
          </div>
          <div class="zjdsp-item">
            <div class="icon">
              <img src="../assets/宅基地流转.png" />
            </div>
            <div class="content">
              <div class="label">宅基地流转</div>
              <div>
                <span class="value">1244</span>
                <span class="unit">宗</span>
                <span class="value split">/</span>
                <span class="value">211</span>
                <span class="unit">亩</span>
              </div>
            </div>
          </div>
        </div>
        <div class="zjdsp-container">
          <div class="zjdsp-item">
            <div class="icon">
              <img src="../assets/改扩建.png" />
            </div>
            <div class="content">
              <div class="label">宅基地退出</div>
              <div>
                <span class="value">974</span>
                <span class="unit">宗</span>
                <span class="value split">/</span>
                <span class="value">186</span>
                <span class="unit">亩</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "ol/ol.css";
import BaseMap from "../spatialData/mapBase.js";
import { Map, View } from "ol";
import { defaults } from "ol/control";
import TileLayer from "ol/layer/Tile";

export default {
  name: "mappanel",
  data() {
    return {
      map: null,
      xzqhdm: "42"
    };
  },
  mounted() {
    this.map = BaseMap.BaseInitMap("mapmappanel");
    this.map.addLayer(BaseMap.img_wLayer);
    var Region_Layer = BaseMap.BaseChangeRegionVector(this.map, this.xzqhdm);

    this.drawPieChart();
    this.drawbarchart();
  },
  methods: {
    drawPieChart: function() {
      let myChart = this.$echarts.init(document.getElementById("piechart"));
      let datas = [];
      let legends = ["民宿", "家庭工坊", "手工作坊", "其它"];
      let seriesname = "住宅开发利用情况";
      legends.forEach(c => {
        datas.push({
          name: c,
          value: 5
        });
      });
      let colorList = ["#12B1EB", "#29EEDF", "#45B043", "#F2B705"];
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right", //可设定图例在左、右、居中
          y: "center", //可设定图例在上、下、居中
          right: 0,
          data: legends,
          align: "left",
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: seriesname,
            type: "pie",
            top: 0,
            left: 0,
            data: datas,
            radius: ["50%", "70%"],
            center: ["30%", "50%"],
            label: {
              formatter: "{b}: {d}%"
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  //自定义颜色
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    drawbarchart: function() {
      let myChart = this.$echarts.init(document.getElementById("barchart"));
      let ydata = ["一户多宅", "违法建筑", "违法占地"];
      let legends = ["未处理", "已处理", "其它"];
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: legends,
          y: "bottom",
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          top: 10,
          bottom: 30,
          left: "3%",
          right: "4%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#fff"
          },
          splitLine: {
            //网格线
            lineStyle: {
              type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
              opacity: 0.5
            },
            show: true //隐藏或显示
          }
        },
        yAxis: {
          type: "category",
          data: ydata,
          nameTextStyle: {
            color: "#fff"
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#fff"
          }
        },
        series: [
          {
            name: "未处理",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight"
            },
            data: [10, 10, 20],
            itemStyle: {
              normal: {
                color: "rgb(42,115,201)"
              }
            }
          },
          {
            name: "已处理",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight"
            },
            data: [20, 30, 30],
            itemStyle: {
              normal: {
                color: "rgb(18,177,235)"
              }
            }
          },
          {
            name: "其它",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight"
            },
            data: [10, 10, 10],
            itemStyle: {
              normal: {
                color: "#45B043"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
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
  text-align: center;
  position: relative;
  user-select: none;
  &::v-deep .el-progress__text {
    color: white;
  }
  &::v-deep .el-progress-bar__outer {
    background-color: rgba(238, 238, 245, 0.5);
  }
  &::v-deep .el-progress__text {
    color: white;
  }
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
.leftcontainer {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 30%;
  height:96%;
}
.rightcontainer {
  position: absolute;
  right: 30px;
  top: 10px;
  width: 30%;
  height:96%;
}
.panel {
  background: url("../assets/panel-rectangle.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
  margin-top: 10px;
  .title {
    color: white;
    font-size: 20px;
    text-align: left;
  }
}
.layout-h {
  display: flex;
  justify-content: start;
  align-items: center;
}
.xzq-item {
  flex: 1;
  text-align: center;
  .label {
    color: rgb(107, 160, 243);
    font-size: 32px;
  }
  .unit {
    color: white;
    font-size: 14px;
  }
}
.zjdmj-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .icon {
    width: 68px;
    height: 68px;
    padding: 4px;
    box-sizing: border-box;
    float: left;
    img {
      width: 60px;
    }
  }
  .content {
    float: left;
    margin-left: 5px;
    text-align: left;
    .label {
      color: white;
      font-size: 16px;
    }
    .value {
      display: inline-block;
      color: rgb(107, 160, 243);
      font-size: 32px;
    }
    .unit {
      display: inline-block;
      color: white;
      font-size: 14px;
      margin-left: 3px;
    }
  }
}
.xzzjd-container {
  border: 1px solid rgb(83, 101, 84);
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 5px 5px 5px 10px;
}
.xzzjd-item {
  text-align: left;
  line-height: 30px;
  height: 30px;
  .label {
    display: inline-block;
    color: white;
    font-size: 16px;
  }
  .value {
    display: inline-block;
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
  }
  .unit {
    display: inline-block;
    color: white;
    font-size: 14px;
    margin-left: 3px;
  }
}
.zjdsp-container {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 80px;
  .zjdsp-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .icon {
      width: 50px;
      height: 50px;
      padding: 3px;
      box-sizing: border-box;
      float: left;
      img {
        width: 44px;
      }
    }
    .content {
      float: left;
      margin-left: 8px;
      text-align: left;
      .label {
        color: white;
        font-size: 16px;
      }
      .value {
        display: inline-block;
        color: white;
        font-weight: bold;
        font-size: 16px;
      }
      .split {
        margin-left: 3px;
        margin-right: 3px;
      }
      .unit {
        display: inline-block;
        color: white;
        font-size: 14px;
        margin-left: 3px;
      }
    }
  }
}
</style>