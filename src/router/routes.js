// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

// 路由主题
// import iotHeader from '../layout/iot-header'
import defaultHeader from '../layout/header-aside'
let layHeader = defaultHeader

// 路由模块
import defaultRouter from './modules/default'

// import resMap from './modules/res.map'
// import resBusiness from './modules/res.business'
// import resSearch from './modules/res.search'
// import resMessage from './modules/res.message'
// import resAnalyse from './modules/res.analyse'
// import resSystem from './modules/res.system'

import landMap from './modules/land.map'
import landExamine from './modules/land.examine'
import landSystem from './modules/land.system'

/**
 * 在主框架内显示
 */
const frameIn = [
    defaultRouter(layHeader),
    // resMap(layHeader),
    // resBusiness(layHeader),
    // resSearch(layHeader),
    // resMessage(layHeader),
    // resAnalyse(layHeader),
    // resSystem(layHeader)

    landMap(layHeader),
    landExamine(layHeader),
    landSystem(layHeader)
]

/**
 * 在主框架之外显示
 */
const frameOut = [
    // 登录
    {
        path: '/login',
        name: 'login',
        component: _import('system/login')
    }
]

/**
 * 错误页面
 */
const errorPage = [{
    path: '*',
    name: '404',
    component: _import('system/error/404')
}]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
    ...frameIn,
    ...frameOut,
    ...errorPage
]