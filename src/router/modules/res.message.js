// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default function(iotHeader) {
    return {
        path: '/res/message',
        name: 'res-message',
        meta,
        redirect: { name: 'res-message-mesDynamic' },
        component: iotHeader,
        children: (pre => [{
                path: 'mesDynamic',
                name: `${pre}mesDynamic`,
                component: _import('res/message/mesDynamic.vue'),
                meta: {
                    ...meta,
                    title: '信息动态'
                }
            },
            {
                path: 'mesManager',
                name: `${pre}mesManager`,
                component: _import('res/message/mesManager.vue'),
                meta: {
                    ...meta,
                    title: '信息维护管理'
                }
            },
            {
                path: 'mesSearch',
                name: `${pre}mesSearch`,
                component: _import('res/message/mesSearch.vue'),
                meta: {
                    ...meta,
                    title: '信息查询对象'
                }
            },
            {
                path: 'mesSupport',
                name: `${pre}mesSupport`,
                component: _import('res/message/mesSupport.vue'),
                meta: {
                    ...meta,
                    title: '信息动态支持区域'
                }
            }
            ,
            {
                path: 'msgDetails',
                name: `${pre}msgDetails`,
                component: _import('res/message/msgDetails.vue'),
                meta: {
                    ...meta,
                    title: '信息查阅'
                }
            }
        ])('res-message-')
    }
}