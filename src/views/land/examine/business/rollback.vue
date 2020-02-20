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
                  <span>{{scope.row.formVO.jcxx.sqid}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="项目名称">
                <template slot-scope="scope">
                    <span>{{getOptName('建房类型', scope.row.formVO.nzjdqk.jflx)}}</span>
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


            <el-table-column fixed="right" align="center" label="操作" width="300">
                <template slot-scope="scope">
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

    </d2-container>
</template>

<script>
  import {BackToDo} from "../../../../api/land.business_activiti"
  import dictMixins from "../../mixnis/dict-mixnis"
  import pageMixins from "../../mixnis/page-mixnis"
  import {mapState} from 'vuex'

  export default {
    name: 'examine-rollback',
    components: {},
    mixins: [
      dictMixins,
      pageMixins,
    ],
    data() {
      return {
        queryForm: {
          jflx: undefined,
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
        BackToDo(this.getTableDataParam()).then(res => {
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
          // blzt: this.getOptCode("办理状态", "退办"),
          // roleid: this.info.role.join("|")
          loginName: this.info.username
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

      handleDetail(row) {
        this.$router.push({
            name: 'land-examine-business-detail',
            params: Object.assign({
              //申请表
              applicationFormDisabled: true,
              //审批表
              acceptanceFormDisabled: false,
              //验收表
              approvalFormDisabled: false,
              detail: row,

              box: '退办'
            })
          }
        )
      },

    }
  }
</script>

<style lang="scss" scoped>

</style>
