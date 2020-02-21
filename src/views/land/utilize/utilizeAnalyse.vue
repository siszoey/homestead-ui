<template>
    <div>
    <div class="wrap-top">
      <div class="progress-box" >
        <div class="image-card" v-for="(item,index) in imagesDatas" :key="index">
          <img class="bg-image" :src="item.image"/>
          <div class="description">
            <img class="icon-image" :src="item.icon">
            <div class="description-num">{{item.num}}</div>
            <div>{{item.description}}</div>
          </div>
        </div>
       
      </div>
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
                <el-button type="primary" icon="el-icon-search" v-on:click="search()">查询</el-button>
                <el-button type="primary" icon="el-icon-statistics">统计信息</el-button>
                <el-button type="default" @click="refresh()">
                  <d2-icon name="refresh" />
                </el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-col>
      </el-row>
      <el-row >
        <el-col style="padding: 0px 5px 0px 25px">
          <el-table
            element-loading-text="拼命加载中..."
            highlight-current-row
            :data="tableData"
            stripe
            ref="multipleTable"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column prop="hzxm" label="户主姓名" width="120" sortable></el-table-column>
            <el-table-column prop="sfzh" label="身份证号" sortable></el-table-column>
            <el-table-column prop="nl" label="年龄" width="80" sortable></el-table-column>
            <el-table-column prop="jtzz" label="家庭住址" sortable></el-table-column>
            <el-table-column prop="phlylx" label="盘活利用类型" sortable></el-table-column>
            <el-table-column prop="jtzrs" label="家庭总人数" width="120" sortable></el-table-column>
          </el-table>
          <!-- footer 分页条 -->
          <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"            
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="100"
              :page-count="4"
              style="margin-top:35px;text-align:center"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import dictMixins from "../mixnis/dict-mixnis";
import { color } from "echarts/lib/export";
import Region from '@/views/land/mixnis/region-mixin.js'
import jsonFileHandler from "@/libs/util.jsonfile.js"
export default {
   name: "land-map-implementationProcess",
  mixins: [dictMixins,Region],
  data() {
    return {
      tableData: [],
      allDatas:[],
      scope:"",
      city: "",
      cities: [],
      county: "",
      counties: [], //update
      imagesDatas:[
        { image:"./image/utilize/xxny.png",icon:"./image/utilize/xxny-icon.png",num:1000,description:"休闲农庄"},
        { image:"./image/utilize/xcly.png",icon:"./image/utilize/xcly-icon.png",num:4000,description:"乡村旅游"},
        { image:"./image/utilize/cyms.png",icon:"./image/utilize/cyms-icon.png",num:2000,description:"餐饮民宿"},
        { image:"./image/utilize/whty.png",icon:"./image/utilize/whty-icon.png",num:2000,description:"文化体验"},
        { image:"./image/utilize/cybg.png",icon:"./image/utilize/cybg-icon.png",num:3000,description:"创意办公"},
        { image:"./image/utilize/dzsw.png",icon:"./image/utilize/dzsw-icon.png",num:3000,description:"电子商务"}
      ],
      queryForm: {
      }    
    };
  },
  created () {
    this.initData()
  },
    mounted: function() {
  

    //当页面大小发生变化时，echarts统计图根据画布大小自动重新绘制
    window.addEventListener("resize", () => {
      this.lineChart.resize();
      this.pieChart.resize();
    });
  },
  methods:{ initData(){
      this.getRegions().then(datas=>{
        this.cities = datas
      })
      let code = this.getRegionCode()
      jsonFileHandler.getData('test-data/utilize/utilize.json','code',code).then(datas=>{
        this.tableData = datas.tableData
        this.allDatas = datas.tableData
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
   
 
     //搜索
    search() {
      this.ajaxSync();
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
        .then(res => (_this.tableData = res.data.data.list))
        .catch(function(error) {
          // 请求失败处理
          //console.log(error);
        });
    },
    refresh(){
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

  }

}
</script>

<style>
.wrap-top {
  background: #ffffff;
}
.progress-box {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.image-card {
  position: relative;
  width: 2.4rem;
  color: #fff;
  font-size: 0.16rem;
}
.image-card .bg-image {
  width: 100%;
  height: 100%;
}
.image-card .description {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
}
.image-card .description .icon-image {
  margin-top: 0.15rem;
  height: 0.45rem;
}
.image-card .description .description-num {
  font-size: 0.3rem;
}
.wrap-middle {
  /* margin-top: 20px;
  margin-bottom: 20px; */
  background: #fff;
  height: auto;
}
.queryForm {
  padding: 25px 15px 10px 25px;
}
.ph-margin{
  width: 242px;
  margin-top: 0.2rem;
}

</style>