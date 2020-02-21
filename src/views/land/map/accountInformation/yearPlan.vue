<template>
  <d2-container>
    <el-form
      :inline="true"
      ref="queryForm"
      size="mini"
      style="margin-bottom: -25px; padding: 0 20px"
    >
      <el-form-item label="年份">
        <el-select v-model="year">
          <el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

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
          <el-button
            type="primary"
            icon="el-icon-search"
            v-on:click="search()"
          >查询</el-button>
          <el-button type="default" @click="resetForm('queryForm')">
                        <d2-icon name="refresh"/>
                    </el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table
      element-loading-text="拼命加载中..."
      highlight-current-row
      :data="tableData"
      stripe
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column prop="szsx" label="所在村/居" sortable></el-table-column>
      <el-table-column prop="zzmj" label="住宅面积/亩" sortable width="120px"></el-table-column>
      <el-table-column prop="dlmj" label="道路面积/亩" sortable></el-table-column>
      <el-table-column prop="gsmj" label="供水面积/亩" sortable></el-table-column>
      <el-table-column prop="psmj" label="排水面积/亩" sortable></el-table-column>
      <el-table-column prop="gdmj" label="供电面积/亩" sortable></el-table-column>
      <el-table-column prop="ljsj" label="垃圾收集/亩" sortable></el-table-column>
      <el-table-column prop="cqyzcs" label="畜禽养殖场所/亩" sortable width="160px"></el-table-column>
      <el-table-column prop="lswhycbh" label="历史文化遗产保护/亩" sortable width="180px"></el-table-column>
    </el-table>

    <!-- footer 分页条 -->
    <template slot="footer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10,20,30,50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      ></el-pagination>
    </template>
  </d2-container>
</template>

<script>
// import JSON_WHS from "@/plugin/echarts-map/city/json/hubei/420100.json"; //武汉市
import Region from '@/views/land/mixnis/region-mixin.js'
import jsonFileHandler from "@/libs/util.jsonfile.js"
export default {
  mixins: [
    Region
  ],
  data() {
    return {
      queryForm:{},
      input: "",
      title: "",
      years: [],
      year: "",
      city: "",
      cities: [],
      county: "",
      counties: [],
      tableData: [
      ],
      allDatas:[],
      ids: "",
      params: {
        title: ""
      }
    };
  },
  mounted: function() {
    //console.log(JSON_WHS);
    //获取海南市级行政区
    // let sj_fileName = "echarts-map/province/json/hainan.json";
    // this.requestAjax(sj_fileName, 2);
    // //获取海南省海口市行政区
    // let xj_fileName = "echarts-map/city/json/hainan/460100.json";
    // this.requestAjax(xj_fileName, 3);
    //默认行政区为海口市
    // this.city = "460100";

    this.initData()

    //获得当前年份
    var _date = new Date();
    var tYear = _date.getFullYear();
    for (var i = tYear - 4; i <= tYear; i++) {
      //初始化加载年份时间
      this.years.push(i);
    }
    //默认年份为上一年度
    this.year = tYear - 1;
    //初始化表格
    // let path = "test-data/map/accountInformation/yearPlan/city/haikou.json";
    // this.AjaxGetData(path);
  },
  methods: {
    initData(){
      this.getRegions().then(datas=>{
        this.cities = datas
      })
      let code = this.getRegionCode()
      jsonFileHandler.getData('test-data/map/yearPlan.json','code',code).then(datas=>{
        this.tableData = datas.data
        this.allDatas = datas.data
      })
    },
    changeCity(value) {
      this.counties = this.cities.find(t => t.code==value).children
      this.tableData = this.allDatas.filter(t=>t.code.startsWith(value))
      this.county = ''
    },
    changeCounty(value) {
      this.tableData = this.allDatas.filter(t=>t.code.startsWith(value))
    },
  
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    //搜索
    search() {
      this.ajaxSync();
    },
    resetForm(formName) {
      this.year = "";
        this.city = "";
        this.county = "";
        this.initData()
        var _date = new Date();
    var tYear = _date.getFullYear();
    //默认年份为上一年度
    this.year = tYear - 1;
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
        .get(this.apiPath + "/system/aa", { params })
        .then(res => (_this.tableData = res.data.data.list))
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
        });
    }
  }
};
</script>

<style>
.year-column-y {
  position: absolute;
  z-index: 9999999;
  font-size: 16px;
  color: #303133;
  margin: 7px;
  margin-top: 1.2%;
}
.xzq-column-y {
  position: absolute;
  z-index: 9999999;
  font-size: 16px;
  color: #303133;
  margin: 7px;
  margin-left: 1.8rem !important;
  margin-top: 1.2%;
}

.select-item-year input {
  height: 35px !important;
  width: 100px !important;
  margin-top: 8%;
}
.select-item-xzq input {
  height: 35px !important;
  margin-top: 3.5%;
}

.operate-tool {
  margin: 9px;
  float: right;
}
.el-tabs--border-card {
  margin-top: 0.091rem;
}
.bg-gray-light {
  background: #f0f2f5;
}
.bg-white {
  background: #ffffff;
}
.body {
  height: 100%;
}
.el-row {
  margin-top: 0px;
  margin-bottom: 20px;
  margin-left: 0px;
  margin-right: 35px;
}
.body-box {
  height: auto;
  border: 1px solid rgba(233, 233, 233, 1);
}
.body-box .body-header {
  height: 50px;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.body-box .body-header .body-header-title {
  font-family: "MicrosoftYaHei-Bold", "微软雅黑 Bold", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  text-align: left;
  font-size: 13px;
  color: #333333;
  padding: 20px;
  line-height: 50px;
  vertical-align: middle;
}
.el-col-22 {
  width: 105% !important;
  margin-left: 0px !important;
}
</style>