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
    redirect: { name: 'land-integratedManagement-monitoring_analysis' },
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
        path: 'supervise/ygdc_dbfx',
        name: `${pre}ygdc_dbfx`,
        component: _import('land/map/spatialData/ygdc_dbfxmain.vue'),
        meta: {
          ...meta,
          ismap: true,
          title: '对比分析'
        }
      },
      {
        path: 'supervise/monitoring_analysis',
        name: `${pre}monitoring_analysis`,
        component: _import('land/integratedManagement/supervise/monitoring_analysis.vue'),
        meta: {
          ...meta,
          ismap: true,
          title: '监测分析'
        }
      }
    ])('land-integratedManagement-'),
  }
}
