<template>
    <div>
    <div class="wrap-top">
      <el-row class="progress-box" >
        <div class="img-xxny utilize-position">
          <img class="size-xxny" :src="xxny"/>
          <img :src="xxny_icon" style="position: absolute;top:40px;left:112px;"/>
          <span style="font-size: 35px;position: absolute;top:95px;left:97px;">1000</span>
          <span>休闲农庄</span>
        </div>
        <div class="img-xcly utilize-position">
          <img class="size-xcly ph-margin" :src="xcly"/>
          <img :src="xcly_icon" style="position: absolute;top:40px;left:358px;"/>
          <span style="font-size: 35px;position: absolute;top:95px;left:340px;">4000</span>
          <span>乡村旅游</span>
        </div>
        <div class="img-cyms utilize-position">
          <img class="size-cyms ph-margin" :src="cyms"/>
          <img :src="cyms_icon" style="position: absolute;top:40px;left:605px;"/>
          <span style="font-size: 35px;position: absolute;top:95px;left:586px;">2000</span>
          <span>餐饮民宿</span>
        </div>
        <div class="img-whty utilize-position">
          <img class="size-whty ph-margin" :src="whty"/>
          <img :src="whty_icon" style="position: absolute;top:40px;left:850px;"/>
          <span style="font-size: 35px;position: absolute;top:95px;left:832px;">2000</span>
          <span>文化体验</span>
        </div>
        <div class="img-cybg utilize-position">
          <img class="size-cybg ph-margin" :src="cybg"/>
          <img :src="cybg_icon" style="position: absolute;top:40px;left:1100px;"/>
          <span style="font-size: 35px;position: absolute;top:95px;left:1083px;">3000</span>
          <span>创意办公</span>
        </div>
        <div class="img-dzsw utilize-position">
          <img class="size-dzsw ph-margin" :src="dzsw"/>
          <img :src="dzsw_icon" style="position: absolute;top:40px;left:1337px;"/>
          <span style="font-size: 35px;position: absolute;top:95px;left:1322px;">3000</span>
          <span>电子商务</span>
          <!-- <span>3000<br>电子商务</span> -->
        </div>
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
                  :key="item.id"
                  :label="item.properties.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-select v-model="county" v-on:change="changeCounty(county)">
                <el-option
                  v-for="item in counties"
                  :key="item.properties.id"
                  :label="item.properties.name"
                  :value="item.properties.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <div style="float: right">
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" v-on:click="search()">查询</el-button>
                <el-button type="primary" icon="el-icon-statistics">统计信息</el-button>
                <el-button type="default" @click="search()">
                  <d2-icon name="refresh" />
                </el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-col>
      </el-row>
      <el-row style="padding-bottom:25px">
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
export default {
   name: "land-map-implementationProcess",
  mixins: [dictMixins],
  data() {
    return {
      tableData: [],
      scope:"",
      city: "",
      cities: [],
      county: "",
      counties: [], //update
      xxny: "./image/utilize/xxny.png",
      xcly: "./image/utilize/xcly.png",
      cyms: "./image/utilize/cyms.png",
      whty: "./image/utilize/whty.png",
      cybg: "./image/utilize/cybg.png",
      dzsw: "./image/utilize/dzsw.png",
      xxny_icon:"./image/utilize/xxny-icon.png",
      xcly_icon:"./image/utilize/xcly-icon.png",
      cyms_icon:"./image/utilize/cyms-icon.png",
      whty_icon:"./image/utilize/whty-icon.png",
      cybg_icon:"./image/utilize/cybg-icon.png",
      dzsw_icon:"./image/utilize/dzsw-icon.png",
      queryForm: {
      }    
    };
  },
    mounted: function() {
    //获取海南市级行政区
    let sj_fileName = "echarts-map/province/json/hainan.json";
    this.requestAjax(sj_fileName, 2);
    //获取海南省海口市行政区
    let xj_fileName = "echarts-map/city/json/hainan/460100.json";
    this.requestAjax(xj_fileName, 3);
    //默认行政区为海口市
    this.city = "460100";
    //初始化表格
    let path =
      "test-data/map/accountInformation/utilize/city/haikou.json";
    this.AjaxGetData(path);

    //当页面大小发生变化时，echarts统计图根据画布大小自动重新绘制
    window.addEventListener("resize", () => {
      this.lineChart.resize();
      this.pieChart.resize();
    });
  },
  methods:{
    //获取表格数据
    changeCity(value) {
      let fileName = "";
      let path = "";
      //console.log(value);
      switch (value) {
        case "460100":
          fileName = "echarts-map/city/json/hainan/460100.json";
          this.requestAjax(fileName, 3);
          path =
            "test-data/map/accountInformation/utilize/city/haikou.json";
          this.AjaxGetData(path);
          break;
        case "460200":
          fileName = "echarts-map/city/json/hainan/460200.json";
          this.requestAjax(fileName, 3);
          path =
            "test-data/map/accountInformation/utilize/city/sanya.json";
          this.AjaxGetData(path);
          break;
        case "460300":
          fileName = "echarts-map/city/json/hainan/460300.json";
          this.requestAjax(fileName, 3);
          path =
            "test-data/map/accountInformation/utilize/city/sansha.json";
          this.AjaxGetData(path);
          break;
        default:
          this.county = ""; //change时清空county
          this.counties = [];
          this.tableData = [];
          break;
      }
    },
    changeCounty(value) {
      let path = "";
      //console.log(value);
      switch (value) {
        case "460106":
          path =
            "test-data/map/accountInformation/utilize/county/haikou/longhua.json";
          this.AjaxGetData(path);
          break;
        case "460108":
          path =
            "test-data/map/accountInformation/utilize/county/haikou/meilan.json";
          this.AjaxGetData(path);
          break;
        case "460107":
          path =
            "test-data/map/accountInformation/utilize/county/haikou/qiongshan.json";
          this.AjaxGetData(path);
          break;
        case "460200":
          path =
            "test-data/map/accountInformation/utilize/city/sanya.json";
          this.AjaxGetData(path);
          break;
        case "460302":
          path =
            "test-data/map/accountInformation/utilize/county/sansha/nanshaqundao.json";
          this.AjaxGetData(path);
          break;
        case "460301":
          path =
            "test-data/map/accountInformation/utilize/county/sansha/xishaqundao.json";
          this.AjaxGetData(path);
          break;
        case "460303":
          path =
            "test-data/map/accountInformation/utilize/county/sansha/zsqdddjjqhy.json";
          this.AjaxGetData(path);
          break;
        default:
          this.tableData = [];
          break;
      }
    },
    //ajax获取本地json文件行政区划
    requestAjax(fileName, level) {
      let _this = this;
      this.$axios
        .get(fileName)
        //then获取成功；response成功后的返回值（对象）
        .then(response => {
          //console.log(response.data.features); //[0].properties.name
          if (level == "3") {
            _this.county = ""; //change时清空county
            _this.counties = response.data.features;
          } else if (level == "2") {
            _this.cities = response.data.features;
          }
        })
        //获取失败
        .catch(error => {
          //console.log(error);
          alert("网络错误，不能访问");
        });
    },
    //ajax获取本地行政区划下json文件数据
    AjaxGetData(path) {
      let _this = this;
      this.$axios
        .get(path)
        //then获取成功；response成功后的返回值（对象）
        .then(response => {
          //console.log(response.data.result);
          _this.tableData = [];
          _this.tableData = response.data.result;
        })
        //获取失败
        .catch(error => {
          //console.log(error);
          alert("网络错误，不能访问");
        });
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
.wrap-middle {
  margin-top: 20px;
  margin-bottom: 20px;
  background: #fff;
  height: auto;
}
.queryForm {
  padding: 25px 15px 10px 25px;
}
.utilize-position{
  display:inline-block;
}
.utilize-position span{
  color: white;
  text-align: center;
  font-size: 15px; 
  bottom: 25px; 
  left: 107px;
  position: absolute;
}
.img-xcly span{
  left: 347px;
}
.img-cyms span{
  left: 595px;
}
.img-whty span{
  left: 840px;
}
.img-cybg span{
  left: 1093px;
}
.img-dzsw span{
  left: 1333px;
}
.size-xxny{
  margin-left: 0.14rem;
  margin-top: 0.2rem;
  width: 246px;
}
.ph-margin{
  width: 246px;
  margin-top: 0.2rem;
}

</style>