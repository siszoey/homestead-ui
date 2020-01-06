// const home = { path: `/index`, title: '首页', icon: 'home', }

const map = {
    path: '/land/map',
    title: '一张图',
    alias: 'index',
    icon: 'map',
    children: (pre => [{
        path: `${pre}/leaderCockpit/index`,
        title: '领导驾驶舱'
    },
    {
        path: `${pre}/spatialData`,
        title: '空间数据',
        children: (pre => [
            // { path: `${pre}/test`, title: 'DEMO' },
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
            { path: `${pre}/IllegalHouse`, title: '违法建房一览表' },
            { path: `${pre}/revitalizeUse`, title: '盘活利用一览表' },
            { path: `${pre}/householdRegister`, title: '户籍信息一览表' },
        ])('/land/map/accountInformation')
    },
    {
        path: `${pre}/implementationProcess`,
        title: '实施过程',
        children: (pre => [
            { path: `${pre}/examineList`, title: '审批一览表' },
            { path: `${pre}/examinePic`, title: '审批一张图' },
        ])('/land/map/implementationProcess')
    }
    ])('/land/map')
}

const examine = {
    path: '/land/examine',
    title: '联合审批',
    alias: 'real-examine',
    icon: 'align-left',
    children: (pre => [{
        path: `${pre}/business`,
        title: '业务办理',
        children: (pre => [
            { path: `${pre}/todo`, title: '待办箱' },
            { path: `${pre}/done`, title: '已办箱' },
            { path: `${pre}/rollback`, title: '退件箱' },
            { path: `${pre}/comprehensive`, title: '综合管理' },
        ])('/land/examine/business')
    },
    { path: `${pre}/search`, title: '归档查询' },
    { path: `${pre}/statistics`, title: '统计分析' }
    ])('/land/examine')
}
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

const system = {
    path: '/land/system',
    title: '系统设置',
    alias: 'index',
    icon: 'system',
    children: (pre => [
        { path: `${pre}/fileConfig`, title: '上传设置' },
    ])('/land/system')
}


// 菜单 侧栏
export const menuAside = [
    // home,
    map,
    examine,
    system
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
    examine,
    system
    // business,
    // search,
    // message,
    // analyse,
    // system
]
