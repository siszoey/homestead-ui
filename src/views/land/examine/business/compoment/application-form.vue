<template>
  <div v-loading="loading">
  <el-form  :disabled="disabled" :model="form" :rules="rules" ref="form" :class="{validForm: !showValidMsg}">
    <table  border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed;margin:0px auto;max-width:1000px" >
      <tr style="height: 1px"><td width="76px;"/><td width="28px;"/><td width="47px;"/><td width="9px;"/><td width="31px;"/><td width="6px;"/><td width="28px;"/><td width="9px;"/><td width="24px;"/><td width="14px;"/><td width="32px;"/><td width="44px;"/><td width="3px;"/><td width="7px;"/><td width="16px;"/><td width="3px;"/><td width="47px;"/><td width="28px;"/><td width="28px;"/><td width="41px;"/><td width="10px;"/><td width="6px;"/><td width="28px;"/><td width="38px;"/><td width="16px;"/><td width="88px;"/><td width="9px;"/></tr>
      <tr style="height:9px;">
      <td colspan="27" class="s0" style="font-size:1px;" nowrap >&nbsp;</td>
      </tr>
      <tr style="height:28px;">
      <td colspan="2" class="s0" style="font-size:1px;" nowrap >&nbsp;</td>
      <td colspan="22" class="s1">农村宅基地和建房（规划许可）申请表</td>
      <td colspan="3" class="s0" style="font-size:1px;" nowrap >&nbsp;</td>
      </tr>
      <tr style="height:38px;">
      <td rowspan="2" class="s3">申请户<br>主信息</td>
      <td colspan="2" class="s8">姓名</td>
      <td colspan="4" class="s8" style="font-size:1px;"><el-form-item  prop="jcxx.xm"><el-input v-model="form.jcxx['xm']"></el-input></el-form-item></td>
      <td colspan="4" class="s8">性别</td>
      <td colspan="4" class="s8" style="font-size:1px;">
       <el-form-item  prop="jcxx.xb">
        <el-select v-model="form.jcxx['xb']">
            <el-option v-for="(option, index) in getDicts('性别')" :label="option.optName"
                        :value="option.optCode" :key="index"></el-option>
        </el-select>
       </el-form-item>
      </td>
      <td colspan="3" class="s8">年龄</td>
      <td colspan="2" class="s16"><el-form-item  prop="jcxx.nl"><div class="flex_v_center"> <el-input v-model.number="form.jcxx['nl']" placeholder="年龄"></el-input>岁</div></el-form-item></td>
      <td colspan="5" class="s8">联系方式</td>
      <td class="s8" style="font-size:1px;"> <el-form-item  prop="jcxx.lxdh"><el-input v-model.number="form.jcxx['lxdh']" placeholder="联系电话"></el-input></el-form-item></td>
      <td rowspan="24" class="s0" style="font-size:1px;" nowrap >&nbsp;</td>
      </tr>
      <tr style="height:38px;">
      <td colspan="6" class="s18">身份证号</td>
      <td colspan="8" class="s18" style="font-size:1px;"><el-form-item  prop="jcxx.sfzh"> <el-input v-model="form.jcxx['sfzh']" placeholder="身份证号"></el-input></el-form-item></td>
      <td colspan="5" class="s18">户口所在地</td>
      <td colspan="6" class="s18" style="font-size:1px;"><el-form-item  prop="jcxx.hksz"><el-input v-model="form.jcxx['hksz']" placeholder="户口所在地"></el-input></el-form-item></td>
      </tr>
      <tr style="height:38px;">
      <td rowspan="5" class="s17">家庭成<br>员信息</td>
      <td colspan="3" class="s18">姓名</td>
      <td colspan="4" class="s18">年龄</td>
      <td colspan="6" class="s18">与户主关系</td>
      <td colspan="5" class="s18">身份证号</td>
      <td colspan="7" class="s18">户口所在地</td>
      </tr>
      <tr v-for="(cyItem,index) in form.jtcy" style="height:38px;">
      <td colspan="3" class="s18" style="font-size:1px;"><el-input v-model="cyItem['xm']"></el-input></td>
      <td colspan="4" class="s18" style="font-size:1px;">
        <el-form-item
                      :prop="'jtcy.' + index + '.nl'"
                      >
