import request from '@/plugin/axios'

const prefix = '/mock'
// const prefix = ''
export function getDictData(params) {
  return request({
    url: prefix + '/dict',
    method: 'get',
    params
  })
}

