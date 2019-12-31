// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default function(iotHeader) {
    return {
        path: '/res/map',
        name: 'res-map',
        meta,
        redirect: { name: 'res-map-homesteadmap' },
        component: iotHeader,
        children: (pre => [{
                path: 'homesteadmap',
                name: `${pre}homesteadmap`,
                component: _import('res/map/homestead.vue'),
                meta: {
                    ...meta,
                    ismap: true,
                    title: '宅基地一张图'
                }
            },
            {
                path: 'townplanmap',
                name: `${pre}townplanmap`,
                component: _import('res/map/plan.vue'),
                meta: {
                    ...meta,
                    title: '城乡规划一张图'
                }
            }
        ])('res-map-')
    }
}