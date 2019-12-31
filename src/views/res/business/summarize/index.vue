<template>
        <div class="body-box bg-white">
          <!-- <div class="body-header">
            <span class="body-header-title">审核汇总</span>
          </div> -->
          <p class="header-title">审核汇总</p>
          <el-form :inline="true"   class="sqrform" label-width="50px" style="margin-bottom:10px">
            <el-input size="small "  placeholder="请输入申请人姓名查询" style="width:300px;margin-left:10px;margin-top:10px"></el-input>
            <el-button size="medium" type="primary" icon="el-icon-search" style="margin-left:10px" @click="getTableData">查询</el-button>
            <el-button-group style="margin-left:700px">
              <el-button size="medium"  icon="el-icon-export" @click="outportData">导出</el-button>
            </el-button-group> 
          </el-form>
          <!-- table表格 -->
            <el-table :key='table.key'
                          :data="table.list"
                          v-loading="table.listLoading"
                          element-loading-text="加载中..."
                          highlight-current-row
                          border
                          style="width: 100%">
                 
                 <el-table-column align="center" label="申请人">
                        <template slot-scope="scope">
                            <span>{{scope.row.userName}}</span>
                        </template>
                    </el-table-column>

                    <!-- <el-table-column align="center" label="是否为户主">
                        <template slot-scope="scope">
                            <span>{{scope.row.isHouseHolder}}</span>
                        </template>
                    </el-table-column> -->

                    <el-table-column align="center" label="身份证号" min-width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.cardId}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="联系方式">
                        <template slot-scope="scope">
                            <span>{{scope.row.mobile}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="现住地">
                        <template slot-scope="scope">
                            <span>{{scope.row.address}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="住宅面积">
                        <template slot-scope="scope">
                            <span>{{scope.row.area}}</span>
                        </template>
                    </el-table-column>


                    <el-table-column align="center" label="户口">
                        <template slot-scope="scope">
                            <span>{{scope.row.residence}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="户口所属村">
                        <template slot-scope="scope">
                            <span>{{scope.row.residenceFrom}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="户口所在地">
                        <template slot-scope="scope">
                            <span>{{scope.row.residenceAddress}}</span>
                        </template>
                    </el-table-column>
                <el-table-column align="center" label="操作" min-width="120">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="backBtn(scope.row, true)">回退</el-button>
                    <el-button size="mini" type="danger" @click="backfill(scope.row)" >信息回填</el-button>
                </template>
               
              </el-table-column>
            </el-table>
            <!-- footer 分页条 -->            
               <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="table.pageNum"
                        :page-sizes="[10,20,30,50]"
                        :page-size="table.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="table.total"
                        style="margin: 10px;">
                </el-pagination>
            <!-- 回退 弹框-->   
            <checkFrom
                    v-if="dialogCheckFormVisible"
                    v-bind:itemId="currentId"
                    :stage="currentStage"
                    v-on:refresh="getTableData"
                    :visible.sync="dialogCheckFormVisible"></checkFrom>
            <!-- 回填 弹框-->   
            <backfillForm
                    v-if="dialogBackfillFormVisible"
                    v-bind:itemId="currentId"
                    :stage="currentStage"
                    v-on:refresh="getTableData"
                    :visible.sync="dialogBackfillFormVisible"
                    :item.sync="dialogBackfillItem"></backfillForm>
        </div>
</template>

<script>
//接口
import { getResidenceList} from '../../../../api/res.business'
import {declareColumnsFilter} from "../compoments/constant"
import backfillForm from '../summarize/backfill'
import checkFrom from '../summarize/check-from'

export default {
name: 'business-check',
    components: {
      checkFrom,
      backfillForm
    },
    data() {
      let declareColumns = declareColumnsFilter(true, ['userName'])
      return {
        currentStage: '2',//'审核汇总
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

        dialogCheckFormVisible: false,
        dialogBackfillFormVisible: false,
        currentId: '',
        xmlx:'',
        sczjdmj:'',
        sppc:''
      }
    },
    created() {
        console.log(999);
      this.getTableData()
    },
    methods: {
      getTableData() {
        this.table.listLoading = true
        let stage = '2'//'审核汇总
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
      //退回
      backBtn(row, flag){
        this.dialogCheckFormVisible = true;
        this.currentId = row.xmsbid
        
      },
      //审核信息回填
      backfill(row){
        if(row.sczjdmj==0||row.sczjdmj==null){          
        this.dialogBackfillFormVisible = true;
        this.currentId = row.xmsbid
        this.dialogBackfillItem = row
        }
        else{
         this.$message({
              message: '审核信息已经回填，不能重复录入！',
              type: 'warning'
            })
        }
      },
        //导出
      outportData() {
        

      },    
    }
  }

</script>
<style lang="scss" scoped>
.header-title{
    margin:0;
    font-size: 18px;
    color: #333333;
    padding:15px;
    font-weight: bold;
  }
</style>