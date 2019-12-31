import request from '@/plugin/axios'

export function OperationLog (data) {
  return request({
    url: '/system/journal',
    method: 'post',
    data
  })
}
export function CheckPassword (params) {
  return request({
    url: '/ssoapi/homestead/checkUser',
    method: 'get',
    params
  })
}
export function ChangePassword (data) {
  return request({
    url: '/ssoapi/homestead/changeUserPassword',
    method: 'post',
    data
  })
}