<template>
  <div class="body-box bg-white">
    <p class="header-title">项目统计分析</p>
          <el-form :inline="true"   class="sqrform" label-width="100px" style="margin-bottom:10px">
            <el-form-item v-for="(column, index) in columnOptions" :label="column.label" :prop="column.key" :key="index" style="margin-left:-15px">
                <el-select v-if="column.options" v-model="queryForm[column.key]" size="small" >
                    <el-option v-for="(option, oIndex) in column.options" :label="option.content" :value="option.code" :key="oIndex">                 
                    </el-option>
                </el-select>
                <el-input v-else v-model="queryForm[column.key]" :placeholder="column.label" size="small" ></el-input>
            </el-form-item>           
            <el-button size="small" type="primary" icon="el-icon-search" style="margin-left:10px" @click="getTableData">查询</el-button>
          </el-form>
          <el-row :gutter="20">
            <el-col :span="18" style="width:60%">
            <!-- table表格 -->
            <el-table :key='table.key'
                          :data="table.list"
                          v-loading="table.listLoading"
                          element-loading-text="加载中..."
                          highlight-current-row
                          border
                          style="width: 100%;padding:15px">
                 
                 <el-table-column align="center" label="项目编号">
                        <template slot-scope="scope">
                            <span>{{scope.row.xmmc}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="建房类型">
                        <template slot-scope="scope">
                            <span>{{scope.row.sqlx}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="申请时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.sqsj}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="申请面积">
                        <template slot-scope="scope">
                            <span>{{scope.row.sqmj}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="项目状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.xmzt}}</span>
                        </template>
                    </el-table-column>                    
            </el-table>
            <!-- footer 分页条 -->            
            <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="table.pageNum"
                        :page-sizes="[10,20,30,50]"
                        :page-size="table.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="table.total"
                        style="margin: 10px;">
            </el-pagination>
            </el-col>
            <el-col :span="6" style="width:40%;height:300px;background:white">
                <div style="font-size: 15px;font-weight: bold;padding-top: 10px;padding-bottom: 10px">项目所属阶段统计
                </div>
                <hr>
                <div style="width: 500px;height: 200px;margin-left: -10px;padding-top: -10px" ref="chart1"></div>
            </el-col>
            <el-col :span="6" style="margin-left:770px;margin-top:10px;width:40%;height:300px;background:white">
                  <div style="font-size: 15px;font-weight: bold;padding-top: 10px;padding-bottom: 10px">申请与已建数
                  </div>
                  <hr>
                  <div style="width: 500px;height: 200px;margin-left: 50px;padding-top: 10px" ref="chart2"></div>
            </el-col>

        </el-row>
  </div>
</template>

<script>
import {getTableList} from '../../../../api/res.business'
import {declareColumnsFilter} from "../statistics/constant"//查询参数

export default {
name: 'dataAnalysis',
    data() {
      let declareColumns = declareColumnsFilter(true, ['jflx', 'sqid','sqsj','xmzt'])
      return {
        columnOptions: declareColumns,
        table: {
          key: 0,
          listLoading: false,
          list: [],
          total: null,
          pageNum: 1,
          pageSize: 10,
          pages: null
        },
        queryForm: function () {
          let form = {}
          declareColumns.map(column => {
            form[column.key] = ''
          })
          return form
        }(),
        //饼状图
         pieData:[
            {value:898, name:'项目申报'},
            {value:1088, name:'项目审批'},
            {value:735, name:'综合验收'}
          ],
          barData:[
            {
              name:'申请',
              type:'bar',
              data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
             {
              name:'已建',
              type:'bar',
              data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            }
          ],
       



      }
    },
    created() {
      console.log(999);
      this.getTableData()
    },
    mounted(){
      //this.getXmscjdtj();
      this.ringDrag();
      this.barEcharts();
      //this.init();
    },
    methods: {
      //datatable获取数据
      getTableData() {
        this.table.listLoading = true
        getTableList(this.table.pageNum, this.table.pageSize, this.queryForm).then(res => {
          this.table.list = res.list
          this.table.total = res.total
        }).catch(err => console.log(err)).finally(() => {
          this.table.listLoading = false
        })
      },
      //分页（页面大小）
      handleSizeChange(pageSiz) {
        this.table.pageSize = pageSiz
        this.getTableData()
      },
      //分页（页码）
      handleCurrentChange(pageNum) {
        this.table.pageNum = pageNum
        this.getTableData()
      },
      //饼状图获取数据
      // init() {
      // let regionCode = "{}"
      // getXmscjdtj(regionCode).then((res) => {
      //     let myChart1 = this.$echarts.init(this.$refs.chart1)
      //     this.echartOption1.series[0].data[0].value = res.ydfjTotal
      //     this.echartOption1.series[0].data[1].value = res.ffxfTotal
      //     this.echartOption1.series[0].data[2].value = res.xjTotal
      //     myChart1.setOption(this.echartOption1)
      //   })

      // getsqyyjs(regionCode).then((res) => {
      //     let myChart2 = this.$echarts.init(this.$refs.chart2)
      //     this.echartOption2.series[0].data = res.sqs
      //     this.echartOption2.series[1].data = res.yjs
      //     myChart2.setOption(this.echartOption2)
      //   })
      //},
      //饼状图
      // getXmscjdtj() {
      //     getXmscjdtj({}).then(res => {
      //       this.dataList=res;
      //       this.ringDrag();
      //     })
      // },
      ringDrag(){
          const _dataList = this.pieData;
          const myChart = this.$echarts.init(this.$refs.chart1);
          const option = {
            legend: {//环形图布局
          orient: "vertical",
          right: 60,
          bottom: "10%",
          data: this.pieData.name,
          padding: [0, -10, -20, 0],
          selectedMode: false,
          itemWidth: 4,
          itemHeight: 20,
          itemStyle: {
            borderWidth: 1,
            borderColor: "black"
          },
          icon: "rect",
          textStyle: {//环形图右侧3列的样式
            fontSize: 14,
            width: 130,
            height: 20,
            padding: [0, 10],
            lineHeight: 20,
            borderWidth: 1,
            borderColor: "#F2F2F2",
            rich: {
              a: {
                align: "left",
                color: "#2C2C2C",
                fontSize: 14
              },
              b: {
                align: "right",
                color: "black",
                fontSize: 14
              },
              c: {
                align: "right",
                color: "black",
                fontSize: 14
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
            radius: ["35%", "75%"],//调整环形图的大小
            center: [160, 100],//调整环形图位置：距离右边距、上边距
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
            data: this.pieData
          }
        ]
      };
        myChart.setOption(option);
      },
      //树状图
      barEcharts(){
        const option={
          legend:{
            data:['申请','已建']
          },
          xAxis: [
              {
                  type: 'category',
                  data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                  axisPointer: {
                      type: 'shadow'
                  }
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  name: '数量',
                  min: 0,
                  max: 100,
                  interval: 20,
                  axisLabel: {
                      formatter: '{value} ml'
                  }
              }
          ],
          series:[

          ]
        };
      } 

      
    }
  }
</script>

<style lang="scss" scoped>
  .header-title{
    margin:0;
    font-size: 18px;
    color: #333333;
    padding:15px;
    font-weight: bold;
  }
</style>