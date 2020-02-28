import Mock from 'mockjs'
import util from '@/libs/util.js'

const dataRegion = util.cookies.get('dataRegion')

let complaintDatas = Mock.mock({ 'datas|100': [{
  'xmbh': '@now(yyyyMMddHHmmssSS)',
  'xmmc': '@cname()',
  'jbr': '@cname()',
  'jbsj': '@datetime("yyyy-MM-dd HH:mm:ss")',
  'jbdz': `${dataRegion}`,
  'jbnr': '存在"一宅多户"情况'
}] })

let registrationDatas = Mock.mock({ 'datas|100': [{
  'fwmph|1-200': 2,
  'djdz': `${dataRegion}`,
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
  let { pageNum, pageSize, xmbh, xmmc } = params2Obj(params.url)
  // console.log(pageNum)
  if (pageNum == 0) {
    pageNum = 1
  }
  let startIndex = pageSize * (pageNum - 1)
  // console.log(startIndex)
  let cDatas = {}
  cDatas.datas = complaintDatas.datas.filter(item => (item.xmmc).indexOf(xmmc) > -1&&(item.xmbh).indexOf(xmbh) > -1).slice(startIndex, pageSize * pageNum)
  cDatas.total = complaintDatas.datas.length
  return cDatas
}

function getRegistrationDatas (params) {
  let { pageNum, pageSize, djdz, djr } = params2Obj(params.url)
  // console.log(pageNum)
  if (pageNum == 0) {
    pageNum = 1
  }
  let startIndex = pageSize * (pageNum - 1)
  // console.log(startIndex)
  let cDatas = {}
  cDatas.datas = registrationDatas.datas.filter(item => (item.djdz).indexOf(djdz) > -1&&(item.djr).indexOf(djr) > -1).slice(startIndex, pageSize * pageNum)
  cDatas.total = registrationDatas.datas.length
  return cDatas
}

function getDisputeDatas (params) {
  let { pageNum, pageSize, sqr, jfr } = params2Obj(params.url)
  // console.log(pageNum)
  if (pageNum == 0) {
    pageNum = 1
  }
  let startIndex = pageSize * (pageNum - 1)
  // console.log(startIndex)
  let cDatas = {}
  cDatas.datas = disputeDatas.datas.filter(item => (item.sqr).indexOf(sqr) > -1&&(item.jfr).indexOf(jfr) > -1).slice(startIndex, pageSize * pageNum)
  cDatas.total = disputeDatas.datas.length
  console.log(cDatas)
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
  'yswfdz': `${dataRegion}`,
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
  'wfdz': `${dataRegion}`,
  'wfdxsj': '@date("yyyy-MM-dd")',
  'czzt|1': ['未开始执行', '执行中', '处置完毕'],
  'bz': ''
}] })

function getJcsbDatas (params) {
  let { pageNum, pageSize, xmbh, jcxmmc } = params2Obj(params.url)
  // console.log(pageNum)
  if (pageNum == 0) {
    pageNum = 1
  }
  let startIndex = pageSize * (pageNum - 1)
  // console.log(startIndex)
  let cDatas = {}
  cDatas.datas = jcsbDatas.datas.filter(item => (item.xmbh).indexOf(xmbh) > -1&&(item.jcxmmc).indexOf(jcxmmc) > -1).slice(startIndex, pageSize * pageNum)
  cDatas.total = jcsbDatas.datas.length
  return cDatas
}

function getWfdxDatas (params) {
  let { pageNum, pageSize, xmbh, xmmc } = params2Obj(params.url)
  // console.log(pageNum)
  if (pageNum == 0) {
    pageNum = 1
  }
  let startIndex = pageSize * (pageNum - 1)
  // console.log(startIndex)
  let cDatas = {}
  cDatas.datas = wfdxDatas.datas.filter(item => (item.xmbh).indexOf(xmbh) > -1&&(item.xmmc).indexOf(xmmc) > -1).slice(startIndex, pageSize * pageNum)
  cDatas.total = wfdxDatas.datas.length
  return cDatas
}

