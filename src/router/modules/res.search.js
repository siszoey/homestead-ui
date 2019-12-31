// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default function(iotHeader) {
    return {
        path: '/res/search',
        name: 'res-search',
        meta,
        redirect: { name: 'res-search-filesSearch' },
        component: iotHeader,
        children: (pre => [{
            path: 'filesSearch',
            name: `${pre}filesSearch`,
            component: _import('res/search/filesSearch'),
            meta: {
                ...meta,
                ismap: true,
                title: '归档查询'
            }
        }])('res-search-')
    }
}