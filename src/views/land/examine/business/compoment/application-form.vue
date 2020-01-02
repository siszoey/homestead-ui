<template>
    <div>
        <el-form

                :model="form"
                label-position="top"
                :rules="rules"
                ref="form">

            <h1>申请户主信息</h1>
            <el-row>
                <el-col :span="4">
                    <el-form-item label="姓名" prop="jcxx.xm">
                        <el-input v-model="form.jcxx['xm']" placeholder="姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="性别" prop="jcxx.xb">
                        <el-select v-model="form.jcxx['xb']" placeholder="性别">
                            <el-option v-for="(option, index) in getDicts('性别')" :label="option.optName"
                                       :value="option.optCode" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="年龄" prop="jcxx.nl">
                        <el-input v-model.number="form.jcxx['nl']" placeholder="年龄"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="联系电话" prop="jcxx.lxdh">
                        <el-input v-model.number="form.jcxx['lxdh']" placeholder="联系电话"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="身份证号" prop="jcxx.sfzh">
                        <el-input v-model="form.jcxx['sfzh']" placeholder="身份证号"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="户口所在" prop="jcxx.hksz">
                        <el-input v-model="form.jcxx['hksz']" placeholder="户口所在"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <h1>家庭成员</h1>
            <el-button type="success" @click="addJTCYDomain" style="display: inline;">新增成员</el-button>
            <el-row v-for="(domain, index) in form.jtcy">
                <el-col :span="4">
                    <el-form-item label="姓名">
                        <el-input v-model="domain['xm']" placeholder="姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="年龄"
                                  :prop="'jtcy.' + index + '.nl'"
                                  :rules="{type: 'number', message: '必须为数字值'}">
                        <el-input v-model.number="domain['nl']" placeholder="年龄"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="与户主关系">
                        <el-input v-model="domain['yhzgx']" placeholder="与户主关系"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="身份证号">
                        <el-input v-model="domain['sfzh']" placeholder="身份证号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="户口所在">
                        <el-input v-model="domain['hkszd']" placeholder="户口所在"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item>
                        <el-button type="danger" @click.prevent="removeJTCYDomain(domain)">删除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>

            <h1>现宅基地及农房情况</h1>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="宅基地面积" prop="xzjxqk.zjdmj">
                        <el-input v-model.number="form.xzjxqk['zjdmj']" placeholder="宅基地面积"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="建筑面积" prop="xzjxqk.jzmj">
                        <el-input v-model.number="form.xzjxqk['jzmj']" placeholder="建筑面积"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="权属证书号" prop="xzjxqk.qszsh">
                        <el-input v-model="form.xzjxqk['qszsh']" placeholder="权属证书号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="现宅基地处置情况" prop="xzjxqk.xzjdclqk">
                        <el-select v-model="form.xzjxqk['xzjdclqk']" placeholder="现宅基地处置情况">
                            <el-option v-for="(option, index) in getDicts('是否')" :label="option.optName"
                                       :value="option.optCode" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <h1>拟申请宅基地及建房（规划许可）情况</h1>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="宅基地面积" prop="nzjdqk.zjdmj">
                        <el-input v-model.number="form.nzjdqk['zjdmj']" placeholder="姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="房基占地面积" prop="nzjdqk.fjzdmj">
                        <el-input v-model.number="form.nzjdqk['fjzdmj']" placeholder="房基占地面积"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="地址" prop="nzjdqk.dz">
                        <el-input v-model="form.nzjdqk['dz']" placeholder="地址"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="四至东至" prop="nzjdqk.szdz">
                        <el-input v-model="form.nzjdqk['szdz']" placeholder="四至东至"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="四至西至" prop="nzjdqk.szxz">
                        <el-input v-model="form.nzjdqk['szxz']" placeholder="四至西至"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="四至北至" prop="nzjdqk.szbz">
                        <el-input v-model="form.nzjdqk['szbz']" placeholder="四至北至"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="四至南至" prop="nzjdqk.sznz">
                        <el-input v-model="form.nzjdqk['sznz']" placeholder="四至南至"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="住房建筑面积" prop="nzjdqk.zfjzmj">
                        <el-input v-model.number="form.nzjdqk['zfjzmj']" placeholder="住房建筑面积"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="建筑层数" prop="nzjdqk.jzcs">
                        <el-input v-model.number="form.nzjdqk['jzcs']" placeholder="建筑层数"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="建筑高度" prop="nzjdqk.jzgd">
                        <el-input v-model.number="form.nzjdqk['jzgd']" placeholder="建筑高度"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="地类" prop="nzjdqk.dl">
                        <el-select v-model="form.nzjdqk['dl']" placeholder="地类">
                            <el-option v-for="(option, index) in getDicts('地类')" :label="option.optName"
                                       :value="option.optCode" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="建房类型" prop="nzjdqk.jflx">
                        <el-select v-model="form.nzjdqk['jflx']" placeholder="建房类型">
                            <el-option v-for="(option, index) in getDicts('建房类型')" :label="option.optName"
                                       :value="option.optCode" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否征求相邻权利人意见" prop="nzjdqk.sfzqxlqlryj">
                        <el-select v-model="form.nzjdqk['sfzqxlqlryj']" placeholder="是否征求相邻权利人意见">
                            <el-option v-for="(option, index) in getDicts('是否')" :label="option.optName"
                                       :value="option.optCode" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <h1>理由和意见</h1>
            <el-row>
                <el-col :span="14">
                    <el-form-item label="申请理由" prop="qt.sqly">
                        <el-input v-model="form.qt['sqly']" placeholder="申请理由"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="申请人" prop="qt.sqr">
                        <el-input v-model="form.qt['sqr']" placeholder="申请人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="申请日期" prop="qt.sqrq">
                        <el-date-picker
                                v-model="form.qt['sqrq']"
                                type="date"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <el-form-item label="村民小组意见" prop="qt.cmxzyj">
                        <el-input v-model="form.qt['cmxzyj']" placeholder="申请理由"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="负责人" prop="qt.cmxzfzr">
                        <el-input v-model="form.qt['cmxzfzr']" placeholder="负责人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="日期" prop="qt.cmxzrq">
                        <el-date-picker
                                v-model="form.qt['cmxzrq']"
                                type="date"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <el-form-item label="村集体经济组织或村民委员会意见" prop="qt.cmwyhyj">
                        <el-input v-model="form.qt['cmwyhyj']" placeholder="村集体经济组织或村民委员会意见"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="负责人" prop="qt.cmwyhfzr">
                        <el-input v-model="form.qt['cmwyhfzr']" placeholder="负责人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="日期" prop="qt.cmwyhrq">
                        <el-date-picker
                                v-model="form.qt['cmwyhrq']"
                                type="date"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">创建</el-button>
                    <el-button type="primary" @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-row>
        </el-form>

    </div>
</template>

<script>
  import dictMixins from '../../../mixnis/dict-mixnis'
  import {postApplication} from '@/api/land.business'

  export default {
    name: 'application-form',
    mixins: [
      dictMixins
    ],
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
            jflx: '',
            zfjzmj: '',
            jzcs: '',
            jzgd: '',
            sfzqxlqlryj: ''
          },
          //其他
          qt: {
            sqly: '',
            sqr: '',
            sqrq: '',
            cmxzyj: '',
            cmxzfzr: '',
            cmxzrq: '',
            cmwyhyj: '',
            cmwyhfzr: '',
            cmwyhrq: '',
          },
        },

        rules: {}
      }
    },
    created() {
      this.formValidate()
    },
    methods: {
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
          console.log(this.form)
          if (valid) {
            postApplication(this.ruleForm).then(res => {
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
    //默认下拉框不会最大宽度
    .el-select.el-select--default {
        width: 100%;
    }
</style>
