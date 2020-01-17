<template>
  <div>
    <div class="wrap-top">    
      <el-row style="padding-bottom:25px">
        <el-col :span="12" style="padding:0px 25px 0px 5px;height:610px;">
            <el-row>
                <el-col :span="24" style="height:300px;border:1px solid #F2F2F2">
                    <p class="header-title">不同乡镇的发布数量</p>
                    <div ref="pieMain" :style="{width: '100%',height:'250px',margin:'0 auto'}"></div>             
                </el-col>
                <el-col :span="24" style="height:300px;border:1px solid #F2F2F2">
                    <p class="header-title">不同乡镇的发布数量</p>
                    <div ref="pieMain" :style="{width: '100%',height:'250px',margin:'0 auto'}"></div>             
                </el-col>
                <el-col :span="24" style="height:300px;margin-top:10px;border:1px solid #F2F2F2">
                    <p class="header-title">不同时间的发布数量</p>
                    <div ref="barMain" :style="{width: '100%',height:'250px',margin:'0 auto'}"></div>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="12" style="padding:0px 25px 0px 5px;height:610px;">
          <el-row>
            <el-col :span="24" style="height:300px;border:1px solid #F2F2F2">
              <p class="header-title">闲置宅基地价格公布</p>
              <div ref="pieMain" :style="{width: '100%',height:'250px',margin:'0 auto'}"></div>             
            </el-col>
            <el-col :span="24" style="height:300px;margin-top:10px;border:1px solid #F2F2F2">
              <p class="header-title">注册人统计</p>
              <div ref="barMain" :style="{width: '100%',height:'250px',margin:'0 auto'}"></div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {

  mounted() {
    
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.body {
  overflow: auto;
}
.wrap-top {
  background: #ffffff;
  // margin-top:10px;
}
.header-title {
  margin: 0;
  font-size: 18px;
  color: #333333;
  padding: 0px 15px;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
}
.progress-box {
  margin-top: 10px;
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
}
.grid-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.wrap-top {
  background: #ffffff;
  // margin-top:10px;
}
.queryForm {
  padding: 25px 15px 10px 25px;
  margin: 0px;
}
</style>