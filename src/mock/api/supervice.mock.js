import Mock from 'mockjs'

let complaintDatas = Mock.mock({ 'datas|100': [{
  'xmbh': '@now(yyyyMMddHHmmssSS)',
  'xmmc': '@cname()',
  'jbr': '@cname()',
  'jbsj': '@datetime("yyyy-MM-dd HH:mm:ss")',
  'jbdz': '海南省文昌市',
  'jbnr': '存在"一宅多户"情况'
}] })

let registrationDatas = Mock.mock({ 'datas|100': [{
  'fwmph|1-200': 2,
  'djdz': '海南省文昌市',
  'djr': '@cname()',
  'djsj': '@datetime("yyyy-MM-dd HH:mm:ss")',
  'xzsy|1': ['未利用', '超标宅基地'],
  'bz': ''
}] })

let disputeDatas = Mock.mock({ 'datas|100': [{
  'sqr': '@cname()',
  'jfr': '@cname()',
  'lxfs|1': ['13125648612', '13204516234', '13256402316', '13125648632', '13164528539'],
  'djsj': '@datetime("yyyy-MM-dd HH:mm:ss")',
  'jfzcsy|1': ['宅基地认定不清', '宅基地面积与证不符'],
  'bz': ''
}] })

function params2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

function getComplaintDatas (params) {
  let { pageNum, pageSize } = params2Obj(params.url)
  // console.log(pageNum)
  if (pageNum == 0) {
    pageNum = 1
  }
  let startIndex = pageSize * (pageNum - 1)
  // console.log(startIndex)
  let cDatas = {}
  cDatas.datas = complaintDatas.datas.slice(startIndex, pageSize * pageNum)
  cDatas.total = complaintDatas.datas.length
  return cDatas
}

function getRegistrationDatas (params) {
  let { pageNum, pageSize } = params2Obj(params.url)
  // console.log(pageNum)
  if (pageNum == 0) {
    pageNum = 1
  }
  let startIndex = pageSize * (pageNum - 1)
  // console.log(startIndex)
  let cDatas = {}
  cDatas.datas = registrationDatas.datas.slice(startIndex, pageSize * pageNum)
  cDatas.total = registrationDatas.datas.length
  return cDatas
}

function getDisputeDatas (params) {
  let { pageNum, pageSize } = params2Obj(params.url)
  // console.log(pageNum)
  if (pageNum == 0) {
    pageNum = 1
  }
  let startIndex = pageSize * (pageNum - 1)
  // console.log(startIndex)
  let cDatas = {}
  cDatas.datas = disputeDatas.datas.slice(startIndex, pageSize * pageNum)
  cDatas.total = disputeDatas.datas.length
  return cDatas
}

Mock.mock(/\/api\/supervise\/getComplaintDatas/, 'get', getComplaintDatas)
Mock.mock(/\/api\/supervise\/getRegistrationDatas/, 'get', getRegistrationDatas)
Mock.mock(/\/api\/supervise\/getDisputeDatas/, 'get', getDisputeDatas)

