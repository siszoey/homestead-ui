<template>
  <div>
    <div class="wrap-middle">
      <p class="header-title">日常巡查列表</p>
      <el-row>
        <el-col>
          <el-form :inline="true" size="mini">

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
      <el-row style="padding-bottom:25px">
        <el-col :span="24" style="padding: 0px 5px 0px 25px">
          <el-table
            :key="table.key"
            :data="table.list"
            highlight-current-row
            border
            :header-cell-style="{background:'#F5F5F5',color:'#666666'}"
            style="width: 100%;">
            <el-table-column align="center" label="项目名称" width="180">
                        <template slot-scope="scope">
                            <span>{{scope.row.xmmc}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="监察人"  width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.jcr}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="监察时间"  width="120">
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
          </el-table>
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import { getTableList } from "../../../../api/res.supervise";
export default {
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
      xmmc:"",
      //搜索权限
    //   queryForm: {
    //     xmmc: "",
    //     jcr: ""      
    //   }
    };
  },
  mounted() {
    console.log(123);
    this.getTableData();
  },
  methods: {
      
    getTableData() {
    let params = {
        xmmc: this.xmmc
        };    
      var _this = this;
      this.$axios
        .get("http://rlcmr.weixin-api.dunnching.top/api/homestead/rcxc/rcxc_List", { params })
        .then(res => (_this.table.list = res.data.AppendData))
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
        });
    },
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
  margin-top: 20px;
  margin-bottom: 20px;
  background: #fff;
  height: auto;
}
.queryForm {
  padding: 25px 15px 10px 25px;
  margin: 0px;
}
</style>