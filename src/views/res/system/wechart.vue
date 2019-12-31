<template>
  <div id="app">
    <div class="bg-gray-light body">
      <el-row>
        <el-col :span="22" :offset="1">
          <div class="body-box bg-white">
            <div class="body-header">
              <span class="body-header-title">微信模板消息管理</span>
            </div>
            <el-input
              size="small "
              v-model="input"
              placeholder="请输入标题模糊查询"
              style="width:300px;margin-left:10px;margin-top:10px"
            ></el-input>
            <el-button
              size="medium"
              type="primary"
              icon="el-icon-search"
              style="margin-left:10px"
              v-on:click="search()"
            >查询</el-button>
            <el-button-group class="operate-tool">
              <el-button size="medium" icon="el-icon-circle-plu" @click="addgsForm">新增</el-button>
              <el-button size="medium" icon="el-icon-edit" @click="update">修改</el-button>
              <el-button size="medium" icon="el-icon-delete" v-on:click="remove()">删除</el-button>
            </el-button-group>
            <el-table
              ref="multipleTable"
              :data="tableData"
              border
              tooltip-effect="dark"
              style="width: 100%;margin-top: 11px;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="msgtype" label="模板消息类型" width="180" sortable></el-table-column>
              <el-table-column prop="title" label="标题" width="180" sortable></el-table-column>
              <el-table-column prop="content" label="消息内容" sortable></el-table-column>
              <el-table-column prop="isactive" label="是否激活" sortable></el-table-column>
            </el-table>
            <el-dialog
              :title="title"
              :visible.sync="dialogAddgsVisible"
              @close="closeDialogAddgsVisible"
            >
              <wxmsg-dialog :wxmsg-data="wxmsgData"></wxmsg-dialog>
              <!-- <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddgsVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAddForm('addForm')">确 定</el-button>
              </div>-->
            </el-dialog>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import WxmsgDialog from "../system/addOrUpdateWXMsg.vue";
