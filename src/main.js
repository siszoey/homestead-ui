// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
// import {menuHeader, menuAside} from '@/menu/iot'
import { menuHeader, menuAside } from '@/menu/d2admin'
import { frameInRoutes } from '@/router/routes'

// 自身扩展的第三方插件
import myPlugin from '@/plugin/mine'

Vue.use(myPlugin)

// 自定义RemJS,只引入一次
import '@/libs/rem'

//Vue.js提供的ajax插件
import axios from 'axios';
Vue.prototype.$axios = axios;

// 核心插件
Vue.use(d2Admin)

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
    created() {
        // 处理路由 得到每一级的路由设置
        this.$store.commit('d2admin/page/init', frameInRoutes)
            // 设置顶栏菜单
        this.$store.commit('d2admin/menu/headerSet', menuHeader)
            // 设置侧边栏菜单
        this.$store.commit('d2admin/menu/asideSet', menuAside)
            // 设置所有菜单数据
        this.$store.commit('d2admin/menu/allMenusSet', menuAside)
            // 初始化菜单搜索功能
        this.$store.commit('d2admin/search/init', menuHeader)
    },
    mounted() {
        // 展示系统信息
        this.$store.commit('d2admin/releases/versionShow')
            // 用户登录后从数据库加载一系列的设置
        this.$store.dispatch('d2admin/account/load')
            // 获取并记录用户 UA
        this.$store.commit('d2admin/ua/get')
            // 初始化全屏监听
        this.$store.dispatch('d2admin/fullscreen/listen')
            // 初始化后端数据字典
        this.$store.dispatch('d2admin/dict/init')
    }
}).$mount('#app')