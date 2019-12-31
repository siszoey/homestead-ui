import request from '@/plugin/axios'

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
