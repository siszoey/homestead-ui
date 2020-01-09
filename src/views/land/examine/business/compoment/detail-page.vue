<template>
    <d2-container>
        <el-steps :active="active" finish-status="success" align-center>
            <el-step v-for="option in getDicts('项目状态')" :description="option.optName"></el-step>
        </el-steps>
        <el-divider></el-divider>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-button type="primary" size="mini" @click="handleSend" :disabled="sendBtnDisabled">
                    发送
                </el-button>
                <el-button type="primary" size="mini" @click="handleBack" :disabled="backBtnDisabled">
                    回退
                </el-button>
            </el-col>

            <el-col :span="6" :offset="12">
                <el-button type="primary" size="mini" @click="handleShowForm">
                    表单
                </el-button>
                <el-button type="primary" size="mini" @click="handleShowFileView">
                    材料
                </el-button>
                <el-button type="primary" size="mini" @click="handleShowPrintView">
                    打印
                </el-button>
                <el-button type="primary" size="mini" @click="handleShowMap">
                    一张图
                </el-button>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="padding: 0 20px;">
            <!--表单-->
            <el-col :span="showMap ? 12 : 24">
                <el-tabs tab-position="top" v-show="showForm">
                    <el-tab-pane label="申请表">
                        <applicationForm :disabled="applicationFormDisabled" :detail="detail"></applicationForm>
                    </el-tab-pane>
                    <el-tab-pane label="审批表" v-if="detail">
                        <approvalForm :disabled="approvalFormDisabled" :detail="detail"></approvalForm>
                    </el-tab-pane>
                    <el-tab-pane label="验收表" v-if="detail">
                        <appceptanceForm :disabled="appceptanceFormDisabled" :detail="detail"></appceptanceForm>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <!--材料-->
            <file-tree-view v-show="showFileView" :xmbh="xmbh" :stage="stage"></file-tree-view>
            <!--打印-->
            <div v-bind="$attrs" v-show="showPrintView">
                <iframe ref="refIframe" :src="src" frameborder="0" scrolling="auto" id="myIframe"></iframe>
            </div>
            <!--一张图-->
            <el-col :span="12" v-show="showMap">
                <h1>一张图</h1>
            </el-col>
        </el-row>

    </d2-container>
</template>

<script>
  import dictMixins from '../../../mixnis/dict-mixnis'
  import processMixnis from "../../../mixnis/process-mixnis"
  import applicationForm from './application-form'
  import appceptanceForm from './appceptance-form'
  import approvalForm from './approval-form'
  import FileTreeView from '../../../components/filetreeview.vue'
  import {LastProcess} from "../../../../../api/land.business"

  export default {
    name: 'detail-page',
    components: {
      applicationForm,
      approvalForm,
      appceptanceForm,
      FileTreeView
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
        formCol: 24,

        showFileView: false,
        xmbh: '',
        stage: '',

        showPrintView: false,
        src: 'http://www.baidu.com',


        showMap: false,

        routerViewCol: 20,
        mapCol: 0,
        isCollapse: false,
        active: 0,
        showIframe: false,
      }
    },
    mounted() {
      this.onloadIframe()
    },
    computed: {
      firstXMZT() {
        return this.getDictByOptCode("项目状态", 1)
      }
    },
    methods: {
      /**
       * iframe-宽高自适应显示
       */
      onloadIframe() {
        let myIframe = this.$refs.refIframe
        // myIframe.style.width = (Number(800)) + 'px'
        myIframe.style.height = (Number(800) - 60) + 'px'
        console.log(myIframe.style.width, myIframe.style.height)
        /**
         * 跨域问题
         */
        /*if (myIframe) {
          let iframeWin = myIframe.contentWindow || myIframe.contentDocument.parentWindow
          if (iframeWin.document.body) {

            myIframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight
            console.log(myIframe.height)
          }
        }*/
      },
      handleSend() {
        if (this.hadSend) {
          this.$message({
            type: 'warning',
            message: '已发送'
          })
          return
        }
        if (undefined == this.processInfo) {
          this.$message({
            type: 'warning',
            message: '项目编号丢失'
          })
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
        if (this.hadBack) {
          this.$message({
            type: 'warning',
            message: '已回退'
          })
          return
        }
        if (undefined == this.processInfo) {
          this.$message({
            type: 'warning',
            message: '项目编号丢失'
          })
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
        let flag = this.showForm
        let mapFlag = this.showMap
        this.showFlag(false)
        this.showMap = mapFlag
        this.showForm = flag ? false : true
      },
      handleShowFileView() {
        let flag = this.showFileView
        this.showFlag(false)
        this.showFileView = flag ? false : true
      },
      handleShowPrintView() {
        let flag = this.showPrintView
        this.showFlag(false)
        this.showPrintView = flag ? false : true
      },
      showFlag(flag) {
        this.showForm = flag
        this.showFileView = flag
        this.showPrintView = flag
        this.showMap = flag
      },
      handleShowMap() {
        let flag = this.showMap
        let formFlag = this.showForm
        this.showFlag(false)
        this.showForm = formFlag
        this.showMap = flag ? false : true
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
        let params = {}
        if (key.indexOf('Form') != -1) {
          params = Object.assign(params, {
            disabled: this[`${key}Disabled`],
            detail: this.detail
          })
        } else if (key == 'fileTreeView') {
          params = Object.assign(params, {
            xmbh: this.detail ? this.detail.jcxx.sqid : '',
            stage: this.processInfo ? this.processInfo.xmzt : ''
          })
        }

        if (key != 'printView') {
          this.$router.push({
            name: key,
            params
          })
          this.showIframe = false
        } else {
          this.showIframe = true
        }
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

