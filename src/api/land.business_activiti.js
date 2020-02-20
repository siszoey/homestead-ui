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
 * 获取最新项目状态
 * @param sqid
 */
export function LastProcess(sqid) {
  return request({
    url: prefix + `/apply/form/max/${sqid}`,
    method: 'get',
  })
}

/**
 * 删除记录
 * @param sqid
 */
export function DeleteProcess(sqid) {
  return request({
    url: prefix + `/apply/form/delete/${sqid}`,
    method: 'delete',
  })
}
