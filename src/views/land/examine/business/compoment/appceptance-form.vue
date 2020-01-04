<template>
  <div>
    <el-form ref="form" :model="form">
      <h1>申请户主信息</h1>
      <el-row>
        <el-col :span="6">
          <el-form-item label="申请户主">
            <el-input v-model="form.sqhz" placeholder="申请户主"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="身份证号">
            <el-input v-model="form.sfzh" placeholder="身份证号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h1>批准宅基地及建房情况</h1>
      <el-row>
        <el-col :span="6">
          <el-form-item label="乡村建设规划许可证">
            <el-input v-model="form.xkz"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="农村宅基地批准书号">
            <el-input v-model="form.pzsh"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="开工日期">
            <el-date-picker
              v-model="form.kgrq"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="竣工日期">
            <el-date-picker
              v-model="form.jgrq"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="批准宅基地面积(㎡)">
            <el-input v-model="form.pzzjdmj"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="实用宅基地面积(㎡)">
            <el-input v-model="form.syzjdmj"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="批准房基占地面积(㎡)">
            <el-input v-model="form.pzfjzdmj"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="实际房基占地面积(㎡)">
            <el-input v-model="form.sjfjzdmj"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="批准层数">
            <el-input v-model="form.pjcs"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="竣工层数">
            <el-input v-model="form.jgcs"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="批准高度(米)">
            <el-input v-model="form.pjgd"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="竣工高度(米)">
            <el-input v-model="form.jggd"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="拆旧退还宅基地情况">
            <el-select v-model="form.cjthzjdqk" filterable placeholder="请选择">
              <el-option
                v-for="item in cjthzjdqk"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <h1>竣工平面简图(标注长宽及四至)</h1>
      <el-row>
        <el-col :span="6">
          <el-form-item label="经办人">
            <el-input v-model="form.jgpmtjbr"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h1>农业农村部门验收意见</h1>
      <el-form-item label="验收意见">
        <el-input v-model="form.nyncbyj" type="textarea"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="验收经办人">
            <el-input v-model="form.nyncbjbr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="验收时间">
            <el-date-picker
              v-model="form.nyncbrq"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <h1>自然资源部门验收意见</h1>
      <el-form-item label="验收意见">
        <el-input v-model="form.zrzybmyj" type="textarea"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="验收经办人">
            <el-input v-model="form.zrzyjbr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="验收时间">
            <el-date-picker
              v-model="form.zrzyrq"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <h1>乡镇政府验收意见</h1>
      <el-form-item label="验收意见">
        <el-input v-model="form.xzzfysyj" type="textarea"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="验收经办人">
            <el-input v-model="form.xzzffzr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="验收时间">
            <el-date-picker
              v-model="form.xzzfrq"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input v-model="form.bz" type="textarea"></el-input>
      </el-form-item>
      <el-row>
        <el-form-item>
          <el-button type="primary" @click="submit()">提交</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  getAppceptcance,
  setAppceptcance
} from "../../../../../api/res.business";
export default {
  name: "appceptance-form",
  data() {
    return {
      form: {
        //验收意见
        ysyj: {
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
        { value: "1", label: "1.不属于" },
        { value: "2", label: "2.属于，已落实" },
        { value: "3", label: "3.属于，尚未落实" }
      ]
    };
  },
  created() {
    getAppceptcance()
      .then(res => {
        this.form = res;
      })
      .catch(err => console.log(err))
      .finally(() => {});
  },
  methods: {
    submit() {
      setAppceptcance(this.form)
        .then(res => {
          this.$message({
            message: "提交成功",
            type: "success"
          });
        })
        .catch(() => {
          this.$message({
            message: "提交失败",
            type: "error"
          });
        })
        .finally(() => {});
    }
  }
};
</script>

<style>
</style>
