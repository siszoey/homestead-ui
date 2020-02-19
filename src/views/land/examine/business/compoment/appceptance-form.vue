<template>
    <div>
      <el-form  :disabled="disabled"
                ref="form"
                :model="form">
        <table  border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed;margin:0px auto;max-width:1000px;" >
          <tr style="height: 1px"><td width="76px;"/><td width="1px;"/><td width="9px;"/><td width="76px;"/><td width="28px;"/><td width="28px;"/><td width="19px;"/><td width="47px;"/><td width="57px;"/><td width="9px;"/><td width="9px;"/><td width="123px;"/><td width="47px;"/><td width="85px;"/><td width="9px;"/><td width="85px;"/><td width="9px;"/></tr>
          <tr style="height:9px;">
          <td colspan="17" class="s0" style="font-size:1px;" nowrap >&nbsp;</td>
          </tr>
          <tr style="height:28px;">
          <td colspan="3" class="s0" style="font-size:1px;" nowrap >&nbsp;</td>
          <td colspan="12" class="s1">农村宅基地和建房（规划许可）验收意见表</td>
          <td colspan="2" class="s0" style="font-size:1px;" nowrap >&nbsp;</td>
          </tr>
          <tr style="height:38px;">
          <td colspan="4" class="s3">申请户主</td>
          <td colspan="5" class="s20 has_filled" >{{detail.jcxx.xm}}</td>
          <td colspan="3" class="s20">身份证号</td>
          <td colspan="4" class="s20 has_filled">{{detail.jcxx.sfzh}}</td>
          <td rowspan="19" class="s0"  nowrap >&nbsp;</td>
          </tr>
          <tr style="height:38px;">
          <td colspan="6" class="s21">乡村建设规划许可证号</td>
          <td colspan="10" class="s17">
            <el-form-item>
                <el-input v-model="form.ysyj.xkz"></el-input>
            </el-form-item>
          </td>
          </tr>
          <tr style="height:38px;">
          <td colspan="6" class="s21">农村宅基地批准书号</td>
          <td colspan="10" class="s17" style="font-size:1px;">
            <el-form-item >
                <el-input v-model="form.ysyj.pzsh"></el-input>
            </el-form-item>
          </td>
          </tr>
          <tr style="height:38px;">
          <td colspan="5" class="s21">开工日期</td>
          <td colspan="6" class="s17" style="font-size:1px;">
            <el-form-item>
              <el-date-picker
                      v-model="form.ysyj.kgrq"
                      type="date"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
              />
            </el-form-item>
          </td>
          <td colspan="2" class="s17">竣工日期</td>
          <td colspan="3" class="s23" style="font-size:1px;">
             <el-form-item>
                  <el-date-picker
                          v-model="form.ysyj.jgrq"
                          type="date"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                  />
              </el-form-item>
          </td>
          </tr>
          <tr style="height:38px;">
          <td colspan="5" class="s21">批准宅基地面积</td>
          <td colspan="6" class="s25">
            <el-form-item >
                <div class="flex_v_center"><el-input v-model="form.ysyj.pzzjdmj"></el-input>㎡</div>
            </el-form-item>
            </td>
          <td colspan="2" class="s17">实用宅基地面积</td>
          <td colspan="3" class="s25">
            <el-form-item >
                <div class="flex_v_center"><el-input v-model="form.ysyj.syzjdmj"></el-input>㎡</div>
            </el-form-item>
          </td>
          </tr>
          <tr style="height:38px;">
          <td colspan="5" class="s21">批准房基占地面积</td>
          <td colspan="6" class="s25">
            <el-form-item >
                <div class="flex_v_center"><el-input v-model="form.ysyj.pzfjzdmj"></el-input>㎡</div>
            </el-form-item>
          </td>
          <td colspan="2" class="s17">实际房基占地面积</td>
          <td colspan="3" class="s25">
            <el-form-item >
                <div class="flex_v_center"><el-input v-model="form.ysyj.sjfjzdmj"></el-input>㎡</div>
            </el-form-item>
          </td>
          </tr>
          <tr style="height:38px;">
          <td colspan="5" class="s21">批准层数/高度</td>
          <td colspan="3" class="s27">
            <el-form-item >
              <div class="flex_v_center"><el-input v-model="form.ysyj.pjcs"></el-input>层/</div>
            </el-form-item>
          </td>
          <td colspan="3" class="s25">
             <el-form-item >
              <div class="flex_v_center"><el-input v-model="form.ysyj.pjgd"></el-input>米</div>
            </el-form-item>
          </td>
          <td colspan="2" class="s17">竣工层数/高度</td>
          <td class="s29">
             <el-form-item >
              <div class="flex_v_center"><el-input v-model="form.ysyj.jgcs"></el-input>层/</div>
            </el-form-item>
          </td>
          <td colspan="2" class="s30">
             <el-form-item >
              <div class="flex_v_center"><el-input v-model="form.ysyj.jggd"></el-input>米</div>
            </el-form-item>
          </td>
          </tr>
          <tr style="height:38px;">
          <td colspan="5" class="s21">拆旧退还宅基地情况</td>
          <td colspan="11" class="s17" style="font-size:1px;">
              <el-form-item >
                  <el-select v-model="form.ysyj['cjthzjdqk']">
                      <el-option v-for="(option, index) in getDicts('拆旧退还宅基地情况')" :label="option.optName"
                                 :value="option.optCode" :key="index"></el-option>
                  </el-select>
              </el-form-item>
          </td>
          </tr>
          <tr style="height:76px;">
          <td rowspan="2" class="s21">竣工平<br>面简图<br>（标注<br>长宽及<br>四至）</td>
          <td colspan="15" class="s31" style="font-size:1px;">&nbsp;</td>
          </tr>
          <tr style="height:38px;">
          <td colspan="15" class="s12">
            <el-form-item>
              <div class="flex_v_center"><span class="flex_label">经办人:</span>
                  <el-input v-model="form.ysyj.jgpmtjbr"></el-input>
              </div>
              </el-form-item>
            </td>
          </tr>
          <tr style="height:38px;">
          <td rowspan="4" class="s21">验收单<br>位意见</td>
          <td colspan="10" class="s32">农业农村部意见：</td>
          <td colspan="5" class="s32">自然资源部门意见：</td>
          </tr>
          <tr style="height:76px;">
          <td colspan="10" class="s14" style="font-size:1px;">
             <el-form-item>
                <el-input type="textarea" rows="3" v-model="form.ysyj.nyncbyj" placeholder="农业农村部门审查意见"></el-input>
              </el-form-item>
          </td>
          <td colspan="5" class="s14" style="font-size:1px;">
             <el-form-item>
                <el-input type="textarea" rows="3" v-model="form.ysyj.zrzybmyj" placeholder="自然资源部门意见"></el-input>
              </el-form-item>
          </td>
          </tr>
          <tr style="height:38px;">
          <td colspan="6" class="s15" style="font-size:1px;">&nbsp;</td>
          <td colspan="4" class="s14">（盖章）</td>
          <td colspan="2" class="s15" style="font-size:1px;">&nbsp;</td>
          <td colspan="3" class="s14">（盖章）</td>
          </tr>
          <tr style="height:38px;">
          <td colspan="6" class="s16">
            <div class="flex_v_center"><span class="flex_label">经办人:</span>
                  <el-input v-model="form.ysyj.nyncbjbr"></el-input>
              </div>
          </td>
          <td colspan="4" class="s17" style="font-size:1px;">
            <el-form-item>
                <el-date-picker
                        v-model="form.ysyj.nyncbrq"
                        type="date"
                        placeholder="选择日期" style="width:100%;">
                </el-date-picker>
            </el-form-item>
          </td>
          <td colspan="2" class="s16">
            <div class="flex_v_center"><span class="flex_label">经办人:</span>
                  <el-input v-model="form.ysyj.zrzyjbr"></el-input>
              </div>
          </td>
          <td colspan="3" class="s17" style="font-size:1px;">
            <el-form-item>
                  <el-date-picker
                          v-model="form.ysyj.zrzyrq"
                          type="date"
                          placeholder="选择日期" style="width:100%;">
                  </el-date-picker>
              </el-form-item>
          </td>
          </tr>
          <tr style="height:38px;">
          <td rowspan="3" class="s21">乡镇政<br>府验收<br>意见</td>
          <td colspan="15" class="s31" style="font-size:1px;">
            <el-form-item>
              <el-input type="textarea" rows="3" v-model="form.ysyj.xzzfysyj"></el-input>
            </el-form-item>
          </td>
          </tr>
          <tr style="height:38px;">
          <td colspan="9" class="s18" style="font-size:1px;">&nbsp;</td>
          <td colspan="3" class="s18" style="font-size:1px;">&nbsp;</td>
          <td colspan="3" class="s14">（盖章）</td>
          </tr>
          <tr style="height:38px;">
          <td colspan="12" class="s16">
            <div class="flex_v_center"><span class="flex_label">负责人:</span>
                  <el-input v-model="form.ysyj.xzzffzr"></el-input>
              </div>
          </td>
          <td colspan="3" class="s17" style="font-size:1px;">
              <el-form-item>
                  <el-date-picker
                          v-model="form.ysyj.xzzfrq"
                          type="date"
                          placeholder="选择日期" style="width:100%;">
                  </el-date-picker>
              </el-form-item>
          </td>
          </tr>
          <tr style="height:38px;">
          <td colspan="2" class="s21">备注</td>
          <td colspan="14" class="s17" style="font-size:1px;">
             <el-form-item >
                <el-input v-model="form.ysyj.bz" type="textarea"></el-input>
            </el-form-item>
          </td>
          </tr>
          <tr style="height:57px;">
          <td colspan="16" class="s0" style="font-size:1px;" nowrap >&nbsp;</td>
          </tr>
          </table>
           <el-form-item style="text-align:center">
                <el-button type="primary" @click="submitForm">保存</el-button>
                <el-button type="primary" @click="handlePutTempData">测试数据</el-button>
            </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import dictMixins from '../../../mixnis/dict-mixnis'
  import {submitAcceptance} from '@/api/land.examine'
  import {appceptanceFormTempData} from "./temp_data"
  export default {
    name: "appceptance-form",
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
        form: {
          //验收意见
          ysyj: {
            sqid: "",
            sqhz: "",
            sfzh: "",
            xkz: "",
            pzsh: "",
            kgrq: "",
            jgrq: "",
            pzzjdmj: "",
            syzjdmj: "",
            pzfjzdmj: "",
            sjfjzdmj: "",
            pjcs: "",
            pjgd: "",
            jgcs: "",
            jggd: "",
            cjthzjdqk: "",
            jgpmtjbr: "",
            nyncbyj: "",
            nyncbjbr: "",
            nyncbrq: "",
            zrzybmyj: "",
            zrzyjbr: "",
            zrzyrq: "",
            xzzfysyj: "",
            xzzffzr: "",
            xzzfrq: "",
            bz: ""
          }
        },
        cjthzjdqk: [
          {value: "1", label: "1.不属于"},
          {value: "2", label: "2.属于，已落实"},
          {value: "3", label: "3.属于，尚未落实"}
        ]
      }
    },
    created() {
      if (this.detail && this.detail.zjdYsyj) {
        this.form.ysyj = this.detail.zjdYsyj

      }
    },
    methods: {
      handlePutTempData(){
        this.form = Object.assign({}, this.form, appceptanceFormTempData)
        this.form.ysyj.sqid = this.detail.jcxx.sqid
      },
      submitForm() {
        submitAcceptance(this.form.ysyj).then(res => {
          this.$message({
            message: '申请成功',
            type: 'success'
          })
          this.disabled = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.flex_v_center {
      display: flex;
      align-items: center;
      .flex_label {
        min-width: 60px;
      }
    }
.el-form-item {
  margin-bottom: 0px;
}
.has_filled {
  background-color: #F5F7FA !important;
}
.s0 { font-style:normal;font-family:Tahoma;font-size:11px;color:#FFFFFF;background-color:transparent;text-align:Left;vertical-align:Top;overflow:hidden;}
.s1 { font-weight:bold;font-style:normal;font-family:Arial;font-size:24px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;padding-left:2px;padding-right:2px;}
.s2 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Top;word-wrap:break-word;overflow:hidden;padding-left:2px;padding-right:2px;}
.s3 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s4 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Top;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;}
.s5 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s6 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s7 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:0;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s8 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s9 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:0;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s10 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s11 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Top;word-wrap:break-word;overflow:hidden;border-bottom-width:0;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s12 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s13 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:0;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s14 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:0;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s15 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s16 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:0;border-right-width:0;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s17 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s18 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Top;word-wrap:break-word;overflow:hidden;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s19 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Top;word-wrap:break-word;overflow:hidden;border-bottom-width:0;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;}
.s20 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s21 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s22 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s23 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s24 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s25 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s26 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:0;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s27 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:0;border-right-width:0;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s28 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:0;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s29 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:0;border-right-width:0;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s30 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s31 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Top;word-wrap:break-word;overflow:hidden;border-bottom-width:0;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s32 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:0;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
</style>
