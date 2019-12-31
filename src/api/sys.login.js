import request from '@/plugin/axios'

export function AccountLogin(data) {
    return request({
        url: '/login',
        // url: '/ssoapi/homestead/findMenu',
        method: 'post',
        data
        //   : {
        //   loginName: data.username,
        //   password: data.password
        // }
    })
}