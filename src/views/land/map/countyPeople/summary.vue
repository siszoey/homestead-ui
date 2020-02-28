<template>
  <div>
    <div class="wrap-top">
      <el-row class="progress-box">
        <el-card class="box-card-zrk">
            <div slot="header" class="zrk_header bg_color" >
              <div >总人口</div>
            </div>
            <div class="card_body">
               <img :src="zrk"/>
               <div style="display: unset;"> {{summary.totalPopulation}}</div>
            </div> 
        </el-card>
        <el-card class="box-card-zhs card_margin">
            <div slot="header" class="zhs_header bg_color">
              <div>总户数</div>
            </div>
            <div class="card_body">
              <img :src="zhs"/>
               <div style="display: unset;"> {{summary.totalHouse}}</div>
            </div> 
        </el-card>
        <el-card class="box-card-yhdz card_margin" >
            <div slot="header" class="yhdz_header bg_color">
              <div>一户多宅户数</div>
            </div>
            <div class="card_body">
              <img :src="yhdz"/>
               <div style="display: unset;"> {{summary.yhdz}}</div>
            </div> 
        </el-card>
        <el-card class="box-card-zxrs card_margin">
            <div slot="header" class="zxrs_header bg_color">
              <div>注销人数</div>
            </div>
            <div class="card_body" >
              <img :src="zxrs"/>
               <div style="display: unset;"> {{summary.cancellationCount}}</div>
            </div> 
        </el-card>
        <el-card class="box-card-zhszz card_margin">
            <div slot="header" class="zhszz_header bg_color">
              <div>总户数人口增涨率</div>
            </div>
            <div class="card_body">
              <img :src="zhszz"/>
               <div style="display: unset;"> {{summary.houseAscRate}}</div>
            </div> 
        </el-card>
        <el-card class="box-card-hjrkzz card_margin">
            <div slot="header" class="hjrkzz_header bg_color">
              <div>户籍人口增涨率</div>
            </div>
            <div class="card_body">
              <img :src="hjrkzz"/>
               <div style="display: unset;"> {{summary.peopleAscRate}}</div>
            </div> 
        </el-card>
      </el-row>
    </div>

    <div class="wrap-middle">
      <el-row class="queryForm">
        <el-col>
          <el-form :inline="true" :model="queryForm" ref="queryForm" size="mini" style="margin-bottom: -25px; padding: 0 20px">
            <el-form-item label="行政区">
              <el-select v-model="city" v-on:change="changeCity(city)">
                <el-option
                 v-for="item in cities"
                :key="item.code"
                :label="item.name"
                :value="item.code"
                ></el-option>
              </el-select>
              <el-select v-model="county" v-on:change="changeCounty(county)">
                <el-option
                  v-for="item in counties"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>

            <div style="float: right">
              <el-form-item>
                <el-button type="primary" icon="el-icon-statistics" @click="statistics">统计分析</el-button>
                <el-button type="success" icon="el-icon-plus" v-on:click="add()">新增</el-button>
                <el-button type="primary" icon="el-icon-search" v-on:click="search()">查询</el-button>
                <el-button type="default" @click="resetForm('queryForm')">
                  <d2-icon name="refresh" />
                </el-button>
              </el-form-item>
            </div>

          </el-form>
        </el-col>
      </el-row>
      <el-row style="padding-bottom:25px">
        <el-col style="padding: 0px 5px 0px 25px" :span="showFileView ? 14: 24"  >
          <el-table
            element-loading-text="拼命加载中..."
            highlight-current-row
            :key='table.key'
            :data="table.list"
            v-loading="table.listLoading"
            stripe
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column prop="hzxm" label="户主姓名" width="120" sortable></el-table-column>
            <el-table-column prop="sfzh" label="身份证号" sortable></el-table-column>
            <el-table-column prop="nl" label="年龄" width="80" sortable></el-table-column>
            <el-table-column prop="jtzz" label="家庭住址" sortable></el-table-column>
            <el-table-column prop="hkszd" label="户口所在地" sortable></el-table-column>
            <el-table-column prop="jtzrs" label="家庭总人数" width="120" sortable></el-table-column>
            <el-table-column fixed="right" align="center" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleUpdate(scope.row)"
                        icon="el-icon-edit">查看详情
                    </el-button>
                </template>
            </el-table-column>
          </el-table>
          <!-- footer 分页条 -->
          <!-- <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"            
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="100"
              :page-count="4"
              style="margin-top:35px;text-align:center"
          ></el-pagination> -->
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="table.pageNum" :page-sizes="[10,20,30,50]" :page-size="table.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="table.total" style="margin-top:35px;text-align:center">
          </el-pagination>
          <!-- 详情弹框 -->
          <el-dialog title="农村人口详情信息" :visible.sync="editFormVisible" width="450px">
              <el-form :model="editForm" label-width="100px" ref="editForm">
                <el-form-item label="户主姓名" prop="hzxm">
                  <el-input v-model="editForm.hzxm" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="身份证号" prop="sfzh">
                  <el-input v-model="editForm.sfzh" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="nl">
                  <el-input v-model="editForm.nl" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="家庭住址" prop="jtzz">
                  <el-input v-model="editForm.jtzz" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="户口所在地" prop="hkszd">
                  <el-input v-model="editForm.hkszd" auto-complete="off"></el-input>
                </el-form-item>
                  <el-form-item label="家庭总人数" prop="jtzrs">
                  <el-input v-model="editForm.jtzrs" auto-complete="off"></el-input>
                </el-form-item>                  
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="submitData()">确定</el-button>
              </div>
          </el-dialog>
        </el-col>
        <el-col :span="10" style="padding:0px 25px 0px 5px;height:610px;" v-if="showFileView">
          <el-row style="margin-top:10px">
            <el-col :span="24" style="height:300px;width:550px;border:1px solid #F2F2F2">
              <p class="header-title">一户多宅的统计</p>
              <div ref="pieMain" :style="{width: '100%',height:'250px',margin:'0 auto'}"></div>
            </el-col>
            <el-col :span="24" style="height:300px;width:550px;margin-top:10px;border:1px solid #F2F2F2">
              <p class="header-title">历年一户多宅及家庭户变化情况</p>
              <div ref="lineMain" :style="{width: '100%',height:'250px',margin:'0 auto'}"></div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import Region from '@/views/land/mixnis/region-mixin.js'
