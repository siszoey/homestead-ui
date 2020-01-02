import request from '@/plugin/axios'


export function getDictData(params) {
  return request({
    // url: '/mock/system/dict',
    url: '/dict',
    method: 'get',
    params
  })
}

