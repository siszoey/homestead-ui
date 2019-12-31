<template>
  <section>
    <el-container>
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="id" :label-width="formLabelWidth" v-if="hideId">
          <el-input v-model="addForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="信息类型" :label-width="formLabelWidth" prop="infotype">
          <el-select v-model="addForm.infotype" placeholder="请选择信息类型">
            <el-option label="政策法规" value="政策法规"></el-option>
            <el-option label="上级信息" value="上级信息"></el-option>
            <el-option label="巡查信息" value="巡查信息"></el-option>
            <el-option label="建房管理群" value="建房管理群"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行政区代码" :label-width="formLabelWidth" prop="xzqdm">
          <el-input v-model="addForm.xzqdm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="信息标题" :label-width="formLabelWidth" prop="infotitle">
          <el-input v-model="addForm.infotitle"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="formLabelWidth" prop="fbsj">
          <el-date-picker
            v-model="addForm.fbsj"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="信息内容" :label-width="formLabelWidth" prop="infocontent">
          <!-- <el-input v-model="addForm.infocontent"></el-input> -->
          <el-card style="height: 610px;">
            <!-- <quill-editor
              v-model="addForm.infocontent"
              ref="myQuillEditor"
              style="height: 500px;"
              :options="editorOption"
            ></quill-editor>-->
            <quill-editor
              v-model="addForm.infocontent"
              ref="myQuillEditor"
              style="height: 500px;"
              :options="editorOption"
            >
              <!-- 自定义toolar -->
              <div id="toolbar" slot="toolbar">
                <!-- Add a bold button -->
                <button class="ql-bold" title="加粗">Bold</button>
                <button class="ql-italic" title="斜体">Italic</button>
                <button class="ql-underline" title="下划线">underline</button>
                <button class="ql-strike" title="删除线">strike</button>
                <button class="ql-blockquote" title="引用"></button>
                <button class="ql-code-block" title="代码"></button>
                <button class="ql-header" value="1" title="标题1"></button>
                <button class="ql-header" value="2" title="标题2"></button>
                <!--Add list -->
                <button class="ql-list" value="ordered" title="有序列表"></button>
                <button class="ql-list" value="bullet" title="无序列表"></button>
                <!-- Add font size dropdown -->
                <select class="ql-header" title="段落格式">
                  <option selected>段落</option>
                  <option value="1">标题1</option>
                  <option value="2">标题2</option>
                  <option value="3">标题3</option>
                  <option value="4">标题4</option>
                  <option value="5">标题5</option>
                  <option value="6">标题6</option>
                </select>
                <select class="ql-size" title="字体大小">
                  <option value="10px">10px</option>
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="16px" selected>16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                </select>
                <select class="ql-font" title="字体">
                  <option value="SimSun">宋体</option>
                  <option value="SimHei">黑体</option>
                  <option value="Microsoft-YaHei">微软雅黑</option>
                  <option value="KaiTi">楷体</option>
                  <option value="FangSong">仿宋</option>
                  <option value="Arial">Arial</option>
                </select>
                <!-- Add subscript and superscript buttons -->
                <select class="ql-color" value="color" title="字体颜色"></select>
                <select class="ql-background" value="background" title="背景颜色"></select>
                <select class="ql-align" value="align" title="对齐"></select>
                <button class="ql-clean" title="还原"></button>
                <!-- You can also add your own -->
              </div>
            </quill-editor>
          </el-card>
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
import { Quill, quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
//引入font.css
import "../../../assets/style/editor/font.css";

// 自定义字体大小
let Size = Quill.import("attributors/style/size");
Size.whitelist = ["10px", "12px", "14px", "16px", "18px", "20px"];
Quill.register(Size, true);

// 自定义字体类型
var fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif",
  "宋体",
  "黑体"
];
var Font = Quill.import("formats/font");
Font.whitelist = fonts;
Quill.register(Font, true);

export default {
  name: "FuncFormsEdit",
  components: {
    quillEditor
  },
  props: ["publishData"],
  watch: {
    //每次触发都监听并加载publishData数组
    publishData: {
      immediate: true, //immediate选项可以开启首次赋值监听
      handler(newData, oldData) {
        this.dataModel = newData;
        //methods的函数在这里调用可以获取到newData的值
        this.setModel();
      }
    }
  },
  name: "PublishPage", //这个publishPage最好和引入的publish-page.vue的publishPage相同
  data() {
    return {
      infocontent: null,
      editorOption: {
        placeholder: "请输入",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: "#toolbar"
          }
        }
      },
      //表单字段值默认为空
      addForm: {
        id: 1,
        xzqdm: "",
        infotype: "",
        infotitle: "",
        fbsj: "",
        readcount: "",
        infocontent: ""
      },
      //表单验证
      rules: {
        xzqdm: [
          { required: true, message: "请输入行政区块代码", trigger: "blur" },
          { min: 12, max: 12, message: "长度为12个字符", trigger: "blur" }
        ],
        infotype: [
          { required: true, message: "请选择信息类型", trigger: "change" }
        ],
        infotitle: [
          { required: true, message: "请输入信息标题", trigger: "blur" },
          { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
        ],
        fbsj: [
          {
            type: "string", //校验规则 【type: 'date'】改为【type: 'string'】,否则elementUI自带的格式转换后会将绑定值转为字符串，而校验规则中的【type: 'date'】已经不匹配，至于它的报错是因为转换为字符串，不是date对象所以没有getTime这个方法了,并且el-date-picker时间控件里加上：value-format="yyyy-MM-dd"
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        infocontent: [
          { required: true, message: "请输入信息内容", trigger: "blur" },
          {
            min: 1,
            max: 500,
            message: "长度在 1 到 500 个字符",
            trigger: "blur"
          }
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
      var content = this.$refs.myQuillEditor.quill;
      console.log(content);
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