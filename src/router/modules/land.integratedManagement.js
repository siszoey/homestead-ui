// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {auth: true}

export default function (iotHeader) {
  return {
    path: '/land/integratedManagement',
    name: 'land-integratedManagement',
    meta,
    redirect: {name: 'land-integratedManagement-supervise-dailyInspection'},
    component: iotHeader,
    children: (pre => [
      {
        path: 'supervise/dailyInspection',
        name: `${pre}dailyInspection`,
        component: _import('land/integratedManagement/supervise/dailyInspection.vue'),
        meta: {
          ...meta,
          title: '日常巡查'
        }
      }
    ])('land-integratedManagement-'),
  }
}