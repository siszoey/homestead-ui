<template>
  <div class="contents">
    <el-row class="warp">
      <el-col :span="12">
        <div class="left">
          <div class="left_top">
            <div class="cont_div">
              <div class="left_top_title">闲置宅基地发布情况统计</div>
              <div class="left_top_content">当年发布总数量<span>{{fbzsl}}</span></div>
            </div>
          </div>
          <div class="left_middle">
            <div ref="barMain" class="cont_div"></div>
          </div>
          <div class="left_bottom">
            <div ref="lineMain" class="cont_div"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="right">
          <div class="right_top">
            <div ref="mapMain" class="cont_div"></div>
          </div>
          <div class="right_bottom">
            <div class="cont_div">
              <div class="right_bottom_header">注册人统计</div>
              <div class="right_bottom_body">平台总人数<span>{{ptzrs}}</span></div>
              <div class="right_bottom_footer">
                <div class="right_bottom_footer_contents">
                  <div class="block">
                    <el-avatar shape="square" :size="70" :src="people1"></el-avatar>
                    <p>新增</p>
                    <p><span>{{xzrs}}</span> 人</p>
                  </div>
                  <div class="block">
                    <el-avatar shape="square" :size="70" :src="people2"></el-avatar>
                    <p>日活跃量</p>
                    <p><span>{{rhyl}}</span> 人</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { color } from "echarts/lib/export"
  import mapJson from '@/assets/json/hainan/469000.json'
  export default {
    data() {
      return {
        barDatas: [
          { name: "文城镇", value: "115" },
          { name: "重兴镇", value: "145" },
          { name: "蓬莱镇", value: "168" },
          { name: "会文镇", value: "172" },
          { name: "东路镇", value: "152" }
        ],
        lineDatas: [
          { name: "2017", value: "0" },
          { name: "2018", value: "3" },
          { name: "2019", value: "20" }
        ],
        fbzsl: "3201",
        ptzrs: "615172",
        xzrs: "3200",
        rhyl: "1034",
        barChart: {},
        lineChart: {},
        mapChart: {},
        people1: "./image/leaderCockpit/people1.png",
        people2: "./image/leaderCockpit/people2.png"
      };
    },
    mounted() {
      this.InitChart();
      this.LineChart();
      this.MapChart();
      //当页面大小发生变化时，echarts统计图根据画布大小自动重新绘制
      window.addEventListener("resize", () => {
        this.barChart.resize();
        this.lineChart.resize();
        this.mapChart.resize();
      });
    },
    methods: {
      //柱状统计图
      InitChart() {
        const _dataList = this.barDatas;
        this.barChart = this.$echarts.init(this.$refs.barMain);
        if (_dataList.length > 0) {
          const serieHs = {
            type: "bar",
            color: "#72B2F8",
            barWidth: 25
          };
          const dataHs = [];
          const yAixs = [];
          _dataList.forEach(item => {
            yAixs.push(item.name);
            dataHs.push(item.value);
          });
          serieHs.data = dataHs;
          const option = {
            title: {
              text: '不同乡镇的发布数量'
            },
            yAxis: {
              type: 'category',
              axisLabel: {
                textStyle: { //改变刻度字体样式
                  color: '#494949'
                }
              },
              data: yAixs
            },
            xAxis: {
              type: 'value',
              axisLabel: {
                textStyle: { //改变刻度字体样式
                  color: '#494949'
                }
              }
            },
            series: [serieHs]
          };
          // 使用刚指定的配置项和数据显示图表。
          this.barChart.setOption(option);
        }
      },
      //折线统计图
      LineChart() {
        const _dataList = this.lineDatas;
        this.lineChart = this.$echarts.init(this.$refs.lineMain);
        if (_dataList.length > 0) {
          const serieHs = {
            name: "不同时间的发布数量",
            type: "line",
            smooth: true,
            color: "#72B2F8",
            areaStyle: {
              color: "#D4E9FF"
            }
          };
          const dataHs = [];
          const xAixs = [];
          _dataList.forEach(item => {
            xAixs.push(item.name);
            dataHs.push(item.value);
          });
          serieHs.data = dataHs;
          const option = {
            title: {
              text: '不同时间的发布数量'
            },
            tooltip: {
              axisPointer: {
                type: 'shadow'
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                textStyle: { //改变刻度字体样式
                  color: '#ccc'
                }
              },
              data: xAixs
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                textStyle: { //改变刻度字体样式
                  color: '#ccc'
                }
              }
            },
            series: [serieHs]
          };
          // 使用刚指定的配置项和数据显示图表。
          this.lineChart.setOption(option);
        }
      },
      //Echarts地图
      MapChart() {
        this.mapChart = this.$echarts.init(this.$refs.mapMain);
        this.$echarts.registerMap('HN', mapJson);
        const option = {
          title: {
            text: '闲置宅基地价格分布',
            subtext: '颜色越红代表当地的空闲宅基地价格越高',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (元 / 亩)'
          },
          visualMap: {
            min: 0,
            max: 50000,
            realtime: false,
            calculable: true,
            inRange: {
              color: ['lightskyblue', 'yellow', 'orangered']
            }
          },
          series: [
            {
              name: '闲置宅基地价格分布',
              type: 'map',
              mapType: 'HN', // 自定义扩展图表类型
              label: {
                show: true
              },
              data: [
                { name: '海口市', value: 20057.34 },
                { name: '万宁市', value: 15477.48 },
                { name: '定安县', value: 31686.1 },
                { name: '东方市', value: 6992.6 },
                { name: '屯昌县', value: 44045.49 },
                { name: '临高县', value: 40689.64 },
                { name: '澄迈县', value: 37659.78 },
                { name: '琼海市', value: 45180.97 },
                { name: '文昌市', value: 55204.26 },
                { name: '陵水黎族自治县', value: 21900.9 },
                { name: '五指山市', value: 4918.26 },
                { name: '昌江黎族自治县', value: 5881.84 },
                { name: '白沙黎族自治县', value: 4178.01 },
                { name: '琼中黎族苗族自治县', value: 2227.92 },
                { name: '乐东黎族自治县', value: 2180.98 },
                { name: '保亭黎族苗族自治县', value: 9172.94 },
                { name: '儋州市', value: 3368 }
              ]
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.mapChart.setOption(option);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .contents {
      width: 100%;
      height: 100%;
      float: left;
      background: #FFF;
    }

  .warp {
    width: 97%;
    height: 96%;
    margin: 1% 1.5%;
  }

  .el-col {
    height: 100%;
  }

  .left {
    height: 100%;
    width: 99%;
  }

  .right {
    height: 100%;
    width: 99%;
    float: right;
  }

  .left_top,
  .left_middle,
  .left_bottom,
  .right_top,
  .right_bottom {
    border: 1px solid #EEE;
    box-sizing: border-box;
  }

  .left_top {
    height: 15%;
  }

  .left_middle {
    height: 50%;
  }

  .left_bottom {
    height: 35%;
  }

  .right_top {
    height: 59%;
  }

  .right_bottom {
    margin-top: 1%;
    height: 40%;
  }

  .cont_div {
    height: 96%;
    width: 96%;
    margin: 1% 2%;
  }


  .left_top_title {
    height: 35%;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .left_top_content {
    height: 65%;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .left_top_content span {
    margin-left: 10px;
    font-size: 26px;
    font-weight: 600;
    color: #418AE1;
  }

  .left_top_title,
  .left_top_content,
  .right_bottom_header,
  .right_bottom_body,
  .right_bottom_footer,
  .right_bottom_footer_contents {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    text-align: justify;
  }

  .right_bottom_header {
    height: 25%;
    font-size: 16px;
    font-weight: 600;
  }

  .right_bottom_body {
    height: 25%;
    background: #F6F7F7;
    font-size: 16px;
    font-weight: 600;
    padding-left: 25px;
  }

  .right_bottom_body span {
    margin-left: 25px;
    font-size: 26px;
    font-weight: 600;
    color: #1961B4;
  }

  .right_bottom_footer {
    height: 50%;
  }

  .right_bottom_footer_contents {
    width: 100%;
    height: 80px;
  }

  .block {
    width: 50%;
  }

  .block p {
    padding-left: 85px;
    font-size: 16px;
    font-weight: 600;
    margin-top: 8px;
  }

  .block p span {
    font-size: 20px;
  }

  .el-avatar {
    float: left;
  }
</style>