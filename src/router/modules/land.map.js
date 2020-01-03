// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default function(iotHeader) {
    return {
        path: '/land/map',
        name: 'land-map',
        meta,
        redirect: { name: 'land-map-spatialData-survey' },
        component: iotHeader,
        children: (pre => [{
                path: 'spatialData/survey',
                name: `${pre}survey`,
                component: _import('land/map/spatialData/survey.vue'),
                meta: {
                    ...meta,
                    ismap: true,
                    title: '现状调查成果'
                }
            },
            {
                path: 'spatialData/test',
                name: `${pre}test`,
                component: _import('land/map/spatialData/test.vue'),
                meta: {
                    ...meta,
                    ismap: true,
                    title: 'DEMO页面'
                }
            },
            {
                path: 'spatialData/plan',
                name: `${pre}plan`,
                component: _import('land/map/spatialData/plan.vue'),
                meta: {
                    ...meta,
                    title: '村庄规划编制成果'
                }
            },
            {
                path: 'spatialData/year',
                name: `${pre}year`,
                component: _import('land/map/spatialData/year.vue'),
                meta: {
                    ...meta,
                    title: '年度计划成果'
                }
            },
            {
                path: 'spatialData/build',
                name: `${pre}build`,
                component: _import('land/map/spatialData/build.vue'),
                meta: {
                    ...meta,
                    title: '宅基地建设成果'
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
            }
        ])(),
    }
}