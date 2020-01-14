<template>
    <d2-container>
        <el-form
                :inline="true"
                :model="queryForm"
                ref="queryForm"
                size="mini"
                style="margin-bottom: -25px;">
            <el-form-item label="申请类型" prop="jflx">
                <el-select v-model="queryForm['jflx']">
                    <el-option v-for="(option, oIndex) in getDicts('建房类型')" :label="option.optName"
                               :value="option.optCode" :key="oIndex"></el-option>
                </el-select>
            </el-form-item>

            <!--<el-form-item label="项目名称">
                <el-input v-model="queryForm['sqmc']" placeholder="项目名称"></el-input>
            </el-form-item>-->

            <el-form-item label="项目编号" prop="sqid">
                <el-input v-model="queryForm['sqid']" placeholder="项目编号"></el-input>
            </el-form-item>

            <el-form-item label="申请时间" prop="sqsj">
                <el-date-picker
                        v-model="queryForm['sqsj']"
                        type="daterange"
                        range-separator="至"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

            <div style="float: right">
                <el-form-item>
                    <el-button type="success" @click="handleCreate" v-if="isFirstProcess()">
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

            <el-table-column align="center" label="项目编号" width="155">
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

            <el-table-column align="center" label="联系方式" width="120">
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
                    <!--<el-button size="mini" type="primary" @click="handleCheck(scope.row)">办理
                    </el-button>-->
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

        <el-dialog title="请选择申请类型" width="35%" :visible.sync="createBeforeDialogVisible">
            <div class="dialog-content">
                <div class="content">
                    <div class="content-box" v-for="option in getDicts('建房类型')"
                         @click="toCreateView(option.optCode)">
                        <img :src="`image/examine/jflx_${option.optCode}.png`" :alt="option.optName">
                        <p>{{option.optName}}</p>
                    </div>
                </div>
                <!--<div class="content">
                    <div class="content-box" @click="toCreateView(4)">
                        <img src="image/examine/jflx_4.png" alt="">
                        <p>宅基地流转</p>
                    </div>
                    <div class="content-box" @click="toCreateView(5)">
                        <img src="image/examine/jflx_5.png" alt="">
                        <p>宅基地退出</p>
                    </div>
                </div>-->
            </div>
        </el-dialog>
    </d2-container>
</template>

<script>
  import {PageData} from "../../../../api/land.business"
  import dictMixins from "../../mixnis/dict-mixnis"
  import processMixins from "../../mixnis/process-mixnis"
  import pageMixins from "../../mixnis/page-mixnis"
  import {mapState} from 'vuex'

  export default {
    name: 'examine-todo',
    components: {},
    mixins: [
      dictMixins,
      pageMixins,
      processMixins
    ],
    data() {
      return {
        queryForm: {
          jflx: undefined,
          sqid: undefined,
          sqmc: undefined,
          sqsj: undefined,
        },

        createBeforeDialogVisible: false,
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
        PageData(this.getTableDataParam()).then(res => {
          this.table.list = res.records || res.list || res.data
          this.table.total = res.total
        }).catch(err => console.log(err)).finally(() => {
          this.table.listLoading = false
        })
      },
      //其他参数
      getTableDataParam() {
        //根据业务修改补充
        let otherParam = {
          blzt: this.getOptCode("办理状态", "待办"),
          roleid: this.info.role.join("|")
        }
        //时间区间字段，调整
        let newQueryForm = Object.assign({}, this.queryForm)
        if (newQueryForm.sqsj && newQueryForm.sqsj.length > 0) {
          let start_sqrrq = newQueryForm.sqsj[0]
          let end_sqrrq = newQueryForm.sqsj[1]
          newQueryForm['start_sqrrq'] = start_sqrrq
          newQueryForm['end_sqrrq'] = end_sqrrq
          delete newQueryForm.sqsj
        }
        return Object.assign({
          pageNum: this.table.pageNum,
          pageSize: this.table.pageSize
        }, newQueryForm/*this.queryForm*/, otherParam)
      },
      handleCreate() {
        this.createBeforeDialogVisible = true
      },
      toCreateView(jflx) {
        this.$router.push({
            name: 'land-examine-business-todo-create',
            params: Object.assign({
              jflx
            })
          }
        )
      },
      handleDetail(row) {
        this.$router.push({
            name: 'land-examine-business-detail',
            params: Object.assign({
              //申请表
              applicationFormDisabled: true,
              //审批表
              appceptanceFormDisabled: false,//this.info.role.includes(''),
              //验收表
              approvalFormDisabled: false,
              detail: row,

              box: '待办'
            })
          }
        )
      },
      handleUpdate(row) {
      },
      handleCheck(row) {
        let confirm = {
          distinguishCancelAndClose: true,
          title: '办理结果, 是否继续?',
          trueText: '已办',
          falseText: '退办',
        }
        //第一个角色申请，只有已办，没有退办
        if (row.zjdSqJl.roleid === this.getOptName("流程角色", "1")) {
          confirm = Object.assign(confirm, {
            distinguishCancelAndClose: false,
            title: '办理结果, 是否继续?',
            trueText: '已办',
            falseText: '取消',
          })
        }
        this.$confirm(confirm.title, '提示', {
          distinguishCancelAndClose: confirm.distinguishCancelAndClose,
          confirmButtonText: confirm.trueText,
          cancelButtonText: confirm.falseText,
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已办!'
          })
          this.processRequest(row.zjdSqJl, true)
        }).catch(action => {
          //不通过
          if (confirm.distinguishCancelAndClose && action === 'cancel') {
            this.$message({
              type: 'info',
              message: '退办!'
            })
            this.processRequest(row.zjdSqJl, false)
          }
        })
      },

    }
  }
</script>

<style lang="scss" scoped>
    .dialog-content {
        .content {
            display: flex;
            margin-bottom: 10px;
        }
    }

    .content-box {
        cursor: pointer;
        width: 110px;
        height: 110px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        background: #E7E9EC;
        padding: 10px 10px;
        margin-left: 20px;

        img {
            width: 60px;
        }
    }

</style>
