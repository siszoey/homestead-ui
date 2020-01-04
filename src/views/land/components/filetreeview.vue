<template>
  <div class="wrapper">
    <file-tree
      class="file-tree"
      :filesdata="files"
      :editable="false"
      @file-selected="handleFileSelected"
    ></file-tree>
    <image-view class="image-view"
     :xmbh="xmbh" 
     :configId="configId" 
     :imageList="nodeImages"
     :readonly="readonly"
     @delete-image="handleDeleteImage"
     >
     </image-view>
  </div>
</template>

<script>
import request from "@/plugin/axios";
import FileTree from "../components/filetree.vue";
import ImageView from "../components/imageview.vue";
export default {
  components: {
    FileTree,
    ImageView
  },
  props: {
    xmbh: { default: "20191211165945104", type: String },
    stage: { default: "", type: String },
    readonly: {default: false, type: Boolean}
  },
  data() {
    return {
      configId: "",
      files: [],
      nodeImages: [],
      currentNode:{}
    };
  },
  created() {
    this.getUploadedImages(). then(()=>{
      if (this.files && this.files.length > 0) {
              this.nodeImages = this.files
                .map(t => t.files)
                .reduce((f, s) => [...f, ...s], [])
                .map(t => t.files)
                 .reduce((f, s) => [...f, ...s], [])
                .map(k => k.images)
                .reduce((f, s) => [...f, ...s], []);
            //console.log(this.nodeImages)
        }
    });
  },
  methods: {
    handleFileSelected(data, node) {
      this.currentNode = node
      // if contains property "imagetypecode",the node is a root-node
      if (data.imagetypecode) {//第一級
        this.configId = "";
        this.nodeImages =
          data.files && data.files.length > 0
            ? data.files.map(k => k.files).reduce((f, s) => [...f, ...s], []).map(k => k.images).reduce((f, s) => [...f, ...s], [])
            : [];
      } else if (data.files) {//第二级
          this.configId = "";
          this.nodeImages =
          data.files && data.files.length > 0
            ? data.files.map(k => k.images).reduce((f, s) => [...f, ...s], [])
            : [];
      }else {
        this.configId = data.imageconfigid;
        this.nodeImages = data.images;
      }
    },
    getUploadedImages() {
     return request
        .get("management/uploadedimages", {
          params: {
            xmbh: this.xmbh,
            stage: this.stage
          }
        })
        .then(res => {
          //  console.log(res);
          if (res) {
            this.files = res;
          }
        });
    },
    handleDeleteImage (fileid) {
      this.nodeImages = this.nodeImages.filter(t=>t.fileid!==fileid)
      this.getUploadedImages()
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .image-view {
    flex: 1;
  }
  .file-tree {
    padding: 15px;
    max-width: 300px;
    background-color: #fff;
  }
}
</style>