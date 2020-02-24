import request from '@/plugin/axios'

// const prefix = '/mock'

const prefix = ''

/**
 * 新建保存
 * @param data
 */
export function ApplicationForm(data) {
  return request({
    url: prefix + '/activiti',
    method: 'post',
    data
  })
}

/**
 * 待办任务
 * @param data
 */
export function UnToDo(params) {
  return request({
    url: prefix + '/activiti/dbrw',
    method: 'get',
    params
  })
}

/**
 * 已办任务
 * @param data
 */
export function HadDone(params) {
  return request({
    url: prefix + '/activiti/ybrw',
    method: 'get',
    params
  })
}

/**
 * 退办任务
 * @param data
 */
export function BackToDo(params) {
  return request({
    url: prefix + '/activiti/tbrw',
    method: 'get',
    params
  })
}

/**
 * 流程办理
 * @param data
 */
export function DoProcess(data) {
  return request({
    url: prefix + '/activiti/lcbl',
    method: 'put',
    data
  })
}

/**
 * 流程历史详情
 * @param params
 */
export function GetProcHistory(params) {
  return request({
    url: prefix + '/activiti/dbrw-detail',
    method: 'get',
    params
  })
}

/**
 * 综合监管
 * @param params
 * @returns {AxiosPromise}
 * @constructor
 */
export function AllProc(params) {
  return request({
    url: prefix + '/activiti/zhjg',
    method: 'get',
    params
  })
}

/**
 * 删除流程实例
 * @param data
 * @returns {AxiosPromise}
 * @constructor
 */
export function DeleteProc(data) {
  return request({
    url: prefix + '/activiti',
    method: 'delete',
    data
  })
}


/**
 * 归档查询
 * @param params
 * @returns {AxiosPromise}
 * @constructor
 */
export function EndProc(params) {
  return request({
    url: prefix + '/activiti/gdcx',
    method: 'get',
    params
  })
}