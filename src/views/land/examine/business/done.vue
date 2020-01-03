<template>
    <d2-container>
        <el-form
                :inline="true"
                :model="queryForm"
                ref="queryForm"
                size="mini"
                style="margin-bottom: -25px; padding: 0 20px">
            <el-form-item label="申请类型">
                <el-select v-model="queryForm['sqlx']">
                    <el-option v-for="(option, oIndex) in getDicts('建房类型')" :label="option.optName"
                               :value="option.optCode" :key="oIndex"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="项目名称">
                <el-input v-model="queryForm['sqmc']" placeholder="项目名称"></el-input>
            </el-form-item>

            <el-form-item label="项目编号">
                <el-input v-model="queryForm['sqid']" placeholder="项目编号"></el-input>
            </el-form-item>

            <el-form-item label="申请时间">
                <el-date-picker
                        v-model="queryForm['sqsj']"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
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
        <el-table :key='table.key'
                  :data="table.list"
                  v-loading="table.listLoading"
                  element-loading-text="拼命加载中..."
                  highlight-current-row
                  stripe
                  style="width: 100%">

            <!--<el-table-column
                    type="selection"
                    width="55">
            </el-table-column>-->

            <el-table-column align="center" label="项目编号">
                <template slot-scope="scope">
                    <span>{{scope.row.jcxx.sqid}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="项目名称">
                <template slot-scope="scope">
                    <span>{{getOptName('建房类型', scope.row.nzjdqk.jflx)}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="申请类型">
                <template slot-scope="scope">
                    <span>{{getOptName('建房类型', scope.row.nzjdqk.jflx)}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="申请时间">
                <template slot-scope="scope">
                    <span>{{scope.row.qt.sqrrq}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="申请人">
                <template slot-scope="scope">
                    <span>{{scope.row.jcxx.xm}}</span>
                </template>
            </el-table-column>


            <el-table-column align="center" label="申请面积">
                <template slot-scope="scope">
                    <span>{{scope.row.nzjdqk.zjdmj}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="联系方式">
                <template slot-scope="scope">
                    <span>{{scope.row.jcxx.lxdh}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="项目状态">
                <template slot-scope="scope">
                    <span>{{getOptName('项目状态', scope.row.zjdSqJl.xmzt)}}</span>
                </template>
            </el-table-column>


            <el-table-column fixed="right" align="center" label="操作" width="300">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleDetail(scope.row)">查看详情
                    </el-button>
                    <el-button size="mini" type="primary" @click="handleCheck(scope.row)">办理
                    </el-button>
                </template>
            </el-table-column>

        </el-table>

        <!-- footer 分页条 -->
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
  import {PageData, ApproalProcess} from "../../../../api/land.business"
  import dictMixnis from "../../mixnis/dict-mixnis"
  import {mapState} from 'vuex'

  export default {
    name: 'examine-done',
    components: {},
    mixins: [
      dictMixnis
    ],
    data() {
      return {
        table: {
          key: 0,
          listLoading: false,
          list: [],
          total: null,
          pageNum: 0,
          pageSize: 10,
          pages: null
        },
        queryForm: {
          sqlx: undefined,
          sqid: undefined,
          sqmc: undefined,
          sqsj: undefined,
        },
      }
    },
    created() {
      this.getTableData()
    },
    computed: {
      ...mapState('d2admin/user', [
        'info'
      ])
    },
    methods: {
      getTableData() {
        this.table.listLoading = true
        let stageParam = {
          blzt: this.getOptCode("办理状态", "已办"),
          roleid: this.info.role.join("|")
        }
        PageData(this.table.pageNum, this.table.pageSize, stageParam, this.queryForm).then(res => {
          this.table.list = res.records
          this.table.total = res.total
        }).catch(err => console.log(err)).finally(() => {
          this.table.listLoading = false
        })
      },
      handleSizeChange(pageSiz) {
        this.table.pageSize = pageSiz
        this.getTableData()
      },
      handleCurrentChange(pageNum) {
        this.table.pageNum = pageNum
        this.getTableData()
      },
      handleFormReset(formName) {
        this.$refs[formName].resetFields()
        this.getTableData()
      },
      handleCreate() {
        this.$router.push({name: 'land-examine-todo-create', params: {sqlx: 2}})
      },
      handleDetail(row) {
        this.$router.push({
            name: 'land-examine-detail',
            params: Object.assign({
              sqlx: 0,
              sqid: 'xx',
              applicationFormDisabled: true,
              appceptanceFormDisabled: true,
              approvalFormDisabled: true,
              detail: row
            })
          }
        )
      },
      handleUpdate(row) {
      },
      handleCheck(row, flag) {
        let data = {
          id: '',
          sqid: '',
          next_xmzt: '',
          next_blzt: '',
          next_roleid: '',
          now_xmzt: '',
          now_blzt: ''
        }
        this.$confirm('提交申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          ApproalProcess(data).then(() => {
            this.$message({
              type: 'success',
              message: '成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '请求失败!'
            })
          }).finally(() => {
            this.getTableData()
          })
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
