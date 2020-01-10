// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default function(iotHeader) {
    return {
        path: '/land/map',
        name: 'land-map',
        meta: {
            ...meta,
            title: '一张图'
        },
        redirect: { name: 'land-map-leaderCockpit-index' },
        component: iotHeader,
        children: (pre => [
            {
                path: 'spatialData',
                name: `${pre}spatialData`,
                component: _import('land/components/blankrouterview.vue'),
                redirect: { name: 'land-map-spatialData-survey' },
                meta: {
                    ...meta,
                    ismap: true,
                    title: '空间数据'
                },
                children: (pre => [
                    {
                        path: 'mappanel',
                        name: `${pre}mappanel`,
                        component: _import('land/map/spatialData/mappanel.vue'),
                        meta: {
                            ...meta,
                            ismap: true,
                            title: '首页一张图'
                        }
                    },
                    {
                        path: 'onemap',
                        name: `${pre}onemap`,
                        component: _import('land/map/spatialData/onemap.vue'),
                        meta: {
                            ...meta,
                            ismap: true,
                            title: '一张图'
                        }
                    }             
              ])('land-map-spatialData-')
            },
            {
                path:'accountInformation',
                name: `${pre}accountInformation`,
                component: _import('land/components/blankrouterview.vue'),
                redirect: { name: 'land-map-accountInformation-yearPlan' },
                meta: {
                    ...meta,
                    ismap: true,
                    title: '台账信息'
                },
                children:(pre => [
                    {
                        path: 'yearPlan',
                        name: `${pre}yearPlan`,
                        component: _import('land/map/accountInformation/yearPlan.vue'),
                        meta: {
                            ...meta,
                            ismap: true,
                            title: '年度计划一览表'
                        }
                    },
                    {
                        path: 'landIndex',
                        name: `${pre}landIndex`,
                        component: _import('land/map/accountInformation/landIndex.vue'),
                        meta: {
                            ...meta,
                            title: '用地指标一览表'
                        }
                    },
                    {
                        path: 'IllegalHouse',
                        name: `${pre}IllegalHouse`,
                        component: _import('land/map/accountInformation/IllegalHouse.vue'),
                        meta: {
                            ...meta,
                            title: '违法建房一览表'
                        }
                    },
                    {
                        path: 'revitalizeUse',
                        name: `${pre}revitalizeUse`,
                        component: _import('land/map/accountInformation/revitalizeUse.vue'),
                        meta: {
                            ...meta,
                            title: '盘活利用一览表'
                        }
                    },
                    {
                        path: 'householdRegister',
                        name: `${pre}householdRegister`,
                        component: _import('land/map/accountInformation/householdRegister.vue'),
                        meta: {
                            ...meta,
                            title: '户籍信息一览表'
                        }
                    }
                ])('land-map-accountInformation-')
            },
            {
                path: 'implementationProcess',
                name: `${pre}implementationProcess`,
                component: _import('land/components/blankrouterview.vue'),
                redirect: { name: 'land-map-implementationProcess-examineList' },
                meta: {
                    ...meta,
                    ismap: true,
                    title: '台账信息'
                },
                children:(pre => [
                    {
                        path: 'examineList',
                        name: `${pre}examineList`,
                        component: _import('land/map/implementationProcess/examineList.vue'),
                        meta: {
                            ...meta,
                            ismap: true,
                            title: '审批一览表'
                        }
                    },
                    {
                        path: 'examinePic',
                        name: `${pre}examinePic`,
                        component: _import('land/map/implementationProcess/examinePic.vue'),
                        meta: {
                            ...meta,
                            ismap: true,
                            title: '审批一张图'
                        }
                    }
                    
                ])('land-map-implementationProcess-')
            },
            {
                path: 'leaderCockpit/index',
                name: `${pre}leaderCockpit-index`,
                component: _import('land/map/leaderCockpit/index.vue'),
                meta: {
                  ...meta,
                  title: '领导驾驶舱'
                }
              }       
        ])('land-map-')
    }
}