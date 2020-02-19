<template>
  <div>
    <div class="wrap-middle">
      <p class="header-title">项目统计分析</p>
      <el-row class="queryForm">
        <el-col>
          <el-form :inline="true" :model="queryForm" ref="queryForm" size="mini">
            <el-form-item label="建房类型">
              <el-select v-model="queryForm['jflx']">
                <el-option v-for="(option, oIndex) in getDicts('建房类型')" :label="option.optName" :value="option.optCode"
                  :key="oIndex"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="项目编号">
              <el-input v-model="queryForm['sqid']" placeholder="项目编号"></el-input>
            </el-form-item>

            <el-form-item label="申请时间" prop="sqsj">
              <el-date-picker v-model="queryForm['sqsj']" type="daterange" range-separator="至" format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="项目状态">
              <el-select v-model="queryForm['xmzt']" multiple>
                <el-option v-for="(option, oIndex) in getDicts('项目状态')" :label="option.optName" :value="option.optCode"
                  :key="oIndex"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="行政区">
              <el-select v-model="city" v-on:change="changeCity(city)">
                <el-option v-for="item in cities" :key="item.id" :label="item.properties.name" :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="county" v-on:change="changeCounty(county)">
                <el-option v-for="item in counties" :key="item.properties.id" :label="item.properties.name"
                  :value="item.properties.id"></el-option>
              </el-select>
            </el-form-item>

            <div style="float: right">
              <el-form-item>
                <el-button type="warning" :loading="downloadLoading" @click="handleDownload">
                  <d2-icon name="upload" />导出
                </el-button>
                <el-button type="primary" @click="getTableData">
                  <d2-icon name="search" />查询
                </el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-col>
      </el-row>
      <el-row style="padding-bottom:25px">
        <el-col :span="12" style="padding: 0px 5px 0px 10px">
          <el-table :key="table.key" :data="table.list" v-loading="table.listLoading" element-loading-text="拼命加载中..."
            highlight-current-row border :header-cell-style="{background:'#F5F5F5',color:'#666666'}"
            style="width: 100%;">
            <el-table-column align="center" label="项目编号" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.jcxx.sqid}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="建房类型">
              <template slot-scope="scope">
                <span>{{getOptName('建房类型', scope.row.nzjdqk.jflx)}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="申请时间">
              <template slot-scope="scope">
                <span>{{scope.row.qt.sqrrq}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="宅基地面积" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.nzjdqk.zjdmj}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="项目状态" width="180">
              <template slot-scope="scope">
                <span>{{getOptName('项目状态', scope.row.zjdSqJl.xmzt)}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- footer 分页条 -->
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="table.current" :page-size="table.size" layout="total, prev, pager, next, jumper"
            :total="table.total" style="margin-top:35px;text-align:center"></el-pagination>
        </el-col>
        <el-col :span="12" style="padding:0px 5px 0px 5px;height:610px;">
          <el-row>
            <el-col :span="24" style="height:300px;border:1px solid #F2F2F2">
              <!-- <p class="header-title">总案件数 1000宗</p> -->
              <div ref="zajsMain" :style="{width: '100%',height:'300px',margin:'0 auto'}"></div>
            </el-col>
            <el-col :span="24" style="height:300px;margin-top:10px;border:1px solid #F2F2F2">
              <!-- <p class="header-title">总宅基地面积 34万亩</p> -->
              <div ref="zzjdmjMain" :style="{width: '100%',height:'300px',margin:'0 auto'}"></div>
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
  import { GetPieChartDatas, GetBarChartDatas } from "../../../../api/res.business";
  import { PageData } from "../../../../api/land.business";
  import dictMixnis from "../../mixnis/dict-mixnis"
  import { color } from "echarts/lib/export";
  import ExportExcel from "../../../../libs/ExportExcel";

  export default {
    name: "land-map-implementationProcess",
    mixins: [dictMixnis],
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
        zajsDatas: [
          { name: "七岭村", value: "124" },
          { name: "地太村", value: "107" },
          { name: "美港村", value: "122" },
          { name: "隆丰村", value: "72" },
          { name: "铺前村", value: "142" },
          { name: "铺龙村", value: "157" },
          { name: "仕后村", value: "115" },
          { name: "东坡村", value: "102" },
          { name: "林悟村", value: "59" }
        ],
        zzjdmjDatas: [
          { name: "七岭村", value: "2.4" },
          { name: "地太村", value: "4.5" },
          { name: "美港村", value: "2.8" },
          { name: "隆丰村", value: "3.9" },
          { name: "铺前村", value: "5.2" },
          { name: "铺龙村", value: "2.6" },
          { name: "仕后村", value: "4.4" },
          { name: "东坡村", value: "3.7" },
          { name: "林悟村", value: "4.5" }
        ],
        // //饼状图数据显示
        // pieChartDatas: [],
        // //柱状图数据显示
        // barChartDatas: [
        //   {
        //     sqnf: "",
        //     number: 28,
        //     resData: [
        //       {
        //         name: "申请数",
        //         value: ""
        //       },
        //       {
        //         name: "已建数",
        //         value: ""
        //       }
        //     ]
        //   }
        // ],

        //搜索权限
        queryForm: {
          sqid: "",
          jflx: "",
          kssj: "",
          jssj: "",
          xmzt: "",
          sqsj: ""
        },
        pieChart: {},
        zajsChart: {},
        downloadLoading: false,
        city: "",
        cities: [],
        county: "",
        counties: [] //update
      };
    },
    mounted() {
      this.getChartData();
      this.getTableData();
      //当页面大小发生变化时，echarts统计图根据画布大小自动重新绘制
      window.addEventListener("resize", () => {
        this.zajsChart.resize();
        this.pieChart.resize();
      });
      //获取海南市级行政区
      let sj_fileName = "echarts-map/province/json/hainan.json";
      this.requestAjax(sj_fileName, 2);
      //获取海南省海口市行政区
      let xj_fileName = "echarts-map/city/json/hainan/460100.json";
      this.requestAjax(xj_fileName, 3);
      //默认行政区为海口市
      this.city = "460100";
      //this.ajaxSync();
      //初始化表格
      let path =
        "test-data/map/accountInformation/householdRegister/etc/constractorMembers.json";
      this.AjaxGetData(path);
    },
    methods: {
      getChartData() {
        // //柱状图请求方法
        // GetBarChartDatas()
        //   .then(res => {
        //     this.barChartDatas = res;
        //     this.InitChart();
        //   })
        //   .catch(err => console.log(err))
        //   .finally(() => {
        //     this.table.listLoading = false;
        //   });
        // //饼状图请求方法
        // GetPieChartDatas()
        //   .then(res => {
        //     this.pieChartDatas = res;
        //     this.IniPieChart();
        //   })
        //   .catch(err => console.log(err))
        //   .finally(() => {
        //     this.table.listLoading = false;
        //   });
        this.ZajsChart();
        this.ZzjdmjChart();
      },
      //获取表格数据
      getTableData() {
        this.table.listLoading = true;
        PageData(this.getTableDataParam(this.table.current, this.table.size))
          .then(res => {
            this.table.list = res.records || res.list || res.data;
            this.table.total = res.total;
          })
          .catch(err => console.log(err))
          .finally(() => {
            this.table.listLoading = false;
          });
      },
      //获取表格数据时的查询参数其他参数
      getTableDataParam(pageNum, pageSize) {
        //时间区间字段，调整
        let newQueryForm = Object.assign({}, this.queryForm)
        if (newQueryForm.sqsj && newQueryForm.sqsj.length > 0) {
          let start_sqrrq = newQueryForm.sqsj[0]
          let end_sqrrq = newQueryForm.sqsj[1]
          newQueryForm['start_sqrrq'] = start_sqrrq
          newQueryForm['end_sqrrq'] = end_sqrrq
          delete newQueryForm.sqsj
        }
        return Object.assign(
          {
            pageNum: pageNum,
            pageSize: pageSize
          },
          newQueryForm
        );
      },
      handleSizeChange(pageSiz) {
        this.table.size = pageSiz;
        this.getTableData();
      },
      handleCurrentChange(current) {
        this.table.current = current;
        this.getTableData();
      },
      //导出为Excel文件
      handleDownload() {
        this.downloadLoading = true
        PageData(this.getTableDataParam(-1, -1))
          .then(res => {
            let resList = res.records || res.list || res.data;
            let list = Array.from(
              new Set(resList.map(item => {
                return { sqid: item.jcxx.sqid, jflx: this.getOptName('建房类型', item.nzjdqk.jflx), sqrrq: item.qt.sqrrq, zjdmj: item.nzjdqk.zjdmj, xmzt: this.getOptName('项目状态', item.zjdSqJl.xmzt) };
              })));
            console.log(list)
            let tValue = ['sqid', 'jflx', 'sqrrq', 'zjdmj', 'xmzt'];
            import('../../../../libs/ExportExcel').then(excel => {
              const data = this.formatJson(tValue, list)
              excel.export_json_to_excel({
                header: ['项目编号', '建房类型', '申请时间', '宅基地面积', '项目状态'],
                data,
                filename: "统计分析",
                autoWidth: true,
                bookType: 'xlsx'
              })
            })
              .catch(err => console.log(err))
              .finally(() => {
                this.downloadLoading = false
              });
          })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          return v[j]
        }))
      },
      //柱状统计图
      ZajsChart() {
        const _dataList = this.zajsDatas;
        this.zajsChart = this.$echarts.init(this.$refs.zajsMain);
        if (_dataList.length > 0) {
          const serieHs = {
            name: "案件数（宗）",
            type: "bar",
            smooth: true,
            color: "#04BE7D",
            barWidth: 30
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
              text: '总案件数  1000宗'
            },
            tooltip: {
              axisPointer: {
                type: 'shadow'
              }
            },
            xAxis: {
              type: 'category',
              axisLabel: {
                textStyle: { //改变刻度字体样式
                  color: '#aaa'
                }
              },
              data: xAixs
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                textStyle: { //改变刻度字体样式
                  color: '#aaa'
                }
              },
              name: '各村宅基地案件数（宗）',
              nameTextStyle: {
                color: '#aaa'
              }
            },
            series: [serieHs]
          };
          // 使用刚指定的配置项和数据显示图表。
          this.zajsChart.setOption(option);
        }
      },
      //折线统计图
      ZzjdmjChart() {
        const _dataList = this.zzjdmjDatas;
        this.zzjdmjChart = this.$echarts.init(this.$refs.zzjdmjMain);
        if (_dataList.length > 0) {
          const serieHs = {
            name: "面积（万亩）",
            type: "bar",
            smooth: true,
            barWidth: 30,
            color: "#5587FF"
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
              text: '总宅基地面积  34万亩'
            },
            tooltip: {
              axisPointer: {
                type: 'shadow'
              }
            },
            xAxis: {
              type: 'category',
              axisLabel: {
                textStyle: { //改变刻度字体样式
                  color: '#aaa'
                }
              },
              data: xAixs
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                textStyle: { //改变刻度字体样式
                  color: '#aaa'
                }
              },
              name: '各村宅基地面积（万亩）',
              nameTextStyle: {
                color: '#aaa'
              }
            },
            series: [serieHs]
          };
          // 使用刚指定的配置项和数据显示图表。
          this.zzjdmjChart.setOption(option);
        }
      },
      // //柱状统计图
      // InitChart() {
      //   const _dataList = this.barChartDatas;
      //   this.barChart = this.$echarts.init(this.$refs.zzjdmjMain);
      //   if (_dataList.length > 0) {
      //     const serieSqs = {
      //       name: "申请数",
      //       type: "bar",
      //       color: "#04BE7D",
      //       label: { show: true, position: "top" }
      //     };
      //     const serieYjs = {
      //       name: "已建数",
      //       type: "bar",
      //       color: "#51CEE6",
      //       label: { show: true, position: "top" }
      //     };
      //     const dataSqs = [];
      //     const dataYjs = [];
      //     const xAixs = [];
      //     _dataList.forEach(item => {
      //       xAixs.push(item.sqnf);
      //       dataSqs.push(item.sqs);
      //       dataYjs.push(item.yjs);
      //     });
      //     serieSqs.data = dataSqs;
      //     serieYjs.data = dataYjs;
      //     const option = {
      //       legend: {
      //         right: 60,
      //         itemWidth: 13,
      //         icon: "rect",
      //         data: ["申请数", "已建数"]
      //       },
      //       tooltip: {
      //         trigger: "axis",
      //         axisPointer: {
      //           // 坐标轴指示器，坐标轴触发有效
      //           type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      //         }
      //       },
      //       dataZoom: [
      //         {
      //           type: "inside"
      //         },
      //         {
      //           type: "slider"
      //         }
      //       ],
      //       xAxis: [
      //         {
      //           type: "category",
      //           data: xAixs
      //         }
      //       ],
      //       yAxis: [
      //         {
      //           type: "value"
      //         }
      //       ],
      //       series: [serieSqs, serieYjs]
      //     };
      //     // 使用刚指定的配置项和数据显示图表。
      //     this.barChart.setOption(option);
      //   }
      // },

      // //扇形统计图
      // IniPieChart() {
      //   var datalist = [];
      //   this.pieChartDatas.forEach(item => {
      //     var list = {};
      //     list["name"] = item.xmjd;
      //     list["value"] = item.zjdmj;
      //     datalist.push(list);
      //   });
      //   const _dataList = datalist;
      //   this.pieChart = this.$echarts.init(this.$refs.zajsMain);
      //   const option = {
      //     legend: {//环形图布局
      //       orient: "vertical",
      //       right: 60,
      //       bottom: "10%",
      //       data: datalist.name,
      //       padding: [0, 60, 0, 0],
      //       selectedMode: false,
      //       itemWidth: 6,
      //       itemHeight: 30,
      //       itemStyle: {
      //         borderWidth: 1,
      //         borderColor: "black"
      //       },
      //       icon: "rect",
      //       textStyle: {//环形图右侧3列的样式
      //         fontSize: 16,
      //         width: 150,
      //         height: 30,
      //         padding: [0, 10],
      //         lineHeight: 30,
      //         borderWidth: 1,
      //         borderColor: "#F2F2F2",
      //         rich: {
      //           a: {
      //             align: "left",
      //             color: "#2C2C2C",
      //             fontSize: 16
      //           },
      //           b: {
      //             align: "right",
      //             color: "black",
      //             fontSize: 16
      //           },
      //           c: {
      //             align: "right",
      //             color: "black",
      //             fontSize: 16
      //           }
      //         }
      //       },
      //       tooltip: {
      //         show: false
      //       },
      //       formatter: function (name) {
      //         let _index = 0;
      //         _dataList.forEach((item, i) => {
      //           if (item.name == name) {
      //             _index = i;
      //           }
      //         });
      //         let arr;
      //         if (name == "项目申报") {
      //           arr = ["{a|项目申报}", "{b|" + _dataList[_index].value + "}"];
      //         } else if (name == "联合审批") {
      //           arr = ["{a|联合审批}", "{c|" + _dataList[_index].value + "}"];
      //         } else if (name == "综合验收") {
      //           arr = ["{a|综合验收}", "{c|" + _dataList[_index].value + "}"];
      //         }
      //         return arr.join("");
      //       }
      //     },
      //     series: [
      //       {
      //         type: "pie",
      //         radius: ["35%", "75%"],//调整环形图的大小
      //         center: [250, 125],//调整环形图位置：距离右边距、上边距
      //         avoidLabelOverlap: true,//是否启用防止标签重叠策略
      //         hoverAnimation: true,//是否开启 hover 在扇区上的放大动画效果
      //         legendHoverLink: true,//是否启用图例 hover 时的联动高亮
      //         silent: false,
      //         label: {
      //           formatter: "{b}\n{d}%",
      //           color: "black"
      //         },
      //         labelLine: {
      //           lineStyle: {
      //             color: "#666"
      //           },
      //           length: 10,
      //           length2: 25
      //         },
      //         itemStyle: {
      //           color: function (params) {
      //             var colorList = ["#51CEE6", "#2D80E8", "#04BE7D"];
      //             return colorList[params.dataIndex];
      //           }
      //         },
      //         data: datalist
      //       }
      //     ]
      //   };
      //   // 使用刚指定的配置项和数据显示图表。
      //   this.pieChart.setOption(option);
      // },
      changeCity(value) {
        let fileName = "";
        let path = "";
        console.log(value);
        switch (value) {
          case "460100":
            fileName = "echarts-map/city/json/hainan/460100.json";
            path =
              "test-data/map/accountInformation/householdRegister/city/haikou.json";
            break;
          case "460200":
            fileName = "echarts-map/city/json/hainan/460200.json";
            path =
              "test-data/map/accountInformation/householdRegister/city/sanya.json";
            break;
          case "460300":
            fileName = "echarts-map/city/json/hainan/460300.json";
            path =
              "test-data/map/accountInformation/householdRegister/city/sansha.json";
            break;
          default:
            this.county = ""; //change时清空county
            this.counties = [];
            // this.tableData = [];
            break;
        }
        if (path != "") {
          // this.AjaxGetData(path);
        }
        if (filename != "") {
          this.requestAjax(fileName, 3);
        }
      },
      changeCounty(value) {
        let path = "";
        console.log(value);
        switch (value) {
          case "460106":
            path =
              "test-data/map/accountInformation/householdRegister/county/haikou/longhua.json";
            break;
          case "460108":
            path =
              "test-data/map/accountInformation/householdRegister/county/haikou/meilan.json";
            break;
          case "460107":
            path =
              "test-data/map/accountInformation/householdRegister/county/haikou/qiongshan.json";
            break;
          case "460200":
            path =
              "test-data/map/accountInformation/householdRegister/city/sanya.json";
            break;
          case "460302":
            path =
              "test-data/map/accountInformation/householdRegister/county/sansha/nanshaqundao.json";
            break;
          case "460301":
            path =
              "test-data/map/accountInformation/householdRegister/county/sansha/xishaqundao.json";
            break;
          case "460303":
            path =
              "test-data/map/accountInformation/householdRegister/county/sansha/zsqdddjjqhy.json";
            break;
          default:
            // this.tableData = [];
            break;
        }
        if (path != "") {
          // this.AjaxGetData(path);
        }
      },
      //ajax获取本地json文件行政区划
      requestAjax(fileName, level) {
        let _this = this;
        this.$axios
          .get(fileName)
          //then获取成功；response成功后的返回值（对象）
          .then(response => {
            console.log(response.data.features); //[0].properties.name
            if (level == "3") {
              _this.county = ""; //change时清空county
              _this.counties = response.data.features;
            } else if (level == "2") {
              _this.cities = response.data.features;
            }
          })
          //获取失败
          .catch(error => {
            console.log(error);
            alert("网络错误，不能访问");
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-row {
    margin-right: 5px;
  }

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
    // margin-top: 20px;
    margin-bottom: 20px;
    background: #fff;
    height: auto;
  }

  .queryForm {
    // padding: 25px 15px 10px 25px;
    padding: 0.25rem 0.05rem 0.1rem 0.05rem;
    margin: 0px;
  }
</style>