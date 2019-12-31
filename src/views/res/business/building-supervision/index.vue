<template>
    <d2-container>
        <!--  <div class="wrapper">-->
        <el-collapse v-model="activeNames">
            <el-collapse-item name="1">
                <template slot="title">
                    <div class="collapse-title"><span>信息筛选</span></div>
                </template>
                <!-- <el-header class="header_container"> -->
                <el-form :inline="true"
                         size="mini"
                         style="margin-bottom: -25px; padding: 0 20px">
                    <!-- <el-form-item label="项目编号">
                      <el-input v-model="xmbh"></el-input>
                    </el-form-item>
                    <el-form-item label="申请人">
                      <el-input v-model="userName"></el-input>
                    </el-form-item> -->
                    <el-form-item v-for="column in columnOptions" :label="column.label" :prop="column.key"
                                  :key="column.key">

                        <el-select v-if="column.options" v-model="queryForm[column.key]">
                            <el-option v-for="option in column.options" :label="option.content" :value="option.code"
                                       :key="option.code"></el-option>
                        </el-select>

                        <el-input v-else v-model="queryForm[column.key]" :placeholder="column.label"></el-input>
                    </el-form-item>
                    <div style="float: right">
                        <el-form-item>
                            <el-button type="primary" @click.native="getDatas">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="default" @click="handleFormReset('queryForm')">
                                <d2-icon name="refresh"/>
                            </el-button>
                        </el-form-item>
                    </div>
                    <!-- <el-form-item style="float:right">
                              <el-button @click.native.prevent="addDialogVisible=true" type="warning" icon="el-icon-plus"  circle></el-button>
                               <el-button @click.native.prevent="fetchDevices" type="warning" icon="el-icon-refresh"  circle title="刷新"></el-button>
                    </el-form-item>-->
                </el-form>
                <!-- </el-header> -->
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <div class="collapse-title"><span>信息列表</span></div>
                </template>
                <el-main class="main_container">
                    <el-table :data="dataList" stripe style="width: 100%">
                        <el-table-column prop="xmbh" label="项目编号" min-width="120"></el-table-column>
                        <el-table-column prop="userName" label="申请人"></el-table-column>
                        <el-table-column prop="cardId" label="身份证号" min-width="120"></el-table-column>
                        <el-table-column prop="mobile" label="联系方式"></el-table-column>
                        <el-table-column prop="address" label="现居地" min-width="150"></el-table-column>
                        <el-table-column prop="area" label="住宅面积"></el-table-column>
                        <el-table-column prop="residenceFrom" label="所属村"></el-table-column>
                        <el-table-column prop="residenceType" label="户口性质" :formatter="(row, column, cellValue, index)=>{
               return selected('户口性质', row.residenceType)
              }"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="120">
                            <template slot-scope="scope">
                                <el-button
                                        @click.native.prevent="showDetail(scope.row)"
                                        type="text"
                                        icon="el-icon-notebook-2"
                                        title="查看材料"
                                ></el-button>
                                <el-button
                                        @click.native.prevent="showUploadView(scope.row)"
                                        type="text"
                                        icon="el-icon-copy-document"
                                        title="批复上传"
                                ></el-button>
                                <el-button
                                        @click.native.prevent="finishCase(scope.row)"
                                        type="text"
                                        icon="el-icon-finished"
                                        title="归档"
                                ></el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </el-main>
            </el-collapse-item>
        </el-collapse>
        <template slot="footer">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount"
            ></el-pagination>
        </template>
        <el-dialog :visible.sync="uploadDlgVisible" width="8.5rem" title="影像上传">
            <div class="file-tree">
                <file-tree-view :key="currentXmbh" :xmbh="currentXmbh" :stage="stage"></file-tree-view>
            </div>
        </el-dialog>
        <el-dialog title="查看详情" :visible.sync="detailDlgVisible" top="5vh">
            <el-tabs type="border-card">
                <el-tab-pane label="基本信息">
                    <declare-view :item.sync="dialogDetailItem" :disabled="true"></declare-view>
                </el-tab-pane>
                <el-tab-pane label="影像信息">
                    <fileTreeView :xmbh="dialogDetailItem.xmbh" stage="0" readonly></fileTreeView>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>

    </d2-container>
    <!--  </div>-->
</template>
<script>
  import {getResidenceList, toDeclare} from "@/api/res.business.js"
  import {declareColumnsFilter} from "../compoments/constant"
  import SelectOptions from "../compoments/select-options.js"
  import FileTreeView from "../../components/filetreeview.vue"
  import DeclareView from "../declare/declare.vue"

  export default {
    components: {
      FileTreeView,
      DeclareView
    },
    data() {
      let declareColumns = declareColumnsFilter(true, ['xmbh', 'userName'])
      return {
        dataList: [],
        currentPage: 1,
        pageSize: 10,
        stage: "3",
        totalCount: 0,
        currentXmbh: "",
        uploadDlgVisible: false,
        detailDlgVisible: false,
        activeNames: ['1', '2'],
        columnOptions: declareColumns,
        dialogDetailItem: {},
        queryForm: function () {
          let form = {}
          declareColumns.map(column => {
            form[column.key] = ''
          })
          return form
        }(),
        finishStage: "91"
      }
    },
    mixins: [SelectOptions],
    created() {
      this.$nextTick(() => {
        let code = this.getCode("项目阶段", "建房监管")
        if (code) {
          this.stage = code
        }
        let fcode = this.getCode("项目阶段", "已完成")
        if (code) {
          this.finishStage = fcode
        }

        this.getDatas()
      })

    },
    methods: {
      getDatas() {
        getResidenceList(this.currentPage, this.pageSize, this.stage, this.queryForm).then(
          res => {
            this.dataList = res.list
            this.totalCount = res.total
          }
        )
      },
      handleSizeChange(val) {
        // console.log("size:"+val)
        this.pageSize = val
        this.getDatas()
      },
      handleCurrentChange(val) {
        // console.log(val)
        this.currentPage = val
        this.getDatas()
      },
      showUploadView(row) {
        this.currentXmbh = row.xmbh
        this.uploadDlgVisible = true
      },
      showDetail(row) {
        // console.log(row)
        this.dialogDetailItem = row
        this.detailDlgVisible = true
      },
      finishCase(row) {
        row.stage = this.finishStage
        toDeclare(row).then(() => {
          this.$message({
            type: 'success',
            message: '归档成功'
          })
          this.getDatas()
        })

      }
    }
  }
</script>
<style lang="scss" scoped>
    .wrapper {
        background-color: #fff;
    }

    .file-tree {
        min-height: 450px;
        max-height: 500px;
        overflow: auto;
    }

    ::v-deep .el-collapse-item {
        padding-left: 20px;
    }
</style>
