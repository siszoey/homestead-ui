<template>
    <!-- 审核 弹框 -->
    <el-dialog :title="stage.content"
               :visible.sync="visible"
               :before-close="close"
               width="600px">
        <el-form :model="checkForm" :rules="checkRules" ref="checkForm" label-width="100px">

            <span style="font-size: 20px">{{content}}</span>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="success" @click="toComplete('checkForm', true)" >{{toEndFlag? '通 过' : '确 定'}}</el-button>
            <el-button type="danger" v-if="toEndFlag" @click="toEnd('checkForm')" >不通过</el-button>
            <el-button type="primary" @click="close" >取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import {mapState} from 'vuex'
  import {toCheckBackOpinion} from "../../../../api/res.business"
  import selectOptions from './select-options'

  export default {
    name: 'check-next-view',
    mixins: [
      selectOptions
    ],
    props: {
      stage: Object,
      itemId: String,
      visible: {
        type: Boolean,
        default: false
      },
      content: {
        type: String,
        default: '通过审核，进入下个阶段？'
      },
      toEndFlag: {
        type:Boolean,
        default: false
      }
    },
    data() {
      return {
        restart: true,
        checkForm: {
          stage: ''
        },
        checkRules: {
        },
      }
    },
    created(){
      let nextStageCode = Number.parseInt(this.stage.code) + 1
      let nextStage = this.getOption('项目阶段', nextStageCode)
      this.checkForm.stage = nextStage.code
    },
    computed: {
      ...mapState('d2admin/user', [
        'info'
      ])
    },
    methods: {
      refreshTable() {
        this.$emit('refresh')
      },
      close() {
        // el-dialog的关闭前调用，参考https://www.cnblogs.com/yeqrblog/p/9141701.html
        //直接调用更改.sync
        this.$emit('update:visible', false)
      },
      toComplete(formName, passFlag) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            toCheckBackOpinion(passFlag, this.itemId, this.info.name, this.checkForm).then(() => {
              this.$message({
                message: '成功',
                type: 'success'
              })
            }).catch(() => {
              this.$message({
                message: '失败',
                type: 'error'
              })
            }).finally(() => {
              this.close()
              this.refreshTable()
            })
          } else {
            this.$message({
              message: '请按要求填写',
              type: 'warning'
            })
            return false
          }
        })
      },
      toEnd(){
        let unPassStage = this.getOptionByContent('项目阶段', '未通过')
        toCheckBackOpinion(false, this.itemId, this.info.name, {
          stage: unPassStage.code,
          opinion: `[${this.stage.content}]不通过，归档`
        }).then(() => {
          this.$message({
            message: '归档成功',
            type: 'success'
          })
        }).catch(() => {
          this.$message({
            message: '归档失败',
            type: 'error'
          })
        }).finally(() => {
          this.close()
          this.refreshTable()
        })
      }
    }
  }
</script>

<style scoped>

</style>
