<template>
  <d2-container>
    <el-form :inline="true" ref="queryForm" size="mini" style="padding: 0 20px">
      <el-form-item label="姓名">
        <el-input placeholder="请输入姓名" v-model="query_xm" clearable></el-input>
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
      query_xm: "",
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
      ]
    };
  },
  mounted: function() {
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
    //ajax获取本地行政区划下json文件数据
    AjaxGetData(path, datatype) {
      var _this = this;
      this.$axios
        .get(path)
        //then获取成功；response成功后的返回值（对象）
        .then(response => {
          // console.log(response.data.result);
          _this[datatype] = response.data.result;
          _this[datatype + "_queryed"] = response.data.result;
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
      if (this.query_xm == "") {
        this.cbfjtcydata_queryed = this.cbfjtcydata;
        this.jtjyzzcydata_queryed = this.jtjyzzcydata;
        this.nfgyrdata_queryed = this.nfgyrdata;
        this.hjxxdata_queryed = this.hjxxdata;
        return;
      } else {
        this.cbfjtcydata_queryed = this.cbfjtcydata.filter(
          data => data.xm.indexOf(this.query_xm) > -1
        );
        this.jtjyzzcydata_queryed = this.jtjyzzcydata.filter(
          data => data.cyxm.indexOf(this.query_xm) > -1
        );
        this.nfgyrdata_queryed = this.nfgyrdata.filter(
          data => data.qlrmc.indexOf(this.query_xm) > -1
        );
        this.hjxxdata_queryed = this.hjxxdata.filter(
          data => data.hzxm.indexOf(this.query_xm) > -1
        );
      }
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