<!--            :rules="{type: 'number', message: '必须为数字值'}">-->
            <el-input v-model.number="cyItem['nl']"></el-input>
        </el-form-item></td>
      <td colspan="6" class="s18" style="font-size:1px;"><el-input v-model="cyItem['yhzgx']"></el-input></td>
      <td colspan="5" class="s18" style="font-size:1px;"><el-input v-model="cyItem['sfzh']"></el-input></td>
      <td colspan="7" class="s18" style="font-size:1px;"><el-input v-model="cyItem['hkszd']"></el-input></td>
      </tr>
      <!-- <tr style="height:38px;">
      <td colspan="3" class="s18" style="font-size:1px;">&nbsp;</td>
      <td colspan="4" class="s18" style="font-size:1px;">&nbsp;</td>
      <td colspan="6" class="s18" style="font-size:1px;">&nbsp;</td>
      <td colspan="5" class="s18" style="font-size:1px;">&nbsp;</td>
      <td colspan="7" class="s18" style="font-size:1px;">&nbsp;</td>
      </tr>
      <tr style="height:38px;">
      <td colspan="3" class="s18" style="font-size:1px;">&nbsp;</td>
      <td colspan="4" class="s18" style="font-size:1px;">&nbsp;</td>
      <td colspan="6" class="s18" style="font-size:1px;">&nbsp;</td>
      <td colspan="5" class="s18" style="font-size:1px;">&nbsp;</td>
      <td colspan="7" class="s18" style="font-size:1px;">&nbsp;</td>
      </tr>
      <tr style="height:38px;">
      <td colspan="3" class="s18" style="font-size:1px;">&nbsp;</td>
      <td colspan="4" class="s18" style="font-size:1px;">&nbsp;</td>
      <td colspan="6" class="s18" style="font-size:1px;">&nbsp;</td>
      <td colspan="5" class="s18" style="font-size:1px;">&nbsp;</td>
      <td colspan="7" class="s18" style="font-size:1px;">&nbsp;</td>
      </tr> -->
      <tr style="height:38px;">
      <td rowspan="2" class="s17">现宅基地及农房情况</td>
      <td colspan="4" class="s18">宅基地面积</td>
      <td colspan="4" class="s20"><el-form-item  prop="xzjxqk.zjdmj"><div class="flex_v_center"> <el-input v-model.number="form.xzjxqk['zjdmj']" placeholder="宅基地面积"></el-input>㎡</div></el-form-item></td>
      <td colspan="4" class="s18">建筑面积</td>
      <td colspan="4" class="s20"><el-form-item  prop="xzjxqk.jzmj"><div class="flex_v_center"> <el-input v-model.number="form.xzjxqk['jzmj']" placeholder="建筑面积"></el-input>㎡</div></el-form-item></td>
      <td colspan="4" class="s18">权属证书号</td>
      <td colspan="5" class="s18" style="font-size:1px;"><el-form-item  prop="xzjxqk.qszsh"><el-input v-model="form.xzjxqk['qszsh']" placeholder="权属证书号"></el-input></el-form-item></td>
      </tr>
      <tr style="height:38px;">
      <td colspan="6" class="s18">现宅基地处置情况</td>
      <td colspan="19" class="s18" style="font-size:1px;">
         <el-form-item  prop="xzjxqk.xzjdclqk">
         <el-select v-model="form.xzjxqk['xzjdclqk']" placeholder="现宅基地处置情况">
              <el-option v-for="(option, index) in getDicts('是否')" :label="option.optName"
                          :value="option.optCode" :key="index"></el-option>
          </el-select>
         </el-form-item>
      </td>
      </tr>
      <tr style="height:38px;">
      <td rowspan="7" class="s17">拟申请<br>宅基地<br>及建房<br>（规划<br>许可）<br>情况</td>
      <td colspan="5" class="s18">宅基地面积</td>
      <td colspan="10" class="s20"><el-form-item  prop="nzjdqk.zjdmj"><div class="flex_v_center"><el-input v-model.number="form.nzjdqk['zjdmj']" placeholder="宅基地面积"></el-input>㎡</div></el-form-item></td>
      <td colspan="6" class="s18">房基占地面积</td>
      <td colspan="4" class="s20"> <el-form-item  prop="nzjdqk.fjzdmj"><div class="flex_v_center"><el-input v-model.number="form.nzjdqk['fjzdmj']" placeholder="房基占地面积"></el-input>㎡</div></el-form-item></td>
      </tr>
      <tr style="height:38px;">
      <td colspan="5" class="s18">地址</td>
      <td colspan="20" class="s18" style="font-size:1px;"><el-form-item  prop="nzjdqk.dz"><el-input v-model="form.nzjdqk['dz']" placeholder="地址"></el-input></el-form-item></td>
      </tr>
      <tr style="height:38px;">
      <td colspan="5" rowspan="2" class="s18">四至</td>
      <td colspan="4" class="s18">东至：</td>
      <td colspan="6" class="s18" style="font-size:1px;"><el-form-item  prop="nzjdqk.szdz"><el-input v-model="form.nzjdqk['szdz']" placeholder="四至东至"></el-input></el-form-item></td>
      <td colspan="2" class="s18">南至：</td>
      <td colspan="4" class="s18" style="font-size:1px;"><el-form-item  prop="nzjdqk.sznz"><el-input v-model="form.nzjdqk['sznz']" placeholder="四至南至"></el-input></el-form-item></td>
      <td colspan="4" rowspan="3" class="s18"><div class="flex_v_center">建房类型: <el-select v-model="form.nzjdqk['jflx']" placeholder="建房类型">
                            <el-option v-for="(option, index) in getDicts('建房类型')" :label="option.optName"
                                       :value="option.optCode" :key="index"></el-option>
                        </el-select></div></td>
      </tr>
      <tr style="height:38px;">
      <td colspan="4" class="s18">西至：</td>
      <td colspan="6" class="s18" style="font-size:1px;"><el-form-item  prop="nzjdqk.szxz"><el-input v-model="form.nzjdqk['szxz']" placeholder="四至西至"></el-input></el-form-item></td>
      <td colspan="2" class="s18">北至：</td>
      <td colspan="4" class="s18" style="font-size:1px;"><el-form-item  prop="nzjdqk.szbz"><el-input v-model="form.nzjdqk['szbz']" placeholder="四至北至"></el-input></el-form-item></td>
      </tr>
      <tr style="height:66px;">
      <td colspan="5" class="s18">地类</td>
      <td colspan="16" class="s18">
         <el-form-item  prop="nzjdqk.dl">
          <el-select v-model="form.nzjdqk['dl']" placeholder="地类">
              <el-option v-for="(option, index) in getDicts('地类')" :label="option.optName"
                          :value="option.optCode" :key="index"></el-option>
          </el-select>
         </el-form-item>
          </td>
      </tr>
      <tr style="height:38px;">
      <td colspan="5" class="s18">住房建筑面积</td>
      <td colspan="4" class="s20"><el-form-item  prop="nzjdqk.zfjzmj"><div class="flex_v_center"><el-input v-model.number="form.nzjdqk['zfjzmj']" placeholder="住房建筑面积"></el-input>㎡</div></el-form-item></td>
      <td colspan="6" class="s18">建筑层数</td>
      <td colspan="2" class="s20"><el-form-item  prop="nzjdqk.jzcs"><div class="flex_v_center"><el-input v-model.number="form.nzjdqk['jzcs']" placeholder="建筑层数"></el-input>层</div></el-form-item></td>
      <td colspan="4" class="s18">建筑高度</td>
      <td colspan="4" class="s20"><el-form-item  prop="nzjdqk.jzgd"><div class="flex_v_center"><el-input v-model.number="form.nzjdqk['jzgd']" placeholder="建筑高度"></el-input>米</div></el-form-item></td>
      </tr>
      <tr style="height:38px;">
      <td colspan="15" class="s18">是否征求相邻权利人意见：</td>
      <td colspan="10" class="s18" style="font-size:1px;">
        <el-form-item  prop="nzjdqk.sfzqxlqlryj">
        <el-select v-model="form.nzjdqk['sfzqxlqlryj']" placeholder="是否征求相邻权利人意见">
            <el-option v-for="(option, index) in getDicts('是否')" :label="option.optName"
                        :value="option.optCode" :key="index"></el-option>
        </el-select>
        </el-form-item>
      </td>
      </tr>
      <tr style="height:38px;">
      <td rowspan="2" class="s17">申请<br>理由</td>
      <td colspan="25" class="s21" style="font-size:1px;"><el-form-item  prop="qt.sqly"><el-input type="textarea" v-model="form.qt['sqly']" placeholder="申请理由"></el-input></el-form-item></td>
      </tr>
      <tr style="height:38px;">
      <td colspan="11" class="s10" style="font-size:1px;">&nbsp;</td>
      <td colspan="11" class="s11"><el-form-item  prop="qt.sqr"><div class="flex_v_center"><span class="flex_label">申请人:</span><el-input v-model="form.qt['sqr']" placeholder="申请人"></el-input></div></el-form-item></td>
      <td colspan="3" class="s12" style="font-size:1px;">
        <el-form-item  prop="qt.sqrrq">
          <el-date-picker
                  v-model="form.qt['sqrrq']"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        </td>
      </tr>
      <tr style="height:38px;">
      <td rowspan="2" class="s17">村民小组意见</td>
      <td colspan="25" class="s22" style="font-size:1px;"><el-form-item  prop="qt.cmxzyj"><el-input type="textarea" v-model="form.qt['cmxzyj']" placeholder="村民小组意见"></el-input></el-form-item></td>
      </tr>
      <tr style="height:38px;">
      <td colspan="11" class="s10" style="font-size:1px;">&nbsp;</td>
      <td colspan="11" class="s11"><el-form-item  prop="qt.cmxzfzr"><div class="flex_v_center"><span class="flex_label">负责人:</span><el-input v-model="form.qt['cmxzfzr']" placeholder="村民小组负责人"></el-input></div></el-form-item></td>
      <td colspan="3" class="s12" style="font-size:1px;">
         <el-form-item  prop="qt.cmxzrq">
          <el-date-picker
                  v-model="form.qt['cmxzrq']"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
          </el-date-picker>
         </el-form-item>
      </td>
      </tr>
      <tr style="height:38px;">
      <td rowspan="3" class="s17">村集体经济组织或村民委员会意见</td>
      <td colspan="25" class="s22" style="font-size:1px;"> <el-form-item  prop="qt.cmwyhyj"> <el-input type="textarea" v-model="form.qt['cmwyhyj']" placeholder="村集体经济组织或村民委员会意见"></el-input></el-form-item></td>
      </tr>
      <tr style="height:38px;">
      <td colspan="11" class="s14" style="font-size:1px;">&nbsp;</td>
      <td colspan="11" class="s14" style="font-size:1px;">&nbsp;</td>
      <td colspan="3" class="s15">（盖章）</td>
      </tr>
      <tr style="height:38px;">
      <td colspan="11" class="s10" style="font-size:1px;">&nbsp;</td>
      <td colspan="11" class="s11"><el-form-item  prop="qt.cmwyhfzr"><div class="flex_v_center"><span class="flex_label">负责人:</span><el-input v-model="form.qt['cmwyhfzr']" placeholder="负责人"></el-input></div></el-form-item></td>
      <td colspan="3" class="s12" style="font-size:1px;">
        <el-form-item  prop="qt.cmwyhrq">
          <el-date-picker
                  v-model="form.qt['cmwyhrq']"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        </td>
      </tr>
      <tr style="height:38px;">
      <td colspan="26" class="s0" style="font-size:1px;" nowrap >&nbsp;</td>
      </tr>
      </table>




   <el-form-item style="text-align: center;">
      <el-button type="primary" @click="submitForm('form')">保存</el-button>
      <el-button type="primary" @click="handlePutTempData">测试数据</el-button>
  </el-form-item>
  </el-form>
