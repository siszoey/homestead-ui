<template>
  <d2-container>
    <el-row>
      <el-col>
        <el-form :inline="true" size="mini" style="margin-top: 20px;">
          <el-form-item label="用户名" style="margin-left:30px">
            <el-input v-model="yhm" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="xm" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="lxdh" placeholder="请输入联系电话"></el-input>
          </el-form-item>

          <div style="float: right">
            <el-form-item>
              <el-button type="primary" @click="getTableData">
                <d2-icon name="search" />查询
              </el-button>
              <el-button type="default" @click="resetForm('queryForm')">
                <d2-icon name="refresh" />
              </el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="padding: 0px 5px 0px 25px">
        <el-table :key="table.key" :data="table.list" v-loading="table.listLoading" highlight-current-row border
          :header-cell-style="{background:'#F5F5F5',color:'#666666'}" style="width: 100%;">
          <el-table-column align="center" label="用户名" width="180" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.yhm}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="姓名" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.xm}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="性别" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.xb}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="联系电话" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.lxdh}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="邮箱" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.yx}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="住址" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.zz}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="注册时间" width="140">
            <template slot-scope="scope">
              <span>{{scope.row.zcsj}}</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right" align="center" label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="handleUpdate(scope.row)" icon="el-icon-edit">编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
    <!-- footer 分页条 -->
    <template slot="footer">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="table.pageNum" :page-sizes="[10,20,30,50]" :page-size="table.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="table.total" style="margin: -10px;text-align: center;">
      </el-pagination>
    </template>

    <!-- 详情弹框 -->
    <el-dialog title="注册人信息" :visible.sync="editFormVisible" top="5vh" width="450px">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-input v-model="editForm.id" type="hidden"></el-input>
        <el-form-item label="用户名" prop="yhm">
          <el-input v-model="editForm.yhm" readonly></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="xm">
          <el-input v-model="editForm.xm" readonly></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="yx">
          <el-input v-model="editForm.yx" readonly></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="zcsj">
          <el-input v-model="editForm.zcsj" readonly></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="xb">
          <el-select v-model="editForm.xb" placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="editForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="lxdh">
          <el-input v-model="editForm.lxdh"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="zz">
          <el-input v-model="editForm.zz"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitData()">确定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
  import request from "@/plugin/axios"
  import pageMixins from "../mixnis/page-mixnis"
  export default {
    mixins: [pageMixins],
    data() {
      return {
        yhm: "",
        xm: "",
        lxdh: "",
        editFormVisible: false,//详情界面是否显示
        //详情界面数据
        editForm: {
          id: null,
          yhm: "",
          xm: "",
          xb: "",
          password: "",
          lxdh: "",
          yx: "",
          zz: "",
          zcsj: ""
        }
      };
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      //获取列表数据
      getTableData() {
        this.table.listLoading = true
        request.get('/shareFarmhouse/getZcrDatas', {
          params: {
            pageNum: this.table.pageNum,
            pageSize: this.table.pageSize,
            yhm: this.yhm,
            xm: this.xm,
            lxdh: this.lxdh
          }
        }).then(res => {
          this.table.list = res.datas
          this.table.total = res.total
        }).finally(() => {
          this.table.listLoading = false
        })
      },
      resetForm(formName) {
        this.yhm = "";
        this.xm = "";
        this.lxdh = "";
        this.getTableData()
      },
      submitData(){
        request.post('/shareFarmhouse/addOrEditZcr',{
          params: {
            obj: this.editForm
          }
        }).then(res => {
          this.resetForm();
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }).finally(() => {
          this.editFormVisible = false
        });
      },
      //详情
      handleUpdate(row) {
        this.editForm = {
          id: row.id,
          yhm: row.yhm,
          xm: row.xm,
          xb: row.xb,
          password: row.password,
          lxdh: row.lxdh,
          yx: row.yx,
          zz: row.zz,
          zcsj: row.zcsj
        }
        this.editFormVisible = true;
      }
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