export default {
  components: { WxmsgDialog },
  data() {
    return {
      dialogAddgsVisible: false,
      input: "",
      title: "",
      tableData: [
        {
          id: "1",
          msgtype: "微信",
          title: "农业信息化建设1",
          content: "发生范德萨发大水发射点发顺丰",
          isactive: "否"
        },
        {
          id: "2",
          msgtype: "微信",
          title: "农业信息化建设2",
          content: "v梵蒂冈地方的国防大厦",
          isactive: "否"
        },
        {
          id: "3",
          msgtype: "微信",
          title: "农业信息化建设3",
          content: "给个人的观点事故发生",
          isactive: "否"
        },
        {
          id: "4",
          msgtype: "微信",
          title: "农业信息化建设4",
          content: "发生飞洒地方说法萨芬",
          isactive: "否"
        },
        {
          id: "5",
          msgtype: "微信",
          title: "农业信息化建设5",
          content: "犯得上发射点发生飞洒发顺丰",
          isactive: "是"
        },
        {
          id: "6",
          msgtype: "微信",
          title: "农业信息化建设6",
          content: "发生发生范德萨发顺丰发士大夫但是",
          isactive: "是"
        },
        {
          id: "7",
          msgtype: "微信",
          title: "农业信息化建设7",
          content: "反对犯得上发射点发顺丰",
          isactive: "是"
        }
      ],
      multipleSelection: [],
      multipleSelectionData: [],
      wxmsgData: {}
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelectionData = val;
      console.log(this.multipleSelectionData);
      this.multipleSelection = []; // 每次勾选checkbox时清空multipleSelection数组
      val.forEach(item => {
        this.multipleSelection.push(item.id); //循环把所有的id放进multipleSelection数组中
      });
      console.log(this.multipleSelection);
    },
    //搜索
    search() {
      //this.ajaxSync("","");
    },
    //删除
    remove() {
      let selections = this.multipleSelection;
      if (selections.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择要删除的数据!",
          type: "warning"
        });
      } else {
        let _selections = this.multipleSelectionData;
        for (let i = 0; i < _selections.length; i++) {
          // 获取选中行的索引的方法
          // 遍历表格中tableData数据和选中的val数据，比较它们的id,相等则输出选中行的索引
          // id的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
          _selections.forEach((val, index) => {
            this.tableData.forEach((v, i) => {
              if (val.id === v.id) {
                // i 为选中的索引
                this.tableData.splice(i, 1);
              }
            });
          });
        }
        this.$message({
          showClose: true,
          message: "删除成功!",
          type: "success"
        });
      }
      // this.$ajax
      //   .delete("/dataManagement/basic/deletedBatch", {
      //     flowmeterIds: this.multipleSelection
      //   })
      //   .then(res => {
      //     console.log(res);
      //   });
    },
    //更新
    update() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择要更新的数据!",
          type: "warning"
        });
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          showClose: true,
          message: "请选择一条数据更新!",
          type: "warning"
        });
      } else {
        //获取被选中项的Id
        //let id = this.multipleSelection[0];
        let selectionData = this.multipleSelectionData[0];
        this.wxmsgData = selectionData;
        this.dialogAddgsVisible = true;
        this.title = "信息更新";
      }
    },
    //ajax请求api,传入参数：类型和标题
    ajaxSync(type, title) {
      var _this = this; //在ajax中必须将this重新赋一个新对象接收，否则ajax中获取不到vue变量
      var list = [];
      switch (type) {
        case "0":
          list = [
            {
              id: "1",
              msgtype: "微信",
              title: "农业信息化建设1",
              content: "发生范德萨范德萨发生",
              isactive: "是"
            },
            {
              id: "2",
              msgtype: "微信",
              title: "农业信息化建设2",
              content: "发生范德萨范德萨富士达范德萨",
              isactive: "是"
            }
          ];
          break;
        case "1":
          list = [
            {
              id: "3",
              msgtype: "微信",
              title: "农业信息化建设3",
              content: "给个人的观点事故发生",
              isactive: "否"
            },
            {
              id: "4",
              msgtype: "微信",
              title: "农业信息化建设4",
              content: "发生飞洒地方说法萨芬",
              isactive: "否"
            }
          ];
          break;
        case "2":
          list = [
            {
              id: "5",
              msgtype: "微信",
              title: "农业信息化建设5",
              content: "犯得上发射点发生飞洒发顺丰",
              isactive: "是"
            },
            {
              id: "6",
              msgtype: "微信",
              title: "农业信息化建设6",
              content: "发生发生范德萨发顺丰发士大夫但是",
              isactive: "是"
            }
          ];
          break;
        default:
          list = [
            {
              id: "7",
              msgtype: "微信",
              title: "农业信息化建设7",
              content: "反对犯得上发射点发顺丰",
              isactive: "是"
            }
          ];
          break;
      }
      _this.tableData = list;
      // $.ajax({
      //   url: "",
      //   type: "get",
      //   data: {intotype:type,infotitle:title},
      //   dataType: "json",
      //   async: false,
      //   success: function(res) {
      //      _this.tableData = res.data;
      //   },
      //   error: function() {
      //     // ...
      //   }
      // });
    },
    // 点击新增按钮，弹出新增模态框
    addgsForm() {
      this.dialogAddgsVisible = true;
      this.title = "新增模板消息";
    },
    // 关闭或取消模态框，清空值
    closeDialogAddgsVisible() {
      //this.$refs.addForm.resetFields(); //element封装的方法,清空模态框的值
      //this.title = ""; //初始化title的值
      this.addForm = {
        //初始化addForm中的值
        msgtype: "",
        title: "",
        content: "",
        isactive: ""
      };
    },
    // 确定新增数据
    saveAddForm(forms) {
      this.$refs[forms].validate(valid => {
        console.log(this.$refs[forms]);
        if (valid) {
          let params = {
            msgtype: this.addForm.msgtype,
            title: this.addForm.title,
            content: this.addForm.content,
            isactive: this.addForm.isactive
          };
          ///this.axios.post(`接口地址`, params).then(res => {
          alert("新增成功");
          this.dialogAddgsVisible = false;
          // this.$router.push({name:'categories'})
          //this.init();
          //});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
.operate-tool {
  margin: 9px;
  float: right;
}
.el-tabs--border-card {
  margin-top: 0.091rem;
}
.bg-gray-light {
  background: #f0f2f5;
}
.bg-white {
  background: #ffffff;
}
.body {
  height: 100%;
}
.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}
.body-box {
  height: auto;
  border: 1px solid rgba(233, 233, 233, 1);
}
.body-box .body-header {
  height: 50px;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.body-box .body-header .body-header-title {
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
</style>