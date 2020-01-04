<template>
  <div id="app">
    <div class="bg-gray-light body">
      <el-row>
        <el-col :span="22" :offset="1">
          <div class="body-box bg-white">
            <div class="body-header">
              <span class="body-header-title">户籍信息列表</span>
            </div>
            <label class="xzq-column-h">行政区</label>
            <el-select
              v-model="city"
              style="position:absolute;z-index:9999999;left:75px;width: 2rem !important;"
              class="select-item-xzq"
            >
            </el-select>
            <el-select
              v-model="county"
              style="position:absolute;z-index:9999999;left:290px;width: 2rem !important;"
              class="select-item-xzq"
            >
            </el-select>
            <el-button
              size="medium"
              type="primary"
              icon="el-icon-search"
              style="margin-left:52%;margin-top: 8px;"
              v-on:click="search()"
            >查询</el-button>
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 95%;margin-top: 11px;"
            >
              <el-table-column prop="hzxm" label="户主姓名" sortable></el-table-column>
              <el-table-column prop="sfzh" label="身份证号" sortable></el-table-column>
              <el-table-column prop="nl" label="年龄" sortable></el-table-column>
              <el-table-column prop="jtzz" label="家庭住址" sortable></el-table-column>
              <el-table-column prop="hkszd" label="户口所在地" sortable></el-table-column>
              <el-table-column prop="jtzrs" label="家庭总人数" sortable></el-table-column>
              <el-table-column label="操作" width="100">
                  <template>
                    <el-button  type="text" size="small">查看详情</el-button>
                  </template>
                </el-table-column>
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
      year: "",
      city: "",
      county:"",
      tableData: [
          {
          hzxm: "张三",
          sfzh: "4311564546454",
          nl: "25",
          jtzz: "湖北武汉街道",
          hkszd: "湖北武汉街道87弄1号",
          jtzrs: "5"
        },
        {
          hzxm: "李四",
          sfzh: "4311564546454",
          nl: "55",
          jtzz: "湖北武汉街道",
          hkszd: "湖北武汉街道87弄1号",
          jtzrs: "6"
        },
        {
          hzxm: "王五",
          sfzh: "4311564546454",
          nl: "22",
          jtzz: "湖北武汉街道",
          hkszd: "湖北武汉街道87弄1号",
          jtzrs: "3"
        },
        {
          hzxm: "赵六",
          sfzh: "4311564546454",
          nl: "32",
          jtzz: "湖北武汉街道",
          hkszd: "湖北武汉街道87弄1号",
          jtzrs: "7"
        },
        {
          hzxm: "马虎",
          sfzh: "4311564546454",
          nl: "67",
          jtzz: "湖北武汉街道",
          hkszd: "湖北武汉街道87弄1号",
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