<template>
  <d2-container>
    <el-form :inline="true" :model="queryForm" ref="queryForm" size="mini" style="margin-bottom: -25px;">
      <el-form-item label="申请类型" prop="jflx">
        <el-select v-model="queryForm['jflx']">
          <el-option v-for="(option, oIndex) in getDicts('建房类型')" :label="option.optName" :value="option.optCode"
                     :key="oIndex"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="办理状态" prop="blzt">
        <el-select v-model="queryForm['blzt']">
          <el-option v-for="(option, oIndex) in getDicts('办理状态')" :label="option.optName" :value="option.optCode"
                     :key="oIndex"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="项目编号" prop="sqid">
        <el-input v-model="queryForm['sqid']" placeholder="项目编号"></el-input>
      </el-form-item>

      <div style="float: right">
        <el-form-item>
          <el-button type="primary" @click="getTableData">
            <d2-icon name="search"/>
            查询
          </el-button>
          <el-button type="default" @click="handleFormReset('queryForm')">
            <d2-icon name="refresh"/>
          </el-button>
        </el-form-item>
      </div>
    </el-form>

    <!-- table表格 -->
    <el-table :key="table.key" :data="table.list" v-loading="table.listLoading" element-loading-text="拼命加载中..."
              highlight-current-row stripe style="width: 100%">

      <el-table-column align="center" label="项目编号" width="155">
        <template slot-scope="scope">
          <span>{{scope.row.formVO.jcxx.sqid}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="申请类型">
        <template slot-scope="scope">
          <span>{{getOptName('建房类型', scope.row.formVO.nzjdqk.jflx)}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="申请时间">
        <template slot-scope="scope">
          <span>{{scope.row.formVO.qt.sqrrq}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="申请人">
        <template slot-scope="scope">
          <span>{{scope.row.formVO.jcxx.xm}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="申请面积">
        <template slot-scope="scope">
          <span>{{scope.row.formVO.nzjdqk.zjdmj}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="联系方式" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.formVO.jcxx.lxdh}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="项目状态">
        <template slot-scope="scope">
          <span>{{scope.row.actname}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="办理状态">
        <template slot-scope="scope">
          <span>{{blztOption(scope.row.blzt)}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="受理人">
        <template slot-scope="scope">
          <span>{{scope.row.assignee}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetail(scope.row)">查看详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)" v-if="[1,2].includes(scope.row.blzt)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- footer 分页条 -->
    <template slot="footer">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="table.pageNum" :page-sizes="[10,20,30,50]" :page-size="table.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="table.total"
                     style="margin: -10px;"></el-pagination>
    </template>

  </d2-container>
</template>

<script>
  import {AllProc, DeleteProc} from "../../../../api/land.business_activiti"
  import dictMixins from "../../mixnis/dict-mixnis"
  import processMixins from "../../mixnis/process-mixnis"
  import pageMixins from "../../mixnis/page-mixnis"
  import {mapState} from "vuex"

  export default {
    name: "examine-all",
    components: {},
    mixins: [dictMixins, pageMixins, processMixins],
    data() {
      return {
        queryForm: {
          jflx: undefined,
          sqid: undefined,
          sqmc: undefined,
          sqsj: undefined
        },
        dqjd: null,
        spjd: ["2"],
        reportList: null,
        multipleTable: [], //存放选中值的数组
        createBatchReportDialog: false,
        backEndUrl: process.env.VUE_APP_END_URL,
        files: []
      }
    },
    created() {
      this.getTableData()
    },
    computed: {
      ...mapState("d2admin/user", ["info"]),
    },
    methods: {
      getTableData() {
        this.table.listLoading = true
        //获取表格内数据
        AllProc(this.getTableDataParam())
          .then(res => {
            this.table.list = res.records || res.list || res.data
            this.table.total = res.total
          })
          .catch(err => console.log(err))
          .finally(() => {
            this.table.listLoading = false
          })
      },
      //其他参数
      getTableDataParam() {
        //根据业务修改补充
        let otherParam = {
          // blzt: this.getOptCode("办理状态", "已办"),
          // roleid: this.info.role.join("|")
        }
        //时间区间字段，调整
        let newQueryForm = Object.assign({}, this.queryForm)
        if (newQueryForm.sqsj && newQueryForm.sqsj.length > 0) {
          let start_sqrrq = newQueryForm.sqsj[0]
          let end_sqrrq = newQueryForm.sqsj[1]
          newQueryForm["start_sqrrq"] = start_sqrrq
          newQueryForm["end_sqrrq"] = end_sqrrq
          delete newQueryForm.sqsj
        }
        return Object.assign(
          {
            pageNum: this.table.pageNum,
            pageSize: this.table.pageSize
          },
          newQueryForm /*this.queryForm*/,
          otherParam
        )
      },
      handleDetail(row) {
        this.$router.push({
          name: "land-examine-business-detail",
          params: Object.assign({
            //申请表
            applicationFormDisabled: true,
            //审批表
            acceptanceFormDisabled: true,
            //验收表
            approvalFormDisabled: true,
            detail: row,

            box: "综合"
          })
        })
      },
      handleDelete(row) {
        this.$confirm("确定删除这条项目记录？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }).then(() => {
          DeleteProc({
            sqid: row.formVO.jcxx.sqid,
            taskid: row.taskid
          }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            })
            this.getTableData()
          }).catch(() => {
            this.$message({
              type: "error",
              message: "删除失败!"
            })
          })
        }).catch(() => {
        })
      },
      blztOption(blzt) {
        switch (blzt) {
          case 1:
            return '待办'
          case 2:
            return '退办'
          case 3:
            return '已办'
          default:
            return ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>