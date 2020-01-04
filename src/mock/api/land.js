
let prefix = '/mock'

export default [
  {
    path: prefix + '/dict',
    method: 'get',
    handle({params}) {
      console.log('params', params)

      return {
        code: 1,
        message: '数据字典接口',
        result: [{keyName: "是否", optCode: "0", optName: "否"}]
      }
    }
  },
  {
    path: prefix + '/apply/form',
    method: 'post',
    handle(res) {
      let params = res.body
      console.log('params', params)

      return {
        code: 1,
        message: '成功',
        result: {}
      }
    }
  },
  {
    path: prefix + '/apply/form/process',
    method: 'post',
    handle(res) {
      let params = res.body
      console.log('params', params)

      return {
        code: 1,
        message: '成功',
        result: {}
      }
    }
  },
  {
    path: prefix + '/apply/form/list',
    method: 'get',
    handle(res) {
      let params = res.params
      console.log('params', params)
      let total = 83
      let residue = total - (params.pageNum - 1) * params.pageSize
      let size = residue > params.pageSize ? params.pageSize : residue
      let template = {}
      template[`list|${size}`] = [{
        "id": /\d{11}/,
        address: "xx省xx市xx区xx街道xx号",
        "area|60-220": 1,
        cardId: /3303\d{13}X/,
        declareType: "新建",
        isHouseHolder: "是",
        mobile: /135\d{8}/,
        "residence": res.Random.province(),
        "residenceAddress|1": res.Random.county(),
        "residenceFrom|1": res.Random.city(),
        "residenceType|1": ['居民户口', '非农户口'],
        "userName|1": ["张三", "李四", "王富贵"]
      }]
      return {
        state: 1,
        msg: '登录成功',
        data: {
          total: total,
          list: res.Mock.mock(template).list
        }
      }
    }
  },
]
