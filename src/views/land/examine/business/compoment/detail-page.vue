<template>
    <d2-container>
        <el-steps :space="200" :active="active" finish-status="success">
            <el-step title="已完成"></el-step>
            <el-step title="进行中"></el-step>
            <el-step title="步骤 3"></el-step>
        </el-steps>
        <el-divider></el-divider>
        <el-tabs tab-position="left">
            <el-tab-pane label="申请表">
                <applicationForm></applicationForm>
            </el-tab-pane>
            <el-tab-pane label="审批表">
                <approvalForm></approvalForm>
            </el-tab-pane>
            <el-tab-pane label="验收表">
                <appceptanceForm></appceptanceForm>
            </el-tab-pane>
            <el-tab-pane label="打印表单">定时任务补偿</el-tab-pane>
            <el-tab-pane label="材料表单">定时任务补偿</el-tab-pane>
        </el-tabs>
    </d2-container>
</template>

<script>
  import applicationForm from './application-form'
  import appceptanceForm from './appceptance-form'
  import approvalForm from './approval-form'

  export default {
    name: 'todo-create',
    components: {
      applicationForm,
      approvalForm,
      appceptanceForm
    },
    data() {
      return {
        active: 2,
      }
    },
    methods: {}
  }
</script>

<style>

</style>
