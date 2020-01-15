<template>
  <div>
      <!-- 回显数据，不可编辑 -->
      <el-form
              disabled
              label-position="top"
              :inline="true">
          <h2>申请户主信息</h2>
          <!--        <el-row>-->
          <!--          <el-col :span="3">-->
          <el-form-item label="姓名">
              <el-input v-model="detailData.jcxx.xm" placeholder="姓名"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--          <el-col :span="3">-->
          <el-form-item label="性别">
              <el-input v-model="detailData.jcxx.xb" placeholder="性别"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--          <el-col :span="6">-->
          <el-form-item label="身份证号">
              <el-input v-model="detailData.jcxx.sfzh" placeholder="身份证号"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--          <el-col :span="6">-->
          <el-form-item label="家庭住址">
              <el-input v-model="detailData.jcxx.jtzz" placeholder="家庭住址"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--          <el-col :span="6">-->
          <el-form-item label="申请理由">
              <el-input v-model="detailData.qt.sqly" placeholder="申请理由"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--        </el-row>-->
          <h2>拟批准宅基地及建房情况</h2>
          <!--        <el-row>-->
          <!--          <el-col :span="5">-->
          <el-form-item label="宅基地面积">
              <el-input v-model="detailData.nzjdqk.zjdmj" placeholder="宅基地面积"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--          <el-col :span="5">-->
          <el-form-item label="房基占地面积">
              <el-input v-model="detailData.nzjdqk.fjzdmj" placeholder="房基占地面积"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--          <el-col :span="14">-->
          <el-form-item label="地址">
              <el-input v-model="detailData.nzjdqk.dz" placeholder="地址"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--        </el-row>-->
          <!--        <el-row>-->
          <!--          <el-col :span="6">-->
          <el-form-item label="四至东至">
              <el-input v-model="detailData.nzjdqk.szdz" placeholder="四至东至"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--          <el-col :span="6">-->
          <el-form-item label="四至西至">
              <el-input v-model="detailData.nzjdqk.szxz" placeholder="四至西至"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--          <el-col :span="6">-->
          <el-form-item label="四至北至">
              <el-input v-model="detailData.nzjdqk.szbz" placeholder="四至北至"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--          <el-col :span="6">-->
          <el-form-item label="四至南至">
              <el-input v-model="detailData.nzjdqk.sznz" placeholder="四至南至"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--        </el-row>-->
          <!--        <el-row>-->
          <!--          <el-col :span="5">-->
          <el-form-item label="建房类型">
              <el-select v-model="detailData.nzjdqk.jflx" placeholder="建房类型">
                  <el-option v-for="(option, index) in getDicts('建房类型')" :label="option.optName"
                             :value="option.optCode" :key="index"></el-option>
              </el-select>
          </el-form-item>
          <!--          </el-col>-->
          <!--          <el-col :span="4">-->
          <el-form-item label="地类">
              <el-select v-model="detailData.nzjdqk.dl" placeholder="地类">
                  <el-option v-for="(option, index) in getDicts('地类')" :label="option.optName"
                             :value="option.optCode" :key="index"></el-option>
              </el-select>
          </el-form-item>
          <!--          </el-col>-->
          <!--          <el-col :span="5">-->
          <el-form-item label="住房建筑面积">
              <el-input v-model="detailData.nzjdqk.zfjzmj" placeholder="住房建筑面积"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--          <el-col :span="5">-->
          <el-form-item label="建筑层数">
              <el-input v-model="detailData.nzjdqk.jzcs" placeholder="建筑层数"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--          <el-col :span="5">-->
          <el-form-item label="建筑高度">
              <el-input v-model="detailData.nzjdqk.jzgd" placeholder="建筑高度"></el-input>
          </el-form-item>
          <!--          </el-col>-->
          <!--        </el-row>-->
      </el-form>

      <el-form
              :disabled="disabled"
              :inline="true"
              label-position="top"
              :model="formLabel">
        <h2>理由和意见</h2>
