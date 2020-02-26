<template>
  <d2-container>
    <el-form :inline="true" ref="queryForm" size="mini" style="padding: 0 20px">
      <el-form-item label="姓名">
        <el-input placeholder="请输入出/求租人姓名" v-model="queryForm.xm" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input placeholder="请输入出/求租人联系电话" v-model="queryForm.lxdh" clearable></el-input>
      </el-form-item>

      <div style="float: right">
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" v-on:click="getTableData()">查询</el-button>
          <el-button type="default" @click="resetForm('queryForm')">
            <d2-icon name="refresh" />
          </el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-divider content-position="left">出租列表</el-divider>
    <el-table element-loading-text="拼命加载中..." highlight-current-row :data="czlist" stripe
      ref="multipleTable" tooltip-effect="dark" v-loading="czlistLoading" style="width: 100%" height="300">
      <el-table-column prop="czr" label="出租人"></el-table-column>
      <el-table-column prop="lxdh" label="联系电话"></el-table-column>
      <el-table-column prop="dz" label="地址"></el-table-column>
      <el-table-column prop="fwdx" label="房屋大小(㎡)" sortable></el-table-column>
      <el-table-column prop="czjg" label="出租价格" sortable></el-table-column>
      <el-table-column prop="fbsj" label="发布时间" sortable></el-table-column>
    </el-table>

    <el-divider content-position="left">求租列表</el-divider>
    <el-table element-loading-text="拼命加载中..." highlight-current-row :data="qzlist" stripe
      ref="multipleTable" tooltip-effect="dark" v-loading="qzlistLoading" style="width: 100%" height="300">
      <el-table-column prop="qzr" label="求租人" sortable></el-table-column>
      <el-table-column prop="xb" label="性别" sortable></el-table-column>
      <el-table-column prop="lxdh" label="联系电话" sortable></el-table-column>
      <el-table-column prop="qzwz" label="求租位置" sortable></el-table-column>
      <el-table-column prop="qzjg" label="求租价格" sortable></el-table-column>
      <el-table-column prop="fbsj" label="发布时间" sortable></el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
  import request from "@/plugin/axios"
  export default {
    data() {
      return {
        queryForm: {
          xm: "",
          lxdh: ""
        },
        czlist: null,
        qzlist: null,
        czlistLoading: false,
        qzlistLoading: false
      };
    },
    created() {
      this.getTableData()
    },
    methods: {
      getTableData() {
        this.czlistLoading = true
        this.qzlistLoading = true
        request.get('/shareFarmhouse/getCzlbDatas', {
          params: {
            czr: this.queryForm.xm,
            lxdh: this.queryForm.lxdh
          }
        }).then(res => {
          this.czlist = res
        }).finally(() => {
          this.czlistLoading = false
        })
        request.get('/shareFarmhouse/getQzlbDatas', {
          params: {
            qzr: this.queryForm.xm,
            lxdh: this.queryForm.lxdh
          }
        }).then(res => {
          this.qzlist = res
        }).finally(() => {
          this.qzlistLoading = false
        })
      },
      resetForm(formName) {
        this.queryForm = {
          xm: "",
          lxdh: ""
        }
        this.getTableData()
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