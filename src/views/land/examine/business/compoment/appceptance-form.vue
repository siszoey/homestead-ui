<template>
  <div>
    <el-form ref="form" :model="form">
      <h1>申请户主信息</h1>
      <el-row>
        <el-col :span="6">
          <el-form-item label="申请户主">
            <el-input v-model="form.name" placeholder="申请户主"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="身份证号">
            <el-input v-model="form.idNum" placeholder="身份证号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h1>批准宅基地及建房情况</h1>
      <el-row>
        <el-col :span="6">
          <el-form-item label="乡村建设规划许可证">
            <el-input v-model="form.planNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="农村宅基地批准书号">
            <el-input v-model="form.confirmNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="开工日期">
            <el-date-picker
              v-model="form.startTime"
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
              v-model="form.endtime"
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
            <el-input v-model="form.confirmArea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="实用宅基地面积(㎡)">
            <el-input v-model="form.usedArea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="批准房基占地面积(㎡)">
            <el-input v-model="form.confirmCoverArea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="实际房基占地面积(㎡)">
            <el-input v-model="form.usedCoverArea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="批准层数">
            <el-input v-model="form.confirmFloorCount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="竣工层数">
            <el-input v-model="form.usedFloorCount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="批准高度(米)">
            <el-input v-model="form.confirmHeight"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="竣工高度(米)">
            <el-input v-model="form.usedHeight"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="拆旧退还宅基地情况">
            <el-select v-model="form.oldRefund" filterable placeholder="请选择">
              <el-option
                v-for="item in oldRefunds"
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
            <el-input v-model="form.endSketchPreson"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h1>农业农村部门验收意见</h1>
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
      <h1>自然资源部门验收意见</h1>
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
      <h1>乡镇政府验收意见</h1>
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
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea"></el-input>
      </el-form-item>
      <el-row>
        <el-form-item>
          <el-button type="primary" >提交</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "appceptance-form",
  data() {
    return {
      form: {},
      oldRefunds: [
        { value: "1", label: "1.不属于" },
        { value: "2", label: "2.属于，已落实" },
        { value: "3", label: "3.属于，尚未落实" }
      ],
      formLabel:{
        //意见
        spyj:{
          zrzybmyj:"",
          zrzybmfzr:"",
          zrzybmrq:"",
          nyncbscyj:"",
          nyncbfzr:"",
          nyncbrq:"",
          xzzfshyj:"",
          xzzffzr:"",
          xzzfrq:""
        }
      }     
    };
  },
  created() {
    
  },
  methods: {
    
  }
};
</script>

<style>
</style>
