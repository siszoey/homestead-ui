<template>
    <d2-container>
        <el-steps :active="active" finish-status="success" align-center>
            <el-step v-for="option in getDicts('项目状态')" :description="option.optName"></el-step>
        </el-steps>
        <el-divider></el-divider>
        <el-tabs tab-position="left">
            <el-tab-pane label="申请表">
                <applicationForm :disabled="applicationFormDisabled" :detail="detail"></applicationForm>
            </el-tab-pane>
            <el-tab-pane label="审批表" v-if="detail">
                <approvalForm :disabled="appceptanceFormDisabled" :detail="detail"></approvalForm>
            </el-tab-pane>
            <el-tab-pane label="验收表" v-if="detail">
                <appceptanceForm :disabled="approvalFormDisabled" :detail="detail"></appceptanceForm>
            </el-tab-pane>
            <el-tab-pane label="打印表单" v-if="detail">定时任务补偿</el-tab-pane>
            <el-tab-pane label="材料表单">
              <file-tree-view :key="xmbh" :xmbh="xmbh" :stage="stage"></file-tree-view>
            </el-tab-pane>
        </el-tabs>
    </d2-container>
</template>

<script>
  import dictMixins from '../../../mixnis/dict-mixnis'
  import applicationForm from './application-form'
  import appceptanceForm from './appceptance-form'
  import approvalForm from './approval-form'
  import FileTreeView from '../../../components/filetreeview.vue'
  import {LastProcess} from "../../../../../api/land.business"

  export default {
    name: 'detail-page',
    components: {
      applicationForm,
      approvalForm,
      appceptanceForm,
      FileTreeView
    },
    mixins: [
      dictMixins
    ],
    props:{
      applicationFormDisabled: {
        type: Boolean,
        default: false
      },
      appceptanceFormDisabled: {
        type: Boolean,
        default: false
      },
      approvalFormDisabled: {
        type: Boolean,
        default: false
      },
      detail: {
        type: Object,
        default: undefined
      }
    },
    created(){
      //console.log(this.detail)
      if(this.detail){
        this.xmbh=this.detail.zjdSqJl.sqid
        this.stage=this.detail.zjdSqJl.xmzt
      }
      this.getLastXMZT();
    },
    data() {
      return {
        active: 2,
        xmbh: "",
        stage: ""
      }
    },

    methods: {
      getLastXMZT(){
        let currentXMZTCode = this.detail == undefined ? 1 : this.detail.zjdSqJl.xmzt
        this.active = currentXMZTCode - 1
        /*if(currentXMZTCode){
          LastProcess(currentXMZTCode).then(()=>{

          }).catch(()=>{

          })
        }*/

      }
    }
  }
</script>

<style>

</style>
