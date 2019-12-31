<template>
  <div class="bg-gray-light body">
    <el-row>
      <el-col :span="22" :offset="1">
        <div class="body-box bg-white">
          <div class="body-header">
            <span class="body-header-title">安全管理</span>
          </div>
          <div style="height:300px;">安全管理</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .bg-gray-light{
    background:#F0F2F5;
  }
  .bg-white{
    background:#FFFFFF;
  }
  .body{
    height:100%;
  }
  .el-row{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  /* body-box部分 */
  .body-box{
    height:auto;
    border: 1px solid rgba(233, 233, 233, 1);
  }
  .body-box .body-header{
    height: 50px;
    border-bottom: 1px solid rgba(233, 233, 233, 1);
  }
  .body-box .body-header .body-header-title{
    font-family: 'MicrosoftYaHei-Bold', '微软雅黑 Bold', '微软雅黑';
    font-weight: 700;
    font-style: normal;
    text-align: left;
    font-size: 13px;
    color: #333333;
    padding:20px;
    line-height:50px;
    vertical-align:middle;
  }
</style>