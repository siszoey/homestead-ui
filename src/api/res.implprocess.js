import request from '@/plugin/axios'

export function getExaminePic(type, year) {
    return request({
        url: 'implementationProcess/examinePic',
        method: 'get',
    })
}
