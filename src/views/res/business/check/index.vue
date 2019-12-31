<template>
    <d2-container>
        <el-collapse v-model="activeNames">
            <el-collapse-item name="1">
                <template slot="title">
                    <div class="collapse-title"><span>信息筛选</span></div>
                </template>
                <!-- header 查询条件 -->
                <!--                <template slot="header">-->
                <el-form
                        :inline="true"
                        :model="queryForm"
                        ref="queryForm"
                        size="mini"
                        style="margin-bottom: -25px; padding: 0 20px">

                    <el-form-item v-for="column in columnOptions" :label="column.label" :prop="column.key">

                        <el-select v-if="column.options" v-model="queryForm[column.key]">
                            <el-option v-for="option in column.options" :label="option.content"
                                       :value="option.code"></el-option>
                        </el-select>

                        <el-input v-else v-model="queryForm[column.key]" :placeholder="column.label"></el-input>
                    </el-form-item>

                    <div style="float: right">
                        <el-form-item>
                            <el-button type="primary" @click="getTableData">
                                <d2-icon name="search"/>
                                查询
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="default" @click="handleFormReset('queryForm')">
                                <d2-icon name="refresh"/>
                            </el-button>
                        </el-form-item>
                    </div>
                </el-form>
                <!--                </template>-->

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

                    <!--<el-table-column align="center" label="联系方式">
                        <template slot-scope="scope">
                            <span>{{scope.row.mobile}}</span>
                        </template>
                    </el-table-column>-->

                    <el-table-column align="center" label="现住地">
                        <template slot-scope="scope">
                            <span>{{scope.row.address}}</span>
                        </template>
                    </el-table-column>

                    <!--<el-table-column align="center" label="是否为户主">
                        <template slot-scope="scope">
                            <span>{{selected('是否', scope.row.isHouseHolder)}}</span>
                        </template>
                    </el-table-column>-->

                    <el-table-column align="center" label="住宅面积">
                        <template slot-scope="scope">
                            <span>{{scope.row.area}}</span>
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
                    </el-table-column>-->

                    <!--<el-table-column align="center" label="户口所在地">
                        <template slot-scope="scope">
                            <span>{{scope.row.residenceAddress}}</span>
                        </template>
                    </el-table-column>-->

                    <el-table-column fixed="right" align="center" label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button size="mini" type="info" @click="handleInfo(scope.row)"
                                       icon="el-icon-info">查看
                            </el-button>
                            <el-button size="mini" type="warning" @click="handleCheck(scope.row, true)"
                                       icon="el-icon-check">审核
                            </el-button>
                            <el-button size="mini" type="danger" @click="handleCheck(scope.row, false)"
                                       icon="el-icon-back">回退
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <!-- table表格 -->
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


        <!-- 回退 弹框 -->
        <checkBackView
                v-if="dialogCheckBackFormVisible"
                v-bind:itemId="currentId"
                :stage="currentStage"
                v-on:refresh="getTableData"
                :visible.sync="dialogCheckBackFormVisible"></checkBackView>
        <!-- 通过 弹框 -->
        <check-next-view
                v-if="dialogCheckNextFormVisible"
                v-bind:itemId="currentId"
                :stage="currentStage"
                content="通过则进入[审核汇总]阶段 | 不通则项目结束，归档记录"
                :toEndFlag="true"
                v-on:refresh="getTableData"
                :visible.sync="dialogCheckNextFormVisible"></check-next-view>


        <el-dialog title="查看详情" :visible.sync="dialogDetailVisible" top="5vh">
            <el-tabs type="border-card">
                <el-tab-pane label="基本信息">
                    <declareView :item.sync="dialogDetailItem" :disabled="true"></declareView>
                </el-tab-pane>
                <el-tab-pane label="影像信息">
                    <fileTreeView :xmbh="dialogDetailItem.xmbh" stage="0" readonly></fileTreeView>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>

    </d2-container>
</template>

<script>
  import {getResidenceList} from "../../../../api/res.business"
  import {declareColumnsFilter} from "../compoments/constant"
  import selectOptions from '../compoments/select-options'
  import checkBackView from '../compoments/check-back-view'
  import checkNextView from '../compoments/check-next-view'
  import fileTreeView from "../../components/filetreeview"
  import declareView from "../declare/declare"

  export default {
    name: 'business-check',
    mixins: [
      selectOptions
    ],
    components: {
      checkBackView,
      checkNextView,
      fileTreeView,
      declareView
    },
    data() {
      let declareColumns = declareColumnsFilter(true, ['userName', 'cardId'])
      return {
        currentStage: {},//'街道审核',
        activeNames: ['1', '2'],
        columnOptions: declareColumns,
        table: {
          key: 0,
          listLoading: false,
          list: [],
          total: null,
          pageNum: 1,
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

        dialogCheckBackFormVisible: false,
        dialogCheckNextFormVisible: false,
        currentId: '',

        dialogDetailVisible: false,
        dialogDetailItem: '',

      }
    },
    created() {
      this.currentStage = this.getOptionByContent('项目阶段', '街道审核')
      this.getTableData()
    },
    methods: {
      getTableData() {
        this.table.listLoading = true
        let stage = '1' //'街道审核'
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
      handleInfo(row) {
        this.dialogDetailVisible = true
        this.dialogDetailItem = row
      },
      handleCheck(row, flag) {
        if (flag) {
          this.dialogCheckNextFormVisible = true
        } else {
          this.dialogCheckBackFormVisible = true
        }
        this.currentId = row.xmsbid
      },
      handleUpdate(row) {
        this.dialogEditItem = row
        this.dialogEditVisible = true
      },
      handleDelete(row) {

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
