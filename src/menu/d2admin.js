// const home = { path: `/index`, title: '首页', icon: 'home', }

// let caseBox = {
//   agentBoxCount: 1, // 代办箱数量
//   completedCount: 0, // 已办箱数量
//   rollbackCount: 0, // 回退箱数量
//   totalCount: 0 // 总数量
// }



export function creatAsideMenu ({ agentBoxCount = 1, completedCount = 0, rollbackCount = 0, totalCount = 0 }) {
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
          { path: `${pre}/yearPlan`, title: '年度计划' },
          { path: `${pre}/landIndex`, title: '用地指标' },
          { path: `/land/map/implementationProcess/examinePic`, title: '审批管理' },
          { path: `${pre}/IllegalHouse`, title: '违法建房' },
          { path: `${pre}/revitalizeUse`, title: '盘活利用' },
          // { path: `${pre}/householdRegister`, title: '户籍信息一览表' },
        ])('/land/map/accountInformation')
      },
      {
        path: `${pre}/countyPeople`,
        title: '农村人口',
        children: (pre => [      
          { path: `${pre}/summary`, title: '农村人口一览表' },
          { path: `${pre}/itegratedQuery`, title: '联合查询' },
          { 
            path: `${pre}/dataSource`,
            title: '数据来源',
            children:(pre => [
              { path: `${pre}/constractorMembers`, title: '承包方家庭成员' },
              { path: `${pre}/collectiveOrgnization`, title: '集体经济组织成员' },
              { path: `${pre}/farmhouseOwner`, title: '宅基地使用权共有人' },
              { path: `${pre}/householdRegister`, title: '公安户籍人口' }
            ])(`${pre}/dataSource`)
          }
        ])('/land/map/countyPeople')
      }
      // {
      //   path: `${pre}/implementationProcess`,
      //   title: '实施过程',
      //   children: (pre => [
      //     // { path: `${pre}/examineList`, title: '审批一览表' },
      //     { path: `${pre}/examinePic`, title: '审批一张图' },
      //   ])('/land/map/implementationProcess')
      // }
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
          { path: `${pre}/todo`, title: '待办箱', badge: agentBoxCount },
          { path: `${pre}/done`, title: '已办箱', badge: completedCount },
          { path: `${pre}/rollback`, title: '退件箱', badge: rollbackCount },
          // { path: `${pre}/batchreport`, title: '批量上报', badge: 10 },
          { path: `${pre}/comprehensive`, title: '综合管理', badge: totalCount }
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
      { path: `${pre}/businessConfig`, title: '业务设置' }
    ])('/land/system')
  }
  //综合监管
  // const integratedManagement = {
  //   path: '/land/integratedManagement',
  //   title: '综合监管',
  //   alias: 'index',
  //   icon: 'integratedManagement',
  //   children: (pre => [
  //     { path: `${pre}/supervise/monitoring_analysis`, title: '监测分析' },
  //     {
  //       path: `${pre}/supervise`,
  //       title: '监督处置',
  //       children: (pre => [
  //         { path: `${pre}/dailyInspection`, title: '日常巡查处置' },
  //         { path: `${pre}/complaintHandling`, title: '信访举报处置' },
  //         { path: `${pre}/registrationDisposal`, title: '闲置登记处置' },
  //         { path: `${pre}/disputesArbitration`, title: '纠纷仲裁处置' }
  //       ])('/land/integratedManagement/supervise')
  //     },
  //     {
  //       path: `${pre}/monitor`,
  //       title: '遥感监测',
  //       children: (pre => [
  //         { path: `${pre}/ygdc_jcsb`, title: '遥感识别' },
  //         { path: `${pre}/ygdc_dbfx`, title: '对比分析' },
  //         { path: `${pre}/ygdc_wfdx`, title: '违法定性' },
  //         { path: `${pre}/ygdc_czgz`, title: '处置跟踪' }
  //       ])('/land/integratedManagement/monitor')
  //     }
  //   ])('/land/integratedManagement')
  // }
  
  //共享发布
  const utilize = {
    path: '/land/utilize',
    title: '共享发布',
    alias: 'index',
    icon: 'utilize',
    children: (pre => [
      { path: `${pre}/utilizeAnalyse`, title: '盘活利用分析' },
      { 
        path: `${pre}/shareManager`,
        title: '共享农房管理',
        children: (pre => [
          { path: `${pre}/InformationStatistics`, title: '信息统计' },
          { path: `${pre}/InformationList`, title: '信息列表' },
          { path: `${pre}/InformationRelease`, title: '信息发布' },
          { path: `${pre}/RegistrantAdministration`, title: '注册人管理' }
        ])(`${pre}/shareManager`)
      }
    ])('/land/utilize')
  }
//综合监管
const integratedManagement = {
  path: '/land/integratedManagement',
  title: '综合监管',
  alias: 'index',
  icon: 'monitoringAnalysis',
  children: (pre => [
    { path: `${pre}/monitoringAnalysis`, 
      title: '监测分析' ,
      children: (pre => [
        { path: `${pre}/multipleAnalysis`, title: '综合分析' },
        { path: `${pre}/manyHouses`, title: '一户多宅分析' },
        { path: `${pre}/illegallanduse`, title: '违法用地分析' }
      ])('/land/integratedManagement/monitoringAnalysis')
    },
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

//数据汇交
const concurrent = {
  path: '/land/concurrent',
  title: '联合审批',
  alias: 'index',
  icon: 'concurrent',
  children: (pre => [
    {
      path: `${pre}/batchreport`,
      title: '批量上报'
    }
  ])('/land/concurrent')
}
  return [
    map,
    examine,
    system,
    integratedManagement,
    utilize,
    concurrent
  ]
}

// 菜单 侧栏
export const menuAside = creatAsideMenu({})

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
    title: '宅基地一张图'
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
    title: '共享发布'
  },
  {
    path: '/land/concurrent',
    title: '数据汇交'
  },
  {
    path: '/land/system',
    title: '系统设置'
  }
]
