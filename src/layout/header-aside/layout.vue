<template>
  <div
    class="d2-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div
        class="d2-theme-header header"
        :style="{
          opacity: this.searchActive ? 0.5 : 1
        }"
        flex-box="0"
        flex>
        <div class="logo-group" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth }" flex-box="0">
          <img v-if="asideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/logo-icon.png`" style="height:40px;margin-top:10px;">
          <img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/logo-all.png`" style="height:40px;margin-top:10px;">
        </div>
        <!-- 取消toggle -->
        <div class="toggle-aside-btn" @click="handleToggleAside" flex-box="0">
          <d2-icon name="bars"/>
        </div>
        <d2-menu-header flex-box="1"/>
        <!-- 顶栏右侧 -->
        <div class="d2-header-right" flex-box="0">
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <!-- <d2-header-search @click="handleSearchClick"/> -->
          <!-- <d2-header-log/> -->
          <!-- 切换系统数据 -->
          <!-- <data-change></data-change> -->

          <d2-header-fullscreen/>
          <!-- <d2-header-theme/> -->
          <!-- <d2-header-size/> -->
          <!-- <d2-header-locales/> -->
          <!-- <d2-header-color/> -->
          <d2-header-user/>
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="d2-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div
          v-if="!fullMainZone"
          flex-box="0"
          ref="aside"
          class="d2-theme-container-aside slide"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideMenuWidth,
            opacity: this.searchActive ? 0.5 : 1,
            borderRight: '1px solid rgb(207, 215, 229)'
          }">
          <d2-menu-side/>
        </div>
        <!-- 主体 -->
        <div class="d2-theme-container-main" flex-box="1" flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-if="searchActive" class="d2-theme-container-main-layer" flex>
              <d2-panel-search
                ref="panelSearch"
                @close="searchPanelClose"/>
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div v-if="!searchActive" class="d2-theme-container-main-layer" flex="dir:top">
              <!-- tab -->
              <div v-if="!fullMainZone" class="d2-theme-container-main-header main-header" flex-box="0" style="border-bottom: 1px solid rgb(207, 215, 229)">
                <!-- <d2-tabs/> -->
                <d2-breadcrumb />
              </div>
              <!-- 页面 -->
              <div class="d2-theme-container-main-body body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <!--<keep-alive :include="keepAlive">-->
                    <router-view  :class="{unifidStyle : !fullMainZone}"/>
                  <!--</keep-alive>-->
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import d2MenuSide from './components/menu-side'
import d2MenuHeader from './components/menu-header'
// import d2Tabs from './components/tabs'
import d2HeaderFullscreen from './components/header-fullscreen'
// import d2HeaderLocales from './components/header-locales'
// import d2HeaderSearch from './components/header-search'
// import d2HeaderSize from './components/header-size'
// import d2HeaderTheme from './components/header-theme'
import d2HeaderUser from './components/header-user'
// import d2HeaderLog from './components/header-log'
// import d2HeaderColor from './components/header-color'
import d2Breadcrumb from './components/breadcrumb'
import { mapState, mapGetters, mapActions } from 'vuex'
import mixinSearch from './mixins/search'
// import DataChange from './components/data-change'
import { stat } from 'fs'
export default {
  name: 'd2-layout-header-aside',
  mixins: [
    mixinSearch
  ],
  components: {
    d2MenuSide,
    d2MenuHeader,
    // d2Tabs,
    d2HeaderFullscreen,
    // d2HeaderLocales,
    // d2HeaderSearch,
    // d2HeaderSize,
    // d2HeaderTheme,
    d2HeaderUser,
    // d2HeaderLog,
    // d2HeaderColor
    d2Breadcrumb,
    //切换系统数据
    //DataChange
  },
  data () {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: '300px',
      asideMenuWidth: '180px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px'
    }
  },
  computed: {
    ...mapState('d2admin', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse,
      fullMainZone: state => state.page.fullMainZone
    }),
    ...mapGetters('d2admin', {
      themeActiveSetting: 'theme/activeSetting'
    }),
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup () {
      return {
        ...this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
        } : {}
      }
    }
  },
  methods: {
    ...mapActions('d2admin/menu', [
      'asideCollapseToggle'
    ]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside () {
      this.asideCollapseToggle()
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
.unifidStyle {
  // margin-top: 10px;
  // margin-left: 20px;
  // margin-right: 20px;
  // border-top: 1px solid rgb(207, 215, 229);
  // border-left: 1px solid rgb(207, 215, 229);
}
.el-badge__content.is-fixed {
  top: 0.1rem;
}
.el-menu-item {
    display: flex;
    justify-content: space-between;
}
.d2-theme-container-main-body{
  height: 100%;
}
.body{
  overflow: auto;
  background:white;
}
.header{
  background: #27658A;
}
.slide{
  background: white;
}
.main-header{
  background: white;
}
.theme-d2 .d2-theme-header .el-menu .el-submenu.is-active .el-submenu__title {
    // color: #2f74ff;
    // background: white;
    color:white;
    font-size: 18px;
    font-weight: bold;
    background: none;
    // border-bottom:3px solid white;
}
.theme-d2 .d2-theme-header .el-menu .el-submenu .el-submenu__title {
    color: white;
}
.theme-d2 .d2-theme-header .el-menu .el-submenu .el-submenu__title .el-submenu__icon-arrow {
    color: white;
}
.theme-d2 .d2-theme-header .toggle-aside-btn i {
    color: white;
    background: transparent;
}
.theme-d2 .d2-theme-header .toggle-aside-btn i:hover {
    color: white;
}
.theme-d2 .d2-theme-header .d2-header-right .btn-text {
    color: white;
}
.theme-d2 .d2-theme-header .el-menu .el-menu-item.is-active {
    color:white;
    font-size: 18px;
    font-weight: bold;
    background: none;
    // border-bottom:3px solid white;
}
.theme-d2 .d2-theme-header .el-menu .el-menu-item {
    color: white;
}
</style>
