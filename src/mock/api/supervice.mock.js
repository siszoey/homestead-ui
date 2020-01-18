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

// 监测识别
let jcsbDatas = Mock.mock({ 'datas|100': [{
  'xmbh': '@now(yyyyMMddHHmmssSS)',
  'jcxmmc': '宅基地违法占地',
  'yxqs': '2019年第一期',
  'yswfdz': '海南省文昌市',
  'jcsj': '@date("yyyy-MM-dd")',
  'yswflx|1':  ['占用基本农田', '非规划范围内建设']
}] })

// 违法定性
let wfdxDatas = Mock.mock({ 'datas|100': [{
  'xmbh': '@now(yyyyMMddHHmmssSS)',
  'xmmc': '宅基地违法占地',
  'zfr': '@cname()',
  'zfsy': '实际修建面积比宅基地获取面积大',
  'yjzfsj': '@date("yyyy-MM-dd")',
  'bz': ''
}] })

// 处置跟踪
let czgzDatas = Mock.mock({ 'datas|100': [{
  'xmbh': '@now(yyyyMMddHHmmssSS)',
  'jcxmmc': '宅基地违法占地',
  'wfdxr': '@cname()',
  'wfdz': '海南省文昌市',
  'wfdxsj': '@date("yyyy-MM-dd")',
  'czzt|1': ['未开始执行', '执行中', '处置完毕'],
  'bz': ''
}] })

function getJcsbDatas (params) {
  let { pageNum, pageSize } = params2Obj(params.url)
  // console.log(pageNum)
  if (pageNum == 0) {
    pageNum = 1
  }
  let startIndex = pageSize * (pageNum - 1)
  // console.log(startIndex)
  let cDatas = {}
  cDatas.datas = jcsbDatas.datas.slice(startIndex, pageSize * pageNum)
  cDatas.total = jcsbDatas.datas.length
  return cDatas
}

function getWfdxDatas (params) {
  let { pageNum, pageSize } = params2Obj(params.url)
  // console.log(pageNum)
  if (pageNum == 0) {
    pageNum = 1
  }
  let startIndex = pageSize * (pageNum - 1)
  // console.log(startIndex)
  let cDatas = {}
  cDatas.datas = wfdxDatas.datas.slice(startIndex, pageSize * pageNum)
  cDatas.total = wfdxDatas.datas.length
  return cDatas
}

function getCzgzDatas (params) {
  let { pageNum, pageSize } = params2Obj(params.url)
  // console.log(pageNum)
  if (pageNum == 0) {
    pageNum = 1
  }
  let startIndex = pageSize * (pageNum - 1)
  // console.log(startIndex)
  let cDatas = {}
  cDatas.datas = czgzDatas.datas.slice(startIndex, pageSize * pageNum)
  cDatas.total = czgzDatas.datas.length
  return cDatas
}

Mock.mock(/\/api\/monitor\/getJcsbDatas/, 'get', getJcsbDatas)
Mock.mock(/\/api\/monitor\/getWfdxDatas/, 'get', getWfdxDatas)
Mock.mock(/\/api\/monitor\/getCzgzDatas/, 'get', getCzgzDatas)
