// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default function (iotHeader) {
  return {
    path: '/land/concurrent',
    name: 'land-concurrent',
    meta: {
      ...meta,
      title: '数据汇交'
    },
    redirect: { name: 'land-concurrent-batchreport' },
    component: iotHeader,
    children: (pre => [
      {
        path: 'batchreport',
        name: `${pre}batchreport`,
        component: _import('land/examine/business/batchreport.vue'),
        meta: {
          ...meta,
          title: '批量上报'
        }
      }
    ])('land-concurrent-')
  }
}
