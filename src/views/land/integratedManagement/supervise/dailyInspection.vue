<template>
  <div class="wrap-middle">
    <!-- <p class="header-title">日常巡查列表</p> -->
    <el-row>
      <el-col>
        <el-form :inline="true" size="mini" style="margin-top: 20px;">

          <el-form-item label="项目名称" style="margin-left:30px">
            <el-input v-model="xmmc" placeholder="项目名称"></el-input>
          </el-form-item>
          <!-- <el-form-item label="监察人">
              <el-input v-model="queryForm['jcr']" placeholder="监察人"></el-input>
            </el-form-item> -->

          <div style="float: right">
            <el-form-item>
              <el-button type="primary" @click="getTableData">
                <d2-icon name="search" />查询
              </el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="showMapView ? 14: 24" style="padding: 0px 5px 0px 25px">
        <el-table :key="table.key" :data="table.list" highlight-current-row border
          :header-cell-style="{background:'#F5F5F5',color:'#666666'}" style="width: 100%;">
          <el-table-column align="center" label="项目名称" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.xmmc}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="监察人" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.jcr}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="监察时间" width="140">
            <template slot-scope="scope">
              <span>{{scope.row.jcsj}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="违法地址">
            <template slot-scope="scope">
              <span>{{scope.row.wfdz}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="违法事由">
            <template slot-scope="scope">
              <span>{{scope.row.wfsy}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="handleUpdate(scope.row)" icon="el-icon-edit">查看详情
              </el-button>
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
    <!-- footer 分页条 -->
    <!-- <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="table.current"
            :page-size="table.size"
            layout="total, prev, pager, next, jumper"
            :total="table.total"
            style="margin-top:35px;text-align:center"
          ></el-pagination> -->

    <!-- 详情弹框 -->
    <el-dialog title="日常巡查详情信息" :visible.sync="editFormVisible" top="5vh">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="项目名称" prop="xmmc">
          <el-input v-model="editForm.xmmc" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="违法地址" prop="wfdz">
          <el-input v-model="editForm.wfdz" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="监察人" prop="jcr">
          <el-input v-model="editForm.jcr" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="监察时间" prop="jcsj">
          <el-input v-model="editForm.jcsj" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="违法事由" prop="wfsy">
          <el-input v-model="editForm.wfsy" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createdtime">
          <el-input v-model="editForm.createdtime" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="createdby">
          <el-input v-model="editForm.createdby" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="bz">
          <el-input v-model="editForm.bz" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="附件" prop="wjlj">
          <!-- <el-input v-model="editForm.wjlj" auto-complete="off" ></el-input>   -->
          <ul>
            <li v-for="item in editForm.wjlj">
              <img src="require(`域名/item.WJLJ`)" />
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    components: {
      superviseOneMap: () => import('../supervise/superviseOneMap.vue')
    },
    name: "land-map-implementationProcess",
    data() {
      return {
        table: {
          key: 0,
          //listLoading: false,
          list: [],
          //total: null,
          // current: 1,
          // size: 10,
          pages: null
        },
        readonly: true,
        xmmc: "",
        //搜索权限
        //   queryForm: {
        //     xmmc: "",
        //     jcr: ""      
        //   }
        editFormVisible: false,//详情界面是否显示
        //详情界面数据
        editForm: {
          xmmc: '',
          wfdz: '',
          jcr: '',
          jcsj: '',
          wfsy: '',
          createdtime: '',
          createdby: '',
          bz: '',
          wjlj: ''
        },
        showMapView: false,//右侧地图是否显示
        INTERNALID: ""
      };
    },
    mounted() {
      // console.log(123);
      this.getTableData();
    },
    methods: {
      //获取列表数据
      getTableData() {
        let params = {
          xmmc: this.xmmc
        };
        var _this = this;
        this.$axios
          .get("http://rlcmr.weixin-api.dunnching.top/api/homestead/rcxc/rcxc_List", { params })
          .then(res => {
            _this.table.list = res.data.AppendData
          })
          .catch(function (error) {
            // 请求失败处理
            // console.log(error);
          });
      },
      //详情
      handleUpdate(row) {
        let params = {
          id: row.INTERNALID
        };
        this.$axios
          .get("http://rlcmr.weixin-api.dunnching.top/api/homestead/rcxc/rcxc_detail", { params })
          .then(res => {
            const obj = {};
            obj.xmmc = res.data.AppendData.xmmc;
            obj.wfdz = res.data.AppendData.wfdz;
            obj.jcr = res.data.AppendData.jcr;
            obj.jcsj = res.data.AppendData.jcsj;
            obj.wfsy = res.data.AppendData.wfsy;
            obj.createdtime = res.data.AppendData.createdtime;
            obj.createdby = res.data.AppendData.createdby;
            obj.bz = res.data.AppendData.bz;
            obj.wjlj = res.data.AppendData.wjlj;
            this.editFormVisible = true;
            this.editForm = Object.assign({}, obj);
          })

          .catch(function (error) {
            // 请求失败处理
            console.log(error);
          });

      },
      checkPosition(row) {
        if (row.INTERNALID == this.INTERNALID) {
          this.showMapView = this.showMapView ? false : true;
        } else {
          this.showMapView = false;
          clearTimeout(this.timer);  //清除延迟执行 
          this.timer = setTimeout(() => {   //设置延迟执行
            this.showMapView = true;
            this.INTERNALID = row.INTERNALID;
          }, 0);
        }
      }
      // getTableData() {
      //   this.table.listLoading = true;
      //   getTableList(
      //     this.queryForm,//查询条件
      //     this.table.current,//当前页
      //     this.table.size//每页数量       
      //   )
      //     .then(res => {
      //       this.table.list = res.records;
      //       this.table.total = res.total;
      //     })
      //     .catch(err => console.log(err))
      //     .finally(() => {
      //       this.table.listLoading = false;
      //     });
      // },
      // handleSizeChange(pageSiz) {
      //   this.table.size = pageSiz;
      //   this.getTableData();
      // },
      // handleCurrentChange(current) {
      //   this.table.current = current;
      //   this.getTableData();
      // },

    }
  };
</script>

<style lang="scss" scoped>
  p {
    margin: 0;
    padding: 0;
  }

  .body {
    overflow: auto;
  }

  .wrap-top {
    background: #ffffff;
    // margin-top:10px;
  }

  .header-title {
    margin: 0;
    font-size: 18px;
    color: #333333;
    padding: 0px 15px;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
  }

  .progress-box {
    margin-top: 10px;
    padding-bottom: 30px;
    display: flex;
    justify-content: space-between;
  }

  .grid-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .state {
    font-size: 16px;
    margin-top: 10px;
    color: #8e8e8e;
  }

  .num {
    font-size: 22px;
    margin-top: 10px;
    font-weight: bold;
    color: #606060;
  }

  .wrap-middle {
    // margin-top: 20px;
    // margin-bottom: 20px;
    background: #fff;
    height: 100%;

    .el-row {
      margin-bottom: 0px;
    }
  }

  .queryForm {
    padding: 25px 15px 10px 25px;
    margin: 0px;
  }
</style>