import request from '@/plugin/axios'


const prefix = ''
/*{
    username: 'zjd',
    password: '123456',
    uuid: 'zjd-uuid',
    name: '宅基地管理员',
    token: '8dfhassad0asdjwoeiruty'
}*/
export function AccountLogin(data) {
    let isMock = false
    //todo: admin 暂时用前端登录，待后端更新
    // if(data.username == 'admin'){
    //     isMock = true
    // }
    if (isMock) {
        return request({
            url: '/login',
            method: 'post',
            data
        })
    } else {
        /**
         * groupname
         * username
         */
        return request({
            url: prefix + '/activiti/login',
            method: 'get',
            params : {
                loginName: data.username,
                password: data.password
            }
        })
    }

}
