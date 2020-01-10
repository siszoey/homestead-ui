// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default function (iotHeader) {
    return {
        path: '/land/map',
        name: 'land-map',
        meta,
        redirect: { name: 'land-map-spatialData-survey' },
        component: iotHeader,
        children: (pre => [{
            path: 'spatialData/mappanel',
            name: `${pre}mappanel`,
            component: _import('land/map/spatialData/mappanel.vue'),
            meta: {
                ...meta,
                ismap: true,
                title: '首页一张图'
            }
        },
        {
            path: 'spatialData/onemap',
            name: `${pre}onemap`,
            component: _import('land/map/spatialData/onemap.vue'),
            meta: {
                ...meta,
                ismap: true,
                title: '一张图'
            }
        },
        {
            path: 'spatialData/ygdc_dbfx',
            name: `${pre}ygdc_dbfx`,
            component: _import('land/map/spatialData/ygdc_dbfx.vue'),
            meta: {
                ...meta,
                ismap: true,
                title: '对比分析'
            }
        },
        {
            path: 'accountInformation/yearPlan',
            name: `${pre}yearPlan`,
            component: _import('land/map/accountInformation/yearPlan.vue'),
            meta: {
                ...meta,
                ismap: true,
                title: '年度计划一览表'
            }
        },
        {
            path: 'accountInformation/landIndex',
            name: `${pre}landIndex`,
            component: _import('land/map/accountInformation/landIndex.vue'),
            meta: {
                ...meta,
                title: '用地指标一览表'
            }
        },
        {
            path: 'accountInformation/IllegalHouse',
            name: `${pre}IllegalHouse`,
            component: _import('land/map/accountInformation/IllegalHouse.vue'),
            meta: {
                ...meta,
                title: '违法建房一览表'
            }
        },
        {
            path: 'accountInformation/revitalizeUse',
            name: `${pre}revitalizeUse`,
            component: _import('land/map/accountInformation/revitalizeUse.vue'),
            meta: {
                ...meta,
                title: '盘活利用一览表'
            }
        },
        {
            path: 'accountInformation/householdRegister',
            name: `${pre}householdRegister`,
            component: _import('land/map/accountInformation/householdRegister.vue'),
            meta: {
                ...meta,
                title: '户籍信息一览表'
            }
        },
        {
            path: 'implementationProcess/examineList',
            name: `${pre}examineList`,
            component: _import('land/map/implementationProcess/examineList.vue'),
            meta: {
                ...meta,
                ismap: true,
                title: '审批一览表'
            }
        },
        {
            path: 'implementationProcess/examinePic',
            name: `${pre}examinePic`,
            component: _import('land/map/implementationProcess/examinePic.vue'),
            meta: {
                ...meta,
                ismap: true,
                title: '审批一张图'
            }
        },
        {
            path: 'leaderCockpit/index',
            name: `${pre}index`,
            component: _import('land/map/leaderCockpit/index.vue'),
            meta: {
                ...meta,
                title: '领导驾驶舱'
            }
        },
        ])(),
    }
}