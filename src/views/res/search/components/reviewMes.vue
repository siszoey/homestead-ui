<template>
  <div style="height:30vh;">
    <el-steps direction="vertical" :active="1">
      <el-step v-for="(item,index) in reviewData" :title='item.frontstage' :description='item.opinion' :key="index"></el-step>
    </el-steps>
  </div>
</template>

<script>
import {filesSearch} from "../../../../api/res.filesSearch"
export default {
  props:{
    xmsbid:String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      reviewData:[]
    }
  },
  created(){
    // console.log(this.xmsbid)
    this.getReview()
  },
  methods:{
    getReview() {
      filesSearch(this.xmsbid).then(res => {
        // console.log(res)
        this.reviewData = res
      })
    },
  }
}
</script>

<style>

</style>