function getCzgzDatas (params) {
  let { pageNum, pageSize, xmbh, jcxmmc } = params2Obj(params.url)
  // console.log(pageNum)
  if (pageNum == 0) {
    pageNum = 1
  }
  let startIndex = pageSize * (pageNum - 1)
  // console.log(startIndex)
  let cDatas = {}
  cDatas.datas = czgzDatas.datas.filter(item => (item.xmbh).indexOf(xmbh) > -1&&(item.jcxmmc).indexOf(jcxmmc) > -1).slice(startIndex, pageSize * pageNum)
  cDatas.total = czgzDatas.datas.length
  return cDatas
}

Mock.mock(/\/api\/monitor\/getJcsbDatas/, 'get', getJcsbDatas)
Mock.mock(/\/api\/monitor\/getWfdxDatas/, 'get', getWfdxDatas)
Mock.mock(/\/api\/monitor\/getCzgzDatas/, 'get', getCzgzDatas)

// 出租列表
let czlbDatas = Mock.mock({ 'datas|20': [{
  'czr': '@cname',
  'lxdh|1': ['13125648612', '13204516234', '13256402316', '13125648632', '13164528539'],
  'dz': `${dataRegion}`,
  'fwdx': '@integer(40,150)',
  'czjg': '@integer(800,3500)',
  'fbsj': '@date("yyyy-MM-dd")'
}] })

// 求租列表
let qzlbDatas = Mock.mock({ 'datas|20': [{
  'qzr': '@cname',
  'xb|1': ['男', '女'],
  'lxdh|1': ['13125648612', '13204516234', '13256402316', '13125648632', '13164528539'],
  'qzwz': `${dataRegion}`,
  'qzjg': '@integer(800,3500)',
  'fbsj': '@date("yyyy-MM-dd")'
}] })

// 政策法规
let zcfgDatas = Mock.mock({ 'datas|20': [{
  'id|+1':1,
  'title': '@ctitle',
  'text': '@csentence(30,50)',
  'fbr': '@cname',
  'fbsj': '@date("yyyy-MM-dd")',
  'ydsl': '@integer(0,500)',
  'isShow': '@boolean'
}] })

// 新闻推荐
let xwtjDatas = Mock.mock({ 'datas|20': [{
  'id|+1':1,
  'title': '@ctitle',
  'text': '@csentence(30,50)',
  'fbr': '@cname',
  'fbsj': '@date("yyyy-MM-dd")',
  'ydsl': '@integer(0,500)',
  'isShow': '@boolean'
}] })

// 注册人信息
let zcrDatas = Mock.mock({ 'datas|50': [{
  'id|+1':1,
  'yhm': '@first',
  'xm': '@cname',
  'xb|1': ['男', '女'],
  'password': '@string(6,16)',
  'lxdh|1': ['13125648612', '13204516234', '13256402316', '13125648632', '13164528539'],
  'yx': '@email("163.com")',
  'zz':  `${dataRegion}`,
  'zcsj':  '@date("yyyy-MM-dd")',
}] })

function getCzlbDatas (params) {
  let { czr, lxdh} = params2Obj(params.url)
  let cDatas = czlbDatas.datas.filter(item => (item.czr).indexOf(czr) > -1&&(item.lxdh).indexOf(lxdh) > -1)
  return cDatas
}

function getQzlbDatas (params) {
  let { qzr, lxdh} = params2Obj(params.url)
  let cDatas = qzlbDatas.datas.filter(item => (item.qzr).indexOf(qzr) > -1&&(item.lxdh).indexOf(lxdh) > -1)
  return cDatas
}

function getZcfgDatas (params) {
  let { title, fbr} = params2Obj(params.url)
  let cDatas = zcfgDatas.datas.filter(item => (item.title).indexOf(title) > -1&&(item.fbr).indexOf(fbr) > -1)
  return cDatas
}

