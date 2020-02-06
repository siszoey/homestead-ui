<template>
  <div id="RightPanel" class="RightPanel">
    <div class="panel">
      <div class="title" style="padding-top:10px;">{{content[0]}}</div>
      <div id="right_barchart" class="chart"></div>
      <div class="title">{{content[1]}}</div>
      <div id="right_piechart" class="chart"></div>

      <div class="title">● {{content[2]}}</div>
      <div class="content">{{content[3]}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    legends: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    content: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isVisible: true,
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
      ]
    };
  },
  watch: {
    legends: {
      deep: true, // 深度监听
      handler(newVal, oldVal) {
        this.drawPieChart();
        this.drawbarchart();
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
      this.drawPieChart();
      this.drawbarchart();
    });
  },
  methods: {
    drawPieChart: function() {
      let myChart = this.$echarts.init(
        document.getElementById("right_piechart")
      );
      let _this = this;
      let datas = [];
      let seriesname = this.content[1];
      for (var i = 0; i < this.legends.length; i++) {
        datas.push({
          name: this.legends[i],
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
          data: this.legends,
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
          data: this.legends,
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
  background-color: rgba($color: #111211, $alpha: 0.4);
  position: absolute;
  right: 0px;
  top: 0px;
  width: 400px;
  height: 100%;
  pointer-events: auto;
}

.panel {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  .title {
    color: white;
    font-size: 20px;
    padding-left: 10px;
    padding-bottom: 5px;
    padding-top: 40px;
    text-align: left;
  }
  .content {
    color: white;
    font-size: 25px;
    padding-left: 30px;
    text-align: left;
  }
}

.chart {
  width: 100%;
  height: 230px;
}
</style>