</div>
</template>

<script>
  import dictMixins from '../../../mixnis/dict-mixnis'
  import {ApplicationForm, ApproalProcess} from '@/api/land.business_activiti'
  import {applicationFormTempData} from "./temp_data"

  export default {
    name: 'application-form',
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
          //基本信息
          jcxx: {
            xm: '',
            xb: '',
            nl: '',
            lxdh: '',
            sfzh: '',
            hksz: ''
          },
          //家庭成员
          jtcy: [],
          //现宅基地情况
          xzjxqk: {
            zjdmj: '',
            jzmj: '',
            qszsh: '',
            xzjdclqk: '',
          },
          //拟宅基地情况
          nzjdqk: {
            zjdmj: '',
            fjzdmj: '',
            dz: '',
            szdz: '',
            szxz: '',
            szbz: '',
            sznz: '',
            dl: '',
            jflx: this.$route.params.jflx ? this.$route.params.jflx : '',
            zfjzmj: '',
            jzcs: '',
            jzgd: '',
            sfzqxlqlryj: ''
          },
          //其他
          qt: {
            sqly: '',
            sqr: '',
            sqrrq: '',
            cmxzyj: '',
            cmxzfzr: '',
            cmxzrq: '',
            cmwyhyj: '',
            cmwyhfzr: '',
            cmwyhrq: '',
          },
        },

        rules: {},
        showValidMsg: false,
        loading: false
      }
    },
    created() {
      this.initJTCY()
      this.formValidate()
    },
    watch:{
    },
    methods: {
      handlePutTempData(){
        this.form = {
          jcxx: Object.assign({}, applicationFormTempData.jcxx),
          // jtcy: Object.assign([], applicationFormTempData.jtcy),
          xzjxqk: Object.assign({}, applicationFormTempData.xzjxqk),
          nzjdqk: Object.assign({}, applicationFormTempData.nzjdqk),
          qt: Object.assign({}, applicationFormTempData.qt)
        }
        this.form.jtcy = []
        for (let index = 0; index < 4; index++) {
          this.form.jtcy.push(Object.assign({}, applicationFormTempData.jtcy[index]))
        }

      },
       emitChangeSendState (state,formdata) {
        this.$emit('change-send-state',state,formdata)
      },
      initJTCY(){
        if (this.disabled && this.detail != undefined) {
          this.form = this.detail
          let length = this.form.jtcy.length
          if (length < 4) {
            for (let index = 0; index < (4 - length); index++) {
              this.form.jtcy.push({
                xm: '',
                nl: '',
                yhzgx: '',
                sfzh: '',
                hkszd: '',
                //区分对象
                key: Date.now()
              })
            }
          }
        } else {
          this.form.jtcy = []
          for (let index = 0; index < 4; index++) {
            this.form.jtcy.push({
              xm: '',
              nl: '',
              yhzgx: '',
              sfzh: '',
              hkszd: '',
              //区分对象
              key: Date.now()
            })
          }
        }
      },
      addJTCYDomain() {
        this.form.jtcy.push({
          xm: '',
          nl: '',
          yhzgx: '',
          sfzh: '',
          hkszd: '',
          //区分对象
          key: Date.now()
        })
      },
      removeJTCYDomain(item) {
        let index = this.form.jtcy.indexOf(item)
        if (index !== -1) {
          this.form.jtcy.splice(index, 1)
        }
      },
      formValidate() {
        let rulesKeys = []
        Object.keys(this.form.jcxx).map(m => {
          rulesKeys.push(`jcxx.${m}`)
        })
        Object.keys(this.form.nzjdqk).map(m => {
          rulesKeys.push(`nzjdqk.${m}`)
        })
        Object.keys(this.form.qt).map(m => {
          rulesKeys.push(`qt.${m}`)
        })
        Object.keys(this.form.xzjxqk).map(m => {
          rulesKeys.push(`xzjxqk.${m}`)
        })
        rulesKeys.map(column => {
          let list = [].concat(
            {required: true, message: `请输入`, trigger: 'blur'}
          )
          if (['jcxx.nl', 'jcxx.lxdh',
            'xzjxqk.zjdmj', 'xzjxqk.fjzdmj',
            'nzjdqk.zjdmj', 'nzjdqk.fjzdmj', 'nzjdqk.zfjzdmj', 'nzjdqk.jzcs', 'nzjdqk.zfgd'].includes(column)) {
            list.push({type: 'number', message: '必须为数字值'})
          }
          this.rules[column] = list
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            let params =Object.assign({},this.form)
            params.jtcy = params.jtcy.filter(item => item.xm)
            if (valid) {
              this.showValidMsg = false
              this.loading = true
              console.log(params)
              ApplicationForm(Object.assign(params, {loginName: 'cm'})).then(res => {
                  this.$message({
                    message: '申请成功',
                    type: 'success'
                  })
                  //todo: res包括sqid、taskid
                  this.emitChangeSendState(true, Object.assign(res, {passFlag: true, box : '待办'}))
              }).catch(() => {
                this.$message({
                  message: '创建失败',
                  type: 'error'
                })
              }).finally(()=>{
                this.loading = false
              })
            } else {
              this.$message({
                message: '请按要求填写',
                type: 'warning'
              })
              this.showValidMsg = true
              return false
            }
          }
        )
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="scss" scoped>

    //默认下拉框不会最大宽度
    .el-select.el-select--default {
        width: 100%;
    }
    .validForm {
      .el-form-item {
        margin-bottom: 0px;
      }
    }
    .flex_v_center {
      display: flex;
      align-items: center;
      .flex_label {
        min-width: 60px;
      }
    }
.s0 { font-style:normal;font-family:Tahoma;font-size:11px;color:#FFFFFF;background-color:transparent;text-align:Left;vertical-align:Top;overflow:hidden;}
.s1 { font-weight:bold;font-style:normal;font-family:Arial;font-size:24px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;padding-left:2px;padding-right:2px;}
.s2 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Top;word-wrap:break-word;overflow:hidden;padding-left:2px;padding-right:2px;}
.s3 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s4 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s5 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Top;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;}
.s6 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Top;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s7 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Top;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:0;padding-left:2px;padding-right:2px;}
.s8 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s9 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:0;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s10 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Top;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:0;border-right-width:0;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s11 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:0;border-right-width:0;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s12 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s13 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Top;word-wrap:break-word;overflow:hidden;border-bottom-width:0;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s14 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Top;word-wrap:break-word;overflow:hidden;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s15 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:0;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s16 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:1px;border-top-color:#000000;border-top-style:solid;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s17 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s18 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s19 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:1px;border-left-color:#000000;border-left-style:solid;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s20 { font-style:normal;font-family:Arial;font-size:16px;color:#000000;background-color:transparent;text-align:Right;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:1px;border-bottom-color:#000000;border-bottom-style:solid;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s21 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Center;vertical-align:Middle;word-wrap:break-word;overflow:hidden;border-bottom-width:0;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
.s22 { font-style:normal;font-family:Arial;font-size:13px;color:#000000;background-color:transparent;text-align:Left;vertical-align:Top;word-wrap:break-word;overflow:hidden;border-bottom-width:0;border-top-width:0;border-left-width:0;border-right-width:1px;border-right-color:#000000; border-right-style:solid;padding-left:2px;padding-right:2px;padding-top:1px;padding-bottom:1px;}
</style>
