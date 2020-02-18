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
export default {
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
      cbfjtcydata_queryed: [
        {
          xm: "张清秀",
          xb: "女",
          zjlx: "",
          zjh: "460100199102283210",
          bh: "542221204202000169",
          yqlrgx: "配偶",
          hkxz: "农村户口",
          gzdw: ""
        }
      ],
      jtjyzzcydata_queryed: [
        {
          cyxm: "张清秀",
          cyxb: "女",
          cyzjlx: "",
          cyzjhm: "460100199102283210",
          djsj: "2019-1-2",
          jthdm: "4601000010320046",
          zgs: 10,
          jbg: 10
        }
      ],
      nfgyrdata_queryed: [
        {
          qlrmc: "张清秀",
          xb: "女",
          zjh: "460100199102283210",
          bdcdyh: "320322014018JC00093F00010001",
          qlrlx: "个人",
          gyfs: "单独所有",
          dz: "徐州市沛县魏庙镇王范庄村"
        }
      ],
      hjxxdata_queryed: [
        {
          hzxm: "张清秀",
          sfzh: "460100199102283210",
          nl: "25",
          jtzz: "海南省海口市龙华区街道56弄6号",
          hkszd: "海南省海口市龙华区街道56弄6号",
          jtzrs: "5"
        }
      ]
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
    //加载初始数据
    this.AjaxGetData(
      "test-data/map/accountInformation/householdRegister/etc/constractorMembers.json",
      "cbfjtcydata"
    );
    this.AjaxGetData(
      "test-data/map/accountInformation/householdRegister/etc/collectiveOrgnization.json",
      "jtjyzzcydata"
    );
    this.AjaxGetData(
      "test-data/map/accountInformation/householdRegister/etc/farmhouseOwner.json",
      "nfgyrdata"
    );
    this.AjaxGetData(
      "test-data/map/accountInformation/householdRegister/city/haikou.json",
      "hjxxdata"
    );
  },
  methods: {
    changeCity(value) {
      let fileName = "";
      let path = "";
      // console.log(value);
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
        // this.AjaxGetData(path);
      }
      if (filename != "") {
        this.requestAjax(fileName, 3);
      }
    },
    changeCounty(value) {
      let path = "";
      // console.log(value);
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
        // this.AjaxGetData(path);
      }
    },
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
          // console.log(error);
          alert("网络错误，不能访问");
        });
    },
    AjaxGetData(path, datatype) {
      var _this = this;
      this.$axios
        .get(path)
        //then获取成功；response成功后的返回值（对象）
        .then(response => {
          // console.log(response.data.result);
          _this[datatype] = response.data.result;
          _this[datatype + "_queryed"] = response.data.result.slice(
            0,
            _this.maxresult
          );
          //return;
        })
        //获取失败
        .catch(error => {
          console.log(error);
          _this[datatype] = [];
          alert("网络错误，不能访问");
        });
    },
    //搜索
    search() {
      this.cbfjtcydata_queryed = this.cbfjtcydata
        .filter(
          data =>
            (data.xm.indexOf(this.queryForm.xm) > -1 ||
              this.queryForm.xm == "") &&
            (data.zjh.indexOf(this.queryForm.sfzhm) > -1 ||
              this.queryForm.sfzhm == "")
        )
        .slice(0, this.maxresult);
      this.jtjyzzcydata_queryed = this.jtjyzzcydata
        .filter(
          data =>
            (data.cyxm.indexOf(this.queryForm.xm) > -1 ||
              this.queryForm.xm == "") &&
            (data.cyzjhm.indexOf(this.queryForm.sfzhm) > -1 ||
              this.queryForm.sfzhm == "")
        )
        .slice(0, this.maxresult);
      this.nfgyrdata_queryed = this.nfgyrdata
        .filter(
          data =>
            (data.qlrmc.indexOf(this.queryForm.xm) > -1 ||
              this.queryForm.xm == "") &&
            (data.zjh.indexOf(this.queryForm.sfzhm) > -1 ||
              this.queryForm.sfzhm == "")
        )
        .slice(0, this.maxresult);
      this.hjxxdata_queryed = this.hjxxdata
        .filter(
          data =>
            (data.hzxm.indexOf(this.queryForm.xm) > -1 ||
              this.queryForm.xm == "") &&
            (data.sfzh.indexOf(this.queryForm.sfzhm) > -1 ||
              this.queryForm.sfzhm == "")
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