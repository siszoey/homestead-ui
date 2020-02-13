// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default function (iotHeader) {
  return {
    path: '/land/utilize',
    name: 'land-utilize',
    meta: {
      ...meta,
      title: '盘活利用'
    },
    redirect: { name: 'land-utilize-informationStatistics' },
    component: iotHeader,
    children: (pre => [
      { 
        path: `utilizeAnalyse`,
        name: `${pre}utilizeAnalyse`,
        component: _import('land/utilize/utilizeAnalyse.vue'),
        meta: {
          ...meta,
          title: '盘活利用分析'
        }
      },
      {
        path: 'shareManager',
        name: `${pre}shareManager`,
        component: _import('land/components/blankrouterview.vue'),
        meta: {
          ...meta,
          title: '共享农房管理'
        },
        children:(pre => [
          {
            path: 'informationStatistics',
            name: `${pre}informationStatistics`,
            component: _import('land/utilize/informationStatistics.vue'),
            meta: {
              ...meta,
              title: '信息统计'
            }
          },
          {
            path: 'informationList',
            name: `${pre}informationList`,
            component: _import('land/utilize/informationList.vue'),
            meta: {
              ...meta,
              title: '信息列表'
            }
          },
          {
            path: 'informationRelease',
            name: `${pre}informationRelease`,
            component: _import('land/utilize/informationRelease.vue'),
            meta: {
              ...meta,
              title: '信息发布'
            }
          },
          {
            path: 'registrantAdministration',
            name: `${pre}registrantAdministration`,
            component: _import('land/utilize/registrantAdministration.vue'),
            meta: {
              ...meta,
              title: '注册人管理'
            }
          }
        ])(`${pre}shareManager-`)
      }
    ])('land-utilize-')
  }
}
