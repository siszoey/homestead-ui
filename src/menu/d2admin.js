// const home = { path: `/index`, title: '首页', icon: 'home', }

const map = {
    path: '/land/map',
    title: '一张图',
    alias: 'index',
    icon: 'map',
    children: (pre => [{
            path: `${pre}/spatialData`,
            title: '空间数据',
            children: (pre => [
                { path: `${pre}/survey`, title: '现状调查成果' },
                { path: `${pre}/plan`, title: '村庄规划编制成果' },
                { path: `${pre}/year`, title: '年度计划成果' },
                { path: `${pre}/build`, title: '宅基地建设成果' },
            ])('/land/map/spatialData')
        },
        {
            path: `${pre}/accountInformation`,
            title: '台账信息',
            children: (pre => [
                { path: `${pre}/yearPlan`, title: '年度计划一览表' },
                { path: `${pre}/landIndex`, title: '用地指标一览表' },
            ])('/land/map/accountInformation')
        },
        {
            path: `${pre}/implementationProcess/index`,
            title: '实施过程'
        },
    ])('/land/map')
}

// const business = {
//   path: '/res/business',
//   title: '业务办理',
//   alias: 'real-business',
//   icon: 'align-left',
//   children: (pre => [
//     {path: `${pre}/declare`, title: '项目申报'},
//     {path: `${pre}/check`, title: '街道审核'},
//     {path: `${pre}/summarize`, title: '审核汇总'},
//     {path: `${pre}/supervision`, title: '建房监管'},
//     {path: `${pre}/retreat`, title: '退办件'}
//   ])('/res/business')
// }
// const search = {
//   path: '/res/search',
//   title: '归档查询',
//   alias: 'index',
//   icon: 'search',
//   children: (pre => [
//     {path: `${pre}/filesSearch`, title: '归档查询'},
//   ])('/res/search')
// }
// const message = {
//   path: '/res/message',
//   title: '信息动态',
//   alias: 'index',
//   icon: 'area-chart',
//   children: (pre => [
//     {path: `${pre}/mesManager`, title: '信息管理'},
//   ])('/res/message')
// }
// const analyse = {
//   path: '/res/analyse',
//   title: '数据分析',
//   alias: 'index',
//   icon: 'codepen',
//   children: (pre => [
//     {path: `${pre}/analyse`, title: '数据分析'},

//   ])('/res/analyse')
// }
// const system = {
//   path: '/res/system',
//   title: '系统管理',
//   alias: 'index',
//   icon: 'cog',
//   children: (pre => [
//     {path: process.env.VUE_APP_SSO_URL, title: '账户权限'},
//     {path: `${pre}/journal`, title: '操作日志'},
//     {path: `${pre}/password`, title: '密码修改'},
//     {path: `${pre}/safe`, title: '安全管理'},
//     {path: `${pre}/wechart`, title: '微信模板信息提醒'},
//     {path: `${pre}/uploadview`, title: '需上传影像自行管理'}
//   ])('/res/system')
// }
// 菜单 侧栏
export const menuAside = [
    // home,
    map,
    // business,
    // search,
    // message,
    // analyse,
    // system

]

// 菜单 顶栏
export const menuHeader = [
    // home,
    map,
    // business,
    // search,
    // message,
    // analyse,
    // system
]