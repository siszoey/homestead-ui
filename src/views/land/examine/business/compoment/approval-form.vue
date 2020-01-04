<template>
  <div>
      <h1>申请户主信息</h1>
      <el-form :label-position="labelPosition" :model="formLabel">
        <el-row>
          <el-col :span="3">
            <el-form-item label="姓名">
              <el-input v-model="formLabel.hzxx.xm" placeholder="姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="性别">
              <el-input v-model="formLabel.hzxx.xb" placeholder="性别"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证号">
              <el-input v-model="formLabel.hzxx.sfzh" placeholder="身份证号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="家庭住址">
              <el-input v-model="formLabel.hzxx.jtzz" placeholder="家庭住址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请理由">
              <el-input v-model="formLabel.hzxx.sqly" placeholder="申请理由"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h1>拟批准宅基地及建房情况</h1>
        <el-row>
          <el-col :span="5">
            <el-form-item label="宅基地面积">
              <el-input v-model="formLabel.jfqk.zjdmj" placeholder="宅基地面积"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="房基占地面积">
              <el-input v-model="formLabel.jfqk.fjzdmj" placeholder="房基占地面积"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="地址">
              <el-input v-model="formLabel.jfqk.dz" placeholder="地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="四至东至">
              <el-input v-model="formLabel.jfqk.szdz" placeholder="四至东至"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="四至西至">
              <el-input v-model="formLabel.jfqk.szxz" placeholder="四至西至"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="四至北至">
              <el-input v-model="formLabel.jfqk.szbz" placeholder="四至北至"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="四至南至">
              <el-input v-model="formLabel.jfqk.sznz" placeholder="四至南至"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <label class="el-form-item__label">建房类型</label>
            <div>
              <el-select v-model="formLabel.jflxvalue" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in formLabel.jflxoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>           
          </el-col>
          <el-col :span="4">
            <label class="el-form-item__label">地类</label>
            <div>
              <el-select v-model="formLabel.dlvalue" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in formLabel.dloptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>           
          </el-col>
          <el-col :span="5">
            <el-form-item label="住房建筑面积">
              <el-input v-model="formLabel.jfqk.zfjzmj" placeholder="住房建筑面积"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="建筑层数">
              <el-input v-model="formLabel.jfqk.jzcs" placeholder="建筑层数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="建筑高度">
              <el-input v-model="formLabel.jfqk.jzgd" placeholder="建筑高度"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h1>理由和意见</h1>
        <el-row>
          <el-col :span="14">
            <el-form-item label="自然资源部门意见">
              <el-input v-model="formLabel.spyj.zrzybmyj" placeholder="自然资源部门意见"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="自然资源部门负责人">
              <el-input v-model="formLabel.spyj.zrzybmfzr" placeholder="自然资源部门负责人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="自然资源部门填写日期">
              <el-date-picker
                v-model="formLabel.spyj.zrzybmrq"
                type="date"
                placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="其他部门意见">
              <el-input v-model="formLabel.spyj.qtbmyj" placeholder="其他部门意见"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="农业农村部门审查意见">
              <el-input v-model="formLabel.spyj.nyncbscyj" placeholder="农业农村部门审查意见"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="农业农村部门负责人">
              <el-input v-model="formLabel.spyj.nyncbfzr" placeholder="农业农村部门负责人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="农业农村部门填写日期">
              <el-date-picker
                v-model="formLabel.spyj.nyncbrq"
                type="date"
                placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="乡镇政府审核批准意见">
              <el-input v-model="formLabel.spyj.xzzfshyj" placeholder="乡镇政府审核批准意见"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="乡镇政府负责人">
              <el-input v-model="formLabel.spyj.xzzffzr" placeholder="乡镇政府负责人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="乡镇政府填写日期">
              <el-date-picker
                v-model="formLabel.spyj.xzzfrq"
                type="date"
                placeholder="选择日期" style="width:100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>  
      </el-form>
      <el-button type="primary" @click="submitForm()">提交</el-button>
  </div>
</template>

<script>
import {submitForm} from '@/api/land.examine'
export default {
    name:'appceptance-form',
     data() {
      return {
        labelPosition: 'top',
        formLabel:{
          //申请户主信息
          hzxx:{
            xm:"",
            xb:"",
            sfzh:"",
            jtzz:"",
            sqly:""
          },
          //拟批准宅基地及建房情况
          jfqk:{
            zjdmj:"",
            fjzdmj:"",
            dz:"",
            szdz:"",
            szxz:"",
            szbz:"",
            sznz:"",
            zfjzmj:"",
            jzcs:"",
            jzgd:""
          },
          jflxoptions: [{
            value: '选项1',
            label: '原址翻建'
          }, {
            value: '选项2',
            label: '改扩建'
          }, {
            value: '选项3',
            label: '异址新建'
          }],
          jflxvalue:'',
          dloptions: [{
            value: '选项1',
            label: '建设用地'
          }, {
            value: '选项2',
            label: '未利用地'
          }, {
            value: '选项3',
            label: '农用地(耕地,林地,草地,其他)'
          }],
          dlvalue:'',
          //意见
          spyj:{
            zrzybmyj:"",
            zrzybmfzr:"",
            zrzybmrq:"",
            qtbmyj:"",
            nyncbscyj:"",
            nyncbfzr:"",
            nyncbrq:"",
            xzzfshyj:"",
            xzzffzr:"",
            xzzfrq:""
          }
        }          
      }
    },
    methods:{
      submitForm(){
        submitForm(this.spyj).then(res=>{
          console.log(1)
          console.log(res)
        })
      }
    }
}
</script>

<style>

</style>
