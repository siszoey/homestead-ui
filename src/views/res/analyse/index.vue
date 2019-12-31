<template>
    <div>
        <div class="wrap-top">
            <p class="header-title">宅基地申请各阶段数量统计</p>
            <el-row :gutter="20" class="progress-box">
                <el-col :span="progressWidth" v-for="(progress,index) in progressList" :key="index">
                    <div class="grid-content">
                        <el-progress type="circle" :percentage="progress.progressPercent"
                                     :color="progressColor[index]"></el-progress>
                        <p class="state">{{progress.progressType}}</p>
                        <p class="num">{{progress.progressNum}}</p>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div>
            <div style="margin-top: 20px;display: flex;justify-content: space-between">
                <div style="width: 48%;height: 380px;background-color: #FFF">
                    <div style="font-size: 15px;font-weight: bold;padding-top: 10px;padding-bottom: 10px">宅基地申请类型分布
                    </div>
                    <hr>
                    <div style="width: 500px;height: 300px;margin-left: 50px;padding-top: 10px" ref="chart1"></div>
                </div>
                <div style="width: 48%;height: 380px;background-color: #FFF;">
                    <div style="font-size: 15px;font-weight: bold;padding-top: 10px;padding-bottom: 10px">历年宅基地申请类型
                    </div>
                    <hr>
                    <div style="width: 500px;height: 300px;margin-left: 50px;padding-top: 10px" ref="chart2"></div>
                </div>
            </div>
            <div style="margin-top: 20px;display: flex;justify-content: space-between">
                <div style="width: 48%;height: 380px;background-color: #FFF;">
                    <div style="font-size: 15px;font-weight: bold;padding-top: 10px;padding-bottom: 10px">
                        历年宅基地面积趋势图（平方米）
                    </div>
                    <hr>
                    <div style="width: 500px;height: 300px;margin-left: 50px;padding-top: 10px" ref="chart3"></div>
                </div>
                <div style="width: 48%;height: 380px;background-color: #FFF;">
                    <div style="font-size: 15px;font-weight: bold;padding-top: 10px;padding-bottom: 10px">各地区宅基地使用情况统计
                    </div>
                    <hr>
                    <div style="width: 500px;height: 300px;margin-left: 50px;padding-top: 10px" ref="chart4"></div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
  import {
    getProgressData,
    getMapQueryZjdSqMj,
    getMapQueryZjdGdq,
    getMapQueryZjdSqLx,
    getMapQueryZjdLnLx
  } from '../../../api/map'

  export default {
    name: "dataAnalysis",
    data() {
      return {
        progressList: [],
        progressColor:['#66CCFF','#0096FA','#FEC03D','#35ff73','#66CC66','#ff356d','#56eadd'],
        echartOption1: {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['原地翻建', '复房修复', '新建']
          },
          series: [
            {
              name: '比例',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335, name: '原地翻建'},
                {value: 310, name: '复房修复'},
                {value: 234, name: '新建'}
              ]
            }
          ]
        },
        echartOption2: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['原地翻建', '复房修复', '新建']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '原地翻建',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '复房修复',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '新建',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [150, 232, 201, 154, 190, 330, 410]
            }
          ]
        },
        echartOption3: {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2009年','2010年', '2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320, 1400, 1500, 1600],
            type: 'line',
            areaStyle: {}
          }]
        },
        echartOption4: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['总的宅基地', '使用中', '闲置']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['东安县', '道县', '宁远县']
          },
          series: [
            {
              name: '总的宅基地',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [320, 302, 301]
            },
            {
              name: '使用中',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [120, 132, 101]
            },
            {
              name: '闲置',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [220, 182, 191]
            }
          ]
        },
        progressWidth:null
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        getProgressData().then((res) => {
          console.log(res)
          this.progressList=res;
          this.progressWidth=24/res.length;
          this.progressList = res;
        })
        let regionCode = "{}"
        getMapQueryZjdSqLx(regionCode).then((res) => {
          let myChart1 = this.$echarts.init(this.$refs.chart1)
          this.echartOption1.series[0].data[0].value = res.ydfjTotal
          this.echartOption1.series[0].data[1].value = res.ffxfTotal
          this.echartOption1.series[0].data[2].value = res.xjTotal
          myChart1.setOption(this.echartOption1)
        })

        getMapQueryZjdLnLx(regionCode).then((res) => {
          let myChart2 = this.$echarts.init(this.$refs.chart2)
          this.echartOption2.series[0].data = res.ydfj
          this.echartOption2.series[1].data = res.ffxf
          this.echartOption2.series[2].data = res.xj
          myChart2.setOption(this.echartOption2)
        })

        getMapQueryZjdSqMj(regionCode).then((res) => {
          let myChart3 = this.$echarts.init(this.$refs.chart3)
          this.echartOption3.series[0].data = res
          myChart3.setOption(this.echartOption3)
        })

        getMapQueryZjdGdq(regionCode).then((res) => {
          let myChart4 = this.$echarts.init(this.$refs.chart4)
          this.echartOption4.yAxis.data = res.xzqh
          this.echartOption4.series[0].data = res.zjd
          this.echartOption4.series[1].data = res.syz
          this.echartOption4.series[2].data = res.xz
          myChart4.setOption(this.echartOption4)
        })

      }

    }
  }
</script>

<style scoped>
    .header-title{
        margin:0;
        font-size: 18px;
        color: #333333;
        padding:15px;
        font-weight: bold;
    }
    .wrap-top {
        background: #FFFFFF;
        margin-top: 10px;
    }
    .grid-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .state {
        font-size: 16px;
        margin-top: 10px;
        color: #8E8E8E;
    }

    .num {
        font-size: 22px;
        margin-top: 10px;
        font-weight: bold;
        color: #606060;
    }
    .progress-box{
        margin-top: 10px;
        padding-bottom:30px;
        display: flex;
        justify-content: space-between;
    }
</style>
