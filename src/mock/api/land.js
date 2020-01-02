
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
    path: prefix + '/declare-application',
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
]
