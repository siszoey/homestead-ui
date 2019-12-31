// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default function(iotHeader) {
    return {
        path: '/res/analyse',
        name: 'res-analyse',
        meta,
        redirect: { name: 'res-analyse' },
        component: iotHeader,
        children: (pre => [{
            path: 'analyse',
            name: `${pre}analyse`,
            component: _import('res/analyse'),
            meta: {
                ...meta,
                ismap: true,
                title: '数据分析'
            }
        }])('res-analyse-')
    }
}