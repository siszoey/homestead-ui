// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {auth: true}

export default function (iotHeader) {
  return {
    path: '/res/business',
    name: 'res-business',
    meta,
    redirect: {name: 'res-business-declare'},
    component: iotHeader,
    children: (pre => [
      {
        path: 'declare',
        name: `${pre}declare`,
        component: _import('res/business/declare'),
        meta: {
          ...meta,
          title: '项目申报'
        }
      },
      {
        path: 'declare-create',
        name: `${pre}declare-create`,
        component: _import('res/business/declare/declare.vue'),
        meta: {
          ...meta,
          title: '新增申报'
        }
      },
      {
        path: 'check',
        name: `${pre}check`,
        component: _import('res/business/check'),
        meta: {
          ...meta,
          title: '街道审核'
        }
      },
      {
        path: 'summarize',
        name: `${pre}summarize`,
        component: _import('res/business/summarize'),
        meta: {
          ...meta,
          title: '审核汇总'
        }
      },
      {
        path: 'supervision',
        name: `${pre}supervision`,
        component: _import('res/business/building-supervision'),
        meta: {
          ...meta,
          title: '建房监管'
        }
      },
      {
        path: 'retreat',
        name: `${pre}retreat`,
        component: _import('res/business/retreat'),
        meta: {
          ...meta,
          title: '退办件'
        }
      }
    ])('res-business-')
  }
}
