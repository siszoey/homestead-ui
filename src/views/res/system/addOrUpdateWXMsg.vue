<template>
  <section>
    <el-container>
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="id" :label-width="formLabelWidth" v-if="hideId">
          <el-input v-model="addForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="模板消息类型" :label-width="formLabelWidth" prop="msgtype">
          <el-select v-model="addForm.msgtype" placeholder="请选择消息类型">
            <el-option label="微信" value="微信"></el-option>
            <el-option label="短信" value="短信"></el-option>
            <el-option label="邮件" value="邮件"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="消息内容" :label-width="formLabelWidth" prop="content">
          <el-input v-model="addForm.content"></el-input>
        </el-form-item>
        <el-form-item label="激活状态" :label-width="formLabelWidth" prop="isactive">
          <el-select v-model="addForm.isactive" placeholder="请选择激活状态">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="saveAddForm('addForm')">确 定</el-button>
          <el-button @click="resetForm('addForm')">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </section>
</template>
<script>
export default {
  props: ["wxmsgData"],
  watch: {
    //每次触发都监听并加载wxmsgData数组
    wxmsgData: {
      immediate: true, //immediate选项可以开启首次赋值监听
      handler(newData, oldData) {
        this.dataModel = newData;
        //methods的函数在这里调用可以获取到newData的值
        this.setModel();
      }
    }
  },
  name: "WxmsgDialog", //这个WxmsgDialog最好和引入的addOrUpdateWXMsg.vue的WxmsgDialog相同
  data() {
    return {
      //表单字段值默认为空
      addForm: {
        id: 1,
        msgtype: "",
        title: "",
        content: "",
        isactive: ""
      },
      //表单验证
      rules: {
        msgtype: [
          { required: true, message: "请选择消息类型", trigger: "change" }
        ],
        title: [
          { required: true, message: "请输入消息标题", trigger: "blur" },
          { min: 5, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入消息内容", trigger: "blur" },
          {
            min: 1,
            max: 500,
            message: "长度在 1 到 500 个字符",
            trigger: "blur"
          }
        ],
        isactive: [
              { required: true, message: "请选择激活状态", trigger: "change" }
          ]
      },
      //文本框宽度
      formLabelWidth: "120px",
      dialogAddgsVisible: true,
      dataModel: {},
      //隐藏infoId
      hideId: false
    };
  },
  mounted() {
    //this.addForm.xzqdm = this.id;
    //this.addForm.id=this.datas.c;
  },
  methods: {
    setModel() {
      this.addForm = this.dataModel;
      console.log(this.dataModel);
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
          this.$message({
            showClose: true,
            message: "操作成功!",
            type: "success"
          });
          this.dialogAddgsVisible = false;
          // this.$router.push({name:'categories'})
          //this.init();
          //});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //表单重置
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      // this.dialogAddgsVisible = false;
      this.addForm = {};
    }
  }
};
</script>