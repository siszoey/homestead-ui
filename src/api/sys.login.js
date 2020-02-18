import request from '@/plugin/axios'

const isMock = true
const prefiex = ''
/*{
    username: 'zjd',
    password: '123456',
    uuid: 'zjd-uuid',
    name: '宅基地管理员',
    token: '8dfhassad0asdjwoeiruty'
}*/
export function AccountLogin(data) {
    if (isMock) {
        return request({
            url: '/login',
            method: 'post',
            data
        })
    } else {
        return request({
            url: prefiex + '/login',
            method: 'post',
            data : {
                loginName: data.username,
                password: data.password
            }
        })
    }

}
