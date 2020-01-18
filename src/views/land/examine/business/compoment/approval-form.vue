<template>
    <div>
        <el-form :disabled="currentDisabled" :model="formLabel" :rules="rules" ref="form">
            <table border="0" cellspacing="0" cellpadding="0"
                   style="table-layout: fixed;margin:0px auto;max-width:1000px;">
                <tr style="height: 1px">
                    <td width="76px;"/>
                    <td width="19px;"/>
                    <td width="9px;"/>
                    <td width="75px;"/>
                    <td width="29px;"/>
                    <td width="28px;"/>
                    <td width="36px;"/>
                    <td width="77px;"/>
                    <td width="25px;"/>
                    <td width="18px;"/>
                    <td width="64px;"/>
                    <td width="79px;"/>
                    <td width="6px;"/>
                    <td width="25px;"/>
                    <td width="28px;"/>
                    <td width="113px;"/>
                    <td width="9px;"/>
                </tr>
                <tr style="height:9px;">
                    <td colspan="17" class="s0" style="font-size:1px;" nowrap>&nbsp;</td>
                </tr>
                <tr style="height:28px;">
                    <td colspan="2" class="s0" style="font-size:1px;" nowrap>&nbsp;</td>
                    <td colspan="13" class="s1">农村宅基地和建房（规划许可）审批表</td>
                    <td colspan="2" class="s0" style="font-size:1px;" nowrap>&nbsp;</td>
                </tr>
                <tr style="height:38px;">
                    <td rowspan="2" class="s3">申请户<br>主信息</td>
                    <td colspan="3" class="s13">姓名</td>
                    <td colspan="2" class="s13">性别</td>
                    <td colspan="3" class="s13">身份证号</td>
                    <td colspan="3" class="s13">家庭住址</td>
                    <td colspan="4" class="s13">申请理由</td>
                    <td rowspan="18" class="s0" style="font-size:1px;" nowrap>&nbsp;</td>
                </tr>
                <tr style="height:38px;" class="has_filled">
                    <td colspan="3" class="s15"><div class="flex_v_center"><el-input v-model="formLabel.hzxx.xm"></el-input></div></td>
                    <td colspan="2" class="s15">
                        <el-select v-model="formLabel.hzxx['xb']">
                            <el-option v-for="(option, index) in getDicts('性别')" :label="option.optName"
                                       :value="option.optCode" :key="index"></el-option>
                        </el-select>
                    </td>
                    <td colspan="3" class="s15"><div class="flex_v_center"><el-input v-model="formLabel.hzxx.sfzh"></el-input></div></td>
                    <td colspan="3" class="s15"><div class="flex_v_center"><el-input v-model="formLabel.hzxx.jtzz"></el-input></div></td>
                    <td colspan="4" class="s15"><div class="flex_v_center"><el-input v-model="formLabel.hzxx.sqly"></el-input></div></td>
                </tr>

                <tr style="height:38px;">
                    <td rowspan="5" class="s14">拟批准<br>宅基地<br>及建房<br>情况</td>
                    <td colspan="4" class="s15">宅基地面积</td>
                    <td colspan="2" class="s17"><div class="flex_v_center"><el-input v-model="formLabel.nzjdqk.zjdmj"></el-input>㎡</div></td>
                    <td colspan="3" class="s15">房基占地面积</td>
                    <td class="s17"><div class="flex_v_center"><el-input v-model="formLabel.nzjdqk.fjzdmj"></el-input>㎡</div></td>
                    <td colspan="2" class="s15">地址</td>
                    <td colspan="3" class="s15"><div class="flex_v_center"><el-input v-model="formLabel.nzjdqk.dz"></el-input></div></td>
                </tr>
                <tr style="height:38px;">
                    <td colspan="4" rowspan="2" class="s15">四至</td>
                    <td colspan="2" class="s15">东至：</td>
                    <td colspan="3" class="s15"><div class="flex_v_center"><el-input v-model="formLabel.nzjdqk.szdz"></el-input></div></td>
                    <td class="s15">南至：</td>
                    <td colspan="2" class="s15"><div class="flex_v_center"><el-input v-model="formLabel.nzjdqk.sznz"></el-input></div></td>
                    <td colspan="3" rowspan="3" class="s15">性质:
                        <el-select v-model="formLabel.nzjdqk['jflx']" placeholder="性质">
                            <el-option v-for="(option, index) in getDicts('建房类型')" :label="option.optName"
                                       :value="option.optCode" :key="index"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr style="height:38px;">
                    <td colspan="2" class="s15">西至：</td>
                    <td colspan="3" class="s15"><div class="flex_v_center"><el-input v-model="formLabel.nzjdqk.szxz"></el-input></div></td>
                    <td class="s15">北至：</td>
                    <td colspan="2" class="s15"><div class="flex_v_center"><el-input v-model="formLabel.nzjdqk.szbz"></el-input></div></td>
                </tr>
                <tr style="height:38px;">
                    <td colspan="4" class="s15">地类</td>
                    <td colspan="8" class="s15">
                        <el-select v-model="formLabel.nzjdqk['dl']" placeholder="地类">
                            <el-option v-for="(option, index) in getDicts('地类')" :label="option.optName"
                                       :value="option.optCode" :key="index"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr style="height:38px;">
                    <td colspan="4" class="s15">住房建筑面积</td>
                    <td colspan="2" class="s17"><div class="flex_v_center"><el-input v-model="formLabel.nzjdqk.zfjzmj"></el-input>㎡</div></td>
                    <td colspan="3" class="s15">建筑层数</td>
                    <td class="s17"><div class="flex_v_center"><el-input v-model="formLabel.nzjdqk.jzcs"></el-input>层</div></td>
                    <td colspan="2" class="s15">建筑高度</td>
                    <td colspan="3" class="s17"><div class="flex_v_center"><el-input v-model="formLabel.nzjdqk.jzgd"></el-input>㎡</div></td>
                </tr>






                <tr style="height:38px;">
                    <td colspan="3" rowspan="3" class="s14">自然资源<br>部门意见</td>
                    <td colspan="13" class="s18" style="font-size:1px;">
                        <el-input type="textarea" v-model="formLabel.spyj.zrzybmyj" placeholder="自然资源部门意见"></el-input>
                    </td>
                </tr>
                <tr style="height:38px;">
                    <td colspan="5" class="s7" style="font-size:1px;">&nbsp;</td>
                    <td colspan="6" class="s7" style="font-size:1px;">&nbsp;</td>
                    <td colspan="2" class="s8">（盖章）</td>
                </tr>
                <tr style="height:38px;">
                    <td colspan="5" class="s9" style="font-size:1px;">&nbsp;</td>
                    <td colspan="6" class="s10">
                        <div class="flex_v_center"><span class="flex_label">负责人:</span>
                            <el-input v-model="formLabel.spyj.zrzybmfzr" placeholder="自然资源部负责人"></el-input>
                        </div>
                    </td>
                    <td colspan="2" class="s11" style="font-size:1px;">
                        <el-form-item>
                            <el-date-picker
                                    v-model="formLabel.spyj.zrzybmrq"
                                    type="date"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期" style="width:100%;">
                            </el-date-picker>
                        </el-form-item>
                    </td>
                </tr>
                <tr style="height:113px;">
                    <td colspan="3" class="s14">其他部门<br>意见</td>
                    <td colspan="13" class="s19" style="font-size:1px;">
                        <el-input rows="3" type="textarea" v-model="formLabel.spyj.qtbmyj"
                                  placeholder="其他部门意见"></el-input>
                    </td>
                </tr>
                <tr style="height:38px;">
                    <td colspan="3" rowspan="3" class="s14">农业农村部<br>门审查意见</td>
                    <td colspan="13" class="s18" style="font-size:1px;">
                        <el-input v-model="formLabel.spyj.nyncbscyj" type="textarea"
                                  placeholder="农业农村部门审查意见"></el-input>
                    </td>
                </tr>
                <tr style="height:38px;">
                    <td colspan="5" class="s7" style="font-size:1px;">&nbsp;</td>
                    <td colspan="6" class="s7" style="font-size:1px;">&nbsp;</td>
                    <td colspan="2" class="s8">（盖章）</td>
                </tr>
                <tr style="height:38px;">
                    <td colspan="5" class="s9" style="font-size:1px;">&nbsp;</td>
                    <td colspan="6" class="s10">
                        <div class="flex_v_center"><span class="flex_label">负责人:</span>
                            <el-input v-model="formLabel.spyj.nyncbfzr" placeholder="农业农村部门负责人"></el-input>
                        </div>
                    </td>
                    <td colspan="2" class="s11" style="font-size:1px;">
                        <el-form-item>
                            <el-date-picker
                                    v-model="formLabel.spyj.nyncbrq"
                                    type="date"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期" style="width:100%;">
                            </el-date-picker>
                        </el-form-item>
                    </td>
                </tr>
                <tr style="height:38px;">
                    <td colspan="3" rowspan="3" class="s14">乡镇政府审<br>核批准意见</td>
                    <td colspan="13" class="s18" style="font-size:1px;">
                        <el-input type="textarea" v-model="formLabel.spyj.xzzfshyj" placeholder="乡镇政府审核批准意见"></el-input>
                    </td>
                </tr>
                <tr style="height:38px;">
                    <td colspan="5" class="s7" style="font-size:1px;">&nbsp;</td>
                    <td colspan="6" class="s7" style="font-size:1px;">&nbsp;</td>
                    <td colspan="2" class="s8">（盖章）</td>
                </tr>
                <tr style="height:38px;">
                    <td colspan="5" class="s9" style="font-size:1px;">&nbsp;</td>
                    <td colspan="6" class="s10">
                        <div class="flex_v_center"><span class="flex_label">负责人:</span>
                            <el-input v-model="formLabel.spyj.xzzffzr" placeholder="乡镇政府负责人"></el-input>
                        </div>
                    </td>
                    <td colspan="2" class="s11" style="font-size:1px;">
                        <el-form-item>
                            <el-date-picker
                                    v-model="formLabel.spyj.xzzfrq"
                                    type="date"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期" style="width:100%;">
                            </el-date-picker>
                        </el-form-item>
                    </td>
                </tr>
                <tr style="height:57px;">
                    <td colspan="16" class="s0" style="font-size:1px;" nowrap>&nbsp;</td>
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
  import {submitForm} from '@/api/land.examine'
  import {approvalFormTempData} from "./temp_data"

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
        currentDisabled: this.disabled,
        rules: {},
        formLabel: {
          // //申请户主信息
          hzxx:{
            xm:"",
            xb:"",
            sfzh:"",
            jtzz:"",
            sqly:""
          },
          //拟批准宅基地及建房情况
          nzjdqk: {
            zjdmj: "",
            fjzdmj: "",
            dz: "",
            szdz: "",
            szxz: "",
            szbz: "",
            sznz: "",
            zfjzmj: "",
            jzcs: "",
            jzgd: ""
          },

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
        try{
          //审批意见
          this.formLabel.spyj = JSON.parse(JSON.stringify(this.detail.qt))
          //户主信息、拟宅基地建房情况
          this.formLabel.hzxx = Object.assign({}, {
            xm: this.detail.jcxx.xm,
            xb: this.detail.jcxx.xb,
            sfzh: this.detail.jcxx.sfzh,
            jtzz: '',
            sqly: this.detail.qt.sqly,
          })
          this.formLabel.nzjdqk = Object.assign({}, this.detail.nzjdqk)

          //阶段6（乡镇府验收审批）前可修改
          let processInfo = this.detail.zjdSqJl
          if(processInfo && Number.parseInt(processInfo.xmzt) < 6){
            this.currentDisabled = false;
          } else {
            this.currentDisabled = true
          }
        } catch (err) {
          console.error('回显报错')
        }

      }

    },
    methods: {
      handlePutTempData() {
        this.formLabel.spyj = Object.assign({}, approvalFormTempData.spyj)
        this.formLabel.spyj.sqid = this.detail.zjdSqJl.sqid
      },
      submitForm() {
        submitForm(this.formLabel.spyj).then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
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

    .s0 {
        font-style: normal;
        font-family: Tahoma;
        font-size: 11px;
        color: #FFFFFF;
        background-color: transparent;
        text-align: Left;
        vertical-align: Top;
        overflow: hidden;
    }

    .s1 {
        font-weight: bold;
        font-style: normal;
        font-family: Arial;
        font-size: 24px;
        color: #000000;
        background-color: transparent;
        text-align: Center;
        vertical-align: Middle;
        word-wrap: break-word;
        overflow: hidden;
        padding-left: 2px;
        padding-right: 2px;
    }

    .s2 {
        font-style: normal;
        font-family: Arial;
        font-size: 13px;
        color: #000000;
        background-color: transparent;
        text-align: Left;
        vertical-align: Top;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-color: #000000;
        border-bottom-style: solid;
        border-top-width: 1px;
        border-top-color: #000000;
        border-top-style: solid;
        border-left-width: 1px;
        border-left-color: #000000;
        border-left-style: solid;
        border-right-width: 1px;
        border-right-color: #000000;
        border-right-style: solid;
        padding-left: 2px;
        padding-right: 2px;
    }

    .s3 {
        font-style: normal;
        font-family: Arial;
        font-size: 16px;
        color: #000000;
        background-color: transparent;
        text-align: Center;
        vertical-align: Middle;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-color: #000000;
        border-bottom-style: solid;
        border-top-width: 1px;
        border-top-color: #000000;
        border-top-style: solid;
        border-left-width: 1px;
        border-left-color: #000000;
        border-left-style: solid;
        border-right-width: 1px;
        border-right-color: #000000;
        border-right-style: solid;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s4 {
        font-style: normal;
        font-family: Arial;
        font-size: 13px;
        color: #000000;
        background-color: transparent;
        text-align: Left;
        vertical-align: Top;
        word-wrap: break-word;
        overflow: hidden;
        padding-left: 2px;
        padding-right: 2px;
    }

    .s5 {
        font-style: normal;
        font-family: Arial;
        font-size: 16px;
        color: #000000;
        background-color: transparent;
        text-align: Right;
        vertical-align: Middle;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-color: #000000;
        border-bottom-style: solid;
        border-top-width: 1px;
        border-top-color: #000000;
        border-top-style: solid;
        border-left-width: 1px;
        border-left-color: #000000;
        border-left-style: solid;
        border-right-width: 1px;
        border-right-color: #000000;
        border-right-style: solid;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s6 {
        font-style: normal;
        font-family: Arial;
        font-size: 13px;
        color: #000000;
        background-color: transparent;
        text-align: Left;
        vertical-align: Top;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 0;
        border-top-width: 1px;
        border-top-color: #000000;
        border-top-style: solid;
        border-left-width: 0;
        border-right-width: 1px;
        border-right-color: #000000;
        border-right-style: solid;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s7 {
        font-style: normal;
        font-family: Arial;
        font-size: 13px;
        color: #000000;
        background-color: transparent;
        text-align: Left;
        vertical-align: Top;
        word-wrap: break-word;
        overflow: hidden;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s8 {
        font-style: normal;
        font-family: Arial;
        font-size: 16px;
        color: #000000;
        background-color: transparent;
        text-align: Center;
        vertical-align: Middle;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 0;
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 1px;
        border-right-color: #000000;
        border-right-style: solid;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s9 {
        font-style: normal;
        font-family: Arial;
        font-size: 13px;
        color: #000000;
        background-color: transparent;
        text-align: Left;
        vertical-align: Top;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-color: #000000;
        border-bottom-style: solid;
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 0;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s10 {
        font-style: normal;
        font-family: Arial;
        font-size: 16px;
        color: #000000;
        background-color: transparent;
        text-align: Left;
        vertical-align: Middle;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-color: #000000;
        border-bottom-style: solid;
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 0;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s11 {
        font-style: normal;
        font-family: Arial;
        font-size: 13px;
        color: #000000;
        background-color: transparent;
        text-align: Center;
        vertical-align: Middle;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-color: #000000;
        border-bottom-style: solid;
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 1px;
        border-right-color: #000000;
        border-right-style: solid;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s12 {
        font-style: normal;
        font-family: Arial;
        font-size: 13px;
        color: #000000;
        background-color: transparent;
        text-align: Left;
        vertical-align: Top;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-color: #000000;
        border-bottom-style: solid;
        border-top-width: 1px;
        border-top-color: #000000;
        border-top-style: solid;
        border-left-width: 0;
        border-right-width: 1px;
        border-right-color: #000000;
        border-right-style: solid;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s13 {
        font-style: normal;
        font-family: Arial;
        font-size: 16px;
        color: #000000;
        background-color: transparent;
        text-align: Center;
        vertical-align: Middle;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-color: #000000;
        border-bottom-style: solid;
        border-top-width: 1px;
        border-top-color: #000000;
        border-top-style: solid;
        border-left-width: 0;
        border-right-width: 1px;
        border-right-color: #000000;
        border-right-style: solid;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s14 {
        font-style: normal;
        font-family: Arial;
        font-size: 16px;
        color: #000000;
        background-color: transparent;
        text-align: Center;
        vertical-align: Middle;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-color: #000000;
        border-bottom-style: solid;
        border-top-width: 0;
        border-left-width: 1px;
        border-left-color: #000000;
        border-left-style: solid;
        border-right-width: 1px;
        border-right-color: #000000;
        border-right-style: solid;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s15 {
        font-style: normal;
        font-family: Arial;
        font-size: 16px;
        color: #000000;
        background-color: transparent;
        text-align: Center;
        vertical-align: Middle;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-color: #000000;
        border-bottom-style: solid;
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 1px;
        border-right-color: #000000;
        border-right-style: solid;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s16 {
        font-style: normal;
        font-family: Arial;
        font-size: 16px;
        color: #000000;
        background-color: transparent;
        text-align: Right;
        vertical-align: Middle;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-color: #000000;
        border-bottom-style: solid;
        border-top-width: 0;
        border-left-width: 1px;
        border-left-color: #000000;
        border-left-style: solid;
        border-right-width: 1px;
        border-right-color: #000000;
        border-right-style: solid;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s17 {
        font-style: normal;
        font-family: Arial;
        font-size: 16px;
        color: #000000;
        background-color: transparent;
        text-align: Right;
        vertical-align: Middle;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-color: #000000;
        border-bottom-style: solid;
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 1px;
        border-right-color: #000000;
        border-right-style: solid;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s18 {
        font-style: normal;
        font-family: Arial;
        font-size: 13px;
        color: #000000;
        background-color: transparent;
        text-align: Left;
        vertical-align: Top;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 0;
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 1px;
        border-right-color: #000000;
        border-right-style: solid;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .s19 {
        font-style: normal;
        font-family: Arial;
        font-size: 13px;
        color: #000000;
        background-color: transparent;
        text-align: Left;
        vertical-align: Top;
        word-wrap: break-word;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-color: #000000;
        border-bottom-style: solid;
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 1px;
        border-right-color: #000000;
        border-right-style: solid;
        padding-left: 2px;
        padding-right: 2px;
        padding-top: 1px;
        padding-bottom: 1px;
    }
</style>
