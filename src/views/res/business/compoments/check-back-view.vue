<template>
    <!-- 审核 弹框 -->
    <el-dialog :title="stage.content"
               :visible.sync="visible"
               :before-close="close"
               width="600px">
        <el-form :model="checkForm" :rules="checkRules" ref="checkForm" label-width="100px">

            <el-form-item label="回退原因" prop="opinion">
                <el-input type="textarea" v-model="checkForm.opinion" maxlength="300" show-word-limit></el-input>
            </el-form-item>

            <el-form-item label="回退阶段" prop="stage">
                <el-select v-model="checkForm.stage" placeholder="请选择">
                    <el-option v-for="option in stageOptions" :label="option.content" :value="option.code"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="toComplete('checkForm', false)">回 退</el-button>
            <el-button type="primary" @click="close">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import {mapState} from 'vuex'
  import {toCheckBackOpinion} from "../../../../api/res.business"
  import selectOptions from './select-options'

  export default {
    name: 'check-back-view',
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
    },
    data() {
      return {
        restart: true,
        stageOptions: [],
        checkForm: {
          opinion: '',
          stage: ''
        },
        checkRules: {
          opinion: [
            {required: true, message: `请输入审核意见`, trigger: 'blur'}
          ],
          stage: [
            {required: true, message: `请选择回退阶段`, trigger: 'blur'}
          ]
        },
      }
    },
    created() {
      // 只显示当前阶段之前的阶段
      let optionCodes = []
      switch (this.stage.content) {
        case '街道审核':
          optionCodes = [...[], '项目申报']
          break
        case '退办件':
          optionCodes = [...[], '项目申报', '街道审核']
          break
        default:
          break
      }
      let stages = this.getOptions('项目阶段')
      this.stageOptions = stages.filter(s => optionCodes.includes(s.content))
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
                message: '回退成功',
                type: 'success'
              })
            }).catch(() => {
              this.$message({
                message: '回退失败',
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
    }
  }
</script>

<style scoped>

</style>
