import request from '@/plugin/axios'
const prefix = ''
export function submitForm(data) {
    return request({
        url: prefix + '/approval/form',
        method: 'post',
        data
    })
}

export function submitAcceptance (data) {
    return request({
        url: prefix + 'appceptance',
        method: 'post',
        data
    })
}