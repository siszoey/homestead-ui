<template>
  <div class="RightPanel">
    <div class="fui-panel" style="margin-top: 5px;">
      <div class="header fui-horizontal-layout">
        <div class="title" style="margin-left: 10px;">统计图</div>
      </div>
      <div class="fui-panel-content" style="padding:3px">
        <div class="fui-layout-horizontal">
          <div id="leftchart" style="height:30vh;flex:1"></div>
          <div id="rightchart" style="height:30vh;flex:1"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const echarts = require("echarts");
export default {
  name: "RightChart",
  data() {
    return {
      isVisible: true,
      projectCount: 0,
      buildArea: 0,
      investMoney: 0,
      title: "",
      projects: []
    };
  },
  mounted() {
    this.getdata(global.currentGraphic);
    eventBus.$on(global.event_changeGraphic, graphic => {
      this.getdata(graphic);
    });
  },
  methods: {
    getdata: function(graphic) {
      var xzqdm = "global.xzqdm";
      var xzqmc = "global.xzqmc";
      this.title = xzqmc;
      this.drawLeftChart();
      this.drawRightChart();
    },
    drawLeftChart: function() {
      let myChart = echarts.init(document.getElementById("leftchart"));
      let datas = [];
      let map = new Map([
        ["SL", "水利"],
        ["NY", "农业"],
        ["GT", "国土"],
        ["FG", "发改"]
      ]);
      let legends = [];
      map.forEach((value, key) => {
        legends.push(value);
        datas.push({
          name: value,
          value: this.projects.filter(d => d.Jsbm === key).length
        });
      });
      var colorList = [
        "#0290FC",
        "#00D299",
        "#FDA82A",
        "#F27070",
        "#FF0000",
        "#FE8463"
      ];
      this.setPieOption(
        myChart,
        "项目来源统计",
        datas,
        "项目来源",
        legends,
        colorList
      );
    },
    drawRightChart: function() {
      let myChart = echarts.init(document.getElementById("rightchart"));
      let datas = [];
      let legends = ["计划", "实施", "验收"];
      legends.forEach(c => {
        datas.push({
          name: c,
          value: this.projects.filter(d => d.Xmzt === c).length
        });
      });
      var colorList = ["#B54EEB", "#0066D2", "#32CFD5"];
      this.setPieOption(
        myChart,
        "项目进度统计",
        datas,
        "项目进度",
        legends,
        colorList
      );
    },
    setPieOption(chart, title, data, seriesName, legends, colorList) {
      chart.setOption({
        title: {
          text: title, //主标题
          x: "center", //x轴方向对齐方式
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          bottom: "bottom",
          data: legends,
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: seriesName,
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              normal: {
                color: function(params) {
                  //自定义颜色
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.RightPanel {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 600px;
  pointer-events: auto;
}
</style>