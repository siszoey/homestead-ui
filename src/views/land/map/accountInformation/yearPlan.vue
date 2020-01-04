<template>
  <div id="app">
    <div class="bg-gray-light body">
      <el-row>
        <el-col :span="22" :offset="1">
          <div class="body-box bg-white">
            <div class="body-header">
              <span class="body-header-title">年度各项计划面积</span>
            </div>
            <label class="year-column-y">年份</label>
            <el-select
              v-model="year"
              style="position:absolute;z-index:9999999;left:60px;"
              class="select-item-year"
            >
              <el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <label class="xzq-column-y">行政区</label>
            <el-select
              v-model="city"
              style="position:absolute;z-index:9999999;left:250px;width: 2rem !important;"
              class="select-item-xzq"
            ></el-select>
            <el-select
              v-model="city"
              style="position:absolute;z-index:9999999;left:470px;width: 2rem !important;"
              class="select-item-xzq"
            ></el-select>

            <el-button
              size="medium"
              type="primary"
              icon="el-icon-search"
              style="margin-left:60%;margin-top: 8px;"
              v-on:click="search()"
            >查询</el-button>
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%;margin-top: 11px;"
            >
              <el-table-column prop="szsx" label="所在市/县" sortable></el-table-column>
              <el-table-column prop="zzmj" label="住宅面积/亩" sortable width="120px"></el-table-column>
              <el-table-column prop="dlmj" label="道路面积/亩" sortable></el-table-column>
              <el-table-column prop="gsmj" label="供水面积/亩" sortable></el-table-column>
              <el-table-column prop="psmj" label="排水面积/亩" sortable></el-table-column>
              <el-table-column prop="gdmj" label="供电面积/亩" sortable></el-table-column>
              <el-table-column prop="ljsj" label="垃圾收集/亩" sortable></el-table-column>
              <el-table-column prop="cqyzcs" label="畜禽养殖场所/亩" sortable></el-table-column>
               <el-table-column prop="lswhycbh" label="历史文化遗产保护/亩" sortable width="180px"></el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      title: "",
      years: [],
      year: "",
      city: "",
      tableData: [
        {
          szsx: "江夏区",
          zzmj: "5343.54",
          dlmj: "56464.7",
          gsmj: "978.5",
          psmj: "765.5",
          gdmj: "8656.6",
          ljsj: "4346345",
          cqyzcs: "5342.13",
          lswhycbh: "8654532.78"
        },
        {
          szsx: "黄陂区",
          zzmj: "5343.54",
          dlmj: "56464.7",
          gsmj: "978.5",
          psmj: "765.5",
          gdmj: "8656.6",
          ljsj: "4346345",
          cqyzcs: "5342.13",
          lswhycbh: "8654532.78"
        },
        {
          szsx: "新洲区",
          zzmj: "5343.54",
          dlmj: "56464.7",
          gsmj: "978.5",
          psmj: "765.5",
          gdmj: "8656.6",
          ljsj: "4346345",
          cqyzcs: "5342.13",
          lswhycbh: "8654532.78"
        },
        {
          szsx: "青山区",
          zzmj: "5343.54",
          dlmj: "56464.7",
          gsmj: "978.5",
          psmj: "765.5",
          gdmj: "8656.6",
          ljsj: "4346345",
          cqyzcs: "5342.13",
          lswhycbh: "8654532.78"
        },
        {
          szsx: "武昌区",
          zzmj: "5343.54",
          dlmj: "56464.7",
          gsmj: "978.5",
          psmj: "765.5",
          gdmj: "8656.6",
          ljsj: "4346345",
          cqyzcs: "5342.13",
          lswhycbh: "8654532.78"
        }
      ],
      ids: "",
      params: {
        title: ""
      }
    };
  },
  mounted: function() {
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
  },
  methods: {
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
  margin-left:0px;
  margin-right:35px;
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
    width: 105%!important;
    margin-left: 0px!important;
}
</style>