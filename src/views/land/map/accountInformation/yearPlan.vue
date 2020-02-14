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
          <el-button
            type="primary"
            icon="el-icon-search"
            v-on:click="search()"
          >查询</el-button>
          <el-button type="default" @click="search()">
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
import JSON_WHS from "@/plugin/echarts-map/city/json/hubei/420100.json"; //武汉市
export default {
  data() {
    return {
      input: "",
      title: "",
      years: [],
      year: "",
      city: "",
      cities: [],
      county: "",
      counties: [],
      tableData: [
        // {
        //   szsx: "龙华区",
        //   zzmj: "954.54",
        //   dlmj: "321.7",
        //   gsmj: "978.5",
        //   psmj: "86545.5",
        //   gdmj: "673.6",
        //   ljsj: "753",
        //   cqyzcs: "945.13",
        //   lswhycbh: "854.78"
        // },
        // {
        //   szsx: "美兰区",
        //   zzmj: "2546.54",
        //   dlmj: "975.7",
        //   gsmj: "874.5",
        //   psmj: "366.5",
        //   gdmj: "422.6",
        //   ljsj: "652.88",
        //   cqyzcs: "54.13",
        //   lswhycbh: "76.78"
        // },
        // {
        //   szsx: "琼山区",
        //   zzmj: "953.54",
        //   dlmj: "753.7",
        //   gsmj: "265.5",
        //   psmj: "545.5",
        //   gdmj: "8656.6",
        //   ljsj: "4233.08",
        //   cqyzcs: "545.13",
        //   lswhycbh: "765754.78"
        // },
        // {
        //   szsx: "秀英区",
        //   zzmj: "4545.54",
        //   dlmj: "6543.7",
        //   gsmj: "64534.5",
        //   psmj: "765.5",
        //   gdmj: "5345.6",
        //   ljsj: "867.99",
        //   cqyzcs: "543.13",
        //   lswhycbh: "535.78"
        // },
        // {
        //   szsx: "龙华区",
        //   zzmj: "876.54",
        //   dlmj: "8765.7",
        //   gsmj: "545.5",
        //   psmj: "8654.5",
        //   gdmj: "537.6",
        //   ljsj: "65",
        //   cqyzcs: "5345.13",
        //   lswhycbh: "74.78"
        // },
        // {
        //   szsx: "秀英区",
        //   zzmj: "7654.54",
        //   dlmj: "423.7",
        //   gsmj: "987.5",
        //   psmj: "844.5",
        //   gdmj: "123.6",
        //   ljsj: "97.09",
        //   cqyzcs: "6323.13",
        //   lswhycbh: "975.78"
        // },
        // {
        //   szsx: "琼山区",
        //   zzmj: "875.54",
        //   dlmj: "976.7",
        //   gsmj: "312.5",
        //   psmj: "9753.5",
        //   gdmj: "344.6",
        //   ljsj: "6543",
        //   cqyzcs: "8645.13",
        //   lswhycbh: "74.78"
        // },
        // {
        //   szsx: "龙华区",
        //   zzmj: "333.54",
        //   dlmj: "35.7",
        //   gsmj: "87688.5",
        //   psmj: "86543.5",
        //   gdmj: "76.6",
        //   ljsj: "42354.99",
        //   cqyzcs: "864.13",
        //   lswhycbh: "234.78"
        // }
      ],
      ids: "",
      params: {
        title: ""
      }
    };
  },
  mounted: function() {
    //console.log(JSON_WHS);
    //获取海南市级行政区
    let sj_fileName = "echarts-map/province/json/hainan.json";
    this.requestAjax(sj_fileName, 2);
    //获取海南省海口市行政区
    let xj_fileName = "echarts-map/city/json/hainan/460100.json";
    this.requestAjax(xj_fileName, 3);
    // let cities = [
    //   {
    //     value: "420100",
    //     label: "武汉市"
    //   },
    //   {
    //     value: "420200",
    //     label: "黄石市"
    //   },
    //   {
    //     value: "420300",
    //     label: "十堰市"
    //   },
    //   {
    //     value: "420500",
    //     label: "宜昌市"
    //   },
    //   {
    //     value: "420600",
    //     label: "襄阳市"
    //   },
    //   {
    //     value: "420700",
    //     label: "鄂州市"
    //   },
    //   {
    //     value: "420800",
    //     label: "荆门市"
    //   },
    //   {
    //     value: "420900",
    //     label: "孝感市"
    //   },
    //   {
    //     value: "421000",
    //     label: "荆州市"
    //   },
    //   {
    //     value: "421100",
    //     label: "黄冈市"
    //   },
    //   {
    //     value: "421200",
    //     label: "咸宁市"
    //   },
    //   {
    //     value: "421300",
    //     label: "随州市"
    //   },
    //   {
    //     value: "422800",
    //     label: "恩施土家族苗族自治州"
    //   },
    //   {
    //     value: "429000",
    //     label: "湖北省直辖县市"
    //   }
    // ];
    //this.cities = cities;
    //默认行政区为海口市
    this.city = "460100";
    //获得当前年份
    var _date = new Date();
    var tYear = _date.getFullYear();
    for (var i = tYear - 4; i <= tYear; i++) {
      //初始化加载年份时间
      this.years.push(i);
    }
    //默认年份为上一年度
    this.year = tYear - 1;
    //this.ajaxSync();
    //初始化表格
    let path = "test-data/map/accountInformation/yearPlan/city/haikou.json";
    this.AjaxGetData(path);
  },
  methods: {
    changeCity(value) {
      let fileName = "";
      let path = "";
      // console.log(value);
      switch (value) {
        // case "420100":
        //   let fileName = "echarts-map/city/json/hubei/420100.json";
        //   this.requestAjax(fileName, 3);
        //   break;
        // case "420200":
        //   this.initMaps(JSON_HSS);
        //   break;
        // case "420300":
        //   this.initMaps(JSON_SYS);
        //   break;
        // case "420500":
        //   this.initMaps(JSON_YCS);
        //   break;
        // case "420600":
        //   this.initMaps(JSON_XYS);
        //   break;
        // case "420700":
        //   this.initMaps(JSON_EZS);
        //   break;
        // case "420800":
        //   this.initMaps(JSON_JMS);
        //   break;
        // case "420900":
        //   this.initMaps(JSON_XGS);
        //   break;
        // case "421000":
        //   this.initMaps(JSON_JZS);
        //   break;
        // case "421100":
        //   this.initMaps(JSON_HGS);
        //   break;
        // case "421200":
        //   this.initMaps(JSON_XNS);
        //   break;
        // case "421300":
        //   this.initMaps(JSON_SZS);
        //   break;
        // case "422800":
        //   this.initMaps(JSON_ESTJZMZZZZ);
        //   break;
        // case "429000":
        //   this.initMaps(JSON_HBSZXXS);
        //   break;
        case "460100":
          fileName = "echarts-map/city/json/hainan/460100.json";
          this.requestAjax(fileName, 3);
          path = "test-data/map/accountInformation/yearPlan/city/haikou.json";
          this.AjaxGetData(path);
          break;
        case "460200":
          fileName = "echarts-map/city/json/hainan/460200.json";
          this.requestAjax(fileName, 3);
          path = "test-data/map/accountInformation/yearPlan/city/sanya.json";
          this.AjaxGetData(path);
          break;
        case "460300":
          fileName = "echarts-map/city/json/hainan/460300.json";
          this.requestAjax(fileName, 3);
          path = "test-data/map/accountInformation/yearPlan/city/sansha.json";
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
      // console.log(value);
      switch (value) {
        case "460106":
          path =
            "test-data/map/accountInformation/yearPlan/county/haikou/longhua.json";
          this.AjaxGetData(path);
          break;
        case "460108":
          path =
            "test-data/map/accountInformation/yearPlan/county/haikou/meilan.json";
          this.AjaxGetData(path);
          break;
        case "460107":
          path =
            "test-data/map/accountInformation/yearPlan/county/haikou/qiongshan.json";
          this.AjaxGetData(path);
          break;
        case "460200":
          path = "test-data/map/accountInformation/yearPlan/city/sanya.json";
          this.AjaxGetData(path);
          break;
        case "460302":
          path =
            "test-data/map/accountInformation/yearPlan/county/sansha/nanshaqundao.json";
          this.AjaxGetData(path);
          break;
        case "460301":
          path =
            "test-data/map/accountInformation/yearPlan/county/sansha/xishaqundao.json";
          this.AjaxGetData(path);
          break;
        case "460303":
          path =
            "test-data/map/accountInformation/yearPlan/county/sansha/zsqdddjjqhy.json";
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
          // console.log(response.data.features); //[0].properties.name
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
          // console.log(response.data.result);
          _this.tableData = [];
          _this.tableData = response.data.result;
        })
        //获取失败
        .catch(error => {
          console.log(error);
          alert("网络错误，不能访问");
        });
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