<!--        <el-row>-->
<!--          <el-col :span="14">-->
            <el-form-item label="自然资源部门意见">
              <el-input v-model="formLabel.spyj.zrzybmyj" placeholder="自然资源部门意见"></el-input>
            </el-form-item>
<!--          </el-col>-->
<!--          <el-col :span="5">-->
            <el-form-item label="自然资源部门负责人">
              <el-input v-model="formLabel.spyj.zrzybmfzr" placeholder="自然资源部门负责人"></el-input>
            </el-form-item>
<!--          </el-col>-->
<!--          <el-col :span="5">-->
            <el-form-item label="自然资源部门填写日期">
              <el-date-picker
                v-model="formLabel.spyj.zrzybmrq"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
          <el-form-item label="其他部门意见">
              <el-input v-model="formLabel.spyj.qtbmyj" placeholder="其他部门意见"></el-input>
            </el-form-item>
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="14">-->
            <el-form-item label="农业农村部门审查意见">
              <el-input v-model="formLabel.spyj.nyncbscyj" placeholder="农业农村部门审查意见"></el-input>
            </el-form-item>
<!--          </el-col>-->
<!--          <el-col :span="5">-->
            <el-form-item label="农业农村部门负责人">
              <el-input v-model="formLabel.spyj.nyncbfzr" placeholder="农业农村部门负责人"></el-input>
            </el-form-item>
<!--          </el-col>-->
<!--          <el-col :span="5">-->
            <el-form-item label="农业农村部门填写日期">
              <el-date-picker
                v-model="formLabel.spyj.nyncbrq"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="14">-->
            <el-form-item label="乡镇政府审核批准意见">
              <el-input v-model="formLabel.spyj.xzzfshyj" placeholder="乡镇政府审核批准意见"></el-input>
            </el-form-item>
<!--          </el-col>-->
<!--          <el-col :span="5">-->
            <el-form-item label="乡镇政府负责人">
              <el-input v-model="formLabel.spyj.xzzffzr" placeholder="乡镇政府负责人"></el-input>
            </el-form-item>
<!--          </el-col>-->
<!--          <el-col :span="5">-->
            <el-form-item label="乡镇政府填写日期">
              <el-date-picker
                v-model="formLabel.spyj.xzzfrq"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
<!--          </el-col>-->
<!--        </el-row>-->
          <el-row>
              <el-form-item>
                  <el-button type="primary" @click="submitForm">提交</el-button>
              </el-form-item>
          </el-row>
      </el-form>

  </div>
</template>

<script>
  import dictMixins from '../../../mixnis/dict-mixnis'
  import {submitForm} from '@/api/land.examine'

  export default {
    name: 'approval-form',
    mixins: [
      dictMixins
    ],
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      detail: {
        type: Object,
        default: undefined
      }
    },
    data() {
      return {
        detailData: this.detail,
        formLabel: {
          // //申请户主信息
          // hzxx:{
          //   xm:"",
          //   xb:"",
          //   sfzh:"",
          //   jtzz:"",
          //   sqly:""
          // },
          //拟批准宅基地及建房情况
          // jfqk: {
          //   zjdmj: "",
          //   fjzdmj: "",
          //   dz: "",
          //   szdz: "",
          //   szxz: "",
          //   szbz: "",
          //   sznz: "",
          //   zfjzmj: "",
          //   jzcs: "",
          //   jzgd: ""
          // },

          jflxvalue: '',

          dlvalue: '',
          //意见
          spyj: {
            sqid: this.detail.zjdSqJl.sqid,
            zrzybmyj: "",
            zrzybmfzr: "",
            zrzybmrq: "",
            qtbmyj: "",
            nyncbscyj: "",
            nyncbfzr: "",
            nyncbrq: "",
            xzzfshyj: "",
            xzzffzr: "",
            xzzfrq: ""
          }
        }
      }
    },
    created() {
      if (this.detail) {
        this.formLabel.spyj = JSON.parse(JSON.stringify(this.detail.qt))
      }
    },
    methods: {
      submitForm() {
        submitForm(this.formLabel.spyj).then(res => {
          console.log(1)
          console.log(res)
        })
      }
    }
  }
</script>

<style>

</style>
