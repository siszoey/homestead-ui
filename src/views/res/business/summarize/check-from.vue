<template>
    <!-- 审核 弹框 -->
    <el-dialog 
               :visible.sync="visible"
               :before-close="close"
               width="600px">
        <el-form :model="checkForm" :rules="checkRules" ref="checkForm" label-width="100px">

            <el-form-item label="审核结果" prop="opinion">
                <el-input type="textarea" v-model="checkForm.opinion" maxlength="300" show-word-limit></el-input>
            </el-form-item>

            <el-form-item label="回退阶段" prop="stage" style="display:none;">
                <el-select v-model="checkForm.stage" placeholder="请选择">
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="toComplete('checkForm', true)">通过</el-button>
            <el-button type="primary" @click="toComplete('checkForm', false)">不通过</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import {mapState} from 'vuex'
  import {toCheckBackOpinion} from "../../../../api/res.business"

  export default {
    name: 'check-from',
    mixins: [
      //selectOptions
    ],
    props: {
      stage: String,
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
          opinion: ''
          //stage: ''
        },
        checkRules: {
          opinion: [
            {required: true, message: `请输入审核意见`, trigger: 'blur'}
          ]
        },
      }
    },
    created(){

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
        if(passFlag=="true"){
            this.checkForm.stage='3'//建房监管
            }
            else{
                this.checkForm.stage='4'//退办件
        }
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
