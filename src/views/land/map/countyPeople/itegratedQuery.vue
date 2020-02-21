<template>
  <d2-container>
    <el-form :inline="true" ref="queryForm" size="mini" style="padding: 0 20px">
      <el-form-item label="姓名">
        <el-input placeholder="请输入姓名" v-model="queryForm.xm" clearable></el-input>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input placeholder="请输入身份证号码" v-model="queryForm.sfzhm" clearable></el-input>
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
          <el-button type="primary" icon="el-icon-search" v-on:click="search()">查询</el-button>
          <el-button type="default" @click="search()">
            <d2-icon name="refresh" />
          </el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-divider content-position="left">承包方家庭成员信息</el-divider>
    <el-table
      element-loading-text="拼命加载中..."
      highlight-current-row
      :data="cbfjtcydata_queryed"
      stripe
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column prop="xm" label="姓名" sortable></el-table-column>
      <el-table-column prop="bh" label="承包方编码" sortable></el-table-column>

      <el-table-column prop="xb" label="性别" sortable></el-table-column>
      <el-table-column prop="zjh" label="证件号" sortable></el-table-column>
      <el-table-column prop="yqlrgx" label="与权利人关系" sortable></el-table-column>
      <el-table-column prop="hkxz" label="户口性质" sortable></el-table-column>
      <el-table-column prop="gzdw" label="工作单位" sortable></el-table-column>
    </el-table>

    <el-divider content-position="left">集体经营组织成员信息</el-divider>
    <el-table
      element-loading-text="拼命加载中..."
      highlight-current-row
      :data="jtjyzzcydata_queryed"
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

    <el-divider content-position="left">农房共有人信息</el-divider>
    <el-table
      element-loading-text="拼命加载中..."
      highlight-current-row
      :data="nfgyrdata_queryed"
      stripe
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column prop="qlrmc" label="权利人名称" sortable></el-table-column>
      <el-table-column prop="bdcdyh" label="不动产单元号" sortable></el-table-column>

      <el-table-column prop="xb" label="性别" sortable></el-table-column>
      <el-table-column prop="zjh" label="证件号" sortable></el-table-column>
      <el-table-column prop="qlrlx" label="权利人类型" sortable></el-table-column>
      <el-table-column prop="gyfs" label="共有方式" sortable></el-table-column>
      <el-table-column prop="dz" label="地址" sortable></el-table-column>
    </el-table>

    <el-divider content-position="left">户籍信息</el-divider>
    <el-table
      element-loading-text="拼命加载中..."
      highlight-current-row
      :data="hjxxdata_queryed"
      stripe
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column prop="hzxm" label="户主姓名" sortable></el-table-column>
      <el-table-column prop="sfzh" label="身份证号" sortable></el-table-column>
      <el-table-column prop="nl" label="年龄" sortable></el-table-column>
      <el-table-column prop="jtzz" label="家庭住址" sortable></el-table-column>
      <el-table-column prop="hkszd" label="户口所在地" sortable></el-table-column>
      <el-table-column prop="jtzrs" label="家庭总人数" sortable></el-table-column>
    </el-table>
  </d2-container>
</template>

<script>

import Region from '@/views/land/mixnis/region-mixin.js'
import jsonFileHandler from "@/libs/util.jsonfile.js"

export default {
  mixins:[Region],
  data() {
    return {
      queryForm: {
        xm: "",
        sfzhm: "",
        xzqhdm: ""
      },
      cbfjtcydata: [],
      jtjyzzcydata: [],
      nfgyrdata: [],
      hjxxdata: [],
      maxresult: 5,
      city: "",
      cities: [],
      county: "",
      counties: [],
      cbfjtcydata_queryed: [],
      jtjyzzcydata_queryed: [],
      nfgyrdata_queryed: [],
      hjxxdata_queryed: []
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
        this.cbfjtcydata_queryed = this.cbfjtcydata = datas.constractorMembers
        this.jtjyzzcydata_queryed = this.jtjyzzcydata = datas.collectiveOrgnization
        this.nfgyrdata_queryed = this.nfgyrdata = datas.farmhouseOwner
        this.hjxxdata_queryed = this.hjxxdata = datas.houseHolder
      })
    },
    changeCity(value) {
      this.counties = this.cities.find(t => t.code==value).children
      this.county = ''
    },
    changeCounty(value) {
      
    },
    //搜索
    search() {
      let queryCode = this.county || this.city
      this.cbfjtcydata_queryed = this.cbfjtcydata
        .filter(
          data =>
            (data.xm.indexOf(this.queryForm.xm) > -1 ||
              this.queryForm.xm == "") &&
            (data.zjh.indexOf(this.queryForm.sfzhm) > -1 ||
              this.queryForm.sfzhm == "") && (!queryCode || data.code.startsWith(queryCode))
        )
        .slice(0, this.maxresult);
      this.jtjyzzcydata_queryed = this.jtjyzzcydata
        .filter(
          data =>
            (data.cyxm.indexOf(this.queryForm.xm) > -1 ||
              this.queryForm.xm == "") &&
            (data.cyzjhm.indexOf(this.queryForm.sfzhm) > -1 ||
              this.queryForm.sfzhm == "") && (!queryCode || data.code.startsWith(queryCode))
        )
        .slice(0, this.maxresult);
      this.nfgyrdata_queryed = this.nfgyrdata
        .filter(
          data =>
            (data.qlrmc.indexOf(this.queryForm.xm) > -1 ||
              this.queryForm.xm == "") &&
            (data.zjh.indexOf(this.queryForm.sfzhm) > -1 ||
              this.queryForm.sfzhm == "") && (!queryCode || data.code.startsWith(queryCode))
        )
        .slice(0, this.maxresult);
      this.hjxxdata_queryed = this.hjxxdata
        .filter(
          data =>
            (data.hzxm.indexOf(this.queryForm.xm) > -1 ||
              this.queryForm.xm == "") &&
            (data.sfzh.indexOf(this.queryForm.sfzhm) > -1 ||
              this.queryForm.sfzhm == "") && (!queryCode || data.code.startsWith(queryCode))
        )
        .slice(0, this.maxresult);
    }
  }
};
</script>

<style scoped>
.el-divider {
  margin-top: 40px;
}

.el-divider__text {
  color: #2f74ff;
}
</style>