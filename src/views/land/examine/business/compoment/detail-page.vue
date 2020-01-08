<template>
    <d2-container better-scroll>
        <el-steps :active="active" finish-status="success" align-center>
            <el-step v-for="option in getDicts('项目状态')" :description="option.optName"></el-step>
        </el-steps>
        <el-divider></el-divider>
        <!--<el-radio-group v-model="isCollapse">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>-->
        <el-button type="primary" size="mini" @click="showMap">
            一张图
        </el-button>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-menu default-active="1"
                         class="el-menu-vertical-demo"
                         @select="handleSelect"
                         :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <span slot="title">表单</span>
                        </template>
                        <el-menu-item index="applicationForm">申请表</el-menu-item>
                        <el-menu-item v-if="this.detail" index="approvalForm">审批表</el-menu-item>
                        <el-menu-item v-if="this.detail" index="appceptanceForm">验收表</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="fileTreeView">
                        <span slot="title">材料</span>
                    </el-menu-item>
                    <el-menu-item v-if="this.detail" index="printView">
                        <span slot="title">打印</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="routerViewCol">
                <router-view v-show="!showIframe"></router-view>
                <div v-show="showIframe">
                    <iframe
                            :src="src"
                            frameborder="0"/>
                </div>
            </el-col>
            <el-col :span="mapCol">
                <h1>一张图</h1>
            </el-col>
        </el-row>
    </d2-container>
</template>

<script>
  import dictMixins from '../../../mixnis/dict-mixnis'

  export default {
    name: 'detail-page',
    components: {},
    mixins: [
      dictMixins
    ],
    created() {
      this.getLastXMZT()
    },
    data() {
      return {
        applicationFormDisabled: this.$route.params.applicationFormDisabled || false,
        appceptanceFormDisabled: this.$route.params.appceptanceFormDisabled || false,
        approvalFormDisabled: this.$route.params.approvalFormDisabled || false,
        detail: this.$route.params.detail || undefined,

        routerViewCol: 20,
        mapCol: 0,
        isCollapse: false,
        active: 0,
        showIframe: false,
        src: 'http://www.baidu.com'
      }
    },

    methods: {
      showMap() {
        console.log(this.mapCol)
        if (this.mapCol == 0) {
          this.mapCol = 10
          this.routerViewCol = 10
        } else {
          this.mapCol = 0
          this.routerViewCol = 20
        }
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
            stage: this.detail ? this.detail.zjdSqJl.xmzt : ''
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
        let currentXMZTCode = this.detail == undefined ? 1 : this.detail.zjdSqJl.xmzt
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
