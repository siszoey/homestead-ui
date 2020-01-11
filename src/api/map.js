import request from '@/plugin/axios'

// const prefix = '/mock'

const prefix = ''

export function queryCode () {
  return request({
    url: '/map/queryCode',
    method: 'get'
  })
}

export function queryPlan (data) {
  return request({
    url: '/map/queryPlan',
    method: 'post',
    data
  })
}

export function queryHomestead (data) {
  return request({
    url: '/map/queryHomestead',
    method: 'get',
    data
  })
}

export function getProgressData() {
  return request({
    url: 'index/progress',
    method: 'post'
  })
}

export function getMapQueryZjdSqMj(data) {
  return request({
    url: 'map/queryzjdsqmj',
    method: 'get',
    data
  })
}

export function getMapQueryZjdGdq(data) {
  return request({
    url: '/map/queryzjdgdq',
    method: 'get',
    data
  })
}

export function getMapQueryZjdSqLx(data) {
  return request({
    url: '/map/queryzjdsqlx',
    method: 'get',
    data
  })
}

export function getMapQueryZjdLnLx(data) {
  return request({
    url: '/map/queryzjdlnlx',
    method: 'get',
    data
  })
}

// export function getAuditTableDatas(current,size,data) {
//   return request({
//     url: `/map/page/${current}/${size}`,
//     method: 'get',
//     params:data
//   })
// }

export function getAuditTableDatas(current, size, sqsj, queryForm) {

  if(sqsj && sqsj.length > 0){
    let start_sqrrq = sqsj[0]
    let end_sqrrq = sqsj[1]
    queryForm['start_sqrrq'] =start_sqrrq
    queryForm['end_sqrrq'] =end_sqrrq
  }else{
    queryForm['start_sqrrq'] ="";
    queryForm['end_sqrrq'] ="";
  }

  return request({
    url: prefix + '/map/page',
    method: 'get',
    params: Object.assign({
      current,
      size,
    }, queryForm)
  })
}

export function GetAuditProgress(data) {
  return request({
    url: '/map/GetAuditProgress',
    method: 'get',
    data
  })
}

export function GetAuditSituation(data) {
  return request({
    url: '/map/GetAuditSituation',
    method: 'get',
    data
  })
}

export function GetYearAuditSituation(data) {
  return request({
    url: '/map/GetYearAuditSituation',
    method: 'get',
    data
  })
}