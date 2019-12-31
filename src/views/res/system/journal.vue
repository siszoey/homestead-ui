<template>
  <div class="draw">
    <div class="body-header bg-white">
      <div class="body-header-title">
        <span>操作日志</span>
      </div>
      <div>
        <el-row style="padding:10px;" class="row-bg">
          <el-col type="flex" :span="22" :offset="1" justify="center">
            <el-form :inline="true" :model="queryForm" class="demo-form-inline">
              <el-form-item label="操作人">
                <el-input size="small" v-model="queryForm.operateUser" placeholder="操作人"></el-input>
              </el-form-item>
              <el-form-item label="操作类型" style="margin-left:35px;">
                <el-select size="small" v-model="queryForm.operateType" placeholder="操作类型">
                  <el-option label="全部" aria-checked="checked" value></el-option>
                  <el-option label="登录" value="0"></el-option>
                  <el-option label="编辑" value="1"></el-option>
                  <el-option label="删除" value="2"></el-option>
                  <el-option label="异常" value="3"></el-option>
                  <el-option label="其他" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="操作时间" style="margin-left:35px;">
                <el-date-picker
                  size="small"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  v-model="queryForm.operateDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item style="float:right;">
                <el-button size="small" type="primary" @click="onSearch">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="body-box bg-white">
      <el-row>
        <el-col :span="22" :offset="1">
          <el-table
            :data="table.list"
            v-loading="table.listLoading"
            element-loading-text="拼命加载中..."
            element-loading-spinner="el-icon-loading"
            border
            size="small"
            style="width: 100%"
          >
            <el-table-column prop="operateUser" label="操作人" width="120"></el-table-column>
            <el-table-column
              prop="operateType"
              label="操作类型"
              width="120"
              :formatter="formatOperateType"
            ></el-table-column>
            <el-table-column
              prop="operateTime"
              label="操作时间"
              width="200"
              :formatter="formatOperateDate"
            ></el-table-column>
            <el-table-column prop="ipAddress" label="IP地址" width="220"></el-table-column>
            <el-table-column prop="hostName" label="主机"></el-table-column>
            <el-table-column prop="message" label="操作结果" width="120"></el-table-column>
            <el-table-column prop="fullMessage" label="异常信息"></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="table.pageNum"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="table.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="table.total"
              style="margin: -10px;"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { OperationLog } from "@api/sys.setting";
export default {
  data() {
    return {
      queryForm: {
        operateUser: "",
        operateType: "",
        operateDate: []
      },
      table: {
        key: 0,
        listLoading: false,
        list: [],
        total: null,
        pageNum: 1,
        pageSize: 10,
        pages: null
      }
    };
  },
  created() {
    var startDate =
      new Date().getFullYear() -
      2 +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();
    var endDate =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();
    this.queryForm.operateDate = [startDate, endDate];
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.table.listLoading = true;
      var datas = {
        operateUser: this.queryForm.operateUser,
        operateType: this.queryForm.operateType,
        operateStartDate: this.queryForm.operateDate[0],
        operateEndDate: this.queryForm.operateDate[1],
        pageIndex: this.table.pageNum,
        pageSize: this.table.pageSize
      };
      OperationLog(datas)
        .then(res => {
          this.table.list = res.data;
          this.table.total = res.total;
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.table.listLoading = false;
        });
    },
    onSearch() {
      this.getTableData();
    },
    handleSizeChange(pageSiz) {
      this.table.pageSize = pageSiz;
      this.getTableData();
    },
    handleCurrentChange(pageNum) {
      this.table.pageNum = pageNum;
      this.getTableData();
    },
    formatOperateType(row, column, cellValue) {
      if (row.operateType === "0") return "登录";
      else if (row.operateType == "1") return "编辑";
      else if (row.operateType == "2") return "删除";
      else if (row.operateType == "3") return "异常";
      else return "其他";
    },
    formatOperateDate(row, column, cellValue) {
      var dateStr = cellValue.split("T");
      if (dateStr != null) return dateStr[0];
    }
  }
};
</script>

<style scoped>
.bg-white {
  background: #ffffff;
}
.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}
/* body-header部分 */
.body-header {
  height: auto;
  border: 1px solid rgba(233, 233, 233, 1);
}
.body-header-title {
  height: 50px;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.body-header .body-header-title span {
  font-family: "MicrosoftYaHei-Bold", "微软雅黑 Bold", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  text-align: left;
  font-size: 13px;
  color: #333333;
  padding: 20px;
  line-height: 50px;
  vertical-align: middle;
}
.body-header .el-form-item {
  margin: 0 auto;
  border-radius: 0px;
  font-family: "MicrosoftYaHei", "微软雅黑";
  font-weight: 400;
  font-style: normal;
  text-align: left;
  font-size: 13px;
  color: #333333;
}
.body-box {
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid rgba(233, 233, 233, 1);
}
.body-box .el-table {
  margin: 20px auto;
  width: 95%;
}
.el-pagination {
  float: right;
  margin-right: 20px;
}
.search_data {
  display: flex;
  justify-content: space-around;
}
</style>
