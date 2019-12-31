<template>
  <div id="app">
    <div class="bg-gray-light body">
      <el-row>
        <el-col :span="22" :offset="1">
          <div class="body-box bg-white">
            <div class="body-header">
              <span class="body-header-title">{{model.infotitle}}</span>
              <div class="column-top">
                <div class="column-width yc">原创</div>
                <div class="column-width fbsj">发布时间 {{model.fbsj}}</div>
                <div class="column-width read-counts-ly">阅读数 {{model.readcount}}</div>
                <div class="column-width read-counts-ly">来源于农业部</div>
                <!-- <br> -->
                <p class="info-type">分类：{{model.infotype}}</p>
              </div>
            </div>
            <div class="contents" v-html="model.infocontent">{{model.infocontent}}</div>
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
      //表单字段值默认为空
      model: {
        id: 1,
        infotype: "",
        infotitle: "",
        fbsj: "",
        readcount: "",
        infocontent: ""
      }
    };
  },
  mounted() {
    //获取信息详情
    var details = JSON.parse(sessionStorage.getItem("msgDetails"));
    this.model = details;
    console.log(details);
  },
  methods: {}
};
</script>

<style>
.column-top{
  margin-top: -10px;
}
.yc {
  margin-left: 21px;
  margin-top: -0.015rem;
  color: #d30c62;
  background-color: #f9ecec;
  width: 25px;
  height: 0.13rem;
  padding: 0.02rem;
}
.fbsj {
  margin-left: 21px;
}
.read-counts-ly {
  margin-left: 10px;
}
.info-type {
  text-align: left;
    color: #333333;
    padding: 21px;
    vertical-align: middle;

}

.contents {
  padding: 5px;
  background-color: #fafafa;
  width: 94%;
  margin: 10px 23px;
  font-size: 13px;
  line-height: 1.8;
}
.column-width {
  display: inline-block !important;
  display: inline;
  float: left;
  width: auto;
}
.operate-tool {
  margin: 9px;
  float: right;
}
.el-tabs--border-card {
  margin-top: 0.091rem;
}
.bg-gray-light {
  background: #f0f2f5;
}
.bg-white {
  background: #ffffff;
}
.body {
  height: 100%;
}
.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}
.body-box {
  height: auto;
  min-height: 800px;
  border: 1px solid rgba(233, 233, 233, 1);
}
.body-box .body-header {
  height: 1rem !important;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.body-box .body-header .body-header-title {
  font-family: "MicrosoftYaHei-Bold", "微软雅黑 Bold", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  text-align: left;
  font-size: 13px;
  color: #333333;
  padding: 20px;
  line-height: 50px;
  vertical-align: middle;
}
</style>