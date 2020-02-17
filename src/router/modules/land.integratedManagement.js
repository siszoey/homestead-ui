// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default function (iotHeader) {
  return {
    path: '/land/integratedManagement',
    name: 'land-integratedManagement',
    meta: {
      ...meta,
      title: '综合监管'
    },
    redirect: { name: 'land-integratedManagement-monitoringAnalysis-multipleAnalysis' },
    component: iotHeader,
    children: (pre => [
      {
        path: 'supervise',
        name: `${pre}supervise`,
        meta: {
          ...meta,
          title: '监督处置'
        },
        component: _import('land/components/blankrouterview.vue'),
        children: (pre => [
          {
            path: 'dailyInspection',
            name: `${pre}dailyInspection`,
            component: _import('land/integratedManagement/supervise/dailyInspection.vue'),
            meta: {
              ...meta,
              title: '日常巡查处置'
            }
          },
          {
            path: `complaintHandling`,
            name: `${pre}complaintHandling`,
            component: _import('land/integratedManagement/supervise/complaintHandling.vue'),
            meta: {
              ...meta,
              title: '信访举报处置'
            }
          },
          {
            path: `registrationDisposal`,
            name: `${pre}registrationDisposal`,
            component: _import('land/integratedManagement/supervise/registrationDisposal.vue'),
            meta: {
              ...meta,
              title: '闲置登记处置'
            }
          },
          {
            path: `disputesArbitration`,
            component: _import('land/integratedManagement/supervise/disputesArbitration.vue'),
            meta: {
              ...meta,
              title: '纠纷仲裁处置'
            }
          }
        ])('land-integratedManagement-supervise-')
      },
      {
        path: 'monitor',
        name: `${pre}monitor`,
        meta: {
          ...meta,
          title: '遥感监测'
        },
        component: _import('land/components/blankrouterview.vue'),
        children: (pre => [
          {
            path: 'ygdc_dbfx',
            name: `${pre}ygdc_dbfx`,
            component: _import('land/map/spatialData/ygdc_dbfxmain.vue'),
            meta: {
              ...meta,
              ismap: true,
              title: '对比分析'
            }
          },
          {
            path: 'ygdc_jcsb',
            name: `${pre}ygdc_jcsb`,
            component: _import('land/integratedManagement/monitor/ygdc_jcsb.vue'),
            meta: {
              ...meta,
              ismap: true,
              title: '遥感识别'
            }
          },
          {
            path: 'ygdc_wfdx',
            name: `${pre}ygdc_wfdx`,
            component: _import('land/integratedManagement/monitor/ygdc_wfdx.vue'),
            meta: {
              ...meta,
              ismap: true,
              title: '违法定性'
            }
          },
          {
            path: 'ygdc_czgz',
            name: `${pre}ygdc_czgz`,
            component: _import('land/integratedManagement/monitor/ygdc_czgz.vue'),
            meta: {
              ...meta,
              ismap: true,
              title: '处置跟踪'
            }
          }
        ])('land-integratedManagement-supervise-monitor')
      },
      {
        path: 'monitoringAnalysis',
        name: `${pre}monitoringAnalysis`,
        component: _import('land/components/blankrouterview.vue'),
        meta: {
          ...meta,
          ismap: true,
          title: '监测分析'
        },
        children: (pre => [
          {
            path: 'multipleAnalysis',
            name: `${pre}multipleAnalysis`,
            component: _import('land/integratedManagement/monitoringAnalysis/multipleAnalysis.vue'),
            meta: {
              ...meta,
              title: '综合分析'
            }
          },
          {
            path: 'manyHouses',
            name: `${pre}manyHouses`,
            component: _import('land/integratedManagement/monitoringAnalysis/manyHouses.vue'),
            meta: {
              ...meta,
              title: '一户多宅分析'
            }
          },
          {
            path: `illegallanduse`,
            name: `${pre}illegallanduse`,
            component: _import('land/integratedManagement/monitoringAnalysis/illegallanduse.vue'),
            meta: {
              ...meta,
              title: '违法用地分析'
            }
          }
        ])('land-integratedManagement-monitoringAnalysis-')
      }
    ])('land-integratedManagement-')
  }
}
