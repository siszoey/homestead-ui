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
        // { path: `${pre}/examineList`, title: '审批一览表' },
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
  children: (pre => [
    {
      path: `${pre}/examineList`,
      title: '审批总览'
    },
    {
      path: `${pre}/business`,
      title: '业务办理',
      children: (pre => [
        { path: `${pre}/todo`, title: '待办箱', badge: 27 },
        { path: `${pre}/done`, title: '已办箱', badge: 13 },
        { path: `${pre}/rollback`, title: '退件箱', badge: 2 },
        { path: `${pre}/comprehensive`, title: '综合管理', badge: 27 },
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
    { path: `${pre}/supervise/monitoring_analysis`, title: '监测分析' },
    {
      path: `${pre}/supervise`,
      title: '监督处置',
      children: (pre => [
        { path: `${pre}/dailyInspection`, title: '日常巡查处置' },
        { path: `${pre}/complaintHandling`, title: '信访举报处置' },
        { path: `${pre}/registrationDisposal`, title: '闲置登记处置' },
        { path: `${pre}/disputesArbitration`, title: '纠纷仲裁处置' }
      ])('/land/integratedManagement/supervise')
    },
    {
      path: `${pre}/monitor`,
      title: '遥感监测',
      children: (pre => [
        { path: `${pre}/ygdc_jcsb`, title: '遥感识别' },
        { path: `${pre}/ygdc_dbfx`, title: '对比分析' },
        { path: `${pre}/ygdc_wfdx`, title: '违法定性' },
        { path: `${pre}/ygdc_czgz`, title: '处置跟踪' }
      ])('/land/integratedManagement/monitor')
    }


  ])('/land/integratedManagement')
}

//盘活利用
const utilize = {
  path: '/land/utilize',
  title: '盘活利用',
  alias: 'index',
  icon: 'utilize',
  children: (pre => [
    { path: `${pre}/InformationStatistics`, title: '信息统计' },
    { path: `${pre}/InformationList`, title: '信息列表' },
    { path: `${pre}/InformationRelease`, title: '信息发布' },
    { path: `${pre}/RegistrantAdministration`, title: '注册人管理' }
  ])('/land/utilize')
}

// 菜单 侧栏
export const menuAside = [
  // home,
  map,
  examine,
  system,
  integratedManagement,
  utilize
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
    path: '/land/utilize',
    title: '盘活利用'
  },
  {
    path: '/land/system',
    title: '系统设置'
  }
]
