<template>
  <div>
    <div id="RightPanel" class="RightPanel">
      <div class="tabpanel">
        <div class="tabitem" v-for="(item,i) in tabs" :id="setTabId(item)" @click="changePanel(item)">{{contents[item][0]}}</div>
      </div>

      <div class="panel">
        <div class="title" style="padding-top:20px;">● {{content[2]}}</div>
        <div class="content">{{content[3]+content[4]}}</div>
        <div class="content" v-for="(item,i) in legend">{{item+":"}}{{data[i]+content[4]}}</div>
        <div class="title">{{content[0]}}</div>
        <div id="right_barchart" class="chart"></div>
        <div class="title">{{content[1]}}</div>
        <div id="right_piechart" class="chart"></div>
      </div>
    </div>
    <div id="PanelSwitch" class="PanelSwitch" @click="switchPanel">
      <el-image :src="arrowimage" z-index:9999></el-image>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ChartIndex: {
      type: Number,
      default: 0
    },
    tabs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartindex: 0,
      isVisible: true,
      arrowimage: "/image/chart/rightarrow.png",
      projectCount: 0,
      buildArea: 0,
      investMoney: 0,
      title: "",
      projects: [],
      colorList: [
        "#12B1EB",
        "#29EEDF",
        "#45B043",
        "#F2B705",
        "#800080",
        "#6A5ACD"
      ],
      legend: [],
      data: [],
      content: [],
      legends: [
        ["农村宅基地", "闲置宅基地", "未批先建", "已批已建", "已批未建"],
        [
          "农村住宅",
          "季节性闲置住宅",
          "常年闲置住宅",
          "盘活利用住宅",
          "一户多宅",
          "一宅超限"
        ],
        ["农用地", "建设用地", "未利用地"],
        [
          "一般耕地",
          "保护林地",
          "基本农田",
          "乡村建设用地",
          "旅游建设用地",
          "后备林地"
        ]
      ],
      datas: [
        [57, 22, 3, 34, 5],
        [53, 12, 1, 34, 10, 2],
        [1764.5, 432.5, 374.2],
        [38.5, 1246, 1341.2, 276.5, 244.8, 1585.9]
      ],
      contents: [
        [
          "农村宅基地情况统计",
          "农村宅基地各类型所占比例",
          "东坡村农村宅基地情况说明",
          "宅基地数量总计：121",
          "(宗)"
        ],
        [
          "农村住宅情况统计",
          "农村住宅各类型所占比例",
          "东坡村农村住宅情况说明",
          "农村住宅数量总计：112",
          "(套)"
        ],
        [
          "土地利用现状统计",
          "各土地类型所占比例",
          "东坡村土地利用现状情况说明",
          "土地利用现状面积总计：2463.12",
          "(亩)"
        ],
        [
          "村庄规划情况统计",
          "各土地类型所占比例",
          "东坡村村庄规划情况说明",
          "村庄规划面积总计：3562.9",
          "(亩)"
        ]
      ]
    };
  },
  watch: {
    ChartIndex: {
      deep: true, // 深度监听
      handler(newVal, oldVal) {
        if (this.ChartIndex == -1) {
          //删除了一个tab
          if (this.tabs.length > 0) {
            //还有tab，显示上一个tab
            this.chartindex = this.tabs[this.tabs.length - 1];
          } else {
            //没有tab了，显示第一个tab
            this.chartindex = 0;
          }
        } else {
          //显示新增的tab
          this.chartindex = this.ChartIndex;
        }

        this.initChart();
      }
    }
  },
  mounted() {
    //alert(document.getElementById("piechart").style.height);
    this.$nextTick(function() {
      var height =
        document.getElementById("RightPanel").clientHeight * 0.32 + "px";
      document.getElementById("right_barchart").style.height = height;
      document.getElementById("right_piechart").style.height = height;
      this.initChart();
      this.switchPanel();
    });
  },
  methods: {
    setTabId(index) {
      return "tabitem_" + index;
    },
    initChart() {
      this.$nextTick(function() {
        this.legend = this.legends[this.chartindex];
        this.data = this.datas[this.chartindex];
        this.content = this.contents[this.chartindex];
        if (this.tabs.length > 0) {
          for (var i = 0; i < this.tabs.length; i++) {
            document.getElementById(
              "tabitem_" + this.tabs[i]
            ).style.backgroundImage = "";
          }
          //列表不为空，高亮需要显示的tab
          document.getElementById(
            "tabitem_" + this.chartindex
          ).style.backgroundImage =
            "linear-gradient(90deg, rgba(144, 250, 254, 0), #57f3fc)";
        }
        this.drawPieChart();
        this.drawbarchart();
      });
    },
    changePanel: function(index) {
      this.chartindex = index;
      this.initChart();
    },
    switchPanel: function() {
      this.isVisible = !this.isVisible;
      this.$emit("switchPanel", this.isVisible);
      if (!this.isVisible) {
        this.arrowimage = "/image/chart/leftarrow.png";
        document.getElementById("RightPanel").style.visibility = "hidden";
      } else {
        this.arrowimage = "/image/chart/rightarrow.png";
        document.getElementById("PanelSwitch").style.backgroundColor = "";
        document.getElementById("RightPanel").style.visibility = "visible";
      }
    },
    drawPieChart: function() {
      let myChart = this.$echarts.init(
        document.getElementById("right_piechart")
      );
      let _this = this;
      let datas = [];
      let seriesname = this.content[1];
      for (var i = 0; i < this.legend.length; i++) {
        datas.push({
          name: this.legend[i],
          value: this.data[i]
        });
      }
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: seriesname,
            type: "pie",
            top: 0,
            left: 0,
            data: datas,
            radius: ["50%", "70%"],
            center: ["50%", "50%"],
            label: {
              formatter: "{b}\n{d}%"
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  //自定义颜色
                  return _this.colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    drawbarchart: function() {
      let myChart = this.$echarts.init(
        document.getElementById("right_barchart")
      );
      let _this = this;
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: this.legend,
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
        yAxis: {
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
        xAxis: {
          type: "category",
          data: this.legend,
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
            type: "bar",
            data: this.data,
            label: {
              show: true
              //   position: "insideRight"
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  //自定义颜色
                  return _this.colorList[params.dataIndex];
                }
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
.RightPanel {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 360px;
  height: 100%;
  pointer-events: auto;
  overflow-x: hidden;
  overflow-y: auto;
}

.PanelSwitch {
  position: absolute;
  right: 20px;
  top: 30px;
  width: 30px;
  height: 30px;
  pointer-events: auto;
}

.panel {
  background-color: rgba($color: #111211, $alpha: 0.4);
  box-sizing: border-box;
  margin-left: 30px;
  width: 330px;
  height: 100%;
  .title {
    color: #fff;
    font-size: 14px;
    padding-left: 10px;
    padding-bottom: 5px;
    padding-top: 30px;
    text-align: left;
  }
  .content {
    color: #fff;
    font-size: 14px;
    padding-left: 30px;
    text-align: left;
  }
}

.chart {
  width: 100%;
  height: 230px;
}

.tabpanel {
  background-image: linear-gradient(
    90deg,
    rgba(1, 15, 25, 0.48) 14%,
    rgba(0, 10, 18, 0.39) 79%,
    rgba(0, 8, 16, 0.06)
  );
  color: #fff;
  font-size: 14px;
  position: absolute;
  width: 35px;
  right: 330px;
  top: 100px;
  border-radius: 0 10px 10px 0;
}

.tabitem {
  display: flex;
  float: left;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  cursor: pointer;
  writing-mode: vertical-lr;
  writing-mode: tb-lr;
}
</style>