// const home = { path: `/index`, title: '首页', icon: 'home', }

const map = {
    path: '/land/map',
    title: '一张图',
    alias: 'index',
    icon: 'map',
    children: (pre => [
    // {
    //     path: `${pre}/leaderCockpit/index`,
    //     title: '领导驾驶舱'
    // },
    {
        path: `${pre}/spatialData/onemap`,
        title: '空间数据',
        // children: (pre => [
        //     // { path: `${pre}/test`, title: 'DEMO' },
        //     { path: `${pre}/onemap`, title: '一张图' },
        //     // { path: `${pre}/mappanel`, title: '首页一张图' },
        // ])('/land/map/spatialData')
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

const system = {
    path: '/land/system',
    title: '系统设置',
    alias: 'index',
    icon: 'system',
    children: (pre => [
        { path: `${pre}/fileConfig`, title: '上传设置' },
    ])('/land/system')
}

  //综合监管
 const integratedManagement = {
    path: '/land/integratedManagement',
    title: '综合监管',
    alias: 'index',
    icon: 'integratedManagement',
    children: (pre => [
        { path: `${pre}/dailyInspection`, title: '日常巡查处置' },
    ])('/land/integratedManagement/supervise')
}

// 菜单 侧栏
export const menuAside = [
    // home,
    map,
    examine,
    system,
    integratedManagement
]

// // 菜单 顶栏
// export const menuHeader = [
//     // home,
//     map,
//     examine,
//     system
//     // business,
//     // search,
//     // message,
//     // analyse,
//     // system
// ]

// 菜单 顶栏
export const menuHeader = [
  {
    path: '/index',
    title: '首页'
  },
  {
    path: '/land/map',
    title: '一张图'
  },
  {
    path: '/land/examine',
    title: '联合审批'
  },
  {
    path: '/land/integratedManagement',
    title: '综合监管'
  },

  {
    path: '/land/system',
    title: '盘活利用'
  },
  {
    path: '/land/system',
    title: '系统设置'
  }
]
