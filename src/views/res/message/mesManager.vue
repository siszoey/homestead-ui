<template>
  <div id="app">
    <div class="bg-gray-light body">
      <el-row>
        <el-col :span="22" :offset="1">
          <div class="body-box bg-white">
            <div class="body-header">
              <span class="body-header-title">信息维护管理</span>
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
              <el-button size="medium" icon="el-icon-circle-plu" @click="addgsForm">发布</el-button>
              <el-button size="medium" icon="el-icon-edit" @click="update">更新</el-button>
              <el-button size="medium" icon="el-icon-delete" v-on:click="remove()">删除</el-button>
            </el-button-group>
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="政策法规" name="0">政策法规</el-tab-pane>
              <el-tab-pane label="上级信息" name="1">上级信息</el-tab-pane>
              <el-tab-pane label="巡查信息" name="2">巡查信息</el-tab-pane>
              <el-tab-pane label="建房管理群" name="3">建房管理群</el-tab-pane>

              <el-table
                ref="multipleTable"
                :data="tableData"
                border
                tooltip-effect="dark"
                style="width: 100%;margin-top: 11px;"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="xzqdm" label="行政区代码" width="150" sortable></el-table-column>
                <el-table-column prop="infotype" label="类型" width="150" sortable></el-table-column>
                <el-table-column prop="infotitle" label="信息标题" width="180" sortable></el-table-column>
                <el-table-column prop="fbsj" label="发布时间" width="150" sortable></el-table-column>
                <el-table-column prop="readcount" label="阅读量" sortable></el-table-column>
                <el-table-column
                  prop="infocontent"
                  label="信息内容"
                  width="230"
                  show-overflow-tooltip
                  sortable
                ></el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleQuery(scope.row)" type="text" size="small">信息查阅</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tabs>
            <el-dialog
              :title="title"
              :visible.sync="dialogAddgsVisible"
              @close="closeDialogAddgsVisible"
            >
              <publish-page :publish-data="publishData"></publish-page>
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
import PublishPage from "../message/publish.vue";
export default {
  components: { PublishPage },
  data() {
    return {
      dialogAddgsVisible: false,
      input: "",
      title: "",
      //默认选中，0表示类型为：政策法规
      activeName: "0",
      tableData: [
        {
          id: "1",
          xzqdm: "110000000000",
          infotype: "政策法规",
          infotitle: "农业信息化建设1",
          fbsj: "2016-06-06",
          readcount: "56",
          infocontent:
            "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
        },
        {
          id: "2",
          xzqdm: "120000000000",
          infotype: "政策法规",
          infotitle: "农业信息化建设2",
          fbsj: "2016-04-22",
          readcount: "432",
          infocontent:
            "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
        }
        // {
        //   id: "3",
        //   xzqdm: "130000000000",
        //   infotitle: "农业信息化建设3",
        //   fbsj: "2016-09-06",
        //   readcount: "87",
        //   infocontent:
        //     "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
        // },
        // {
        //   id: "4",
        //   xzqdm: "140000000000",
        //   infotitle: "农业信息化建设4",
        //   fbsj: "2016-08-08",
        //   readcount: "5",
        //   infocontent:
        //     "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
        // },
        // {
        //   id: "5",
        //   xzqdm: "150000000000",
        //   infotitle: "农业信息化建设5",
        //   fbsj: "2016-02-07",
        //   readcount: "77",
        //   infocontent:
        //     "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
        // },
        // {
        //   id: "6",
        //   xzqdm: "210000000000",
        //   infotitle: "农业信息化建设6",
        //   fbsj: "2016-05-01",
        //   readcount: "88",
        //   infocontent:
        //     "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
        // },
        // {
        //   id: "7",
        //   xzqdm: "220000000000",
        //   infotitle: "农业信息化建设7",
        //   fbsj: "2019-01-03",
        //   readcount: "271",
        //   infocontent:
        //     "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
        // }
      ],
      multipleSelection: [],
      multipleSelectionData: [],
      publishData: {}
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
    },
    handleClick(tab, event) {
      //this.tableData=[];
      //console.log(tab, event);
      //type为0表示类型为：政策法规；1表示类型为：上级信息;2表示类型为：巡查信息;3表示类型为：建房管理群
      var type = this.activeName;
      this.ajaxSync(type, "");
    },
    handleQuery(row) {
      sessionStorage.setItem('msgDetails',JSON.stringify(row));
      this.$router.push('msgDetails'); //跳转到指定页面
    },
    //搜索
    search() {
      //this.ajaxSync("","");
    },
    //删除
    remove() {
      let selections = this.multipleSelection;
      if (this.multipleSelection.length == 0) {
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
        this.publishData = selectionData;
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
              xzqdm: "110000000000",
              infotype: "政策法规",
              infotitle: "农业信息化建设1",
              fbsj: "2016-06-06",
              readcount: "56",
              infocontent:
                "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
            },
            {
              id: "2",
              xzqdm: "120000000000",
              infotype: "政策法规",
              infotitle: "农业信息化建设2",
              fbsj: "2016-04-22",
              readcount: "432",
              infocontent:
                "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
            }
          ];
          break;
        case "1":
          list = [
            {
              id: "3",
              xzqdm: "130000000000",
              infotype: "上级信息",
              infotitle: "农业信息化建设3",
              fbsj: "2016-09-06",
              readcount: "87",
              infocontent:
                "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
            },
            {
              id: "4",
              xzqdm: "140000000000",
              infotype: "上级信息",
              infotitle: "农业信息化建设4",
              fbsj: "2016-08-08",
              readcount: "5",
              infocontent:
                "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
            }
          ];
          break;
        case "2":
          list = [
            {
              id: "5",
              xzqdm: "150000000000",
              infotype: "巡查信息",
              infotitle: "农业信息化建设5",
              fbsj: "2016-02-07",
              readcount: "77",
              infocontent:
                "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
            },
            {
              id: "6",
              xzqdm: "210000000000",
              infotype: "巡查信息",
              infotitle: "农业信息化建设6",
              fbsj: "2016-05-01",
              readcount: "88",
              infocontent:
                "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
            }
          ];
          break;
        default:
          list = [
            {
              id: "7",
              xzqdm: "220000000000",
              infotype: "建房管理群",
              infotitle: "农业信息化建设7",
              fbsj: "2019-01-03",
              readcount: "271",
              infocontent:
                "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
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
      this.title = "信息发布";
    },
    // 关闭或取消模态框，清空值
    closeDialogAddgsVisible() {
      //this.$refs.addForm.resetFields(); //element封装的方法,清空模态框的值
      //this.title = ""; //初始化title的值
      this.addForm = {
        //初始化addForm中的值
        xzqdm: "",
        infotype: "",
        infotitle: "",
        fbsj: "",
        infocontent: ""
      };
    },
    // 确定新增数据
    saveAddForm(forms) {
      this.$refs[forms].validate(valid => {
        console.log(this.$refs[forms]);
        if (valid) {
          let params = {
            xzqdm: this.addForm.xzqdm,
            infotype: this.addForm.infotype,
            infotitle: this.addForm.infotitle,
            fbsj: this.addForm.fbsj,
            infocontent: this.addForm.infocontent
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
.el-table__header-wrapper {
  margin-left: 2px !important;
}
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