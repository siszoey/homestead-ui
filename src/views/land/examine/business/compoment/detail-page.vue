<template>
  <d2-container v-loading="pageLoading">
    <!--<el-steps :active="active" finish-status="success" align-center direction="vertical">
      <el-step v-for="option in getDicts('项目状态')" :description="option.optName"></el-step>
    </el-steps>-->
    <div class="detail-content">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button type="primary" size="mini" @click="handleShowForm">
            表单
          </el-button>
          <el-button type="primary" size="mini" @click="handleShowPrintView">
            打印
          </el-button>
        </el-col>

        <el-col :span="12" style="text-align:right">
          <el-button type="primary" size="mini" @click="cancel">
            取消
          </el-button>
          <el-button type="primary" size="mini" @click="handleShowMap">
            查看地图
          </el-button>
          <el-button type="primary" size="mini" @click="handleShowFileView">
            材料
          </el-button>
          <el-button type="primary" size="mini" @click="handleSend" :disabled="sendBtnDisabled">
            发送
          </el-button>
          <el-button type="primary" size="mini" @click="handleBack" :disabled="backBtnDisabled">
            回退
          </el-button>
          <el-button type="primary" size="mini" @click="handleShowHistory">
            历史
          </el-button>
          <el-button type="primary" size="mini" @click="handleShowProc">
            流程
          </el-button>
        </el-col>
      </el-row>

      <el-row :gutter="5">
        <!--表单-->
        <el-col :span="showMap || showFileView || showHistory || showProc? 12 : 24">
          <el-tabs tab-position="top" v-show="showForm">
            <el-tab-pane label="申请表">
              <applicationForm :disabled="applicationFormDisabled" :detail="detail"
                               @change-send-state="changeSendBtnState(arguments)"></applicationForm>
            </el-tab-pane>
            <el-tab-pane label="审批表" v-if="detail">
              <approvalForm :disabled="approvalFormDisabled" :detail="detail"
                            @change-send-state="changeSendBtnState"></approvalForm>
            </el-tab-pane>
            <el-tab-pane label="验收意见表" v-if="detail">
              <acceptanceForm :disabled="acceptanceFormDisabled" :detail="detail"
                               @change-send-state="changeSendBtnState"></acceptanceForm>
            </el-tab-pane>
          </el-tabs>

          <!--打印-->
          <div v-bind="$attrs" v-show="showPrintView">
            <el-tabs tab-position="top">
              <el-tab-pane label="申请表">
                <iframe ref="applicationIframe" :src="iframeSrc1" frameborder="0" scrolling="auto"></iframe>
              </el-tab-pane>
              <el-tab-pane label="审批表">
                <iframe ref="approvalIframe" :src="iframeSrc2" frameborder="0" scrolling="auto"></iframe>
              </el-tab-pane>
              <el-tab-pane label="乡镇建设规划许可证">
                <iframe ref="Iframe5" :src="iframeSrc5" frameborder="0" scrolling="auto"></iframe>
              </el-tab-pane>
              <el-tab-pane label="批准书">
                <iframe ref="Iframe4" :src="iframeSrc4" frameborder="0" scrolling="auto"></iframe>
              </el-tab-pane>
              <el-tab-pane label="验收意见表">
                <iframe ref="acceptanceIframe" :src="iframeSrc3" frameborder="0" scrolling="auto"></iframe>
              </el-tab-pane>
              <!--                            <el-tab-pane label="附图">-->
              <!--                                <iframe ref="Iframe6" :src="iframeSrc6" frameborder="0" scrolling="auto"></iframe>-->
              <!--                            </el-tab-pane>-->
            </el-tabs>
          </div>
        </el-col>

        <!--一张图-->
        <el-col :span="12" v-if="showMap">
          <div style="width: 570px;height:800px">
            <oneMap :hiddenToolbar="true" :zoomToZD="true"></oneMap>
          </div>
        </el-col>
        <el-col :span="12" v-if="showFileView">
          <!--材料-->
          <file-tree-view :xmbh="xmbh" :stage="stage"></file-tree-view>
        </el-col>
        <el-col :span="12" v-show="showHistory">
          <!--历史-->
          <div class="history-content">
            <div v-show="procHistories.length == 0">
              <h2>未有提交信息</h2>
            </div>
            <el-timeline :reverse="true" v-show="procHistories.length > 0">
              <el-timeline-item
                  v-for="(procHistory, index) in procHistories"
                  :key="index"
                  type="primary"
                  size="large">
                <el-card>
                  <h4>{{procHistory.actname}}</h4>
                  <p>{{`${procHistory.username} 提交于 ${procHistory.endtime}`}}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-col>
        <el-col :span="12" v-show="showProc">
          <!--finish-status="success"-->
          <el-steps :active="active" align-center direction="vertical">
            <el-step v-for="option in getDicts('项目状态')" :description="option.optName" icon="el-icon-warning-outline"></el-step>
          </el-steps>
        </el-col>
      </el-row>
    </div>


  </d2-container>
