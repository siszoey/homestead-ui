<template>
  <div>
    <div class="wrap-top">
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="grid-content bg-white">
            <p class="header-title">全省乡镇数量</p>
            <el-row class="header-info">
              <el-col :span="8">
                <p class="areaName">全省乡镇数量</p>
                <p class="areaNum">{{provinceData.areaNum}}</p>
              </el-col>
              <el-col
                :span="8"
                style="border-left: 1px solid #9e9e9e7a;
                    border-right: 1px solid #9e9e9e7a;"
              >
                <p class="townName">乡(数量)</p>
                <p class="townNum">{{provinceData.townNum}}</p>
              </el-col>
              <el-col :span="8">
                <p class="villageName">镇(数量)</p>
                <p class="villageNum">{{provinceData.villageNum}}</p>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-white">
            <p class="header-title">全省宅基地面积及数量统计</p>
            <el-row class="header-info">
              <el-col :span="12">
                <el-avatar :size="60" :src="`${$baseUrl}image/leaderCockpit/Group_12.png`"></el-avatar>
                <p class="zjdMjName">全省宅基地面积</p>
                <p class="zjdMjNum">
                  {{zjdData.mj}}
                  <span class="unit_span">亩</span>
                </p>
              </el-col>
              <el-col :span="12">
                <el-avatar :size="60" :src="`${$baseUrl}image/leaderCockpit/Group_15.png`"></el-avatar>
                <p class="zjdMjName">农房数量</p>
                <p class="zjdMjNum">
                  {{zjdData.sl}}
                  <span class="unit_span">万套</span>
                </p>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="wrap-middle">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="grid-content bg-white">
            <p class="header-title">农房闲置情况分析</p>
            <el-row style="height:70px;margin:0px;">
              <el-col :span="24">
                <div class="nfxzInfo bg-gray">
                  <span>
                    闲置农房总数量
                    <b>{{nfxzData.xznfzsl}}</b> 套
                  </span>
                </div>
              </el-col>
            </el-row>
            <el-row style="height:80px;margin:0px;">
              <el-col :span="24">
                <div class="xzInfo">
                  <span>季节性闲置数量 {{nfxzData.jjxxzsl}}</span>
                  <el-progress :stroke-width="12" color="#58B8AE" :percentage="nfxzData.jjxxzzb"></el-progress>
                </div>
              </el-col>
            </el-row>
            <el-row style="height:100px;margin:0px;">
              <el-col :span="24">
                <div class="xzInfo">
                  <span>长期性闲置数量 {{nfxzData.cqxxzzb}}</span>
                  <el-progress :stroke-width="12" color="#E7B33C" :percentage="nfxzData.cqxxzzb"></el-progress>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-white">
            <p class="header-title">宅基地现状调查分析图</p>
            <div id="mapbuild" class="mapDiv"></div>

            <div class="legendContainer">
              <div class="legendBox">
                <div class="title">图例</div>
                <div class="legendItem">
                  <img class="img" :src="`${$baseUrl}image/dltbstyle/0301.png`" />乔木林地
                </div>
                <div class="legendItem">
                  <img class="img" :src="`${$baseUrl}image/dltbstyle/0301.png`" />其他园地
                </div>
                <div class="legendItem">
                  <img class="img" :src="`${$baseUrl}image/dltbstyle/1006.png`" />农村道路
                </div>
                <div class="legendItem">
                  <img class="img" :src="`${$baseUrl}image/dltbstyle/0101.png`" />水田
                </div>
                <div class="legendItem">
                  <img class="img" :src="`${$baseUrl}image/dltbstyle/0702.png`" />农村宅基地
                </div>
                <div class="legendItem">
                  <img class="img" :src="`${$baseUrl}image/dltbstyle/0307.png`" />其他林地
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="wrap-bottom">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="grid-content bg-white">
            <p class="header-title">闲置房屋开发利用情况</p>
            <div ref="pieMain" :style="{width: '100%',height:'250px',margin:'0 auto'}"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-white">
            <p class="header-title">违法处置</p>
            <div ref="barMain" :style="{width: '100%',height:'250px',margin:'0 auto'}"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-white">
            <p class="header-title">各类型审批数量统计</p>
            <el-row class="footer-info" style="border-bottom:1px solid #F2F2F2;margin: 0px 25px;">
              <el-col :span="8">
                <el-image
                  style="width: 45px; height: 45px"
                  :src="`${$baseUrl}image/leaderCockpit/yzxj_yuan.png`"
                  fit="fit"
                ></el-image>
                <p class="state">原址新建</p>
                <p class="num">{{glxspsl.yzxj_yuan}}</p>
              </el-col>
              <el-col
                :span="8"
                style="border-left:1px solid #F2F2F2;border-right:1px solid #F2F2F2;"
              >
                <el-image
                  style="width: 45px; height: 45px"
                  :src="`${$baseUrl}image/leaderCockpit/gkj.png`"
                  fit="fit"
                ></el-image>
                <p class="state">改扩建</p>
                <p class="num">{{glxspsl.gkj}}</p>
              </el-col>
              <el-col :span="8">
                <el-image
                  style="width: 45px; height: 45px"
                  :src="`${$baseUrl}image/leaderCockpit/yzxj_yi.png`"
                  fit="fit"
                ></el-image>
                <p class="state">异址新建</p>
                <p class="num">{{glxspsl.yzxj_yi}}</p>
              </el-col>
            </el-row>
            <el-row class="footer-info" style="margin: 0px 25px 10px 25px">
              <el-col :span="8">
                <el-image
                  style="width: 45px; height: 45px"
                  :src="`${$baseUrl}image/leaderCockpit/zjdlz.png`"
                  fit="fit"
                ></el-image>
                <p class="state">宅基地流转</p>
                <p class="num">{{glxspsl.zjdlz}}</p>
              </el-col>
              <el-col
                :span="8"
                style="border-left:1px solid #F2F2F2;border-right:1px solid #F2F2F2;"
              >
                <el-image
                  style="width: 45px; height: 45px"
                  :src="`${$baseUrl}image/leaderCockpit/zjdtc.png`"
                  fit="fit"
                ></el-image>
                <p class="state">宅基地退出</p>
                <p class="num">{{glxspsl.zjdtc}}</p>
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ImageLayer from "ol/layer/Image";
import ImageWMS from "ol/source/ImageWMS";
import BaseMap from "../spatialData/mapBase.js";
export default {
  data() {
    return {
      provinceData: {
        areaNum: 5824,
        townNum: 4300,
        villageNum: 1524
      },
      zjdData: {
        mj: 2000,
        sl: 13
      },
      nfxzData: {
        xznfzsl: 1000,
        jjxxzsl: 350,
        jjxxzzb: 35,
        cqxxzsl: 650,
        cqxxzzb: 65
      },
      glxspsl: {
        yzxj_yuan: 1240,
        gkj: 2319,
        yzxj_yi: 1140,
        zjdlz: 2305,
        zjdtc: 1349
      },
      xzfwkflyData: [
        {
          name: "民宿",
          value: 30
        },
        {
          name: "家庭工坊",
          value: 25
        },
        {
          name: "手工坊",
          value: 20
        },
        {
          name: "其他",
          value: 25
        }
      ],
      wfczData: [
        {
          type: "违法占地",
          zs: 600,
          ycl: 500,
          wcl: 100
        },
        {
          type: "违法建筑",
          zs: 500,
          ycl: 450,
          wcl: 50
        },
        {
          type: "一户多宅",
          zs: 550,
          ycl: 500,
          wcl: 50
        }
      ],
      map: null
    };
  },
  mounted() {
    this.getChartData();
    var xzqhdm = "469005110";
    this.map = BaseMap.BaseInitMap("mapbuild");
    this.map.addLayer(BaseMap.img_wLayer);
    BaseMap.BaseChangeRegionVector(this.map, xzqhdm);
    var wmsLayer = new ImageLayer({
      source: new ImageWMS({
        url: BaseMap.geoserverURL + "TDLYXZ/wms",
        params: {
          LAYERS: "TDLYXZ:DLTB",
          QUERY_LAYERS: "TDLYXZ:DLTB",
          CQL_FILTER: "QSDWDM LIKE '" + xzqhdm + "%'"
        },
        serverType: "geoserver",
        VERSION: "1.1.1"
      })
    });

    this.map.addLayer(wmsLayer);
    window.addEventListener("resize", () => {
      this.barChart.resize();
      this.pieChart.resize();
    });
  },
  methods: {
    getChartData() {
      //饼状图请求数据
      //this.pieChartDatas = res;
      this.IniPieChart();
      //柱状图请求数据
      //this.barChartDatas = res;
      this.InitChart();
    },
    //柱状统计图
    InitChart() {
      const _dataList = this.wfczData;
      this.barChart = this.$echarts.init(this.$refs.barMain);
      if (_dataList.length > 0) {
        const serieZsl = {
          name: "总数",
          type: "bar",
          color: "#41C5BB",
          stack: "总量",
          barWidth: 25,
          label: { position: "insideRight" }
        };
        const serieYclsl = {
          name: "已处理",
          type: "bar",
          color: "#0BA9E9",
          stack: "总量",
          barWidth: 25,
          label: { position: "insideRight" }
        };
        const serieWclsl = {
          name: "未处理",
          type: "bar",
          color: "#4F6670",
          stack: "总量",
          barWidth: 25,
          label: { position: "insideRight" }
        };
        const dataZsl = [];
        const dataYclsl = [];
        const dataWclsl = [];
        const xAixs = [];
        _dataList.forEach(item => {
          xAixs.push(item.type);
          dataZsl.push(item.zs);
          dataYclsl.push(item.ycl);
          dataWclsl.push(item.wcl);
        });
        serieZsl.data = dataZsl;
        serieYclsl.data = dataYclsl;
        serieWclsl.data = dataWclsl;
        const option = {
          legend: {
            bottom: "10%",
            data: ["总数", "已处理", "未处理"],
            itemWidth: 10,
            itemHeight: 10,
            icon: "rect"
          },
          tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(255,255,255,0.9)",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
              color: "#303133",
              decoration: "none",
              fontFamily: "Verdana, sans-serif",
              fontSize: 14
            }
          },
          xAxis: {
            type: "value"
          },
          yAxis: [
            {
              type: "category",
              data: xAixs
            }
          ],
          grid: {
            left: "5%",
            right: "5%",
            bottom: "20%",
            top: "5%",
            containLabel: true
          },
          series: [serieZsl, serieYclsl, serieWclsl]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.barChart.setOption(option);
      }
    },
    //扇形统计图
    IniPieChart() {
      console.log(11111);
      const _dataList = this.xzfwkflyData;
      this.pieChart = this.$echarts.init(this.$refs.pieMain);
      const option = {
        legend: {
          bottom: "10%",
          data: this.xzfwkflyData.name,
          itemWidth: 10,
          itemHeight: 10,
          icon: "rect"
        },
        series: [
          {
            type: "pie",
            radius: ["45%", "70%"],
            center: ["50%", "40%"],
            label: {
              formatter: "{b}{d}%",
              color: "black"
            },
            itemStyle: {
              color: function(params) {
                var colorList = ["#3AA0FF", "#36CBCB", "#4ECB73", "#FBDB5A"];
                return colorList[params.dataIndex];
              }
            },
            data: this.xzfwkflyData
          }
        ]
      };
      console.log(22222);
      // 使用刚指定的配置项和数据显示图表。
      this.pieChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.body {
  overflow: auto;
}
.grid-content {
  min-height: 36px;
}
.bg-white {
  background: #ffffff;
}
.header-title {
  margin: 0;
  font-size: 18px;
  color: #333333;
  padding: 0px 15px;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
}

.wrap-top .el-row {
  margin-top: 0
}


.areaName,
.townName,
.villageName {
  font-size: 16px;
  margin-top: 10px;
  color: #666;
  text-align: center;
}
.areaNum,
.townNum,
.villageNum {
  font-size: 0.26rem;
  margin-top: 10px;
  color: #2366ff;
  text-align: center;
}
.areaNum {
  color: #2366ff;
}
.townNum {
  color: #379bff;
}
.villageNum {
  color: #4ccfff;
}
.header-info {
  display: flex;
  height: 120px;
}
.header-info{
  height: 80px;
  margin-top: 10px;
}
.wrap-top,
.wrap-middle,
.wrap-bottom {
  height: auto;
}
.wrap-top .grid-content {
  height: 170px;
  border: 1px solid #f2f2f2;
}
.wrap-middle,
.wrap-bottom {
  margin-top: 10px;
}
.wrap-bottom {
  margin-bottom: 20px;
}
.wrap-middle .grid-content,
.wrap-bottom .grid-content {
  height: 300px;
  border: 1px solid #f2f2f2;
}
.el-avatar {
  margin: 10px 35px;
  float: left;
}
.zjdMjName {
  margin-top: 10px;
  color: #999;
  font-size: 16px;
}
.zjdMjNum {
  margin-top: 10px;
  font-size: 26px;
  font-weight: bold;
  color: #606060;
}
.unit_span {
  font-size: 12px;
  margin-left: 5px;
}
.nfxzInfo {
  width: 90%;
  height: 50px;
  margin: 10px auto 10px auto;
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 50px;
}
.xzInfo {
  width: 90%;
  height: 30px;
  margin: 10px auto 10px auto;
  font-size: 16px;
  letter-spacing: 1px;
  line-height: 30px;
}
.nfxzInfo span,
.xzInfo span {
  margin-left: 10px;
}
.bg-gray {
  background: #f2f2f2;
}
.footer-info {
  height: 120px;
  display: flex;
  justify-content: space-between;
}
.footer-info .el-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}
.footer-info .state {
  color: #999999;
  font-size: 16px;
  margin-top: 5px;
}
.footer-info .num {
  color: #333;
  font-size: 20px;
  margin-top: 5px;
  font-weight: bold;
}
.mapDiv {
  height: 235px;
  padding: 0;
  margin: 0px auto 15px auto;
  width: 96%;
}
.legendContainer {
  right: 35px;
  //right: 0px;
  position: absolute;
  bottom: 25px;
  .legendBox {
    border: rgb(200, 200, 200) 1px solid;
    width: 200px;
    padding-left: 10px;
    color: rgb(240, 240, 240);
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    .title {
      font-size: 18px;
      width: 200px;
      height: 25px;
    }
    .legendItem {
      display: flex;
      align-items: center;
      font-size: 14px;
      height: 25px;
      line-height: 25px;
      //width: 100px;
      .img {
        background-color: yellow;
        margin-right: 5px;
        margin-left: 5px;
        width: 15px;
        height: 15px;
      }
    }
  }
}
</style>