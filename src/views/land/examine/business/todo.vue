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
                    <el-option v-for="(option, oIndex) in sqlxOptions" :label="option.optName"
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
                    <el-button type="success" @click="handleCreate">
                        <d2-icon name="create"/>
                        新建
                    </el-button>
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
                    <span>{{scope.row.xmbh}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="项目名称">
                <template slot-scope="scope">
                    <span>{{scope.row.userName}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="申请类型">
                <template slot-scope="scope">
                    <span>{{scope.row.userName}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="申请时间">
                <template slot-scope="scope">
                    <span>{{scope.row.userName}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="申请人">
                <template slot-scope="scope">
                    <span>{{scope.row.userName}}</span>
                </template>
            </el-table-column>


            <el-table-column align="center" label="申请面积">
                <template slot-scope="scope">
                    <span>{{scope.row.cardId}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="联系方式">
                <template slot-scope="scope">
                    <span>{{scope.row.mobile}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="项目状态">
                <template slot-scope="scope">
                    <span>{{getOptName('户口性质', scope.row.residenceType)}}</span>
                </template>
            </el-table-column>


            <el-table-column fixed="right" align="center" label="操作" width="300">
                <template slot-scope="scope">
                    <!--<el-button size="mini" type="primary" @click="handleCheck(scope.row, true)"
                               icon="el-icon-check">查看详情
                    </el-button>-->
                    <el-button size="mini" type="primary" @click="handleDetail(scope.row)">查看详情
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


        <!-- 编辑 弹框 -->
        <el-dialog title="编辑申报" :visible.sync="dialogEditVisible" top="5vh">
            <el-tabs type="border-card">
                <el-tab-pane label="基本信息">
                    <declareView :item.sync="dialogEditItem"></declareView>
                </el-tab-pane>
                <el-tab-pane label="影像信息">
                    <fileTreeView :xmbh="dialogEditItem.xmbh" :stage="currentStage.code"></fileTreeView>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>

        <!-- 通过 弹框 -->
        <check-next-view
                v-if="dialogCheckNextFormVisible"
                v-bind:itemId="currentId"
                :stage="currentStage"
                content="确定提交申报？"
                v-on:refresh="getTableData"
                :visible.sync="dialogCheckNextFormVisible"></check-next-view>

    </d2-container>
</template>

<script>
  import {getResidenceList, deleteDeclare} from "../../../../api/res.business"
  import dictMixnis from "../../mixnis/dict-mixnis"

  export default {
    name: 'todo',
    components: {
      // declareView,
      // checkNextView,
      // fileTreeView
    },
    mixins: [
      dictMixnis
    ],
    data() {
      // let declareColumns = declareColumnsFilter(true, ['userName', 'residenceType', 'isHouseHolder'])
      return {
        currentStage: {},
        activeNames: ['1', '2'],
        // columnOptions: declareColumns,
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
          sqlx: '',
          sqid: '',
          sqmc: '',
          sqsj: '',
        },

        sqlxOptions: [],

        dialogEditVisible: false,
        dialogEditItem: '',

        dialogCheckNextFormVisible: false,
        currentId: ''
      }
    },
    created() {
      // this.currentStage = this.getOptionByContent('项目阶段', '项目申报')
      // this.initOption(['是否', '户口性质'])
      this.getTableData()
    },
    methods: {
      getTableData() {
        this.table.listLoading = true
        let stage = '0' // 申报
        getResidenceList(this.table.pageNum, this.table.pageSize, stage, this.queryForm).then(res => {
          this.table.list = res.list
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
        this.dialogEditItem = row
        this.dialogEditVisible = true
      },
      handleCheck(row, flag) {
        // if (flag) {
        //   this.dialogCheckNextFormVisible = true
        // } else {
        // }
        // this.currentId = row.xmsbid

      },
      handleUpdate(row) {
        this.dialogEditItem = row
        this.dialogEditVisible = true
      },
      handleDelete(row) {
        this.$confirm('确定删除所选', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          deleteDeclare(row.xmsbid).then(() => {
            this.$message({
              type: 'success',
              message: '已删除!'
            })
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }).finally(() => {
            this.getTableData()
          })
        }).catch(action => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
      },
    }
  }
</script>

<style>

</style>
