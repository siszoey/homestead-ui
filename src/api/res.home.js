import request from '@/plugin/axios'

export function getChartData() {
    return request({
        url: 'index/pieEchart',
        method: 'post',
    })
}

export function getProgressData() {
    return request({
        url: 'index/progress',
        method: 'post'
    })
}


export function getTableData() {
    return request({
        url: 'index/requestTable',
        method: 'post',
    })
}