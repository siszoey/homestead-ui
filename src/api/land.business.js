import request from '@/plugin/axios'

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
export function PageData(pageNum, pageSize, stageParam, queryForm) {
  return request({
    url: prefix + '/apply/form/list',
    method: 'get',
    params: Object.assign({
      pageNum,
      pageSize,
    }, stageParam, queryForm)
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
 * @param data
 */
export function LastProcess(sqid) {
  return request({
    url: prefix + `/apply/form/max/${sqid}`,
    method: 'get',
  })
}
