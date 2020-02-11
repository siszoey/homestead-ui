<template>
  <d2-container>
    <el-form :inline="true" :model="queryForm" ref="queryForm" size="mini" style="padding: 0 20px">
      <el-form-item label="姓名">
        <el-input placeholder="请输入姓名" v-model="input" clearable></el-input>
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
      <el-table-column prop="bh" label="编号" sortable></el-table-column>
      <el-table-column prop="xm" label="姓名" sortable></el-table-column>
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
      <el-table-column prop="bdcdyh" label="不动产单元号" sortable></el-table-column>
      <el-table-column prop="qlrmc" label="权利人名称" sortable></el-table-column>
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
export default {
  data() {
    return {
      input: "",
      title: "",
      year: "",
      city: "",
      cities: [],
      county: "",
      counties: [], //update
      cbfjtcydata: [],
      jtjyzzcydata: [],
      nfgyrdata: [],
      hjxxdata: [],
      cbfjtcydata_queryed: [],
      jtjyzzcydata_queryed: [],
      nfgyrdata_queryed: [],
      hjxxdata_queryed: [],
      ids: "",
      params: {
        title: ""
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
    //this.ajaxSync();
    //初始化表格
    let path =
      "test-data/map/accountInformation/householdRegister/city/haikou.json";
    this.AjaxGetData(path);
  },
  methods: {
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
        this.AjaxGetData(path);
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
        this.AjaxGetData(path);
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
    },
    //ajax获取本地行政区划下json文件数据
    AjaxGetData(path) {
      let _this = this;
      this.$axios
        .get(path)
        //then获取成功；response成功后的返回值（对象）
        .then(response => {
          console.log(response.data.result);
          // _this.tableData = [];
          // _this.tableData = response.data.result;
        })
        //获取失败
        .catch(error => {
          console.log(error);
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
          console.log(error);
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