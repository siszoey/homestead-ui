<template>
  <div id="app">
    <div class="bg-gray-light body">
      <el-row>
        <el-col :span="22" :offset="1">
          <div class="body-box bg-white">
            <div class="body-header">
              <span class="body-header-title" style="font-size:28px">宅基地信息网</span>
              <el-input
                size="small "
                v-model="input"
                placeholder="请输入标题模糊查询"
                style="width:300px;margin-left:10px;margin-top:10px"
              ></el-input>
              <el-button
                size="medium"
                type="primary"
                icon="el-icon-search"
                style="margin-left:10px"
                v-on:click="search()"
              >查询</el-button>
            </div>
            <div class="body-header" style="height:40px!important;background-color:#3580FF;">
              <span
                class="body-header-title"
                style="color:white;margin: 10px 122px;cursor:pointer"
              >信息动态</span>
            </div>

            <el-tabs
              v-model="activeName"
              @tab-click="handleClick"
              style="margin-left: 10px !important;"
            >
              <el-tab-pane label="政策法规" name="0">
                <h1 style="color:#537DAB">政策法规信息列表</h1>
              </el-tab-pane>
              <el-tab-pane label="上级信息" name="1">
                <h1 style="color:#537DAB">上级信息列表</h1>
              </el-tab-pane>
              <el-tab-pane label="巡查信息" name="2">
                <h1 style="color:#537DAB">巡查信息列表</h1>
              </el-tab-pane>
              <el-tab-pane label="建房管理群" name="3">
                <h1 style="color:#537DAB">建房管理群信息列表</h1>
              </el-tab-pane>

              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="margin-top: 11px;width: 98% !important;"
              >
                <el-table-column prop="xzqdm" label="行政区代码" width="150" v-if="hideColumn"></el-table-column>
                <el-table-column prop="infotype" label="类型" width="150" v-if="hideColumn"></el-table-column>
                <el-table-column prop="infotitle" label="信息标题" width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="fbsj" label="发布时间" width="150"></el-table-column>
                <el-table-column prop="readcount" label="阅读量" v-if="hideColumn"></el-table-column>
                <el-table-column
                  prop="infocontent"
                  label="信息内容"
                  width="230"
                  show-overflow-tooltip
                  v-if="hideColumn"
                ></el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleQuery(scope.row)" type="text" size="small">信息查阅</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-carousel
                :interval="5000"
                arrow="always"
                style="width: 500px;
    margin: -216px 0px 0px 381px;float: right;"
              >
                <el-carousel-item v-for="item in imagesbox" :key="item.id">
                  <img :src="item.path" class="image">
                </el-carousel-item>
              </el-carousel>
            </el-tabs>
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
      imagesbox: [
        { id: 0, path: require("./house.jpg") },
        { id: 1, path: require("./house1.jpg") },
        { id: 2, path: require("./house2.jpg") },
         { id: 3, path: require("./house3.jpg") },
          { id: 4, path: require("./house4.jpg") },
          { id: 5, path: require("./house5.jpg") }
      ],
      hideColumn: false,
      input: "",
      title: "",
      //默认选中，0表示类型为：政策法规
      activeName: "0",
      tableData: [
        {
          id: "1",
          xzqdm: "110000000000",
          infotype: "政策法规",
          infotitle:
            "宅基地可置换股权！奉贤农民宅基地置换开启“政策超市”，房产、现金、股权，总有一款适合你！1",
          fbsj: "2016-06-06",
          readcount: "56",
          infocontent:
            "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
        },
        {
          id: "2",
          xzqdm: "120000000000",
          infotype: "政策法规",
          infotitle:
            "宅基地可置换股权！奉贤农民宅基地置换开启“政策超市”，房产、现金、股权，总有一款适合你！2",
          fbsj: "2016-04-22",
          readcount: "432",
          infocontent:
            "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
        }
        // {
        //   id: "3",
        //   xzqdm: "130000000000",
        //   infotitle: "农业信息化建设3",
        //   fbsj: "2016-09-06",
        //   readcount: "87",
        //   infocontent:
        //     "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
        // },
        // {
        //   id: "4",
        //   xzqdm: "140000000000",
        //   infotitle: "农业信息化建设4",
        //   fbsj: "2016-08-08",
        //   readcount: "5",
        //   infocontent:
        //     "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
        // },
        // {
        //   id: "5",
        //   xzqdm: "150000000000",
        //   infotitle: "农业信息化建设5",
        //   fbsj: "2016-02-07",
        //   readcount: "77",
        //   infocontent:
        //     "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
        // },
        // {
        //   id: "6",
        //   xzqdm: "210000000000",
        //   infotitle: "农业信息化建设6",
        //   fbsj: "2016-05-01",
        //   readcount: "88",
        //   infocontent:
        //     "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
        // },
        // {
        //   id: "7",
        //   xzqdm: "220000000000",
        //   infotitle: "农业信息化建设7",
        //   fbsj: "2019-01-03",
        //   readcount: "271",
        //   infocontent:
        //     "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
        // }
      ],
      multipleSelection: [],
      multipleSelectionData: [],
      publishData: {}
    };
  },
  methods: {
    handleClick(tab, event) {
      //this.tableData=[];
      //console.log(tab, event);
      //type为0表示类型为：政策法规；1表示类型为：上级信息;2表示类型为：巡查信息;3表示类型为：建房管理群
      var type = this.activeName;
      this.ajaxSync(type, "");
    },
    handleQuery(row) {
      sessionStorage.setItem("msgDetails", JSON.stringify(row));
      this.$router.push("msgDetails"); //跳转到指定页面
    },
    //搜索
    search() {
      //this.ajaxSync("","");
    },
    //ajax请求api,传入参数：类型和标题
    ajaxSync(type, title) {
      var _this = this; //在ajax中必须将this重新赋一个新对象接收，否则ajax中获取不到vue变量
      var list = [];
      switch (type) {
        case "0":
          list = [
            {
              id: "1",
              xzqdm: "110000000000",
              infotype: "政策法规",
              infotitle:
                "宅基地可置换股权！奉贤农民宅基地置换开启“政策超市”，房产、现金、股权，总有一款适合你！1",
              fbsj: "2016-06-06",
              readcount: "56",
              infocontent:
                "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
            },
            {
              id: "2",
              xzqdm: "120000000000",
              infotype: "政策法规",
              infotitle:
                "宅基地可置换股权！奉贤农民宅基地置换开启“政策超市”，房产、现金、股权，总有一款适合你！2",
              fbsj: "2016-04-22",
              readcount: "432",
              infocontent:
                "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
            }
          ];
          break;
        case "1":
          list = [
            {
              id: "3",
              xzqdm: "130000000000",
              infotype: "上级信息",
              infotitle:
                "宅基地可置换股权！奉贤农民宅基地置换开启“政策超市”，房产、现金、股权，总有一款适合你！3",
              fbsj: "2016-09-06",
              readcount: "87",
              infocontent:
                "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
            },
            {
              id: "4",
              xzqdm: "140000000000",
              infotype: "上级信息",
              infotitle:
                "宅基地可置换股权！奉贤农民宅基地置换开启“政策超市”，房产、现金、股权，总有一款适合你！4",
              fbsj: "2016-08-08",
              readcount: "5",
              infocontent:
                "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
            }
          ];
          break;
        case "2":
          list = [
            {
              id: "5",
              xzqdm: "150000000000",
              infotype: "巡查信息",
              infotitle:
                "宅基地可置换股权！奉贤农民宅基地置换开启“政策超市”，房产、现金、股权，总有一款适合你！5",
              fbsj: "2016-02-07",
              readcount: "77",
              infocontent:
                "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
            },
            {
              id: "6",
              xzqdm: "210000000000",
              infotype: "巡查信息",
              infotitle:
                "宅基地可置换股权！奉贤农民宅基地置换开启“政策超市”，房产、现金、股权，总有一款适合你！6",
              fbsj: "2016-05-01",
              readcount: "88",
              infocontent:
                "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
            }
          ];
          break;
        default:
          list = [
            {
              id: "7",
              xzqdm: "220000000000",
              infotype: "建房管理群",
              infotitle:
                "宅基地可置换股权！奉贤农民宅基地置换开启“政策超市”，房产、现金、股权，总有一款适合你！7",
              fbsj: "2019-01-03",
              readcount: "271",
              infocontent:
                "农村信息化是通讯技术和计算机技术在农村生产、生活和社会管理中实现普遍应用和推广的过程。农村信息化是社会信息化的一部分，它首先是一种社会经济形态，是农村经济发展到某一特定过程的概念描述。它不仅包括农业信息技术，还应包括微电子技术、通信技术、光电技术等在农村生产、生活、管理等方面普遍而系统应用的过程。农村信息化包括了传统农业发展到现代农业进而向信息农业演进的过程，又包含在原始社会发展到资本社会进而向信息社会发展的过程中。"
            }
          ];
          break;
      }
      _this.tableData = list;
      // $.ajax({
      //   url: "",
      //   type: "get",
      //   data: {intotype:type,infotitle:title},
      //   dataType: "json",
      //   async: false,
      //   success: function(res) {
      //      _this.tableData = res.data;
      //   },
      //   error: function() {
      //     // ...
      //   }
      // });
    }
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-table__header-wrapper {
  margin-left: 2px !important;
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
  border: 1px solid rgba(233, 233, 233, 1);
}
.body-box .body-header {
  height: 50px;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.body-box .body-header .body-header-title {
  font-size: 30px;
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