function addOrEditZcfg(options){
  let rtype = options.type.toLowerCase(); //获取请求的类型
  switch (rtype) {
      case 'get':
          break;
      case 'post':
          let obj = JSON.parse(options.body).params.obj;
          let id = parseInt(JSON.parse(options.body).params.obj.id);
          if(!id){
            let date = new Date();
            obj.ydsl = 0;
            obj.fbsj = date.getFullYear()+"-" + (date.getMonth()+1) + "-" + date.getDate();
            obj.id=zcfgDatas.datas.length+1
            zcfgDatas.datas.push(obj);  // 将前台返回来的数据，拼接到数组中。
          }else{
            zcfgDatas.datas = zcfgDatas.datas.map(val => {  // 将需要替换的数据替换掉
              return val.id === obj.id ? obj : val ;
            });
          }
          break;
      default:
          break;
  }
  return {
      data: zcfgDatas
  }
}

function getXwtjDatas (params) {
  let { title, fbr} = params2Obj(params.url)
  let cDatas = xwtjDatas.datas.filter(item => (item.title).indexOf(title) > -1&&(item.fbr).indexOf(fbr) > -1)
  return cDatas
}

function addOrEditXwtj(options){
  let rtype = options.type.toLowerCase(); //获取请求的类型
  switch (rtype) {
      case 'get':
          break;
      case 'post':
          let obj = JSON.parse(options.body).params.obj;
          let id = parseInt(JSON.parse(options.body).params.obj.id);
          if(!id){
            let date = new Date();
            obj.ydsl = 0;
            obj.fbsj = date.getFullYear()+"-" + (date.getMonth()+1) + "-" + date.getDate();
            obj.id=xwtjDatas.datas.length+1
            xwtjDatas.datas.push(obj);  // 将前台返回来的数据，拼接到数组中。
          }else{
            xwtjDatas.datas = xwtjDatas.datas.map(val => {  // 将需要替换的数据替换掉
              return val.id === obj.id ? obj : val ;
            });
          }
          break;
      default:
          break;
  }
  return {
      data: xwtjDatas
  }
}

function getZcrDatas (params) {
  let { pageNum, pageSize, yhm, xm, lxdh } = params2Obj(params.url)
  if (pageNum == 0) {
    pageNum = 1
  }
  let startIndex = pageSize * (pageNum - 1)
  let cDatas = {}
  cDatas.datas = zcrDatas.datas.filter(item => (item.yhm).indexOf(yhm) > -1&&(item.xm).indexOf(xm) > -1&&(item.lxdh).indexOf(lxdh) > -1).slice(startIndex, pageSize * pageNum)
  cDatas.total = zcrDatas.datas.length
  return cDatas
}

function addOrEditZcr(options){
  let rtype = options.type.toLowerCase(); //获取请求的类型
    switch (rtype) {
        case 'get':
            break;
        case 'post':
            let obj = JSON.parse(options.body).params.obj;
            let id = parseInt(JSON.parse(options.body).params.obj.id);
            if(!id){
              let date = new Date();
              obj.ydsl = 0;
              obj.fbsj = date.getFullYear()+"-" + (date.getMonth()+1) + "-" + date.getDate();
              obj.id=zcrDatas.datas.length+1
              zcrDatas.datas.push(obj);  // 将前台返回来的数据，拼接到数组中。
            }else{
              zcrDatas.datas = zcrDatas.datas.map(val => {  // 将需要替换的数据替换掉
                return val.id === obj.id ? obj : val ;
              });
            }
            break;
        default:
            break;
    }
    return {
        data: zcrDatas
    }
}

Mock.mock(/\/api\/shareFarmhouse\/getCzlbDatas/, 'get', getCzlbDatas)
Mock.mock(/\/api\/shareFarmhouse\/getQzlbDatas/, 'get', getQzlbDatas)
Mock.mock(/\/api\/shareFarmhouse\/getZcfgDatas/, 'get', getZcfgDatas)
Mock.mock(/\/api\/shareFarmhouse\/addOrEditZcfg/, /get|post/i,addOrEditZcfg);
Mock.mock(/\/api\/shareFarmhouse\/getXwtjDatas/, 'get', getXwtjDatas)
Mock.mock(/\/api\/shareFarmhouse\/addOrEditXwtj/, /get|post/i,addOrEditXwtj);
Mock.mock(/\/api\/shareFarmhouse\/getZcrDatas/, 'get', getZcrDatas)
Mock.mock(/\/api\/shareFarmhouse\/addOrEditZcr/, /get|post/i,addOrEditZcr);