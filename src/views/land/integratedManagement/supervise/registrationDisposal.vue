<template>
  <d2-container>
      <el-form :model="queryForm" :inline="true"  size="mini">
        <el-form-item label="登记地址">
          <el-input v-model="queryForm.xmbh" placeholder="登记地址"></el-input>
        </el-form-item>
        <el-form-item label="登记人">
          <el-input v-model="queryForm.xmmc" placeholder="登记人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"><d2-icon name="search"/>查询</el-button>
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
          prop="fwmph"
          label="房屋门牌号"
          >
        </el-table-column>
        <el-table-column
          prop="djdz"
          label="登记地址"
         >
        </el-table-column>
        <el-table-column
          prop="djr"
          label="登记人"
         >
        </el-table-column>
        <el-table-column
          prop="djsj"
          label="登记"
          >
        </el-table-column>
        <el-table-column
          prop="xzsy"
          label="登记事由"
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
        djdz: '',//登记地址
        djr: '',//登记人
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData() {
        this.table.listLoading = true
        request.get('/supervise/getRegistrationDatas',{
          params: {
            pageNum: this.table.pageNum,
            pageSize: this.table.pageSize
          }
        }).then(res =>{
          console.log(res)
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