import request from '@/plugin/axios'

export function filesSearch(requestId) {
    return request({
        url: '/search/filesSearch',
        method: 'get',
        params: {
            requestId: requestId
        }
    })
}