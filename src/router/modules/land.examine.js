// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {auth: true}

export default function (iotHeader) {
  return {
    path: '/land/examine',
    redirect: {name: 'land-examine-business-todo'},
    component: iotHeader,
    children: (pre => [
      {
        path: 'business/todo',
        name: `${pre}todo`,
        component: _import('land/examine/business/todo.vue'),
        meta: {
          ...meta,
          title: '待办箱'
        }
      },
      {
        path: 'business/todo-create',
        name: `${pre}todo-create`,
        component: _import('land/examine/business/compoment/detail-page.vue'),
        meta: {
          ...meta,
          title: '新建申报'
        }
      },
      {
        path: 'business/detail',
        name: `${pre}detail`,
        component: _import('land/examine/business/compoment/detail-page.vue'),
        children: [
          {
            path: `application-form`,
            name: `applicationForm`,
            component: _import('land/examine/business/compoment/application-form.vue'),
            props: true
          },
          {
            path: `appceptance-form`,
            name: `appceptanceForm`,
            component: _import('land/examine/business/compoment/appceptance-form.vue'),
            props: true,
          },
          {
            path: 'approval-form',
            name: `approvalForm`,
            component: _import('land/examine/business/compoment/approval-form.vue'),
            props: true
          },
          {
            path: 'filetreeview',
            name: `fileTreeView`,
            component: _import('land/components/filetreeview.vue'),
            props: true
          }
        ]
      },
      {
        path: 'business/done',
        name: `${pre}done`,
        component: _import('land/examine/business/done.vue'),
        meta: {
          ...meta,
          title: '已办箱'
        }
      },
      {
        path: 'business/rollback',
        name: `${pre}rollback`,
        component: _import('land/examine/business/rollback.vue'),
        meta: {
          ...meta,
          title: '退件箱'
        }
      },
      {
        path: 'business/comprehensive',
        name: `${pre}comprehensive`,
        component: _import('land/examine/business/comprehensive.vue'),
        meta: {
          ...meta,
          title: '综合管理'
        }
      },
      {
        path: 'search',
        name: `${pre}search`,
        component: _import('land/examine/search'),
        meta: {
          ...meta,
          title: '归档查询'
        }
      },
      {
        path: 'statistics',
        name: `${pre}statistics`,
        component: _import('land/examine/statistics'),
        meta: {
          ...meta,
          title: '统计分析'
        }
      }
    ])('land-examine-'),
  }
}
