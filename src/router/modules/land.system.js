// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default function (iotHeader) {
  return {
    path: '/land/system',
    name: 'land-system',
    meta,
    redirect: { name: 'land-system-fileConfig' },
    component: iotHeader,
    children: (pre => [
      {
        path: 'fileConfig',
        name: `${pre}fileConfig`,
        component: _import('land/system/fileConfig.vue'),
        meta: {
          ...meta,
          title: '上传设置'
        }
      }
    ])('land-system-')
  }
}