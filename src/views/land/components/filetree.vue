<template>
<div>
  <el-tree
    ref="files"
    :highlight-current="true"
    :data="filesdata"
    :show-checkbox="showCheckBox"
    node-key="imageconfigid"
    :props="defaultOptions"
    default-expand-all
    :expand-on-click-node="false"
    :default-checked-keys="checkedItems"
    @current-change="handleNodeClick"
  >
    <div class="custom-tree-node" slot-scope="{ node, data }">
      <span :class="{'label-weight':(!node.isLeaf)}">{{ node.label }}</span>
      <span v-if="data.needupload==1">
        <i class="el-icon-upload" style="color:red" title="该文件必须上传"></i>
      </span>
      <span v-if="editable">
        <span v-if="!node.isLeaf">
          <el-button
            type="success"
            size="mini"
            circle
            @click.native="showAddDlg(node,data)"
          >
            <i class="el-icon-plus"></i>
          </el-button>
        </span>
        <span v-else>
          <!-- <i " class="el-icon-delete"></i> -->
          <el-button type="text" size="mini" circle @click.native="removeConfig(node,data)">
            <i class="el-icon-delete"></i>
          </el-button>
        </span>
      </span>
     
    </div>
  </el-tree>
   <el-dialog title="新增图片配置" :visible.sync="addDlgVisible" width="5rem">
        <el-form ref="configForm" :model="imageconfig" :rules="rules" label-width="1rem">
          <el-form-item label="材料名称">
            <el-input size="small" v-model="imageconfig.imagetype"></el-input>
          </el-form-item>
          <el-form-item label="阶段">
            <el-select size="small" v-model="imageconfig.xmjd">
              <el-option
                v-for="item in stages"
                :key="item.code"
                :label="item.value"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="材料分类" prop="imagegroup">
            <el-input size="small" v-model="imageconfig.imagegroup"></el-input>
          </el-form-item>
          <el-form-item label="是否必传">
            <el-select size="small" v-model="imageconfig.needupload">
              <el-option value="1" label="是"></el-option>
              <el-option value="0" label="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入描述"
              v-model="imageconfig.description"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="addDlgVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="addConfig('configForm')">确 定</el-button>
        </span>
      </el-dialog>
</div>
</template>
<script>
import { log } from "util";
import request from "@/plugin/axios";
export default {
  props: {
    // stage:{default:"",type:String},
    editable: { default: false, type: Boolean },
    showCheckBox: { default: true, type: Boolean },
    filesdata: Array
    // currentNode: {}
  },
  data() {
    return {
      // filesdata:[],
      imageconfig: {
        imagetype: "",
        description: "",
        needupload: "0",
        xmjd: "",
        imagegroup: ""
      },
       rules: {
          imagegroup: [
            { required: true, message: '请输入材料分类名称', trigger: 'blur' }
          ]
      },
      // stages:[],
      addDlgVisible: false,
      defaultOptions: {
        label: "imagetype",
        children: "files",
        disabled: ()=>{return true}
      }
    };
  },
  computed: {
    stages() {
      if (this.filesdata) {
        return this.filesdata.map(t => {
          return { code: t.imagetypecode, value: t.imagetype };
        });
      } else {
        return [];
      }
    },
    checkedItems() {
      if (this.showCheckBox && this.filesdata) {
        let files = this.filesdata
          .map(t => t.files)
          .reduce((f, s) => [...f, ...s], [])
          .map(t => t.files)
          .reduce((f, s) => [...f, ...s], [])
          .map(k => {
            if (k.images && k.images.length > 0) {
              return k.imageconfigid;
            }
          });
        //  console.log("files",files)
        return files;
      } else {
        return [];
      }
    }
  },
  created() {
    // this.getImageConfigs()
    // this.filesdata = [{
    //     imagetypecode: 1,
    //     imagetype: "申报阶段",
    //     files:[{
    //         imageconfigid:"1",
    //         imagetype:"身份证正面",
    //         description:"",
    //         needupload:"1",
    //         imagetypeid:""
    //     }]
    // }]
  },
  methods: {
    // // get image config datas
    // getImageConfigs () {
    //     request.get("system/imageconfigs",
    //     {
    //         params: {
    //             stage: this.stage
    //         }
    //     }).then(res=>{
    //         console.log(res)
    //         if(res){
    //             this.filesdata = res.data
    //             this.stages = res.data.map(t=>{
    //                 return {code:t.imagetypecode,value:t.imagetype}
    //             })
    //         }

    //     }).catch(()=>{

    //     })
    // },
    deleteConfig(id) {
      return request
        .delete(`system/imageconfig/${id}`)
        .then(res => {
          this.$message({
            type: "info",
            message: "删除成功"
          });
        });
    },
    showAddDlg(node,data) {
      // console.log(node,data)
      this.addDlgVisible = true;
      let stage = data.imagetypecode
      if(stage){
        this.imageconfig.xmjd = stage;
        this.imageconfig.imagegroup = ""
      }
      else {
        this.imageconfig.xmjd = node.parent.data.imagetypecode
        this.imageconfig.imagegroup = data.imagetype
      }
    },
    addConfig(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.put("/system/config", this.imageconfig).then(res => {
              // this.getImageConfigs()
              this.$emit("add-config");
              this.addDlgVisible = false;
            });
          } else {
            return false;
          }
        });
    },
    removeConfig(node, data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteConfig(data.imageconfigid)
            .then(() => {
              const parent = node.parent;
              const children = parent.data.files || parent.files;
              const index = children.findIndex(
                d => d.imageconfigid === data.imageconfigid
              );
              children.splice(index, 1);
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    handleNodeClick(data, node, store) {
      // console.log(data,node,store)
      this.$emit("file-selected", data, node);
    }
  }
};
</script>
<style lang="scss" scoped>
.label-weight {
  font-weight: bold;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
::v-deep .el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner {
    background-color: #409EFF;
    border-color: #409EFF;
}
::v-deep .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409EFF;
    border-color: #409EFF;
}
</style>