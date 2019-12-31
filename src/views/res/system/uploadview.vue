<template>
  <div>
    <file-tree class="file-tree" :filesdata="filesdata" :showCheckBox="false" :editable="true" @add-config="addConfig"></file-tree>
  </div>
</template>

<script>
import request from '@/plugin/axios'
import FileTree from "../components/filetree.vue"
export default {
  components: {
    FileTree
  },
  data () {
    return {
      filesdata:[],
      stage: ""
    }
  },
  created () {
    this.getImageConfigs()
  },
  methods: {
    // get image config datas
    getImageConfigs () {
        request.get("system/imageconfigs",
        {
            params: {
                stage: this.stage
            }
        }).then(res=>{
            // console.log(res)
            if(res){
                this.filesdata = res
            }
        }).catch(()=>{

        })
    },
    addConfig () {
      this.getImageConfigs()
    }
  }
}
</script>

<style lang="scss" scoped>
 .file-tree {
    //  margin: 20px;
     padding: 15px;
     background-color: #fff;
 }
</style>