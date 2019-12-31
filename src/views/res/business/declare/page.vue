<template>
    <d2-container>
        <el-collapse v-model="activeNames">
            <!-- header 查询条件 -->
            <el-collapse-item name="1">
                <template slot="title">
                    <div class="collapse-title"><span>信息筛选</span></div>
                </template>
                <el-form
                        :inline="true"
                        :model="queryForm"
                        ref="queryForm"
                        size="mini"
                        style="margin-bottom: -25px; padding: 0 20px">

                    <el-form-item v-for="(column, index) in columnOptions" :label="column.label" :prop="column.key"
                                  :key="index">

                        <el-select v-if="column.options" v-model="queryForm[column.key]">
                            <el-option v-for="(option, oIndex) in column.options" :label="option.content"
                                       :value="option.code" :key="oIndex"></el-option>
                        </el-select>

                        <el-input v-else v-model="queryForm[column.key]" :placeholder="column.label"></el-input>
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

            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <div class="collapse-title"><span>信息列表</span></div>
                </template>
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

                    <el-table-column align="center" label="申请人">
                        <template slot-scope="scope">
                            <span>{{scope.row.userName}}</span>
                        </template>
                    </el-table-column>


                    <el-table-column align="center" label="身份证号">
                        <template slot-scope="scope">
                            <span>{{scope.row.cardId}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="联系方式">
                        <template slot-scope="scope">
                            <span>{{scope.row.mobile}}</span>
                        </template>
                    </el-table-column>

                    <!--<el-table-column align="center" label="现住地">
                        <template slot-scope="scope">
                            <span>{{scope.row.address}}</span>
                        </template>
                    </el-table-column>-->

                    <!--<el-table-column align="center" label="住宅面积">
                        <template slot-scope="scope">
                            <span>{{scope.row.area}}</span>
                        </template>
                    </el-table-column>-->

                    <el-table-column align="center" label="是否为户主">
                        <template slot-scope="scope">
                            <span>{{selected('是否', scope.row.isHouseHolder)}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="户口性质">
                        <template slot-scope="scope">
                            <span>{{selected('户口性质', scope.row.residenceType)}}</span>
                        </template>
                    </el-table-column>

                    <!--<el-table-column align="center" label="户口">
                        <template slot-scope="scope">
                            <span>{{scope.row.residence}}</span>
                        </template>
                    </el-table-column>-->

                    <!--<el-table-column align="center" label="户口所属村">
                        <template slot-scope="scope">
                            <span>{{scope.row.residenceFrom}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="户口所在地">
                        <template slot-scope="scope">
                            <span>{{scope.row.residenceAddress}}</span>
                        </template>
                    </el-table-column>-->

                    <el-table-column fixed="right" align="center" label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button size="mini" type="warning" @click="handleCheck(scope.row, true)"
                                       icon="el-icon-check">提交
                            </el-button>
                            <el-button size="mini" type="primary" @click="handleUpdate(scope.row)"
                                       icon="el-icon-edit">编辑
                            </el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
                                       icon="el-icon-delete">删除
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-collapse-item>
        </el-collapse>

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
  import {declareColumnsFilter} from "../compoments/constant"
  import selectOptions from '../compoments/select-options'
  import declareView from './declare'
  import checkNextView from '../compoments/check-next-view'
  import fileTreeView from "../../components/filetreeview"

  export default {
    name: 'business-declare',
    components: {
      declareView,
      checkNextView,
      fileTreeView
    },
    mixins: [
      selectOptions
    ],
    data() {
      let declareColumns = declareColumnsFilter(true, ['userName', 'residenceType', 'isHouseHolder'])
      return {
        currentStage: {},
        activeNames: ['1', '2'],
        columnOptions: declareColumns,
        table: {
          key: 0,
          listLoading: false,
          list: [],
          total: null,
          pageNum: 0,
          pageSize: 10,
          pages: null
        },
        queryForm: function () {
          let form = {}
          declareColumns.map(column => {
            form[column.key] = ''
          })
          return form
        }(),

        dialogEditVisible: false,
        dialogEditItem: '',

        dialogCheckNextFormVisible: false,
        currentId: ''
      }
    },
    created() {
      this.currentStage = this.getOptionByContent('项目阶段', '项目申报')
      this.initOption(['是否', '户口性质'])
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
        this.$router.push({name: 'res-business-declare-create'})
      },
      handleUpdate(row) {
        this.dialogEditItem = row
        this.dialogEditVisible = true
      },
      handleCheck(row, flag) {
        if (flag) {
          this.dialogCheckNextFormVisible = true
        } else {
        }
        this.currentId = row.xmsbid
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

<style lang="scss" scope>
    .collapse-title {
        font-size: 20px;
        padding-left: 20px;
    }
</style>
