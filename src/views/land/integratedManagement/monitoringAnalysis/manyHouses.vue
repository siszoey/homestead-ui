<template>
    <div class="contents">
        <el-row class="queryForm">
          <el-col>
            <el-form :inline="true" :model="queryForm" ref="queryForm" size="mini">
              <el-form-item label="姓名查询" prop="xm" class="formItem">
                <el-input v-model="queryForm['xm']" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="sfzh" class="formItem">
                <el-input v-model="queryForm['sfzh']" placeholder=""></el-input>
              </el-form-item>
              <!-- <el-form-item label="一户多宅" prop="jflx" class="formItem">
                <el-select v-model="queryForm['jflx']" placeholder="" style="width:120px">
                  <el-option
                    v-for="(option, index) in getDicts('建房类型')"
                    :label="option.optName"
                    :value="option.optCode"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="一户多宅" prop="yhdz" class="formItem">
                <el-select v-model="queryForm['yhdz']" clearable placeholder="" style="width:120px">
                  <el-option label="一户两宅" value="一户两宅"></el-option>
                  <el-option label="一户三宅" value="一户三宅"></el-option>
                  <el-option label="一户四宅" value="一户四宅"></el-option>
                </el-select>
              </el-form-item>
              <div style="float: right">
                <el-form-item>
                  <el-button type="info" v-on:click="add()" style="background:#27658A">新增</el-button>
                  <el-button type="info" @click="search()" style="background:#27658A">查询记录</el-button>
                </el-form-item>
              </div>
            </el-form>
          </el-col>
        </el-row>
        <el-row class="warp">
          <el-col :span="14" style="padding: 0px 5px 0px 0px">                 
            <el-table
              :key="table.key"
              :data="tableData"
              v-loading="table.listLoading"
              element-loading-text="拼命加载中..."
              highlight-current-row
              border
              :header-cell-style="{background:'#F5F5F5',color:'#666666'}"
              style="width: 100%;"
            >
            <el-table-column align="center" label="姓名" prop="xm" :show-overflow-tooltip="true" width="80px">
              <!-- <template slot-scope="scope">
                
                <span>{{scope.row.sqid}}</span>
              </template> -->
            </el-table-column>

            <el-table-column align="center" label="身份证号" prop="sfzh" :show-overflow-tooltip="true" width="180px">
              <!-- <template slot-scope="scope">
                <span>{{getOptName('建房类型', scope.row.jflx)}}</span>
              </template> -->
            </el-table-column>

            <el-table-column align="center" label="家庭总人口" prop="jtzrk" width="100" :show-overflow-tooltip="true">
              <!-- <template slot-scope="scope">
                <span>{{getOptName('建房类型', scope.row.jflx)}}</span>
              </template> -->
            </el-table-column>

            <el-table-column align="center" label="常住地址" prop="czdz" :show-overflow-tooltip="true">
              <!-- <template slot-scope="scope">
                <span>{{getOptName('户口性质', scope.row.residenceType)}}</span>
                <span>{{scope.row.sqrrq}}</span>
              </template> -->
            </el-table-column>

            <el-table-column align="center" label="住宅位置" prop="zzwz" :show-overflow-tooltip="true">
              <!-- <template slot-scope="scope">
                <span>{{getOptName('办理状态', scope.row.xmzt)}}</span>
              </template> -->
            </el-table-column>

            <el-table-column align="center" label="住宅面积" prop="zzmj" width="80" :show-overflow-tooltip="true">
              <!-- <template slot-scope="scope">
                <span>{{scope.row.sqr}}</span>
              </template> -->
            </el-table-column>
            <el-table-column align="center" label="宅基地退出意愿" prop="zjdtcyy" width="120" :show-overflow-tooltip="true">
              <!-- <template slot-scope="scope">
                <span>{{scope.row.sqr}}</span>
              </template> -->
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
            :page-count="4"
            style="margin-top:35px;text-align:center"
          ></el-pagination>
           <!-- 详情弹框 -->
          <el-dialog title="一户多宅分析信息列表" :visible.sync="editFormVisible" top="5vh">
              <el-form :model="editForm" label-width="110px" ref="editForm">
                <el-form-item label="姓名" prop="xm">
                  <el-input v-model="editForm.xm" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="身份证号" prop="sfzh">
                  <el-input v-model="editForm.sfzh" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="家庭总人口" prop="jtzrk">
                  <el-input v-model="editForm.jtzrk" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="常住地址" prop="czdz">
                  <el-input v-model="editForm.czdz" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="住宅位置" prop="zzwz">
                  <el-input v-model="editForm.zzwz" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="住宅面积" prop="zzmj">
                  <el-input v-model="editForm.zzmj" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="宅基地退出意愿" prop="zjdtcyy">
                  <el-input v-model="editForm.zjdtcyy" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">确定</el-button>
              </div>
          </el-dialog>
          </el-col>
          <el-col :span="10">
              <div class="map">
                  <oneMap :hiddenToolbar="flase"></oneMap>
              </div>
          </el-col>
        </el-row>
    </div>
