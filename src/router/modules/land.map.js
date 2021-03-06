// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default function(iotHeader) {
    return {
        path: '/land/map',
        name: 'land-map',
        meta: {
            ...meta,
            title: '宅基地一张图'
        },
        redirect: { name: 'land-map-spatialData-onemap' },
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
                children: [
                    {
                        path: 'onemap',
                        name: `${pre}spatialData-onemap`,
                        component: _import('land/map/spatialData/onemap.vue'),
                        meta: {
                            ...meta,
                            ismap: true,
                            // title: '一张图'
                        }
                    },       
                {
                    path: 'survey',
                    name: `${pre}spatialData-survey`,
                    component: _import('land/map/spatialData/survey.vue'),
                    meta: {
                        ...meta,
                        ismap: true,
                        title: '现状调查成果'
                    }
                },
                {
                    path: 'plan',
                    name: `${pre}spatialData-plan`,
                    component: _import('land/map/spatialData/plan.vue'),
                    meta: {
                        ...meta,
                        title: '国土空间规划'
                    }
                },
                {
                    path: 'year',
                    name: `${pre}spatialData-year`,
                    component: _import('land/map/spatialData/year.vue'),
                    meta: {
                        ...meta,
                        title: '村庄规划'
                    }
                },
                {
                    path: 'build',
                    name: `${pre}spatialData-build`,
                    component: _import('land/map/spatialData/build.vue'),
                    meta: {
                        ...meta,
                        title: '农房建设分布'
                    }
                }
              ]
            },
            {
                path: 'accountInformation',
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
                            title: '年度计划'
                        }
                    },
                    {
                        path: 'landIndex',
                        name: `${pre}landIndex`,
                        component: _import('land/map/accountInformation/landIndex.vue'),
                        meta: {
                            ...meta,
                            title: '用地指标'
                        }
                    },
                    {
                        path: 'IllegalHouse',
                        name: `${pre}IllegalHouse`,
                        component: _import('land/map/accountInformation/IllegalHouse.vue'),
                        meta: {
                            ...meta,
                            title: '违法建房'
                        }
                    },
                    {
                        path: 'revitalizeUse',
                        name: `${pre}revitalizeUse`,
                        component: _import('land/map/accountInformation/revitalizeUse.vue'),
                        meta: {
                            ...meta,
                            title: '盘活利用'
                        }
                    },
                    // {
                    //     path: 'householdRegister',
                    //     name: `${pre}householdRegister`,
                    //     component: _import('land/map/accountInformation/householdRegister.vue'),
                    //     meta: {
                    //         ...meta,
                    //         title: '户籍信息一览表'
                    //     }
                    // }
                ])('land-map-accountInformation-')
            },
            {
                path: 'countyPeople',
                name: `${pre}countyPeople`,
                component: _import('land/components/blankrouterview.vue'),
                redirect: { name: 'land-map-countyPeople-summary' },
                meta: {
                    ...meta,
                    ismap: true,
                    title: '农村人口'
                },
                children:(pre => [
                    {
                        path: 'summary',
                        name: `${pre}summary`,
                        component: _import('land/map/countyPeople/summary.vue'),
                        meta: {
                            ...meta,
                            ismap: true,
                            title: '农村人口一览表'
                        }
                    },
                    {
                        path: 'itegratedQuery',
                        name: `${pre}itegratedQuery`,
                        component: _import('land/map/countyPeople/itegratedQuery.vue'),
                        meta: {
                            ...meta,
                            ismap: true,
                            title: '联合查询'
                        }
                    },
                    {
                        path: 'dataSource',
                        name: `${pre}dataSource`,
                        component: _import('land/components/blankrouterview.vue'),
                        redirect: { name: 'land-map-countyPeople-constractorMembers' },
                        meta: {
                            ...meta,
                            title: '数据来源'
                        },
                        children: [
                            {
                                path: 'constractorMembers',
                                name: `${pre}constractorMembers`,
                                component: _import('land/map/countyPeople/constractorMembers.vue'),
                                meta: {
                                    ...meta,
                                    ismap: true,
                                    title: '承包方家庭成员'
                                }
                            },
                            {
                                path: 'collectiveOrgnization',
                                name: `${pre}collectiveOrgnization`,
                                component: _import('land/map/countyPeople/collectiveOrgnization.vue'),
                                meta: {
                                    ...meta,
                                    ismap: true,
                                    title: '集体经济组织成员'
                                }
                            },
                            {
                                path: 'farmhouseOwner',
                                name: `${pre}farmhouseOwner`,
                                component: _import('land/map/countyPeople/farmhouseOwner.vue'),
                                meta: {
                                    ...meta,
                                    ismap: true,
                                    title: '宅基地使用权共有人'
                                }
                            },
                            {
                                path: 'householdRegister',
                                name: `${pre}householdRegister`,
                                component: _import('land/map/countyPeople/householdRegister.vue'),
                                meta: {
                                    ...meta,
                                    ismap: true,
                                    title: '公安户籍人口'
                                }
                            }
                        ]
                    }
                ])('land-map-countyPeople-')
            },
            {
                path: 'implementationProcess',
                name: `${pre}implementationProcess`,
                component: _import('land/components/blankrouterview.vue'),
                redirect: { name: 'land-map-implementationProcess-examineList' },
                meta: {
                    ...meta,
                    ismap: true,
                    title: '实施过程'
                },
                children:(pre => [
                    // {
                    //     path: 'examineList',
                    //     name: `${pre}examineList`,
                    //     component: _import('land/map/implementationProcess/examineList.vue'),
                    //     meta: {
                    //         ...meta,
                    //         ismap: true,
                    //         title: '审批一览表'
                    //     }
                    // },
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
