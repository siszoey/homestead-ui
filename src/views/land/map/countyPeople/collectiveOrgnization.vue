<template>
  <d2-container>
    <el-form
      :inline="true"
      ref="queryForm"
      size="mini"
      style="margin-bottom: -25px; padding: 0 20px"
    >
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
          <el-button type="primary" icon="el-icon-search" v-on:click="initData()">查询</el-button>
          <el-button type="default" @click="resetForm('queryForm')">
            <d2-icon name="refresh" />
          </el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table
      element-loading-text="拼命加载中..."
      highlight-current-row
      :data="table.list"
      stripe
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column prop="cyxm" label="成员姓名" sortable></el-table-column>
      <el-table-column prop="cyxb" label="成员性别" sortable></el-table-column>
      <el-table-column prop="cyzjhm" label="成员证件号码" sortable></el-table-column>
      <el-table-column prop="djsj" label="登记时间" sortable></el-table-column>
      <el-table-column prop="zgs" label="总股数" sortable></el-table-column>
      <el-table-column prop="jbg" label="基本股" sortable></el-table-column>
    </el-table>

    <!-- footer 分页条 -->
    <template slot="footer">
      <!-- <el-pagination
        background
        :current-page="1"
        :page-sizes="[5,10,20,30,50]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      ></el-pagination> -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="table.pageNum" :page-sizes="[10,20,30,50]" :page-size="table.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="table.total" style="margin-top:35px;text-align:center">
          </el-pagination>
    </template>
  </d2-container>
</template>

<script>
import Region from '@/views/land/mixnis/region-mixin.js'
import jsonFileHandler from "@/libs/util.jsonfile.js"
import pageMixins from "../../mixnis/page-mixnis"
export default {
  mixins:[Region,pageMixins],
  data() {
    return {
      input: "",
      title: "",
      year: "",
      city: "",
      cities: [],
      county: "",
      citycode: "",
      countycode: "",
      counties: [], //update
      tableData: [],
      allDatas:[],
      ids: "",
      params: {
        title: ""
      }
    };
  },
  created() {
    this.initData()
  },
  mounted: function() {
 
  },
  methods: {
    initData(){
      this.getRegions().then(datas=>{
        this.cities = datas
      })
      let code = this.getRegionCode()
      jsonFileHandler.getData('test-data/map/countyPeople.json','code',code).then(datas=>{
        let { pageNum, pageSize, citycode, countycode } = {pageNum:this.table.pageNum,pageSize:this.table.pageSize,citycode:this.citycode,countycode:this.countycode}
        if (pageNum == 0) {
          pageNum = 1
        }
        let startIndex = pageSize * (pageNum - 1)
        this.table.list = datas.collectiveOrgnization.filter(t=>t.code.startsWith(this.citycode) && t.code.startsWith(this.countycode)).slice(startIndex, pageSize * pageNum)
        this.table.total= datas.collectiveOrgnization.length
        this.allDatas = datas.collectiveOrgnization
      })
    },
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
      this.ajaxSync();
    },
    resetForm(formName) {
        this.city = "";
        this.county = "";
        this.citycode = "";
        this.countycode = "";
        this.initData()
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
    }
  }
};
</script>

<style scoped>
.year-title {
  position: absolute;
  z-index: 9999999;
  font-size: 16px;
  color: #303133;
  margin: 7px;
  margin-top: 1.2%;
}
.xzq-column-h {
  position: absolute;
  z-index: 9999999;
  font-size: 16px;
  color: #303133;
  margin: 7px;
  margin-left: 0.1rem;
  margin-top: 1.2%;
}

.select-item-year input {
  height: 35px !important;
  width: 100px !important;
  margin-top: 8%;
}
.select-item-xzq input {
  height: 35px !important;
  width: 160px;
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
  margin-top: 20px;
  margin-bottom: 20px;
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
</style>