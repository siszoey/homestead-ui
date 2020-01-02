import request from '@/plugin/axios'

const prefix = '/mock'
// const prefix = ''
/**
 * 申请表单
 * @param data
 */
export function postApplicationForm(data) {
  return request({
    url: prefix + '/declare-application',
    method: 'post',
    data
  })
}

