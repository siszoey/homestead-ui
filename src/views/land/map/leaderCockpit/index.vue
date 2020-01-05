<template>
  <div>
    <div class="wrap-top">
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="grid-content bg-white">
            <p class="header-title">全省县乡村数量</p>
            <el-row class="header-info">
              <el-col :span="8">
                <p class="areaName">全省县(区)数量</p>
                <p class="areaNum">{{provinceData.areaNum}}</p>
              </el-col>
              <el-col
                :span="8"
                style="border-left: 1px solid #9e9e9e7a;
                    border-right: 1px solid #9e9e9e7a;"
              >
                <p class="townName">全省乡(镇)数量</p>
                <p class="townNum">{{provinceData.townNum}}</p>
              </el-col>
              <el-col :span="8">
                <p class="villageName">全省村数量</p>
                <p class="villageNum">{{provinceData.villageNum}}</p>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-white">
            <p class="header-title">全省宅基地面积及数量统计</p>
            <el-row class="header-info">
              <el-col :span="8">
                <p class="areaName">全省县(区)数量</p>
                <p class="areaNum">{{provinceData.areaNum}}</p>
              </el-col>
              <el-col
                :span="8"
                style="border-left: 1px solid #9e9e9e7a;
                    border-right: 1px solid #9e9e9e7a;"
              >
                <p class="townName">全省乡(镇)数量</p>
                <p class="townNum">{{provinceData.townNum}}</p>
              </el-col>
              <el-col :span="8">
                <p class="villageName">全省村数量</p>
                <p class="villageNum">{{provinceData.villageNum}}</p>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="wrap-middle">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="grid-content bg-white">
            <p class="header-title">农房闲置情况分析</p>
            <el-row :gutter="15" style="background:red">
                <el-col :span="24"></el-col>
            </el-row>
            <el-row :gutter="15" style="background:green">
                <el-col :span="24"></el-col>
            </el-row>
            <el-row :gutter="15" style="background:blue">
                <el-col :span="24"></el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-white">
            <p class="header-title">宅基地现状调查分析图</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="wrap-bottom">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="grid-content bg-white">
            <p class="header-title">闲置房屋开发利用情况</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-white">
            <p class="header-title">违法处置</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-white">
            <p class="header-title">各类型审批数量统计</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      provinceData: {
        areaNum: 5824,
        townNum: 4300,
        villageNum: 1524
      }
    };
  },
  mounted() {},
  methods: {}
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
.grid-content {
  min-height: 36px;
}
.bg-white {
  background: #ffffff;
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
.areaName,
.townName,
.villageName {
  font-size: 16px;
  margin-top: 10px;
  color: #666;
  text-align: center;
}
.areaNum,
.townNum,
.villageNum {
  font-size: 0.26rem;
  margin-top: 10px;
  color: #2366ff;
  text-align: center;
}
.areaNum {
  color: #2366ff;
}
.townNum {
  color: #379bff;
}
.villageNum {
  color: #4ccfff;
}
.header-info{
    display: flex;height:120px;
}
.header-info .el-col{
    height: 80px;
    margin-top: 10px;
}
.wrap-top,
.wrap-middle,
.wrap-bottom {
  height: auto;
}
.wrap-top .grid-content {
  height: 170px;
  border: 1px solid #f2f2f2;
}
.wrap-middle,
.wrap-bottom {
  margin-top: 10px;
}
.wrap-bottom {
  margin-bottom: 20px;
}
.wrap-middle .grid-content,
.wrap-bottom .grid-content {
  height: 300px;
  border: 1px solid #f2f2f2;
}
</style>