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
              :percentage="parseFloat(progress.auditPercent)"
              :color="progressColor[index]"
            ></el-progress>
            <!-- 自己定义的数据 -->
            <p class="state">{{progress.auditType}}</p>
            <!-- 访问api得到的数据 -->
            <!-- <p class="state">{{getDictByOptCode("建房类型",progress.auditType)}}</p> -->
            <p class="num">{{progress.auditNum}}</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="wrap-middle">
      <el-row class="queryForm">
        <el-col>
          <el-form :inline="true" :model="queryForm" ref="queryForm" size="mini">
            <el-form-item label="申请类型" prop="jflx">
              <el-select v-model="queryForm['jflx']" placeholder="申请类型" style="width:120px">
                <el-option
                  v-for="(option, index) in getDicts('建房类型')"
                  :label="option.optName"
                  :value="option.optCode"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item label="项目名称">
              <el-input v-model="queryForm['xmmc']" placeholder="项目名称"></el-input>
            </el-form-item>-->

            <el-form-item label="项目编号" prop="sqid">
              <el-input v-model="queryForm['sqid']" placeholder="项目编号"></el-input>
            </el-form-item>

            <el-form-item label="申请时间" prop="sqsj">
              <el-date-picker
                v-model="sqsj"
                type="daterange"
                range-separator="至"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="项目状态" prop="xmzt">
              <el-select v-model="queryForm['xmzt']" placeholder="项目状态" style="width:120px">
                <el-option
                  v-for="(option, index) in getDicts('办理状态')"
                  :label="option.optName"
                  :value="option.optCode"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>

            <div style="float: right">
              <el-form-item>
                <el-button type="primary" @click="queryTableData">
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
            <el-table-column align="center" label="项目编号" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.sqid}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="项目名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{getOptName('建房类型', scope.row.jflx)}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="申请类型" width="90" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{getOptName('建房类型', scope.row.jflx)}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="申请时间" width="100" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <!-- <span>{{getOptName('户口性质', scope.row.residenceType)}}</span> -->
                <span>{{scope.row.sqrrq}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="项目状态" width="90" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{getOptName('办理状态', scope.row.xmzt)}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="申请人" width="90" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.sqr}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- footer 分页条 -->
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="table.current"
            :page-size="table.size"
            layout="total, prev, pager, next, jumper"
            :total="table.total"
            style="margin-top:35px;text-align:center"
          ></el-pagination>
        </el-col>
        <el-col :span="12" style="padding:0px 25px 0px 5px;height:610px;">
          <el-row style="margin-top:0px">
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
import {
  getAuditTableDatas,
  GetAuditProgress,
  GetAuditSituation,
  GetYearAuditSituation
} from "../../../../api/map";
import dictMixins from "../../mixnis/dict-mixnis";
import { color } from "echarts/lib/export";
export default {
  name: "land-map-implementationProcess",
  mixins: [dictMixins],
  data() {
    return {
      table: {
        key: 0,
        listLoading: false,
        list: [],
        total: null,
        current: 0,
        size: 10,
        pages: null
      },
      barChartDatas: [],
      pieChartDatas: [],
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
        roleid: "",
        sqid: "",
        xmzt: "",
        jflx: ""
      },
      sqsj: "",
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
      //饼状图请求方法
      GetAuditSituation()
        .then(res => {
          this.pieChartDatas = res;
          this.IniPieChart();
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.table.listLoading = false;
        });
      //柱状图请求方法
      GetYearAuditSituation()
        .then(res => {
          this.barChartDatas = res;
          this.InitChart();
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.table.listLoading = false;
        });
    },
    //获取表格数据
    getTableData() {
      this.table.listLoading = true;
      getAuditTableDatas(
        this.table.current,
        this.table.size,
        this.sqsj,
        this.queryForm
      )
        .then(res => {
          this.table.list = res.records;
          this.table.total = res.total;
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.table.listLoading = false;
        });
    },
    //点击查询按钮请求的方法
    queryTableData() {
      this.table.current = 1;
      this.getTableData();
    },
    //页面头部的审核进度
    getProgressData() {
      //访问api得到的数据
      GetAuditProgress()
        .then(res => {
          this.progressList = res;
          this.progressWidth = 24 / this.progressList.length;
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.table.listLoading = false;
        });
    },
    handleSizeChange(size) {
      this.table.size = size;
      this.getTableData();
    },
    handleCurrentChange(current) {
      this.table.current = current;
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
          dataSbsl.push(item.number);
          if (item.resData.length > 0) {
            item.resData.forEach(it => {
              if (it.name == "2") {
                dataSptgsl.push(it.value);
              } else if (it.name == "3") {
                dataSpbtgsl.push(it.value);
              } else if (it.name == "1") {
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
          padding: [0, 60, 0, 0],
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
            if (name == "1") {
              arr = ["{a|待办}", "{b|" + _dataList[_index].value + "}"];
            } else if (name == "2") {
              arr = ["{a|已办}", "{c|" + _dataList[_index].value + "}"];
            } else if (name == "3") {
              arr = ["{a|退办}", "{c|" + _dataList[_index].value + "}"];
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
              formatter: "{d}%",
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
                var colorList = ["#51CEE6", "#2D80E8", "#04BE7D"];
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
