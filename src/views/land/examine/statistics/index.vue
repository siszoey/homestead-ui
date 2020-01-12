<template>
  <div>
    <div class="wrap-middle">
      <p class="header-title">项目统计分析</p>
      <el-row class="queryForm">
        <el-col>
          <el-form :inline="true" :model="queryForm" ref="queryForm" size="mini">
            <el-form-item label="建房类型">
              <el-select v-model="queryForm['jflx']">
                <el-option
                  v-for="(option, oIndex) in getDicts('建房类型')"
                  :label="option.optName"
                  :value="option.optCode"
                  :key="oIndex"
                ></el-option>
              </el-select>
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

            <el-form-item label="项目状态">
              <el-select v-model="queryForm['xmzt']">
                <el-option
                  v-for="(option, oIndex) in getDicts('项目状态')"
                  :label="option.optName"
                  :value="option.optCode"
                  :key="oIndex"
                ></el-option>
              </el-select>
            </el-form-item>

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
            style="width: 100%;">
            <el-table-column align="center" label="项目编号">
                        <template slot-scope="scope">
                            <span>{{scope.row.sqid}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="建房类型">
                        <template slot-scope="scope">
                            <span>{{getOptName('建房类型', scope.row.jflx)}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="申请时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.sqsj}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="宅基地面积">
                        <template slot-scope="scope">
                            <span>{{scope.row.zjdmj}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="项目状态">
                        <template slot-scope="scope">
                            <span>{{getOptName('项目状态', scope.row.xmzt)}}</span>
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
          <el-row>
            <el-col :span="24" style="height:300px;border:1px solid #F2F2F2">
              <p class="header-title">项目所属阶段统计</p>
              <div ref="pieMain" :style="{width: '100%',height:'250px',margin:'0 auto'}"></div>             
            </el-col>
            <el-col :span="24" style="height:300px;margin-top:10px;border:1px solid #F2F2F2">
              <p class="header-title">申请与已建数</p>
              <div ref="barMain" :style="{width: '100%',height:'250px',margin:'0 auto'}"></div>
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
import { getTableList,GetPieChartDatas,GetBarChartDatas } from "../../../../api/res.business";
import dictMixnis from "../../mixnis/dict-mixnis"
import { color } from "echarts/lib/export";
export default {
  name: "land-map-implementationProcess",
  mixins: [ dictMixnis],
  data() {
    return {
      table: {
        key: 0,
        listLoading: false,
        list: [],
        total: null,
        current: 1,
        size: 10,
        pages: null
      },
      //饼状图数据显示
      pieChartDatas:[],
      //柱状图数据显示
      barChartDatas:[
            {
              sqnf: "",
              number: 28,
              resData: [
                {
                  name: "申请数",
                  value: ""
                },
                {
                  name: "已建数",
                  value: ""
                }
              ]
            }
        ],

      //搜索权限
      queryForm: {
        sqid: "",
        jflx: "",
        kssj: "",
        jssj: "",
        xmzt: ""       
      },
      pieChart: {},
      barChart: {}
    };
  },
  mounted() {
    this.getChartData();
    this.getTableData();
    //当页面大小发生变化时，echarts统计图根据画布大小自动重新绘制
    window.addEventListener("resize", () => {
      this.barChart.resize();
      this.pieChart.resize();
    });
  },
  methods: {
    getChartData() {
      //柱状图请求方法
      GetBarChartDatas()
        .then(res => {
          this.barChartDatas = res;
          this.InitChart();
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.table.listLoading = false;
        });
      //饼状图请求方法
      GetPieChartDatas()
        .then(res => {
          this.pieChartDatas = res;
          this.IniPieChart();
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.table.listLoading = false;
        });
    },
    //获取表格数据
    getTableData() {
      this.table.listLoading = true;
      getTableList(
        this.queryForm,//查询条件
        this.table.current,//当前页
        this.table.size//每页数量       
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
    handleSizeChange(pageSiz) {
      this.table.size = pageSiz;
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
        const serieSqs = {
          name: "申请数",
          type: "bar",
          color: "#04BE7D",
          label: { show: true, position: "top" }
        };
        const serieYjs = {
          name: "已建数",
          type: "bar",
          color: "#51CEE6",
          label: { show: true, position: "top" }
        };
        const dataSqs = [];
        const dataYjs = [];
        const xAixs = [];
        _dataList.forEach(item => {
          xAixs.push(item.sqnf);
          dataSqs.push(item.sqs);
          dataYjs.push(item.yjs);
        });
        serieSqs.data = dataSqs;
        serieYjs.data = dataYjs;
        const option = {
          legend: {
            right: 60,
            itemWidth: 13,
            icon: "rect",
            data: ["申请数", "已建数"]
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
          series: [serieSqs, serieYjs]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.barChart.setOption(option);
      }
    },

    //扇形统计图
    IniPieChart() {
      var datalist = [];
      this.pieChartDatas.forEach(item => {
        var list = {};
        list["name"] = item.xmjd;
        list["value"] = item.zjdmj;
        datalist.push(list);
      });
      const _dataList = datalist;
      this.pieChart = this.$echarts.init(this.$refs.pieMain);
      const option = {
        legend: {//环形图布局
          orient: "vertical",
          right: 60,
          bottom: "10%",
          data: datalist.name,
          padding: [0, 60, 0, 0],
          selectedMode: false,
          itemWidth: 6,
          itemHeight: 30,
          itemStyle: {
            borderWidth: 1,
            borderColor: "black"
          },
          icon: "rect",
          textStyle: {//环形图右侧3列的样式
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
            if (name == "项目申报") {
              arr = ["{a|项目申报}", "{b|" + _dataList[_index].value + "}"];
            } else if (name == "联合审批") {
              arr = ["{a|联合审批}", "{c|" + _dataList[_index].value + "}"];
            } else if (name == "综合验收") {
              arr = ["{a|综合验收}", "{c|" + _dataList[_index].value + "}"];
            }
            return arr.join("");
          }
        },
        series: [
          {
            type: "pie",
            radius: ["35%", "75%"],//调整环形图的大小
            center: [250, 125],//调整环形图位置：距离右边距、上边距
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
                var colorList = ["#51CEE6", "#2D80E8", "#04BE7D"];
                return colorList[params.dataIndex];
              }
            },
            data: datalist
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