import jsonFileHandler from "@/libs/util.jsonfile.js"

import dictMixins from "../../mixnis/dict-mixnis";
import { color } from "echarts/lib/export";
import pageMixins from "../../mixnis/page-mixnis"
export default {
  name: "land-map-implementationProcess",
  mixins: [dictMixins,Region,pageMixins],
  data() {
    return {
      showFileView: false,//右侧统计图表是否显示
      tableData: [],
      allDatas:[],
      summary:{},//概览数据
      editFormVisible: false,//详情界面是否显示
      //详情界面数据
			editForm: {
				hzxm: '',
        sfzh: '',
        nl:'',
        jtzz:'',
        hkszd:'',
        jtzrs:''
			},
      lineDatas: [
          { name: "2012", value: "" },
          { name: "2013", value: "" },
          { name: "2014", value: "" },
          { name: "2015", value: "" },
          { name: "2016", value: "" },
          { name: "2017", value: "" },
          { name: "2018", value: "" },
          { name: "2019", value: "" }
      ],
      pieChartDatas: [
          {value:1024, name:'一户两宅'},
          {value:1024, name:'一户三宅'},
          {value:1024, name:'一户四宅'},
          {value:1024, name:'其他'}
        ],
      zrk: "./image/leaderCockpit/zrk.png",
      zhs: "./image/leaderCockpit/zhs.png",
      yhdz: "./image/leaderCockpit/yhdz.png",
      zxrs: "./image/leaderCockpit/zxrs.png",
      zhszz: "./image/leaderCockpit/zhszz.png",
      hjrkzz: "./image/leaderCockpit/hjrkzz.png",
      city: "",
      citycode: "",
      cities: [],
      county: "",
      countycode: "",
      counties: [], //update

      queryForm: {
      },
      lineChart: {},
      pieChart: {}     
    };
  },
  created(){
    this.initData()
  },
  mounted: function() {
    
    window.addEventListener("resize", () => {
      this.lineChart.resize();
      this.pieChart.resize();
    });
  },
  methods: {
    initData(){
      this.table.listLoading = true
      this.getRegions().then(datas=>{
        this.cities = datas
      })
      let code = this.getRegionCode()
      jsonFileHandler.getData('test-data/map/countyPeople.json','code',code).then(datas=>{
        let { pageNum, pageSize, citycode, countycode } = {pageNum:this.table.pageNum,pageSize:this.table.pageSize,citycode:this.citycode,countycode:this.countycode}
        // console.log(pageNum)
        if (pageNum == 0) {
          pageNum = 1
        }
        let startIndex = pageSize * (pageNum - 1)
        //页面第一次加载默认将table.list赋值
        this.table.list = datas.houseHolder.slice(startIndex, pageSize * pageNum)
        this.table.total= datas.houseHolder.length
        //将获取到的所有值赋给allDatas对象中，方便后面进行数据操作
        this.allDatas = datas.houseHolder
        this.summary = datas.summary
      })
      this.table.listLoading = false
    },
    //统计分析事件
    statistics(){
      this.showFileView = this.showFileView ? false : true;
      this.$nextTick(()=>{
        if(this.showFileView){
          this.IniPieChart();
          this.LineChart();
        }
      })
      
    },
    // getChartData() {
    //     //饼状图请求方法
    //     this.IniPieChart();
    //     //折线图请求方法
    //     this.LineChart()
    //   },
    //查看详情事件
    handleUpdate(row) {
      this.editForm = row;
      this.editFormVisible = true;
      },
      //新增事件
      add(){
        this.editForm = {
				hzxm: '',
        sfzh: '',
        nl:'',
        jtzz:'',
        hkszd:'',
        jtzrs:''
			}
       this.editFormVisible = true;
      },
  
    //获取表格数据
    changeCity(value) {
      this.counties = this.cities.find(t => t.code==value).children
      // this.tableData = this.allDatas.filter(t=>t.code.startsWith(value))
      this.county = ''
      this.citycode = value;
      this.countycode = "";
    },
    changeCounty(value) {
      // this.tableData = this.allDatas.filter(t=>t.code.startsWith(value))
      this.countycode = value;
    },

    //搜索
    search() {
      // this.ajaxSync();
      this.table.pageNum = 1
      this.getTableData()
    },
    //表格中获取数据方法
    getTableData(){
      let resList = this.allDatas.filter(t=>t.code.startsWith(this.citycode) && t.code.startsWith(this.countycode))
      let startIndex = this.table.pageSize * (this.table.pageNum - 1)
      this.table.list = resList.slice(startIndex, this.table.pageSize * this.table.pageNum)
      this.table.total= resList.length
    },
    resetForm(formName) {
      this.city = "";
      this.citycode = "";
      this.county = "";
      this.countycode = "";
      this.search()
      },
      submitData(){
        //这里一定要将查询条件中的值都放入editForm中，否则后面查询会直接报错
        this.editForm.code = this.cities[0].code
        this.allDatas.push(this.editForm)
        this.editFormVisible = false
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.resetForm()
      },
    //ajax请求api,传入参数：类型和标题
    ajaxSync() {
      var _this = this; //在ajax中必须将this重新赋一个新对象接收，否则ajax中获取不到vue变量
      this.params = {
        title: this.input
      };
      this.getWXTemplateList(this.params);
    },
    getWXTemplateList(params) {
      let _this = this;
      this.$axios
        .get(this.apiPath + "/system/getWXTemplateList", { params })
        .then(res => (_this.table.list = res.data.data.list))
        .catch(function(error) {
          // 请求失败处理
          // console.log(error);
        });
    },
    //点击查询按钮请求的方法
    queryTableData() {
      this.table.current = 1;
      this.getTableData();
    },
    handleSizeChange(size) {
      this.table.size = size;
      this.getTableData();
    },
    handleCurrentChange(current) {
      this.table.current = current;
      this.getTableData();
    },
    //折线统计图
    LineChart() {
                const _dataList = this.lineDatas;
                this.lineChart = this.$echarts.init(this.$refs.lineMain);
                if (_dataList.length > 0) {
                    const serieJTH = {
                        name: "家庭户",
                        type: "line",
                        smooth: true,
                        color: "#FF5500",
                        data:[1460,1730,1420,1530,2300,1380,1520,1800]
                    };
                    const serieYHDZ = {
                        name: "一户多宅",
                        type: "line",
                        smooth: true,
                        color: "#00AAFF",
                        data:[1060,1230,1120,1030,1100,980,820,750]
                    };
                    // const dataJTH = [];
                    // const dataYHDZ = [];
                    const xAixs = [];
                    _dataList.forEach(item => {
                        xAixs.push(item.name);
                        // dataJTH.push(item.value);
                        // dataYHDZ.push(item.value);
                    });
                    // serieJTH.data = dataJTH;
                    // serieYHDZ.data = dataYHDZ;
                    const option = {                          
                          legend: {//折线图图例
                            right: 60,
                            data: ["一户多宅", "家庭户"]
                        },
                          title: {
                            //text: '历年违法建筑统计'
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
                            name: '数量',
                            nameTextStyle: {
                                color: '#aaa'
                            }
                        },
                        series: [serieJTH,serieYHDZ]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    this.lineChart.setOption(option);
                }
            },
    //扇形统计图
    IniPieChart() {
      const _dataList = this.pieChartDatas;
      this.pieChart = this.$echarts.init(this.$refs.pieMain);
      const option = {
        legend: {//环形图布局
          orient: "vertical",
          right: 60,
          bottom: "10%",
          data: this.pieChartDatas.name,
          padding: [0, 0, 0, 0],
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
              },
              d: {
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
            if (name == "一户两宅") {
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
            center: [170, 125],//调整环形图位置：距离右边距、上边距
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
                var colorList = ["#51CEE6", "#2D80E8", "#009AF6","#7150F6"];
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
.box-card {
  width: 250px;
}
//卡片位置
.box-card-zrk{
  margin-left: 0.3rem;
  margin-top: 0.1rem;
  width: 4.5rem;
}
.card_margin{
  margin-left: 0.1rem;
  margin-top: 0.1rem;
  width: 4.5rem;
}
.bg_color{
  margin:-18px -20px; 
  padding:10px 20px; 
}
.zrk_header{
  background: #4FBB6A;
}
.zhs_header{
  background: #0CAD97;
}
.yhdz_header{
  background: #5FCCBD;
}
.zxrs_header{
  background: #2DB9EB;
}
.zhszz_header{
  background: #1A84AA;
}
.hjrkzz_header{ 
  background: #17539C;
}
//卡片标题文字样式
.bg_color div{
    color: white;
    text-align: center;
    font-size: 16px;    
} 
.card_body{
height: 0.5rem;
}
.card_body div{
  font-size: 0.3rem; 
}

</style>
