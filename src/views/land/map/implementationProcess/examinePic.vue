<template>
  <div style="height:500px" id="pic-map" ref="rootmap">
    <div id="float-on-list" class="div-table ol-control">
      <div>
        <span>类型</span>
        <el-select v-model="selectedType" size="mini" filterable placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>年份</span>
        <el-select v-model="selectedYear" size="mini" filterable placeholder="请选择">
          <el-option
            v-for="item in years"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="project" label="项目名称" width="100" />
        <el-table-column prop="proposer" label="申请人" width="100" />
        <el-table-column prop="address" label="地址" width="100" />
        <el-table-column prop="status" label="审批状态" width="100" />
        <el-table-column label="选择" width="50">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, XYZ, Vector as VectorSource } from "ol/source";

import { getExaminePic } from "../../../../api/res.implprocess";

export default {
  name: "examinePic",
  data() {
    return {
      map: null,
      types: [
        { value: "1", label: "全部类型" },
        { value: "2", label: "其他类型" }
      ],
      selectedType: "",
      years: [{ value: "1", label: "2020年" }, { value: "2", label: "2019年" }],
      selectedYear: "",
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
  created() {},
  watch: {
    selectedType(val) {
      this.getTableData();
    },
    selectedYear(val) {
      this.getTableData();
    }
  },
  methods: {
    getTableData() {
      this.table.listLoading = true;
      getExaminePic(this.selectedType, this.selectedYear)
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
    var mapcontainer = this.$refs.rootmap;

    this.map = new Map({
      target: "pic-map",
      layers: [
        // new TileLayer({
        //   name: "base-layer",
        //   source: new XYZ({
        //     url: "http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        //   })
        // }),
        new TileLayer({
          name: "base-layer",
          source: new OSM()
        })
      ],
      view: new View({
        center: [12062989, 3405766],
        zoom: 4
      })
    });
    floatOnMap();
  }
};
</script>


<style scoped>
.div-table {
  z-index: 1;
  top: 0.5em;
  left: 1em;
}
</style>