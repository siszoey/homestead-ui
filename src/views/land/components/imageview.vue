<template>
  <div class="wrapper">
    <ul class="el-upload-list el-upload-list--picture-card">
      <li v-for="item in nodeImages" :key="item.fileid" class="el-upload-list__item is-success">
        <el-image :src="item.filepath" ></el-image>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePreview(item)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleDownload(item)">
            <i class="el-icon-download"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(item)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </li>
      <li v-if="!readonly && configId" class="el-upload-list__item" style="border:none">
        <el-upload
          class="upload-demo"
          :action="backEndUrl+'/api/management/uploadimage'"
          :data="{xmbh:xmbh,configid:configId}"
          :on-success="afterUploadSucess"
          :show-file-list="false"
          list-type="picture-card"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
      </li>
    </ul>
    <el-image-viewer v-if="showViewer" :on-close="()=>{showViewer = false}" :url-list="priviewImageList"></el-image-viewer>
    <el-image v-if="(!configId && !(imageList.length>0)) || (configId && !(imageList.length>0) && readonly)" src="/image/common/nodata.jpg" fit="fit"></el-image>
    <!-- <el-upload 
                    class="upload-demo"
                    :action="backEndUrl+'/management/uploadimage'"
                    :data="{xmbh:xmbh,configid:configId}"
                    :file-list="nodeImages"
                    :on-success="afterUploadSucess"
                    list-type="picture-card">
                     <el-button v-if="configId" size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    <div slot="file" slot-scope="{file}">
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.filepath" alt=""
                        >
                        <span class="el-upload-list__item-actions">
                            <span
                            class="el-upload-list__item-preview"
                            @click="handlePreview(file)"
                            >
                            <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                            class="el-upload-list__item-delete"
                            @click="handleDownload(file)"
                            >
                            <i class="el-icon-download"></i>
                            </span>
                            <span
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file)"
                            >
                            <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
    </el-upload>-->
  </div>
</template>
<script>
import request from "@/plugin/axios";
import { normalize } from "path";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  components: {
    ElImageViewer
  },
  props: {
    configId: String,
    xmbh: String,
    imageList: Array,
    readonly:{default: false, type: Boolean}
  },
  data() {
    return {
      backEndUrl: process.env.VUE_APP_END_URL,
      showViewer: false,
      priviewImageList: []
    };
  },
  computed: {
    nodeImages() {
      if (this.imageList.length > 0) {
        return this.imageList.map(t => {
          let n = t;
          if (t.filepath && t.filepath.length > 0) {
            // let name = t.filepath.split("\\")
            if (t.filepath.indexOf(this.backEndUrl) < 0) {
              let url = this.backEndUrl + t.filepath.replace(/\\/g, "/");
              n.filepath = url;
            }
            return n;
          }
        });
      }
      return [];
    }
  },
  methods: {
    handleRemove(file) {
      this.$confirm("确定要删除该图片吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.deleteImage(file.fileid);
      });
    },
    handlePreview(file) {
      // console.log(file);
       if (this.nodeImages.length > 0) {
            let imageList =  this.nodeImages.map(t => t.filepath)
            let index = imageList.findIndex(t => t === file.filepath);
            let frontItems = imageList.splice(0,index)
            // frontItems.reverse()
            this.priviewImageList = imageList.concat(frontItems)
      }
      this.showViewer = true
    },
    handleDownload(file) {
      try {
        let filepath = file.filepath;
        let name = filepath.substr(filepath.lastIndexOf("/") + 1);
        this.downloadIamge(filepath, name);
      } catch (err) {
        // console.log(err);
        this.$message({
          type: "error",
          message: "图片下载失败"
        });
      }
    },
    afterUploadSucess(response, file, fileList) {
      // console.log(response)
      // this.imageList.push(response.data);
      this.imageList.push(response.result);
    },
    downloadIamge(imgsrc, name) {
      // 下载图片地址和图片名
      let suffix = "jpeg";
      name = name || "image";
      let index = name.lastIndexOf(".");
      if (index >= 0) {
        suffix = name.substr(index + 1);
      }
      let image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        let a = document.createElement("a"); // 生成一个a元素
        let event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
    },
    deleteImage(fileid) {
      return request
        .delete(`/management/image/${fileid}`)
        .then(res => {
          // console.log("删除图像",res,fileid)
         
            //  let target=this.imageList.filter(t=>{return t.fileid!==fileid})
            //  console.log(target)
            //  this.imageList = target
          this.$emit("delete-image", fileid);
        });
    },
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  padding: 10px;
  .el-image {
    width: 100%;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .upload-file {
    width: 100%;
    min-height: 500px;
    // max-height: 600px;
    ::v-deep .el-upload,
    ::v-deep .el-upload-dragger {
      width: 100%;
    }
    ::v-deep .el-upload-dragger {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>