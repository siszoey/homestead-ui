<template>
    <d2-container v-loading="pageLoading">
        <el-steps :active="active" finish-status="success" align-center>
            <el-step v-for="option in getDicts('项目状态')" :description="option.optName"></el-step>
        </el-steps>
        <el-divider></el-divider>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-button type="primary" size="mini" @click="handleShowForm">
                    表单
                </el-button>
                <el-button type="primary" size="mini" @click="handleShowFileView">
                    材料
                </el-button>
                <el-button type="primary" size="mini" @click="handleShowPrintView">
                    打印
                </el-button>
            </el-col>

            <el-col :span="5" :offset="13">
                <el-button type="primary" size="mini" @click="handleShowMap">
                    一张图
                </el-button>
                <el-button type="primary" size="mini" @click="handleSend" :disabled="sendBtnDisabled">
                    发送
                </el-button>
                <el-button type="primary" size="mini" @click="handleBack" :disabled="backBtnDisabled">
                    回退
                </el-button>
            </el-col>
        </el-row>

        <el-row :gutter="5">
            <!--表单-->
            <el-col :span="showMap ? 12 : 24">
                <el-tabs tab-position="left" v-show="showForm">
                    <el-tab-pane label="申请表">
                        <applicationForm :disabled="applicationFormDisabled" :detail="detail"></applicationForm>
                    </el-tab-pane>
                    <el-tab-pane label="审批表" v-if="detail">
                        <approvalForm :disabled="approvalFormDisabled" :detail="detail"></approvalForm>
                    </el-tab-pane>
                    <el-tab-pane label="验收意见表" v-if="detail">
                        <appceptanceForm :disabled="appceptanceFormDisabled" :detail="detail"></appceptanceForm>
                    </el-tab-pane>
                </el-tabs>
                <!--材料-->
                <file-tree-view v-show="showFileView" :xmbh="xmbh" :stage="stage"></file-tree-view>

                <!--打印-->
                <div v-bind="$attrs" v-show="showPrintView">
                    <el-tabs tab-position="left">
                        <el-tab-pane label="申请表">
                            <iframe ref="applicationIframe" :src="iframeSrc1" frameborder="0" scrolling="auto"></iframe>
                        </el-tab-pane>
                        <el-tab-pane label="审批表">
                            <iframe ref="approvalIframe" :src="iframeSrc2" frameborder="0" scrolling="auto"></iframe>
                        </el-tab-pane>
                        <el-tab-pane label="验收意见表">
                            <iframe ref="acceptanceIframe" :src="iframeSrc3" frameborder="0" scrolling="auto"></iframe>
                        </el-tab-pane>
                        <el-tab-pane label="批准书">
                            <iframe ref="Iframe4" :src="iframeSrc4" frameborder="0" scrolling="auto"></iframe>
                        </el-tab-pane>
                        <el-tab-pane label="建设规划书">
                            <iframe ref="Iframe5" :src="iframeSrc5" frameborder="0" scrolling="auto"></iframe>
                        </el-tab-pane>
                        <el-tab-pane label="附图">
                            <iframe ref="Iframe6" :src="iframeSrc6" frameborder="0" scrolling="auto"></iframe>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>

            <!--一张图-->
            <el-col :span="12" v-if="showMap">
                <div style="width: 570px;height:800px">
                    <oneMap :hiddenToolbar="true"></oneMap>
                </div>
            </el-col>
        </el-row>

    </d2-container>
</template>

<script>
  import dictMixins from '../../../mixnis/dict-mixnis'
  import processMixnis from "../../../mixnis/process-mixnis"
  import applicationForm from './application-form'
  // import appceptanceForm from './appceptance-form'
  // import approvalForm from './approval-form'
  // import FileTreeView from '../../../components/filetreeview.vue'
  // import OneMap from '../../../../land/map/spatialData/onemap.vue'
  // import {LastProcess} from "../../../../../api/land.business"

  export default {
    name: 'detail-page',
    components: {
      applicationForm,
      approvalForm: ()=> import('./approval-form'),
      appceptanceForm: ()=> import('./appceptance-form'),
      FileTreeView: ()=> import('../../../components/filetreeview.vue'),
      OneMap: ()=> import('../../../../land/map/spatialData/onemap.vue')
    },
    mixins: [
      dictMixins,
      processMixnis
    ],
    created() {
      if ('待办' == this.$route.params.box) {
        this.sendBtnDisabled = false
        if (this.processInfo && this.firstXMZT.optCode != this.processInfo.xmzt) {
          this.backBtnDisabled = false
        }
      }
      if ('退办' == this.$route.params.box) {
        this.sendBtnDisabled = false
      }
      this.getLastXMZT()
      let that = this;
      setTimeout(function () {
        that.pageLoading = false
      }, 3000)
    },
    data() {
      return {
        applicationFormDisabled: this.$route.params.applicationFormDisabled || false,
        appceptanceFormDisabled: this.$route.params.appceptanceFormDisabled || false,
        approvalFormDisabled: this.$route.params.approvalFormDisabled || false,
        detail: this.$route.params.detail || undefined,
        processInfo: this.$route.params.detail ? this.$route.params.detail.zjdSqJl : undefined,

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

        active: 0,
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
        if(this.confirmDone()){
          return
        }
        let confirm = Object.assign({}, {
          distinguishCancelAndClose: false,
          title: '发送给下个办理人, 是否继续?',
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
          this.processRequest(this.processInfo, true)
          this.hadSend = true
        }).catch(() => {
        })
      },
      handleBack() {
        if(this.confirmDone()){
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
        })
      },
      handleShowForm() {
        this.showFlag(false)
        this.showForm = true;
        // let flag = this.showForm
        // let mapFlag = this.showMap
        // this.showFlag(false)
        // this.showMap = mapFlag
        // this.showForm = flag ? false : true
      },
      handleShowFileView() {
        this.showFlag(false)
        this.showFileView = true;
        // let flag = this.showFileView
        // this.showFlag(false)
        // this.showFileView = flag ? false : true
      },
      handleShowPrintView() {
        this.showFlag(false)
        this.showPrintView = true;
        // let flag = this.showPrintView
        // this.showFlag(false)
        // this.showPrintView = flag ? false : true
      },
      showFlag(flag) {
        this.showForm = flag
        this.showFileView = flag
        this.showPrintView = flag
        // this.showMap = flag
      },
      handleShowMap() {
        this.showMap = this.showMap ? false : true
        // let flag = this.showMap
        // let formFlag = this.showForm
        // this.showFlag(false)
        // this.showForm = formFlag
        // this.showMap = flag ? false : true
      },
      confirmDone(){
        if (this.hadSend) {
          this.$message({
            type: 'warning',
            message: '已发送'
          })
          return true;
        }
        if (this.hadBack) {
          this.$message({
            type: 'warning',
            message: '已回退'
          })
          return true;
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
      getLastXMZT() {
        let currentXMZTCode = this.processInfo == undefined ? 1 : this.processInfo.xmzt
        this.active = currentXMZTCode - 1
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
</style>

