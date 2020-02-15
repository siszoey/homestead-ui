import { creatAsideMenu } from '@/menu/d2admin'
export default {
  namespaced: true,
  state: {
    agentBoxCount: 1, // 代办箱数量
    completedCount: 0, // 已办箱数量
    rollbackCount: 0, // 回退箱数量
    totalCount: 0 // 总数量
  },
  actions: {
    updateCaseCount ({ commit, dispatch }) {
      console.log('触发事件')
      return new Promise(async (resolve, reject) => {
        commit('updateCaseBoxCount', { agentBoxCount: 10, completedCount: 5, rollbackCount: 8 })
        // await dispatch('d2admin/menu/updateAsideMenus', creatAsideMenu({ agentBoxCount: 10, completedCount: 5, rollbackCount: 8 }))
        let menus = creatAsideMenu({ agentBoxCount: 10, completedCount: 5, rollbackCount: 8 })
        console.log('menus', menus)
        commit('d2admin/menu/allMenusSet', menus, { root: true })
        commit('d2admin/menu/asideSet', menus, { root: true })
        resolve()
      })
    }
  },
  mutations: {
    updateCaseBoxCount (state, casesBox) {
      state.agentBoxCount = casesBox.agentBoxCount
      state.completedCount = casesBox.completedCount
      state.rollbackCount = casesBox.rollbackCount
      state.totalCount = casesBox.agentBoxCount + casesBox.completedCount + casesBox.rollbackCount
    }
  }
}
