<template>
  <div id="app" style="width:97%;height:96%;">
    <div class="left-side">
      <!-- <hr /> -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="card-title">审批情况一览表</span>
        </div>
        <div class="text item">
          <label class="year-column-l">年份</label>
          <el-select v-model="year" class="select-item-year">
            <el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <label class="xzq-column-l">行政区</label>
          <el-select v-model="city" class="select-item-xzq" v-on:change="changeCity(city)">
            <el-option
              v-for="item in cities"
              :key="item.id"
              :label="item.properties.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="text item">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="project" label="项目名称" />
            <el-table-column prop="proposer" label="申请人" />
            <el-table-column prop="address" label="地址" />
            <el-table-column prop="status" label="审批状态" />
            <!-- <el-table-column label="选择">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.checked"></el-checkbox>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </el-card>
    </div>

    <div id="pic-map" class="mapDiv"></div>
    <timeline></timeline>
  </div>
</template>

<script>
import BaseMap from "../spatialData/mapBase.js";
import timeline from "../spatialData/components/timeline";
import { getExaminePic } from "../../../../api/res.implprocess";

export default {
  name: "examinePic",
  data() {
    return {
      map: null,
      selectedType: "",
      years: [],
      cities: [],
      city: "",
      year: "",
      tableData: [
        {
          project: "宅基地申请",
          proposer: "王小虎",
          address: "上海市",
          status: "联合审批"
        },
        {
          project: "宅基地申请",
          proposer: "王小虎",
          address: "上海市",
          status: "联合审批"
        },
        {
          project: "宅基地申请",
          proposer: "王小虎",
          address: "上海市",
          status: "联合审批"
        },
        {
          project: "宅基地申请",
          proposer: "王小虎",
          address: "上海市",
          status: "联合审批"
        },
        {
          project: "宅基地申请",
          proposer: "王小虎",
          address: "上海市",
          status: "联合审批"
        },
        {
          project: "宅基地申请",
          proposer: "王小虎",
          address: "上海市",
          status: "联合审批"
        },
        {
          project: "宅基地申请",
          proposer: "王小虎",
          address: "上海市",
          status: "联合审批"
        }
      ]
    };
  },
  components: {
    timeline
  },
  created() {},
  watch: {
    selectedType(val) {
      this.getTableData();
    }
  },
  methods: {
    //ajax获取本地json文件行政区划
    requestAjax(fileName, level) {
      let _this = this;
      this.$axios
        .get(fileName)
        //then获取成功；response成功后的返回值（对象）
        .then(response => {
          console.log(response.data.features); //[0].properties.name
          if (level == "3") {
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
    getTableData() {
      this.table.listLoading = true;
      getExaminePic(this.selectedType, this.year)
        .then(res => {
          this.table.list = res.list;
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.table.listLoading = false;
        });
    },
    floatOnMap() {
      let map = this.$refs.rootmap;
      let container = map.querySelector("div.ol-overlaycontainer-stopevent");
      let len = map.childNodes.length;

      var floatNodes = [];
      for (let i = 0; i < len; i++) {
        const node = map.childNodes[i];
        if (node.id.startsWith("float-on-"))
          floatNodes[floatNodes.length] = node;
      }
      for (let i = 0; i < floatNodes.length; i++) {
        const node = floatNodes[i];
        container.appendChild(node);
      }
    }
  },
  mounted() {
    var currentRegionLayer;
    var xzqhdm = "469005115201";
    this.map = BaseMap.BaseInitMap("pic-map");
    this.map.addLayer(BaseMap.img_wLayer);
    currentRegionLayer = BaseMap.BaseChangeRegionVector(
      this.map,
      xzqhdm,
      currentRegionLayer
    );
    BaseMap.BaseAddTruePoints(this.map, "#E58C2A");
    let sj_fileName = "echarts-map/province/json/hainan.json";
    this.requestAjax(sj_fileName, 2);
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
    //floatOnMap();
  }
};
</script>


<style scoped>
.div-table {
  z-index: 1;
  top: 0.5em;
  left: 1em;
}
.el-card__header {
  font-size: 16px;
  font-weight: bold;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 99.5%;
  /* margin-top: 11%; */
  height: 99.5%;
  background-color: #f7f7f7d1;
}
.year-column-l {
  /* position: absolute; */
  z-index: 9999999;
  font-size: 16px;
  color: #303133;
  margin: 7px;
}
.xzq-column-l {
  /* position: absolute; */
  z-index: 9999999;
  font-size: 16px;
  color: #303133;
  margin: 7px;
  /* margin-left: 1.8rem; */
}

.select-item-year {
  height: 35px !important;
  width: 100px !important;
}
.select-item-xzq {
  width: 160px;
  height: 35px !important;
}
.left-side {
  position: absolute;
  z-index: 99;
  width: 26%;
  min-width:415px;
  height: 100%;
  color: white;
  /* background-color: #f7f7f7d1; */
  /* margin-top: -0.1rem; */
}
.mapDiv {
  height: 100%;
  padding: 0px;
  padding: 0px;
  margin: 0px;
  width: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
}
</style>
