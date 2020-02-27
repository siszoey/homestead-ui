<template>
  <d2-container>
    <el-form :inline="true" ref="queryForm" size="mini" style="padding: 0 20px">
      <el-form-item label="标题">
        <el-input placeholder="请输入标题" v-model="queryForm.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="发布人">
        <el-input placeholder="请输入发布人名称" v-model="queryForm.fbr" clearable></el-input>
      </el-form-item>

      <div style="float: right">
        <el-form-item>
          <el-button type="warning" icon="el-icon-plus" v-on:click="add()">新增</el-button>
          <el-button type="primary" icon="el-icon-search" v-on:click="getTableData()">查询</el-button>
          <el-button type="default" @click="resetForm('queryForm')">
            <d2-icon name="refresh" />
          </el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-divider content-position="left">政策法规</el-divider>
    <el-table element-loading-text="拼命加载中..." highlight-current-row :data="zcfglist" stripe ref="multipleTable"
      tooltip-effect="dark" v-loading="zcfglistLoading" style="width: 100%" height="300">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="text" label="内容" show-overflow-tooltip></el-table-column>
      <el-table-column prop="fbr" label="发布人"></el-table-column>
      <el-table-column prop="fbsj" label="发布时间" sortable></el-table-column>
      <el-table-column prop="ydsl" label="阅读数量" sortable></el-table-column>
      <el-table-column fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleUpdate(scope.row,1)" icon="el-icon-edit">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-divider content-position="left">新闻推荐</el-divider>
    <el-table element-loading-text="拼命加载中..." highlight-current-row :data="xwtjlist" stripe ref="multipleTable"
      tooltip-effect="dark" v-loading="xwtjlistLoading" style="width: 100%" height="300">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="text" label="内容" show-overflow-tooltip></el-table-column>
      <el-table-column prop="fbr" label="发布人"></el-table-column>
      <el-table-column prop="fbsj" label="发布时间" sortable></el-table-column>
      <el-table-column prop="ydsl" label="阅读数量" sortable></el-table-column>
      <el-table-column fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleUpdate(scope.row,2)" icon="el-icon-edit">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="注册人信息" :visible.sync="addOrEditForm" width="450px">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="信息类型" prop="xxlx">
          <el-select v-model="editForm.xxlx" placeholder="请选择">
            <el-option label="政策法规" value="1"></el-option>
            <el-option label="新闻推荐" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示" prop="isShow">
          <el-switch v-model="editForm.isShow">
          </el-switch>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="发布人" prop="fbr">
          <el-input v-model="editForm.fbr"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="fbsj" v-if="editForm.ydsl!=''">
          <el-input v-model="editForm.fbsj" readonly></el-input>
        </el-form-item>
        <el-form-item label="阅读数量" prop="ydsl" v-if="editForm.ydsl!=''">
          <el-input v-model="editForm.ydsl" readonly></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="text">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="editForm.text"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addOrEditForm = false">确定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
  import request from "@/plugin/axios"
  export default {
    data() {
      return {
        queryForm: {
          title: "",
          fbr: ""
        },
        zcfglist: null,
        xwtjlist: null,
        zcfglistLoading: false,
        xwtjlistLoading: false,
        addOrEditForm: false,
        editForm: {
          isShow: true,
          title: "",
          text: "",
          fbr: "",
          fbsj: "",
          xxlx: "",
          ydsl: ""
        }
      };
    },
    created() {
      this.getTableData()
    },
    methods: {
      getTableData() {
        this.zcfglistLoading = true
        this.xwtjlistLoading = true
        request.get('/shareFarmhouse/getZcfgDatas', {
          params: {
            title: this.queryForm.title,
            fbr: this.queryForm.fbr
          }
        }).then(res => {
          this.zcfglist = res
        }).finally(() => {
          this.zcfglistLoading = false
        })
        request.get('/shareFarmhouse/getXwtjDatas', {
          params: {
            title: this.queryForm.title,
            fbr: this.queryForm.fbr
          }
        }).then(res => {
          this.xwtjlist = res
        }).finally(() => {
          this.xwtjlistLoading = false
        })
      },
      resetForm(formName) {
        this.queryForm = {
          title: "",
          fbr: ""
        }
        this.getTableData()
      },
      add() {
        this.editForm = {
          isShow: true,
          title: "",
          text: "",
          fbr: "",
          fbsj: "",
          xxlx: "1",
          ydsl: ""
        }
        this.addOrEditForm = true;
      },
      handleUpdate(row, xxlx) {
        this.editForm = {
          isShow: row.isShow,
          title: row.title,
          text: row.text,
          fbr: row.fbr,
          fbsj: row.fbsj,
          xxlx: xxlx + "",
          ydsl: row.ydsl
        }
        this.addOrEditForm = true;
      }
    }
  };
</script>

<style scoped>
  .el-divider {
    margin-top: 40px;
  }

  .el-divider__text {
    color: #2f74ff;
  }
</style>