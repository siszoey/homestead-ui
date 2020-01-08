<template>
    <div>
        <el-form
                :disabled="disabled"
                inline="true"
                ref="form"
                :model="form"
                label-position="top">
            <h2>申请户主信息</h2>
<!--            <el-row>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="申请户主">
                        <el-input v-model="detail.jcxx.xm" placeholder="申请户主" disabled></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="身份证号">
                        <el-input v-model="detail.jcxx.sfzh" placeholder="身份证号" disabled></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--            </el-row>-->
            <h2>批准宅基地及建房情况</h2>
<!--            <el-row>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="乡村建设规划许可证">
                        <el-input v-model="form.ysyj.xkz"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="农村宅基地批准书号">
                        <el-input v-model="form.ysyj.pzsh"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--            </el-row>-->
<!--            <el-row>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="开工日期">
                        <el-date-picker
                                v-model="form.ysyj.kgrq"
                                type="date"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                        />
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="竣工日期">
                        <el-date-picker
                                v-model="form.ysyj.jgrq"
                                type="date"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                        />
                    </el-form-item>
<!--                </el-col>-->
<!--            </el-row>-->
<!--            <el-row>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="批准宅基地面积(㎡)">
                        <el-input v-model="form.ysyj.pzzjdmj"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="实用宅基地面积(㎡)">
                        <el-input v-model="form.ysyj.syzjdmj"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="批准房基占地面积(㎡)">
                        <el-input v-model="form.ysyj.pzfjzdmj"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="实际房基占地面积(㎡)">
                        <el-input v-model="form.ysyj.sjfjzdmj"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--            </el-row>-->
<!--            <el-row>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="批准层数">
                        <el-input v-model="form.ysyj.pjcs"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="竣工层数">
                        <el-input v-model="form.ysyj.jgcs"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="批准高度(米)">
                        <el-input v-model="form.ysyj.pjgd"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="竣工高度(米)">
                        <el-input v-model="form.ysyj.jggd"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--            </el-row>-->
<!--            <el-row>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="拆旧退还宅基地情况">
                        <el-select v-model="form.ysyj.cjthzjdqk" filterable placeholder="请选择">
                            <el-option
                                    v-for="item in cjthzjdqk"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
<!--                </el-col>-->
<!--            </el-row>-->
            <h2>竣工平面简图(标注长宽及四至)</h2>
<!--            <el-row>-->
<!--                <el-col :span="6">-->
                    <el-form-item label="经办人">
                        <el-input v-model="form.ysyj.jgpmtjbr"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--            </el-row>-->
            <h2>农业农村部门验收意见</h2>
<!--            <el-row>-->
<!--                <el-col :span="14">-->
                    <el-form-item label="农业农村部门审查意见">
                        <el-input v-model="form.ysyj.nyncbyj" placeholder="农业农村部门审查意见"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="5">-->
                    <el-form-item label="农业农村部门负责人">
                        <el-input v-model="form.ysyj.nyncbjbr" placeholder="农业农村部门负责人"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="5">-->
                    <el-form-item label="农业农村部门填写日期">
                        <el-date-picker
                                v-model="form.ysyj.nyncbrq"
                                type="date"
                                placeholder="选择日期" style="width:100%;">
                        </el-date-picker>
                    </el-form-item>
<!--                </el-col>-->
<!--            </el-row>-->
            <h2>自然资源部门验收意见</h2>
<!--            <el-row>-->
<!--                <el-col :span="14">-->
                    <el-form-item label="自然资源部门意见">
                        <el-input v-model="form.ysyj.zrzybmyj" placeholder="自然资源部门意见"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="5">-->
                    <el-form-item label="自然资源部门负责人">
                        <el-input v-model="form.ysyj.zrzyjbr" placeholder="自然资源部门负责人"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="5">-->
                    <el-form-item label="自然资源部门填写日期">
                        <el-date-picker
                                v-model="form.ysyj.zrzyrq"
                                type="date"
                                placeholder="选择日期" style="width:100%;">
                        </el-date-picker>
                    </el-form-item>
<!--                </el-col>-->
<!--            </el-row>-->
            <h2>乡镇政府验收意见</h2>
<!--            <el-row>-->
<!--                <el-col :span="14">-->
                    <el-form-item label="乡镇政府审核批准意见">
                        <el-input v-model="form.ysyj.xzzfysyj" placeholder="乡镇政府审核批准意见"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="5">-->
                    <el-form-item label="乡镇政府负责人">
                        <el-input v-model="form.ysyj.xzzffzr" placeholder="乡镇政府负责人"></el-input>
                    </el-form-item>
<!--                </el-col>-->
<!--                <el-col :span="5">-->
                    <el-form-item label="乡镇政府填写日期">
                        <el-date-picker
                                v-model="form.ysyj.xzzfrq"
                                type="date"
                                placeholder="选择日期" style="width:100%;">
                        </el-date-picker>
                    </el-form-item>
<!--                </el-col>-->
<!--            </el-row>-->
            <el-form-item label="备注">
                <el-input v-model="form.ysyj.bz" type="textarea"></el-input>
            </el-form-item>
            <el-row>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>

<script>
  import {submitAcceptance} from '@/api/land.examine'

  export default {
    name: "appceptance-form",
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

    },
    methods: {
      submitForm() {
        submitAcceptance(this.form.ysyj).then(res => {
          this.$message({type: 'success', message: '提交成功'})
          this.disabled = false
        })
      }
    }
  }
</script>

<style>
</style>
