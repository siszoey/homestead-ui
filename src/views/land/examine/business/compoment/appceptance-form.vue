<template>
  <div>
    <el-form ref="form" :model="form">
      <el-form-item label="申请户主">
        <el-input v-model="form.name" size="small"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.idNum" size="small"></el-input>
      </el-form-item>
      <el-form-item label="乡村建设规划许可证">
        <el-input v-model="form.planNum" size="small"></el-input>
      </el-form-item>
      <el-form-item label="农村宅基地批准书号">
        <el-input v-model="form.confirmNum" size="small"></el-input>
      </el-form-item>
      <el-form-item label="开工日期">
        <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="竣工日期">
        <el-date-picker v-model="form.endtime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="批准宅基地面积(㎡)">
        <el-input v-model="form.confirmArea" size="small"></el-input>
      </el-form-item>
      <el-form-item label="实用宅基地面积(㎡)">
        <el-input v-model="form.usedArea" size="small"></el-input>
      </el-form-item>
      <el-form-item label="批准房基占地面积(㎡)">
        <el-input v-model="form.confirmCoverArea" size="small"></el-input>
      </el-form-item>
      <el-form-item label="实际房基占地面积(㎡)">
        <el-input v-model="form.usedCoverArea" size="small"></el-input>
      </el-form-item>
      <el-form-item label="批准层数">
        <el-input v-model="form.confirmFloorCount" size="small"></el-input>
      </el-form-item>
      <el-form-item label="竣工层数">
        <el-input v-model="form.usedFloorCount" size="small"></el-input>
      </el-form-item>
      <el-form-item label="批准高度(米)">
        <el-input v-model="form.confirmHeight" size="small"></el-input>
      </el-form-item>
      <el-form-item label="竣工高度(米)">
        <el-input v-model="form.usedHeight" size="small"></el-input>
      </el-form-item>
      <el-form-item label="拆旧退还宅基地情况">
        <el-input v-model="form.oldRefund" size="small"></el-input>
      </el-form-item>
      <el-form-item label="竣工平面简图经办人">
        <el-input v-model="form.endSketchPreson" size="small"></el-input>
      </el-form-item>
      <el-form-item label="农业农村部门验收意见">
        <el-input v-model="form.ruralBranchView" size="small"></el-input>
      </el-form-item>
      <el-form-item label="农业农村部门验收经办人">
        <el-input v-model="form.ruralBranchPerson" size="small"></el-input>
      </el-form-item>
      <el-form-item label="农业农村部门验收时间">
        <el-date-picker v-model="ruralBranchTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="自然资源部门验收意见">
        <el-input v-model="form.resourceBranchView" size="small"></el-input>
      </el-form-item>
      <el-form-item label="自然资源部门验收经办人">
        <el-input v-model="form.resourceBranchPerson" size="small"></el-input>
      </el-form-item>
      <el-form-item label="自然资源部门验收时间">
        <el-date-picker v-model="form.resourceBranchTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="乡镇政府验收意见">
        <el-input v-model="form.townBranchView" size="small"></el-input>
      </el-form-item>
      <el-form-item label="乡镇政府验收经办人">
        <el-input v-model="form.townBranchPerson" size="small"></el-input>
      </el-form-item>
      <el-form-item label="乡镇政府验收时间">
        <el-date-picker v-model="form.townBranchTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" size="small"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAppceptcance, setAppceptcance } from "../../../../../api/res.business";
export default {
  name: "appceptance-form",
  data() {
    return {
      form: {}
    };
  },
  created() {
    getAppceptcance()
      .then(res => {
        this.form = res;
      })
      .catch(err => console.log(err))
      .finally(() => {});
  }
};
</script>

<style>
</style>
