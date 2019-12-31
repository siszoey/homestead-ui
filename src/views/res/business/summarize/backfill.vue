<template>
    <el-dialog title="审核信息回填"
               :visible.sync="visible"
               :before-close="close"
               width="600px">
        <el-form :model="backfillForm" :rules="backfillRules" ref="backfillForm" label-width="120px">

            <el-form-item label="实测宅基地面积" prop="sczjdmj">
                <el-input v-model="backfillForm.sczjdmj" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="审批批次" prop="sppc">
                <el-input v-model="backfillForm.sppc" auto-complete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="close">取 消</el-button>
            <el-button type="primary" @click.native="addSubmit('backfillForm')">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import {mapState} from 'vuex'
  import {tobackfill} from "../../../../api/res.business"

  export default {
    name: 'backfill',
    mixins: [

    ],
    props: {
      stage: String,
      itemId: String,
      item:{},
      visible: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        restart: true,
        stageOptions: [],
        backfillForm: {
          sczjdmj: '',
          sppc: ''
        },
        backfillRules: {
          sczjdmj: [
            {required: true, message: `请输入实测宅基地面积`, trigger: 'blur'}
          ],
          sppc: [
            {required: true, message: `请选择审批批次`, trigger: 'blur'}
          ]
        },
      }
    },
    created(){
     console.log(101010)
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
        //直接调用更改.sync
        this.$emit('update:visible', false)
      },
      addSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.backfillForm.xmsbid=this.itemId
            this.item.sczjdmj=this.backfillForm.sczjdmj
            this.item.sppc=this.backfillForm.sppc
            this.backfillForm=this.item
            this.item.stage = parseInt(this.stage) + 1 + ''
            tobackfill(this.backfillForm).then(() => {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
            }).catch(() => {
              this.$message({
                message: '保存失败',
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
