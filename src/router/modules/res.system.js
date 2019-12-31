// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {auth: true}

export default function (iotHeader) {
  return {
    path: '/res/system',
    name: 'res-system',
    meta,
    redirect: {name: 'res-system-auth'},
    component: iotHeader,
    children: (pre => [
      {
        path: 'journal',
        name: `${pre}journal`,
        component: _import('res/system/journal.vue'),
        meta: {
          ...meta,
          title: '操作日志'
        }
      },
      {
        path: 'password',
        name: `${pre}password`,
        component: _import('res/system/password.vue'),
        meta: {
          ...meta,
          title: '密码修改'
        }
      },
      {
        path: 'safe',
        name: `${pre}safe`,
        component: _import('res/system/safe.vue'),
        meta: {
          ...meta,
          title: '安全管理'
        }
      },
      {
        path: 'wechart',
        name: `${pre}wechart`,
        component: _import('res/system/wechart.vue'),
        meta: {
          ...meta,
          title: '微信模板信息提醒'
        }
      },
      {
        path: 'uploadview',
        name: `${pre}uploadview`,
        component: _import('res/system/uploadview.vue'),
        meta: {
          ...meta,
          title: '需上传影像自行管理'
        }
      }
    ])('res-system-')
  }
}
