import request from '@/plugin/axios'
import store from '@/store/index'
// const prefix = '/mock'

const prefix = ''
/**
 * 申请表单
 * @param data
 */
export function ApplicationForm(data) {
  return request({
    url: prefix + '/apply/form',
    method: 'post',
    data
  })
}

/**
 * 项目列表
 * @param data
 */
export function PageData(params) {
  return request({
    url: prefix + '/apply/form/list',
    method: 'get',
    params
  })
}

/**
 * 审批流程
 * @param data
 */
export function ApproalProcess(data) {
  return request({
    url: prefix + '/apply/form/process',
    method: 'post',
    data
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

/**
 * 批量上报
 * @param data
 */
export function BatchReport(data) {
  return request({
    url: prefix + '/apply/form/batchReport',
    method: 'post',
    data
  })
}

export function getCasesCount (userName) {
  let name = userName || store.state.d2admin.user.info.username
  return request.get(prefix + '/activiti/' + name)
}
