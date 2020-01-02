<template>
  <div>
    <div>
      <span>类型</span>
      <el-select v-model="selectedType" filterable placeholder="请选择">
        <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <span>年份</span>
      <el-select v-model="selectedYear" filterable placeholder="请选择">
        <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="project" label="项目名称" width="100" />
      <el-table-column prop="proposer" label="申请人" width="100" />
      <el-table-column prop="address" label="地址" width="100" />
      <el-table-column prop="status" label="审批状态" width="100" />
      <el-table-column label="选择" width="50">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checked"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "examinePic",
  data() {
    return {
      types: [
        { value: "1", label: "全部类型" },
        { value: "2", label: "其他类型" }
      ],
      selectedType: "",
      years: [{ value: "1", label: "2020年" }, { value: "2", label: "2019年" }],
      selectedYear: "",
      tableData: [
        {
          project: "宅基地申请",
          proposer: "王小虎",
          address: "上海市",
          status: "联合审批"
        },
        {
          project: "宅基地申请",
          proposer: "王小虎",
          address: "上海市",
          status: "联合审批"
        },
        {
          project: "宅基地申请",
          proposer: "王小虎",
          address: "上海市",
          status: "联合审批"
        },
        {
          project: "宅基地申请",
          proposer: "王小虎",
          address: "上海市",
          status: "联合审批"
        },
        {
          project: "宅基地申请",
          proposer: "王小虎",
          address: "上海市",
          status: "联合审批"
        },
        {
          project: "宅基地申请",
          proposer: "王小虎",
          address: "上海市",
          status: "联合审批"
        },
        {
          project: "宅基地申请",
          proposer: "王小虎",
          address: "上海市",
          status: "联合审批"
        }
      ]
    };
  },
  created() {}
};
</script>

<style>
</style>