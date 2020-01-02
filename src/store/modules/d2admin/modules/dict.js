
import {getDictData} from "../../../../api/res.system"

export default {
  namespaced: true,
  state: {
    // 字典列表
    dictList: []
  },
  actions: {

    init ({ state, dispatch }) {
      return new Promise(async resolve => {
        console.log('init dict data')
        // store 赋值
        getDictData().then(res=>{
          state.dictList = res
        }).catch(err=>{
          console.error('init dict is error', err)
        }).finally(()=>{

        })
        // 持久化
        // await dispatch('d2admin/db/set', {
        //   dbName: 'sys',
        //   path: 'dict.list',
        //   value: list,
        //   user: true
        // }, { root: true })
        // end
        resolve()
      })
    },

  }
}
