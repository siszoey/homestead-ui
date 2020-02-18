
let prefix = '/api/mock'

export default [
  {
    path: prefix + '/activiti/dbrw',
    method: 'get',
    handle({params}) {
      console.log('params', params)
      return require('./mock-data/activiti-undo.json')
    }
  },
  // {
  //   path: prefix + '/mock/system/dict',
  //   method: 'get',
  //   handle({params}) {
  //     console.log('params', params)

  //     return {
  //       state: 1,
  //       msg: '数据字典接口',
  //       data: [{type: "是否", code: "0", content: "否"}]
  //     }
  //   }
  // },
  // {
  //   path: prefix + '/mock/getResidenceList',
  //   method: 'post',
  //   handle(res) {
  //     let params = res.body
  //     console.log('params', params)
  //     let total = 83
  //     let residue = total - (params.pageNum - 1) * params.pageSize
  //     let size = residue > params.pageSize ? params.pageSize : residue
  //     let template = {}
  //     template[`list|${size}`] = [{
  //       "id": /\d{11}/,
  //       address: "xx省xx市xx区xx街道xx号",
  //       "area|60-220": 1,
  //       cardId: /3303\d{13}X/,
  //       declareType: "新建",
  //       isHouseHolder: "是",
  //       mobile: /135\d{8}/,
  //       "residence": res.Random.province(),
  //       "residenceAddress|1": res.Random.county(),
  //       "residenceFrom|1": res.Random.city(),
  //       "residenceType|1": ['居民户口', '非农户口'],
  //       "userName|1": ["张三", "李四", "王富贵"]
  //     }]
  //     return {
  //       state: 1,
  //       msg: '登录成功',
  //       data: {
  //         total: total,
  //         list: res.Mock.mock(template).list
  //       }
  //     }
  //   }
  // },
  // {
  //   path: prefix + '/mock/deleteDeclare',
  //   method: 'post',
  //   handle({body}) {
  //     console.log('body', body)
  //     return {
  //       state: 1,
  //       msg: '登录成功',
  //       data: {}
  //     }
  //   }
  // },
  // {
  //   path: prefix + '/mock/toCheckOpinion',
  //   method: 'post',
  //   handle({body}) {
  //     console.log('body', body)
  //     return {
  //       state: 1,
  //       msg: '登录成功',
  //       data: {}
  //     }
  //   },
  // }
]
