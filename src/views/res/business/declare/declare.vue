<template>
    <div :class="isCreateView ? 'container-create' : ''" style="background: white;">
        <el-form :model="ruleForm" :rules="!disabled? rules : {}" ref="ruleForm" label-width="100px" class="declare-ruleForm">
            <el-form-item v-for="(column, index) in columnOptions" :label="column.label" :prop="column.key" :key="index">

                <el-select v-if="column.options" v-model="ruleForm[column.key]" :disabled="disabled">
                    <el-option v-for="option in column.options" :label="option.content"
                               :value="option.code"></el-option>
                </el-select>

                <el-input v-else-if="['area'].includes(column.key)" v-model.number="ruleForm[column.key]"
                          :placeholder="column.label" :disabled="disabled"></el-input>

                <el-input v-else v-model="ruleForm[column.key]" :placeholder="column.label" :disabled="disabled"></el-input>
            </el-form-item>

            <el-form-item v-if="!disabled">
                <el-button type="primary" @click="submitForm('ruleForm')">{{submitButton}}</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

  import {toDeclare} from "../../../../api/res.business"
  import {declareColumnsFilter} from "../compoments/constant"
  import selectOptions from '../compoments/select-options'

  export default {
    components: {},
    mixins: [
      selectOptions
    ],
    props: {
      item: Object,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      let isCreateView = this.item == null
      let filterKeys = isCreateView ? [] : []//['declareType']
      let declareColumns = declareColumnsFilter(false, filterKeys)

      let form = {}
      if (isCreateView) {
        declareColumns.map(column => {
          form[column.key] = ''
        })
      } else {
        form = this.item
      }
      console.log(isCreateView)
      return {
        isCreateView: isCreateView,
        submitButton: isCreateView ? '立即创建' : "确定修改",
        columnOptions: declareColumns || [],
        ruleForm: form,
        rules: function () {
          let rules = {}
          declareColumns.map(column => {
            let list = [].concat(
              {required: true, message: `请输入${column.label}`, trigger: 'blur'}
            )
            if (column.label == '身份证号') {
              list.push(
                {min: 18, max: 18, message: '18位', trigger: 'blur'}
              )
            } else if (column.label == '联系方式') {
              list.push(
                {min: 11, max: 11, message: '11位', trigger: 'blur'},
              )
            } else if (column.label == '住宅面积') {
              list = [...list,
                {required: true, type: 'number', message: '必须为整数', trigger: 'blur'},
              ]
            }
            rules[column.key] = list
          })
          return rules
        }()
      }
    },
    mounted() {
    },
    created() {
      this.initOption(['项目类型', '户口性质', '是否'])

      //图片配置
      /*getUploadImgConfig({
        stage: '申报阶段'
      }).then(res => {
      }).catch(() =>{
        this.$message({
          message: 'init dict for residenceType',
          type: 'error'
        });
      }).finally(()=>{
        console.log('init dict for residenceType')
      })*/
    },
    watch: {
      item: function (val, old) {
        this.ruleForm = val
      }
    },
    computed: {},
    methods: {
      uploadSuccess(res, file) {

        console.log('uploadSuccess', res, file)

        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeUpload(file) {
        console.log('beforeUpload', file)
        return true
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;
        //
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.ruleForm)
          if (valid) {
            toDeclare(this.ruleForm).then(res => {
              this.$message({
                message: this.isCreateView ? '创建成功' : '修改成功',
                type: 'success'
              })
            }).catch(() => {
              this.$message({
                message: this.isCreateView ? '创建失败' : '修改失败',
                type: 'error'
              })
            }).finally(() => {
              if (this.isCreateView) {
                this.resetForm(formName)
              }

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
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="scss" scoped>

    .container-create {
        padding: 30px;
        background: white;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;

        .declare-ruleForm {
            width: 800px;
            margin: auto;
        }
    }
</style>
