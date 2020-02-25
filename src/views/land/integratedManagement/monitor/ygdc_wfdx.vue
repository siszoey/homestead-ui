<template>
  <d2-container>
      <el-form :model="queryForm" :inline="true"  size="mini">
        <el-form-item label="项目编号">
          <el-input v-model="queryForm.xmbh" placeholder="项目编号"></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="queryForm.xmmc" placeholder="项目名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData"><d2-icon name="search"/>查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :key='table.key'
                  :data="table.list"
                  v-loading="table.listLoading"
                  element-loading-text="拼命加载中..."
                  highlight-current-row
                  stripe
                  style="width: 100%">
        <el-table-column
          prop="xmbh"
          label="项目编号"
         >
        </el-table-column>
        <el-table-column
          prop="xmmc"
          label="项目名称"
          >
        </el-table-column>
        <el-table-column
          prop="zfr"
          label="执法人"
         >
        </el-table-column>
        <el-table-column
          prop="zfsy"
          label="执法事由" width="300"
          >
        </el-table-column>
        <el-table-column
          prop="yjzfsj"
          label="预计执法时间"
         >
        </el-table-column>
        <el-table-column
          prop="bz"
          label="备注"
         >
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
                    style="margin: -10px;">
            </el-pagination>
      </template>
  </d2-container>
</template>

<script>
import request from "@/plugin/axios"
import processMixins from "../../mixnis/process-mixnis"
import pageMixins from "../../mixnis/page-mixnis"
export default {
  mixins:[
    pageMixins,
    processMixins
  ],
  data () {
    return {
      queryForm: {
        xmbh: '',//项目编号
        xmmc: '',//项目名称
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData() {
        this.table.listLoading = true
        request.get('/monitor/getWfdxDatas',{
          params: {
            pageNum: this.table.pageNum,
            pageSize: this.table.pageSize,
            xmbh: this.queryForm.xmbh,
            xmmc: this.queryForm.xmmc
          }
        }).then(res =>{
          this.table.list = res.datas
          this.table.total = res.total
        }).finally(() => {
          this.table.listLoading = false
        })
      },
  }
}
</script>

<style>

</style>