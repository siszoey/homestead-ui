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
              v-on:change="changeCity(city)"
            >
              <el-option
                v-for="item in cities"
                :key="item.id"
                :label="item.properties.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="county"
              style="position:absolute;z-index:9999999;left:290px;width: 2rem !important;"
              class="select-item-xzq"
            >
              <el-option
                v-for="item in counties"
                :key="item.properties.id"
                :label="item.properties.name"
                :value="item.properties.id"
              ></el-option>
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
              <!-- <el-table-column label="操作" width="100">
                  <template>
                    <el-button  type="text" size="small">查看详情</el-button>
                  </template>
              </el-table-column>-->
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
      cities: [],
      county: "",
      counties: [],//update
      tableData: [
        {
          hzxm: "张清秀",
          sfzh: "460100199102283210",
          nl: "25",
          jtzz: "海南省海口市龙华区街道56弄6号",
          hkszd: "海南省海口市龙华区街道56弄6号",
          jtzrs: "5"
        },
        {
          hzxm: "李世三",
          sfzh: "460100198803216576",
          nl: "55",
          jtzz: "海南省海口市琼山区街道87弄1号",
          hkszd: "海南省海口市琼山区街道87弄1号",
          jtzrs: "6"
        },
        {
          hzxm: "王倾佩",
          sfzh: "460100199802083219",
          nl: "22",
          jtzz: "海南省海口市美兰区街道6弄15号",
          hkszd: "海南省海口市美兰区街道6弄15号",
          jtzrs: "3"
        },
        {
          hzxm: "赵子强",
          sfzh: "460100199208181210",
          nl: "32",
          jtzz: "海南省海口市龙华区街道121弄55号",
          hkszd: "海南省海口市龙华区街道121弄55号",
          jtzrs: "7"
        },
        {
          hzxm: "马龙",
          sfzh: "460100199509111219",
          nl: "67",
          jtzz: "海南省海口市秀英区街道1000弄27号",
          hkszd: "海南省海口市秀英区街道1000弄27号",
          jtzrs: "5"
        },
        {
          hzxm: "谢强",
          sfzh: "460100197612211215",
          nl: "67",
          jtzz: "海南省海口市秀英区街道1666弄77号",
          hkszd: "海南省海口市秀英区街道1666弄77号",
          jtzrs: "3"
        },
        {
          hzxm: "马龙",
          sfzh: "460100195011118219",
          nl: "67",
          jtzz: "海南省海口市秀英区街道5644弄07号",
          hkszd: "海南省海口市秀英区街道5644弄07号",
          jtzrs: "8"
        }
      ],
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
  },
  methods: {
    changeCity(value) {
      let fileName = "";
      console.log(value);
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
          break;
        case "460200":
          fileName = "echarts-map/city/json/hainan/460200.json";
          this.requestAjax(fileName, 3);
          break;
        case "460300":
          fileName = "echarts-map/city/json/hainan/460300.json";
          this.requestAjax(fileName, 3);
          break;
        default:
          this.county="";//change时清空county
          this.counties = [];
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
          console.log(response.data.features); //[0].properties.name
          if (level == "3") {
            _this.county="";//change时清空county
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