</template>

<script>
  import dictMixins from '../../../mixnis/dict-mixnis'
  import processMixnis from "../../../mixnis/process-mixnis"
  import applicationForm from './application-form'
  import {GetProcHistory} from '../../../../../api/land.business_activiti'

  export default {
    name: 'detail-page',
    components: {
      applicationForm,
      approvalForm: () => import('./approval-form'),
      acceptanceForm: () => import('./acceptance-form'),
      FileTreeView: () => import('../../../components/filetreeview.vue'),
      OneMap: () => import('../../../../land/map/spatialData/onemap.vue')
    },
    mixins: [
      dictMixins,
      processMixnis
    ],
    created() {
      this.initBtnDisable()
      this.initProcHistories()
      this.xmbh = this.processInfo ? this.processInfo.sqid : ''

      //延迟加载
      let that = this
      setTimeout(function () {
        that.pageLoading = false
      }, 3000)

    },
    data() {
      //非新建
      let row = this.$route.params.detail ? this.$route.params.detail : undefined
      let detail = undefined
      let processInfo = undefined
      let approvalFormDisabled = this.$route.params.approvalFormDisabled
      if (row != undefined) {
        detail = row.formVO
        processInfo = {
          xmzt: row.actid,
          box: this.$route.params.box,
          sqid: row.sqid,
          taskid: row.taskid,
          actname: row.actname,
        }
        approvalFormDisabled = approvalFormDisabled ? true : !this.canEditApproval(row.actname)
      }
      return {
        applicationFormDisabled: this.$route.params.applicationFormDisabled || false,
        acceptanceFormDisabled: this.$route.params.acceptanceFormDisabled || false,
        approvalFormDisabled: approvalFormDisabled,
        detail: detail,
        processInfo: processInfo,

        sendBtnDisabled: true,
        backBtnDisabled: true,
        hadSend: false,
        hadBack: false,

        showForm: true,

        showFileView: false,
        xmbh: '',
        stage: '',

        showPrintView: false,
        rdpPrefix: process.env.VUE_APP_RDP_URL + '/rdppage/show/',

        showMap: false,

        procHistories: [],
        showHistory: false,
        showProc: false,

        active: 9,
        pageLoading: true
      }
    },
    mounted() {
      this.onloadIframe()
    },
    computed: {
      firstXMZT() {
        return this.getDictByOptCode("项目状态", 1)
      },
      currentSqid() {
        return this.processInfo ? this.processInfo.sqid : 'xx'
      },
      iframeSrc1() {
        return `${this.rdpPrefix}fa74c31f2cab38dd6f58e1ac6ca13992?sqid=${this.currentSqid}`
      },
      iframeSrc2() {
        return `${this.rdpPrefix}d382fe82b5dee5793ab0421bcb481998?sqid=${this.currentSqid}`
      },
      iframeSrc3() {
        return `${this.rdpPrefix}eb5e0b7f30c3150ddaab238a5004b84b?sqid=${this.currentSqid}`
      },
      iframeSrc4() {
        return `${this.rdpPrefix}e7a24623c37c4239db40a2a8421d0022?sqid=${this.currentSqid}`
      },
      iframeSrc5() {
        return `${this.rdpPrefix}9278279b461a04ec55d648b84388e9f4?sqid=${this.currentSqid}`
      },
      iframeSrc6() {
        return `${this.rdpPrefix}264a33447c53e7dccef2e01c476c90d9?sqid=${this.currentSqid}`
      },

    },
    methods: {
      /**
       * iframe-宽高自适应显示
       */
      onloadIframe() {
        for (let key in this.$refs) {
          let ref = this.$refs[key]
          // ref.style.width = (Number(800)) + 'px'
          ref.style.height = (Number(1100) - 60) + 'px'
          //console.log(ref.style.width, ref.style.height)
          /**
           * 跨域问题
           */
          try {
            /*if (ref) {
              let iframeWin = ref.contentWindow || ref.contentDocument.parentWindow
              if (iframeWin.document.body) {

                ref.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight
                console.log(ref.height)
              }
            }*/
          } catch (err) {
            console.error('跨域报错')
          }
        }
      },
      handleSend() {
        if (this.confirmDone()) {
          return
        }
        let confirm = Object.assign({}, {
          distinguishCancelAndClose: false,
          title: '发送给下个办理人, 是否继续?',
          trueText: '确定',
          falseText: '取消',
        })
        if (this.isLastProcessByRole(this.processInfo.roleid)) {
          confirm.title = "联合审批结束，是否归档?"
        }
        this.$confirm(confirm.title, '提示', {
          distinguishCancelAndClose: confirm.distinguishCancelAndClose,
          confirmButtonText: confirm.trueText,
          cancelButtonText: confirm.falseText,
          type: 'warning',
          center: true
        }).then(() => {
          this.processRequest(this.processInfo, true)
          this.hadSend = true

          this.jumpToDoPage()
        }).catch(() => {
        }).finally(() => {
        })
      },
      handleBack() {
        if (this.confirmDone()) {
          return
        }

        let confirm = Object.assign({}, {
          distinguishCancelAndClose: false,
          title: '回退给上个办理人, 是否继续?',
          trueText: '确定',
          falseText: '取消',
        })
        this.$confirm(confirm.title, '提示', {
          distinguishCancelAndClose: confirm.distinguishCancelAndClose,
          confirmButtonText: confirm.trueText,
          cancelButtonText: confirm.falseText,
          type: 'warning',
          center: true
        }).then(() => {
          this.processRequest(this.processInfo, false)
          this.hadBack = true
        }).catch(() => {
        }).finally(() => {
          this.jumpToDoPage()
        })
      },
      handleShowForm() {
        this.showLeftFlag(false)
        this.showForm = true
      },
      handleShowPrintView() {
        this.showLeftFlag(false)
        this.showPrintView = true
      },
      showLeftFlag(flag) {
        this.showForm = flag
        this.showPrintView = flag
      },
      showRightFlag(flag) {
        this.showFileView = flag
        this.showMap = flag
        this.showHistory = flag
        this.showProc = flag
      },
      cancel(){
        //this.$router.go(-1);
        this.$router.back();
      },
      handleShowMap() {
        let a = this.showMap
        this.showRightFlag(false)
        this.showMap = a ? false : true
      },
      handleShowFileView() {
        let a = this.showFileView
        this.showRightFlag(false)
        this.showFileView = a ? false : true
      },
      handleShowHistory() {
        let a = this.showHistory
        this.showRightFlag(false)
        this.showHistory = a ? false : true
      },
      handleShowProc(){
        let a = this.showProc
        this.showRightFlag(false)
        this.showProc = a ? false : true
      },
      jumpToDoPage() {
        let that = this
        setTimeout(() => {
          that.$router.push({
            name: 'land-examine-business-todo'
          })
        }, 800)
      },
      confirmDone() {
        if (this.hadSend) {
          this.$message({
            type: 'warning',
            message: '已发送'
          })
          return true
        }
        if (this.hadBack) {
          this.$message({
            type: 'warning',
            message: '已回退'
          })
          return true
        }
        if (undefined == this.processInfo) {
          this.$message({
            type: 'warning',
            message: '项目编号丢失'
          })
          return true
        }
        return false
      },
      // getLastXMZT() {
      //   let currentXMZTCode = this.processInfo == undefined ? 1 : this.processInfo.xmzt
      //   this.active = currentXMZTCode - 1
      // },
      changeSendBtnState(a) {
        this.sendBtnDisabled = !(a[0])
        this.processInfo = a[1]
      },
      initBtnDisable(){
        let undoFlag = '待办' != this.$route.params.box && '退办' != this.$route.params.box
        this.sendBtnDisabled = undoFlag
        this.backBtnDisabled = undoFlag || this.canNotGoBack(this.processInfo.actname)
      },
      initProcHistories() {
        if (this.detail) {
          GetProcHistory({sqid: this.detail.jcxx.sqid}).then(res => {
            this.procHistories = res.history || []
            console.log('init procHistory success')
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-menu-vertical-demo {
    &:not(.el-menu--collapse) {
      width: 200px;
      min-height: 500px;
    }
  }

  iframe {
    min-height: 500px;
    /*height: calc(100% - 45px);*/
    width: 100%;
  }

  .el-steps {
    position: absolute;
    /*top: 0;*/
    /*left: 90%;*/
    /*right: 0;*/
    /*padding-top: 20px;*/
    /*padding-right: 20px;*/
    // height: 200%;

    left: 70%;
    padding-top: 40px;
  }

  .detail-content {
    /*margin-right: 10%;*/
  }
  .history-content{
    padding: 40px;
  }
</style>

