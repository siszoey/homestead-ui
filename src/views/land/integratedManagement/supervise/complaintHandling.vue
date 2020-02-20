<template>
  <d2-container>
    <el-form :model="queryForm" :inline="true" size="mini">
      <el-form-item label="项目编号" prop="xmbh">
        <el-input v-model="xmbh" placeholder="项目编号"></el-input>
      </el-form-item>
      <el-form-item label="项目名称" prop="xmmc">
        <el-input v-model="xmmc" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableData">
          <d2-icon name="search" />查询</el-button>
      </el-form-item>
    </el-form>
    <el-row style="padding-bottom:25px">
      <el-col style="padding: 0px 5px 0px 25px" :span="showMapView ? 14: 24">
        <el-table :key='table.key' :data="table.list" v-loading="table.listLoading" element-loading-text="拼命加载中..."
          highlight-current-row stripe style="width: 100%">
          <el-table-column prop="xmmc" label="项目名称">
          </el-table-column>
          <el-table-column prop="xmbh" label="项目编号">
          </el-table-column>
          <el-table-column prop="jbr" label="举报人">
          </el-table-column>
          <el-table-column prop="jbsj" label="举报时间">
          </el-table-column>
          <el-table-column prop="jbdz" label="举报地址">
          </el-table-column>
          <el-table-column prop="jbnr" label="举报内容">
          </el-table-column>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="checkPosition(scope.row)" icon="el-icon-map-location">位置
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
      <el-col :span="10" style="padding:0px 25px 0px 5px;height:610px;" v-if="showMapView">
        <div style="width: 570px;height:700px">
          <superviseOneMap :zoomToZD="true"></superviseOneMap>
        </div>
      </el-col>
    </el-row>
    <template slot="footer">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="table.pageNum" :page-sizes="[10,20,30,50]" :page-size="table.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="table.total" style="margin: -10px;">
      </el-pagination>
    </template>
  </d2-container>
</template>

<script>
  import request from "@/plugin/axios"
  import processMixins from "../../mixnis/process-mixnis"
  import pageMixins from "../../mixnis/page-mixnis"
  export default {
    components: {
      superviseOneMap: () => import('../supervise/superviseOneMap.vue')
    },
    mixins: [
      pageMixins,
      processMixins
    ],
    data() {
      return {
        queryForm: {
          // xmbh: '',//项目编号
          // xmmc: '',//项目名称
        },
        xmbh: '',//项目编号
        xmmc: '',//项目名称
        showMapView: false,//右侧地图是否显示
        jbr: ""
      }
    },
    created() {
      this.getTableData()   
    },
    methods: {
      getTableData() {
        let params = {
          xmbh:this.xmbh,
          xmmc: this.xmmc
        };
        this.table.listLoading = true
        request.get('/supervise/getComplaintDatas', {
          params: {
            pageNum: this.table.pageNum,
            pageSize: this.table.pageSize
          }
        }).then(res => {
          //获取到总数据后再根据查询条件进行筛选
           let xfjbList = res.datas.filter(function(item){
              if(item.xmmc == params.xmmc||item.xmbh==params.xmbh)
             return item;            
            });
            if(params.xmbh==""&&params.xmmc==""){
              this.table.list = res.datas
              this.table.total = res.total
            }
            else{
              this.table.list = xfjbList
              this.table.total = xfjbList.length
            }
        }).finally(() => {
          this.table.listLoading = false
        })
      },
      checkPosition(row) {
        if (row.jbr == this.jbr) {
          this.showMapView = this.showMapView ? false : true;
        } else {
          this.showMapView = false;
          clearTimeout(this.timer);  //清除延迟执行 
          this.timer = setTimeout(() => {   //设置延迟执行
            this.showMapView = true;
            this.jbr = row.jbr;
          }, 0);
        }
      }
    }
  }
</script>

<style>

</style>