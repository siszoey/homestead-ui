<template>
  <d2-container>
    <el-form :inline="true" :model="queryForm" ref="queryForm" size="mini" style="margin-bottom: -25px;">
      <el-form-item label="申请类型" prop="jflx">
        <el-select v-model="queryForm['jflx']">
          <el-option v-for="(option, oIndex) in getDicts('建房类型')" :label="option.optName" :value="option.optCode"
            :key="oIndex"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="办理状态" prop="blzt">
        <el-select v-model="queryForm['blzt']">
          <el-option v-for="(option, oIndex) in getDicts('办理状态')" :label="option.optName" :value="option.optCode"
            :key="oIndex"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="项目编号" prop="sqid">
        <el-input v-model="queryForm['sqid']" placeholder="项目编号"></el-input>
      </el-form-item>

      <!--            <el-form-item label="申请时间">-->
      <!--                <el-date-picker-->
      <!--                        v-model="queryForm['sqsj']"-->
      <!--                        type="daterange"-->
      <!--                        range-separator="至"-->
      <!--                        format="yyyy 年 MM 月 dd 日"-->
      <!--                        value-format="yyyy-MM-dd"-->
      <!--                        start-placeholder="开始日期"-->
      <!--                        end-placeholder="结束日期">-->
      <!--                </el-date-picker>-->
      <!--            </el-form-item>-->

      <div style="float: right">
        <el-form-item>
          <!-- <el-button type="warning" @click="batchReport">
            <d2-icon name="upload" />批量上报
          </el-button> -->
          <el-button type="primary" @click="getTableData">
            <d2-icon name="search" />查询
          </el-button>
          <el-button type="default" @click="handleFormReset('queryForm')">
            <d2-icon name="refresh" />
          </el-button>
        </el-form-item>
      </div>
    </el-form>

    <!-- table表格 -->
    <el-table :key="table.key" :data="table.list" v-loading="table.listLoading" element-loading-text="拼命加载中..."
      highlight-current-row stripe style="width: 100%">
      <!--<el-table-column
                    type="selection"
                    width="55">
      </el-table-column>-->

      <el-table-column align="center" label="项目编号" width="155">
        <template slot-scope="scope">
          <span>{{scope.row.jcxx.sqid}}</span>
        </template>
      </el-table-column>

      <!--            <el-table-column align="center" label="项目名称">-->
      <!--                <template slot-scope="scope">-->
      <!--                    <span>{{getOptName('建房类型', scope.row.nzjdqk.jflx)}}</span>-->
      <!--                </template>-->
      <!--            </el-table-column>-->

      <el-table-column align="center" label="申请类型">
        <template slot-scope="scope">
          <span>{{getOptName('建房类型', scope.row.nzjdqk.jflx)}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="申请时间">
        <template slot-scope="scope">
          <span>{{scope.row.qt.sqrrq}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="申请人">
        <template slot-scope="scope">
          <span>{{scope.row.jcxx.xm}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="申请面积">
        <template slot-scope="scope">
          <span>{{scope.row.nzjdqk.zjdmj}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="联系方式" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.jcxx.lxdh}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="办理状态">
        <template slot-scope="scope">
          <span>{{getOptName('办理状态', scope.row.zjdSqJl.blzt)}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="办理角色">
        <template slot-scope="scope">
          <span>{{getProcessRole(scope.row.zjdSqJl.roleid)}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="项目状态">
        <template slot-scope="scope">
          <span>{{getOptName('项目状态', scope.row.zjdSqJl.xmzt)}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetail(scope.row)">查看详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- footer 分页条 -->
    <template slot="footer">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="table.pageNum" :page-sizes="[10,20,30,50]" :page-size="table.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="table.total" style="margin: -10px;"></el-pagination>
    </template>

    <!-- <el-dialog title="批量上报" width="60%" :visible.sync="createBatchReportDialog">
      <div class="dialog-content">
        <div class="content">
          <div class="content-box" @click="toCreateView(option.optCode)">
            <el-table :key="table.key" :data="reportList" height="400" v-loading="table.listLoading"
              element-loading-text="拼命加载中..." highlight-current-row stripe ref="multipleTable"
              @selection-change="handleSelectionChange" style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>

              <el-table-column align="center" label="项目编号" width="155">
                <template slot-scope="scope">
                  <span>{{scope.row.jcxx.sqid}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="申请类型">
                <template slot-scope="scope">
                  <span>{{getOptName('建房类型', scope.row.nzjdqk.jflx)}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="申请时间"
                :filters="[{ text: '第一季度', value: '1' }, { text: '第二季度', value: '2' }, { text: '第三季度', value: '3' }, { text: '第四季度', value: '4' }]"
                :filter-method="filterDate" :filter-multiple="false" :filtered-value="dqjd"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                  <span>{{scope.row.qt.sqrrq}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="申请人">
                <template slot-scope="scope">
                  <span>{{scope.row.jcxx.xm}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="联系方式" width="120">
                <template slot-scope="scope">
                  <span>{{scope.row.jcxx.lxdh}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="项目状态" width="185"
                :filters="[{ text: '乡镇政府验收收件', value: '1' }, { text: '乡镇政府验收审批备案', value: '2' }]"
                :filter-method="spjdFilter" :filter-multiple="false" :filtered-value="spjd"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                  <span>{{getOptName('项目状态', scope.row.zjdSqJl.xmzt)}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="report" size="small">确 定</el-button>
      </span>
    </el-dialog> -->
  </d2-container>
</template>

<script>
  import request from "@/plugin/axios";
  import { PageData, DeleteProcess, BatchReport } from "../../../../api/land.business";
  import dictMixins from "../../mixnis/dict-mixnis";
  import processMixins from "../../mixnis/process-mixnis";
  import pageMixins from "../../mixnis/page-mixnis";
  import { mapState } from "vuex";
  import { clone } from "ol/extent";
  import JSZip from "jszip";
  import FileSaver from "file-saver";

  export default {
    name: "examine-all",
    components: {},
    mixins: [dictMixins, pageMixins, processMixins],
    data() {
      return {
        queryForm: {
          jflx: undefined,
          sqid: undefined,
          sqmc: undefined,
          sqsj: undefined
        },
        dqjd: null,
        spjd: ["2"],
        reportList: null,
        multipleTable: [], //存放选中值的数组
        createBatchReportDialog: false,
        backEndUrl: process.env.VUE_APP_END_URL,
        files: []
      };
    },
    created() {
      this.getTableData();
    },
    computed: {
      ...mapState("d2admin/user", ["info"])
    },
    methods: {
      getTableData() {
        this.table.listLoading = true;
        //获取表格内数据
        PageData(this.getTableDataParam())
          .then(res => {
            this.table.list = res.records || res.list || res.data;
            this.table.total = res.total;
          })
          .catch(err => console.log(err))
          .finally(() => {
            this.table.listLoading = false;
          });
      },
      // //点击上报按钮
      // async batchReport() {
      //   this.table.listLoading = true;
      //   //获取可批量上报项目数据
      //   await PageData({ pageNum: -1, pageSize: -1 })
      //     .then(res => {
      //       let list = res.records || res.list || res.data;
      //       this.reportList = list.filter(function (item) {
      //         if (item.zjdSqJl.xmzt == 6 && item.jcxx.firstReport == null){
      //           this.spjd[0]="1";
      //           return item;
      //         }else if(item.zjdSqJl.xmzt == 9 && item.jcxx.secondReport == null){
      //           return item;
      //         }
      //       });
      //     })
      //     .catch(err => console.log(err))
      //     .finally(() => {
      //       this.table.listLoading = false;
      //     });
      //   this.dqjd = null;
      //   let nowDate = new Date();
      //   let month = nowDate.getMonth() + 1;
      //   if (month <= 3) {
      //     this.dqjd = ["1"];
      //   } else if (month <= 6) {
      //     this.dqjd = ["2"];
      //   } else if (month <= 9) {
      //     this.dqjd = ["3"];
      //   } else if (month <= 12) {
      //     this.dqjd = ["4"];
      //   }
      //   this.createBatchReportDialog = true;
      // },
      // //实现上报功能
      // async report() {
      //   if (this.multipleTable.length > 0) {
      //     await BatchReport(this.spjd[0],this.multipleTable).then(res => {
      //       this.getUploadedImages(this.multipleTable).then(res => {
      //         this.$message({
      //           type: "success",
      //           message: "数据上报成功!"
      //         });
      //       })
      //         .catch(err => console.log(err))
      //         .finally(() => {
      //           this.createBatchReportDialog = false;
      //         });
      //     })
      //       .catch(err => console.log(err))
      //       .finally(() => {
      //         this.createBatchReportDialog = false;
      //       });
      //   } else {
      //     this.$message({
      //       type: "warning",
      //       message: "请选择要上报的数据!"
      //     });
      //   }
      // },
      // //获取图片材料
      // async getUploadedImages(xmbhs) {
      //   this.files = [];
      //   for (let xmbh of xmbhs) {
      //     let res = await this.getFileInfo(xmbh);
      //   }
      //   this.downImg();
      // },
      // //获取文件信息
      // getFileInfo(xmbh) {
      //   return request
      //     .get("management/uploadedimages", {
      //       params: {
      //         xmbh: xmbh,
      //         stage: ""
      //       }
      //     })
      //     .then(res => {
      //       if (res) {
      //         let files = res
      //           .map(t => t.files)
      //           .reduce((f, s) => [...f, ...s], [])
      //           .map(s => s.images)
      //           .reduce((f, s) => [...f, ...s], []);
      //         let filePath = files.map(
      //           k => this.backEndUrl + k.filepath.replace(/\\/g, "/")
      //         );
      //         let file = {};
      //         file.xmbh = xmbh;
      //         file.files = files;
      //         this.files.push(file);
      //       }
      //     });
      // },
      // //****传入图片链接，返回base64数据
      // getBase64Image(images, callback) {
      //   var img = new Image();
      //   img.setAttribute("crossOrigin", "anonymous");
      //   var canvas = document.createElement("canvas");
      //   img.onload = function () {
      //     canvas.width = img.width;
      //     canvas.height = img.height;
      //     canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
      //     var dataURL = canvas.toDataURL();//使用canvas获取图片的base64数据
      //     callback ? callback(dataURL) : null; //调用回调函数
      //   }
      //   img.src = images;
      // },
      // //下载并打包文件
      // downImg() {
      //   let zip = new JSZip();//声明一个zip压缩包
      //   var imgArray = [];
      //   for (let file of this.files) {
      //     for (let item of file.files) {
      //       imgArray.push(file.xmbh + item.filepath);//循环拿到所有的图片
      //     }
      //   }
      //   var array = Array.from(new Set(imgArray));
      //   var len = function (arr) {
      //     var l = 0;
      //     for (var key in arr) {
      //       if (key.indexOf(".png") != -1) {
      //         l++;
      //       }
      //     }
      //     return l;
      //   }
      //   for (let i = 0; i < array.length; i++) {
      //     var index = array[i].indexOf("/");
      //     var imgUrl = this.backEndUrl + array[i].substring(index);
      //     //对每一个图片链接获取base64的数据，并使用回调函数处理
      //     this.getBase64Image(imgUrl, function (dataURL) {
      //       //对获取的图片base64数据进行处理
      //       var img_arr = dataURL.split(',');
      //       zip.file(array[i].substring(0, array[i].lastIndexOf('.')) + ".png", img_arr[1], { base64: true });//根据base64数据在压缩包中生成jpg数据
      //       var ziplength = len(zip.files);
      //       if (ziplength == array.length) {//当所有图片都已经生成打包并保存zip
      //         zip.generateAsync({ type: "blob" }).then(function (content) {
      //           let date = new Date();
      //           FileSaver.saveAs(
      //             content,
      //             "上报文件" +
      //             date.getFullYear() +
      //             (date.getMonth() + 1) +
      //             date.getDate() +
      //             date.getHours() +
      //             date.getMinutes() +
      //             date.getSeconds() +
      //             ".zip");
      //         }, function (err) {//报错处理
      //           this.$message({
      //             type: "error",
      //             message: "出现问题，请联系管理员!"
      //           });
      //         });
      //       }
      //     });
      //   }
      // },
      // //根据季度进行数据筛选
      // filterDate(value, row) {
      //   let now = new Date(row.qt.sqrrq);
      //   if (value == 1) {
      //     if (now.getMonth() + 1 <= 3) {
      //       return row.qt.sqrrq;
      //     }
      //   } else if (value == 2) {
      //     if (now.getMonth() + 1 >= 4 && now.getMonth() + 1 <= 6) {
      //       return row.qt.sqrrq;
      //     }
      //   } else if (value == 3) {
      //     if (now.getMonth() + 1 >= 7 && now.getMonth() + 1 <= 9) {
      //       return row.qt.sqrrq;
      //     }
      //   } else if (value == 4) {
      //     if (now.getMonth() + 1 >= 10 && now.getMonth() + 1 <= 12) {
      //       return row.qt.sqrrq;
      //     }
      //   }
      // },
      // //根据审批阶段筛选
      // spjdFilter(value, row) {
      //   if (value == 1) {
      //     return row.zjdSqJl.xmzt == 6;
      //   } else {
      //     return row.zjdSqJl.xmzt == 9;
      //   }
      // },
      //其他参数
      getTableDataParam() {
        //根据业务修改补充
        let otherParam = {
          // blzt: this.getOptCode("办理状态", "已办"),
          roleid: this.info.role.join("|")
        };
        //时间区间字段，调整
        let newQueryForm = Object.assign({}, this.queryForm);
        if (newQueryForm.sqsj && newQueryForm.sqsj.length > 0) {
          let start_sqrrq = newQueryForm.sqsj[0];
          let end_sqrrq = newQueryForm.sqsj[1];
          newQueryForm["start_sqrrq"] = start_sqrrq;
          newQueryForm["end_sqrrq"] = end_sqrrq;
          delete newQueryForm.sqsj;
        }
        return Object.assign(
          {
            pageNum: this.table.pageNum,
            pageSize: this.table.pageSize
          },
          newQueryForm /*this.queryForm*/,
          otherParam
        );
      },
      // handleSelectionChange(val) {
      //   this.multipleTable = Array.from(
      //     new Set(
      //       val.map(function (item, index, arr) {
      //         return item.jcxx.sqid;
      //       })
      //     )
      //   );
      // },
      handleDetail(row) {
        this.$router.push({
          name: "land-examine-business-detail",
          params: Object.assign({
            //申请表
            applicationFormDisabled: true,
            //审批表
            acceptanceFormDisabled: true,
            //验收表
            approvalFormDisabled: true,
            detail: row,

            box: "综合"
          })
        });
      },
      handleDelete(row) {
        let sqid = row.zjdSqJl.sqid;
        this.$confirm("确定删除这条项目记录？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            DeleteProcess(sqid)
              .then(() => {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getTableData();
              })
              .catch(() => {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              });
          })
          .catch(() => { });
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>