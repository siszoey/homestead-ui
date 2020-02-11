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
      ],
      ids: "",
      params: {
        title: ""
      }
    };
  },
  mounted: function() {
    //初始化表格
    let path =
      "test-data/map/accountInformation/householdRegister/city/haikou.json";
    this.AjaxGetData(path);
  },
  methods: {
    //ajax获取本地行政区划下json文件数据
    AjaxGetData(path) {
      let _this = this;
      this.$axios
        .get(path)
        //then获取成功；response成功后的返回值（对象）
        .then(response => {
          console.log(response.data.result);
          return [];
          // _this.tableData = [];
          // _this.tableData = response.data.result;
        })
        //获取失败
        .catch(error => {
          console.log(error);
          return [];
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

.el-divider {
  margin-top: 40px;
}

.el-divider__text {
  color: #2f74ff;
}
</style>