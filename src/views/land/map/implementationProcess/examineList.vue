<template>
  <div>
    <div class="wrap-top">
      <p class="header-title">项目审批进度选择</p>
      <el-row :gutter="20" class="progress-box">
        <el-col :span="progressWidth" v-for="(progress,index) in progressList" :key="index">
          <div class="grid-content">
            <el-progress
              type="circle"
              stroke-linecap="butt"
              :stroke-width="10"
              :width="110"
              :percentage="progress.auditPercent"
              :color="progressColor[index]"
            ></el-progress>
            <p class="state">{{progress.auditType}}</p>
            <p class="num">{{progress.auditNum}}</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="wrap-middle">
      <el-row class="queryForm">
        <el-col>
          <el-form :inline="true" :model="queryForm" ref="queryForm" size="mini">
            <el-form-item label="申请类型">
              <el-select v-model="queryForm['sqlx']">
                <el-option
                  v-for="(option, oIndex) in sqlxOptions"
                  :label="option.optName"
                  :value="option.optCode"
                  :key="oIndex"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="项目名称">
              <el-input v-model="queryForm['sqmc']" placeholder="项目名称"></el-input>
            </el-form-item>

            <el-form-item label="项目编号">
              <el-input v-model="queryForm['sqid']" placeholder="项目编号"></el-input>
            </el-form-item>

            <el-form-item label="申请时间">
              <el-date-picker
                v-model="queryForm['sqsj']"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>

            <!-- <el-form-item label="项目状态">
              <el-select v-model="queryForm['sqlx']">
                <el-option
                  v-for="(option, oIndex) in sqlxOptions"
                  :label="option.optName"
                  :value="option.optCode"
                  :key="oIndex"
                ></el-option>
              </el-select>
            </el-form-item>-->

            <div style="float: right">
              <el-form-item>
                <el-button type="primary" @click="getTableData">
                  <d2-icon name="search" />查询
                </el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-col>
      </el-row>
      <el-row style="padding-bottom:25px">
        <el-col :span="12" style="padding: 0px 5px 0px 25px">
          <el-table
            :key="table.key"
            :data="table.list"
            v-loading="table.listLoading"
            element-loading-text="拼命加载中..."
            highlight-current-row
            border
            :header-cell-style="{background:'#F5F5F5',color:'#666666'}"
            style="width: 100%;"
          >
            <el-table-column align="center" label="项目编号" width="150">
              <template slot-scope="scope">
                <span>{{scope.row.xmbh}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="项目名称" width="130">
              <template slot-scope="scope">
                <span>{{scope.row.userName}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="申请类型">
              <template slot-scope="scope">
                <span>{{scope.row.userName}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="申请时间">
              <template slot-scope="scope">
                <span>{{scope.row.userName}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="项目状态">
              <template slot-scope="scope">
                <!-- <span>{{getOptName('户口性质', scope.row.residenceType)}}</span> -->
                <span>{{scope.row.userName}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="申请人" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.userName}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- footer 分页条 -->
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="table.pageNum"
            :page-size="table.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="table.total"
            style="margin-top:35px;text-align:center"
          ></el-pagination>
        </el-col>
        <el-col :span="12" style="padding:0px 25px 0px 5px;height:610px;">
          <el-row>
            <el-col :span="24" style="height:300px;border:1px solid #F2F2F2">
              <p class="header-title">不同时间统计</p>
              <div ref="barMain" :style="{width: '100%',height:'250px',margin:'0 auto'}"></div>
            </el-col>
            <el-col :span="24" style="height:300px;margin-top:10px;border:1px solid #F2F2F2">
              <p class="header-title">不同地区统计</p>
              <div ref="pieMain" :style="{width: '100%',height:'250px',margin:'0 auto'}"></div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getResidenceList } from "../../../../api/res.business";
import { color } from "echarts/lib/export";
export default {
  name: "land-map-implementationProcess",
  data() {
    return {
      table: {
        key: 0,
        listLoading: false,
        list: [],
        total: null,
        pageNum: 0,
        pageSize: 10,
        pages: null
      },
      progressDatas: [
        {
          uid: 0,
          auditType: "原址新建",
          auditPercent: 46,
          auditNum: 1200
        },
        { uid: 1, auditType: "改建", auditPercent: 30, auditNum: 586 },
        { uid: 2, auditType: "扩建", auditPercent: 22, auditNum: 500 },
        {
          uid: 3,
          auditType: "异址新建",
          auditPercent: 10,
          auditNum: 235
        },
        {
          uid: 4,
          auditType: "宅基地流转",
          auditPercent: 5,
          auditNum: 144
        },
        {
          uid: 5,
          auditType: "宅基地退出",
          auditPercent: 2,
          auditNum: 56
        }
      ],
      barChartDatas: [
        {
          year: "2014",
          number: 26,
          resData: [
            {
              name: "申报数量",
              value: "10"
            },
            {
              name: "审批通过数量",
              value: "15"
            },
            {
              name: "审批不通过数量",
              value: "5"
            },
            {
              name: "审批中数量",
              value: "1"
            }
          ]
        },
        {
          year: "2015",
          number: 32,
          resData: [
            {
              name: "申报数量",
              value: "12"
            },
            {
              name: "审批通过数量",
              value: "18"
            },
            {
              name: "审批不通过数量",
              value: "1"
            },
            {
              name: "审批中数量",
              value: "2"
            }
          ]
        },
        {
          year: "2016",
          number: 28,
          resData: [
            {
              name: "申报数量",
              value: "15"
            },
            {
              name: "审批通过数量",
              value: "10"
            },
            {
              name: "审批不通过数量",
              value: "3"
            },
            {
              name: "审批中数量",
              value: "3"
            }
          ]
        },
        {
          year: "2017",
          number: 28,
          resData: [
            {
              name: "申报数量",
              value: "20"
            },
            {
              name: "审批通过数量",
              value: "6"
            },
            {
              name: "审批不通过数量",
              value: "2"
            },
            {
              name: "审批中数量",
              value: "2"
            }
          ]
        },
        {
          year: "2018",
          number: 20,
          resData: [
            {
              name: "申报数量",
              value: "18"
            },
            {
              name: "审批通过数量",
              value: "2"
            },
            {
              name: "审批不通过数量",
              value: "2"
            },
            {
              name: "审批中数量",
              value: "0"
            }
          ]
        },
        {
          year: "2019",
          number: 30,
          resData: [
            {
              name: "申报数量",
              value: "22"
            },
            {
              name: "审批通过数量",
              value: "5"
            },
            {
              name: "审批不通过数量",
              value: "1"
            },
            {
              name: "审批中数量",
              value: "3"
            }
          ]
        }
      ],
      pieChartDatas: [
        { value: 8, name: "审核通过" },
        { value: 4, name: "审核不通过" },
        { value: 8, name: "审核中" }
      ],
      progressList: [],
      progressColor: [
        "#7ECBFC",
        "#3D96F4",
        "#F7C05B",
        "#71CBCF",
        "#7197FD",
        "#7FCA70"
      ],
      progressWidth: "",
      queryForm: {
        sqlx: "",
        sqid: "",
        sqmc: "",
        sqsj: ""
      },
      pieChart: {},
      barChart: {}
    };
  },
  mounted() {
    this.getChartData();
    this.getTableData();
    this.getProgressData();
    //当页面大小发生变化时，echarts统计图根据画布大小自动重新绘制
    window.addEventListener("resize", () => {
      this.barChart.resize();
      this.pieChart.resize();
    });
  },
  methods: {
    getChartData() {
      //this.pieChartDatas = this.pieChartDatas;
      this.InitChart();
      this.IniPieChart();
    },
    getTableData() {
      this.table.listLoading = true;
      let stage = "0"; // 申报
      getResidenceList(
        this.table.pageNum,
        this.table.pageSize,
        stage,
        this.queryForm
      )
        .then(res => {
          this.table.list = res.list;
          this.table.total = res.total;
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.table.listLoading = false;
        });
    },
    getProgressData() {
      this.progressList = this.progressDatas;
      this.progressWidth = 24 / this.progressList.length;
    },
    handleSizeChange(pageSiz) {
      this.table.pageSize = pageSiz;
      this.getTableData();
    },
    handleCurrentChange(pageNum) {
      this.table.pageNum = pageNum;
      this.getTableData();
    },
    //柱状统计图
    InitChart() {
      const _dataList = this.barChartDatas;
      this.barChart = this.$echarts.init(this.$refs.barMain);
      if (_dataList.length > 0) {
        const serieSbsl = {
          name: "申报数量",
          type: "bar",
          color: "#04BE7D",
          label: { show: true, position: "top" }
        };
        const serieSptgsl = {
          name: "审批通过数量",
          type: "bar",
          color: "#51CEE6",
          label: { show: true, position: "top" }
        };
        const serieSpbtgsl = {
          name: "审批不通过数量",
          type: "bar",
          color: "#2D80E8",
          label: { show: true, position: "top" }
        };
        const serieSpzsl = {
          name: "审批中数量",
          type: "bar",
          color: "#009AF6",
          label: { show: true, position: "top" }
        };
        const dataSbsl = [];
        const dataSptgsl = [];
        const dataSpbtgsl = [];
        const dataSpzsl = [];
        const xAixs = [];
        _dataList.forEach(item => {
          xAixs.push(item.year);
          if (item.resData.length > 0) {
            item.resData.forEach(it => {
              if (it.name == "申报数量") {
                dataSbsl.push(it.value);
              } else if (it.name == "审批通过数量") {
                dataSptgsl.push(it.value);
              } else if (it.name == "审批不通过数量") {
                dataSpbtgsl.push(it.value);
              } else if (it.name == "审批中数量") {
                dataSpzsl.push(it.value);
              }
            });
          }
        });
        serieSbsl.data = dataSbsl;
        serieSptgsl.data = dataSptgsl;
        serieSpbtgsl.data = dataSpbtgsl;
        serieSpzsl.data = dataSpzsl;
        const option = {
          legend: {
            right: 60,
            itemWidth: 13,
            icon: "rect",
            data: ["申报数量", "审批通过数量", "审批不通过数量", "审批中数量"]
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          dataZoom: [
            {
              type: "inside"
            },
            {
              type: "slider"
            }
          ],
          xAxis: [
            {
              type: "category",
              data: xAixs
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [serieSbsl, serieSptgsl, serieSpbtgsl, serieSpzsl]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.barChart.setOption(option);
      }
    },
    //扇形统计图
    IniPieChart() {
      const _dataList = this.pieChartDatas;
      this.pieChart = this.$echarts.init(this.$refs.pieMain);
      const option = {
        legend: {
          orient: "vertical",
          right: 60,
          bottom: "10%",
          data: this.pieChartDatas.name,
          padding: [0, 30, 0, 0],
          selectedMode: false,
          itemWidth: 6,
          itemHeight: 30,
          itemStyle: {
            borderWidth: 1,
            borderColor: "black"
          },
          icon: "rect",
          textStyle: {
            fontSize: 16,
            width: 150,
            height: 30,
            padding: [0, 10],
            lineHeight: 30,
            borderWidth: 1,
            borderColor: "#F2F2F2",
            rich: {
              a: {
                align: "left",
                color: "#2C2C2C",
                fontSize: 16
              },
              b: {
                align: "right",
                color: "black",
                fontSize: 16
              },
              c: {
                align: "right",
                color: "black",
                fontSize: 16
              }
            }
          },
          tooltip: {
            show: false
          },
          formatter: function(name) {
            let _index = 0;
            _dataList.forEach((item, i) => {
              if (item.name == name) {
                _index = i;
              }
            });
            let arr;
            if (name == "申报数量") {
              arr = ["{a|" + name + "}", "{b|" + _dataList[_index].value + "}"];
            } else {
              arr = ["{a|" + name + "}", "{c|" + _dataList[_index].value + "}"];
            }
            return arr.join("");
          }
        },
        series: [
          {
            type: "pie",
            radius: ["35%", "75%"],
            center: [250, 125],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            legendHoverLink: false,
            silent: false,
            label: {
              formatter: "{b}\n{d}%",
              color: "black"
            },
            labelLine: {
              lineStyle: {
                color: "#666"
              },
              length: 10,
              length2: 25
            },
            itemStyle: {
              color: function(params) {
                var colorList = ["#51CEE6", "#2D80E8", "#009AF6"];
                return colorList[params.dataIndex];
              }
            },
            data: this.pieChartDatas
          }
        ]
      };
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
.wrap-top {
  background: #ffffff;
  // margin-top:10px;
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
.progress-box {
  margin-top: 10px;
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
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
  color: #8e8e8e;
}
.num {
  font-size: 22px;
  margin-top: 10px;
  font-weight: bold;
  color: #606060;
}
.wrap-middle {
  margin-top: 20px;
  margin-bottom: 20px;
  background: #fff;
  height: auto;
}
.queryForm {
  padding: 25px 15px 10px 25px;
  margin: 0px;
}
</style>