</template>

<script>
    import { color } from "echarts/lib/export"

    import {
  getAuditTableDatas,
  GetAuditProgress,
  GetAuditSituation,
  GetYearAuditSituation
} from "../../../../api/map";
import dictMixins from "../../mixnis/dict-mixnis";

import Region from '../../mixnis/region-mixin.js'
import jsonFileHandler from "@/libs/util.jsonfile.js"


    export default {
        components: {
            OneMap: () => import('../../../land/map/spatialData/onemap.vue')
        },
        mixins: [dictMixins,Region],
        data() {
            return {
                barDatas: [
                    { name: "东路镇", value: "24" },
                    { name: "东郊镇", value: "17" },
                    { name: "东阁镇", value: "36" },
                    { name: "会文镇", value: "28" },
                    { name: "公坡镇", value: "29" },
                    { name: "冯坡镇", value: "29" },
                    { name: "抱罗镇", value: "24" },
                    { name: "文城镇", value: "10" }
                ],
                lineDatas: [
                    { name: "2012", value: "146" },
                    { name: "2013", value: "173" },
                    { name: "2014", value: "142" },
                    { name: "2015", value: "153" },
                    { name: "2016", value: "230" },
                    { name: "2017", value: "138" },
                    { name: "2018", value: "152" },
                    { name: "2019", value: "180" }
                ],
                pieDatas: [
                    { name: "超标用地", value: "230" },
                    { name: "占用农地", value: "180" },
                    { name: "临时违法用地", value: "220" },
                    { name: "未批先建", value: "370" }
                ],
                yclData: "6234",
                wclData: "1232",
                barChart: {},
                lineChart: {},
                pieChart: {},
                editFormVisible: false,//详情界面是否显示
                 //详情界面数据
                editForm: {
                  xm: '',
                  sfzh: '',
                  jtzrk:'',
                  czdz:'',
                  zzwz:'',
                  zzmj:'',
                  zjdtcyy:''
                },
                table: {
                  key: 0,
                  listLoading: false,
                  list: [],
                  total: null,
                  current: 0,
                  size: 10,
                  pages: null
                },
                queryForm: {
                  roleid: "",
                  xm: "",
                  sfzh: "",
                  jflx: "",
                  yhdz: ""
                },
                sqsj: "",

                tableData:[]
            };
        },
        mounted() {
            this.InitChart();
            this.LineChart();
            this.IniPieChart();
            //当页面大小发生变化时，echarts统计图根据画布大小自动重新绘制
            window.addEventListener("resize", () => {
                this.barChart.resize();
                this.lineChart.resize();
                this.pieChart.resize();
            });

            this.getTableData();
        },
        created(){
            // console.log(this.manyHouses)
          this.initData();
        },
        methods: {
            //柱状统计图
            InitChart() {
                const _dataList = this.barDatas;
                this.barChart = this.$echarts.init(this.$refs.barMain);
                if (_dataList.length > 0) {
                    const serieHs = {
                        name: "户数",
                        type: "bar",
                        color: "#33A062",
                        barWidth: 30,
                        label: {
                            show: true,
                            position: 'top',
                            color: '#000'
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
                            text: '一户多宅统计'
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
                            name: '户数',
                            nameTextStyle: {
                                color: '#aaa'
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
                        name: "违法建筑数量",
                        type: "line",
                        smooth: true,
                        color: "#00AAFF"
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
                            text: '历年违法建筑统计'
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
                            name: '违法建筑数量',
                            nameTextStyle: {
                                color: '#aaa'
                            }
                        },
                        series: [serieHs]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    this.lineChart.setOption(option);
                }
            },
            //扇形统计图
            IniPieChart() {
                const _dataList = this.pieDatas;
                this.pieChart = this.$echarts.init(this.$refs.pieMain);
                const option = {
                    title: {
                        text: '违法用地统计'
                    },
                    series: [
                        {
                            type: "pie",
                            radius: ["35%", "75%"],
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
                                color: function (params) {
                                    var colorList = ["#FDDF37", "#38A8F5", "#7150F6", "#B0CE20"];
                                    return colorList[params.dataIndex];
                                }
                            },
                            data: this.pieDatas
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                this.pieChart.setOption(option);
            },

            getTableData() {
              this.table.listLoading = true;
              getAuditTableDatas(
                this.table.current,
                this.table.size,
                this.sqsj,
                this.queryForm
              )
                .then(res => {
                  // console.log(res)
                  this.table.list = res.records;
                  this.table.total = res.total;
                })
                .catch(err => console.log(err))
                .finally(() => {
                  this.table.listLoading = false;
                });
            },
            //新增事件
            add(){
              this.editForm = {
                xm: '',
                sfzh: '',
                jtzrk:'',
                czdz:'',
                zzwz:'',
                zzmj:'',
                zjdtcyy:''
            }
            this.editFormVisible = true;
            },
            handleSizeChange(size) {
              this.table.size = size;
              this.getTableData();
            },
            handleCurrentChange(current) {
              this.table.current = current;
              this.getTableData();
            },
            search(){
              this.initData();
              console.log(this.queryForm)
            },
            //获取构造的表格数据
            initData(){
              this.getRegions().then(datas=>{
                this.cities = datas
              })
              let code = this.getRegionCode()
              jsonFileHandler.getData('test-data/monitor/manyHouses.json','code',code).then(datas=>{
                let resList = datas.tableData.filter(item => (item.sfzh).indexOf(this.queryForm.sfzh) > -1&&(item.xm).indexOf(this.queryForm.xm) > -1)
                this.tableData=resList
                
              })
            },
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
        height: 100%;
        margin: 1% 1.5%;
        // background:white;
    }

    .el-col {
        height: 100%;
    }

    .charts {
        display: -webkit-flex;
        display: flex;
        -webkit-flex-direction: column;
        flex-direction: column;
        width: 98%;
        height: 100%;
    }

    .map {
        width: 100%;
        height: 100%;
        border: 1px solid #CDCDCD;
    }

    .yhdztj_div,
    .lnwfjztj_div,
    .wfydtj_div {
        width: 100%;
        height: 33%;
    }

    .title {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 2px;
        height: 30px;
        line-height: 30px;
    }

    .chart_div {
        height: 100%;
        width: 100%;
    }

    .cls_div {
        width: 80%;
        height: 20%;
        margin-top: 8%;
        border: 1px solid #CDCDCD;
        font-size: 18px;
        color: #aaa;
        letter-spacing: 1px;
        background: #F9F9F9;
    }

    .clsText,
    .clsNum {
        height: 100%;
        /*flex 布局*/
        display: flex;
        /*实现垂直居中*/
        align-items: center;
        /*实现水平居中*/
        justify-content: center;
        text-align: justify;
    }

    .clsText {
        width: 40%;
        float: left;
    }

    .clsNum {
        width: 60%;
        font-weight: 600;
        float: right;
    }

    .queryForm {
      margin-left:25px;
      padding:25px 5px 10px 10px;
      // background:white;
    }
    .formItem{
      margin-bottom:0px;
    }
</style>