<template>
  <d2-container>
    <el-form :model="queryForm" :inline="true" size="mini">
      <el-form-item label="项目编号">
        <el-input v-model="queryForm.xmbh" placeholder="项目编号"></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="queryForm.jcxmmc" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          <d2-icon name="search" />查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :key="table.key"
      :data="table.list"
      v-loading="table.listLoading"
      element-loading-text="拼命加载中..."
      highlight-current-row
      stripe
      style="width: 100%"
    >
      <el-table-column prop="xmbh" label="项目编号"></el-table-column>
      <el-table-column prop="jcxmmc" label="项目名称"></el-table-column>
      <el-table-column prop="yxqs" label="影像期数"></el-table-column>
      <el-table-column prop="yswfdz" label="疑似违法地址"></el-table-column>
      <el-table-column prop="jcsj" label="监测时间"></el-table-column>
      <el-table-column prop="yswflx" label="疑似违法类型"></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleDbfx(scope.row)"
            icon="el-icon-edit"
          >对比分析</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="table.pageNum"
        :page-sizes="[10,20,30,50]"
        :page-size="table.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.total"
        style="margin: -10px;"
      ></el-pagination>
    </template>
    <el-dialog title="对比分析" :visible.sync="dialogVisible" width="80%" top="5vh">
      <Dbfx  style="height:700px"></Dbfx>
    </el-dialog>
  </d2-container>
</template>

<script>
import request from "@/plugin/axios";
import processMixins from "../../mixnis/process-mixnis";
import pageMixins from "../../mixnis/page-mixnis";

import Dbfx from "../../../land/map/spatialData/ygdc_dbfxmain";
export default {
  mixins: [pageMixins, processMixins],
  data() {
    return {
      queryForm: {
        xmbh: "", //项目编号
        jcxmmc: "" //项目名称
      },
      dialogVisible: false
    };
  },
  components: {
    Dbfx
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.table.listLoading = true;
      request
        .get("/monitor/getJcsbDatas", {
          params: {
            pageNum: this.table.pageNum,
            pageSize: this.table.pageSize
          }
        })
        .then(res => {
          console.log(res);
          this.table.list = res.datas;
          this.table.total = res.total;
        })
        .finally(() => {
          this.table.listLoading = false;
        });
    },
    handleDbfx(row) {
      this.dialogVisible = true;
    }
  }
};
</script>

<style>
</style>>
