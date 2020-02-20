import { creatAsideMenu } from '@/menu/d2admin'
import { getCasesCount } from '@/api/land.business'
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
      // console.log('触发事件')
      return new Promise(async (resolve, reject) => {
        let casesBox = await getCasesCount().catch((err) => { console.log('获取案件数量错误', err) })
        casesBox = casesBox || { dbNum: 0, ybNum: 0, tbNum: 0 }
        let count = {
          agentBoxCount: casesBox.dbNum,
          completedCount: casesBox.ybNum,
          rollbackCount: casesBox.tbNum,
          totalCount: casesBox.dbNum + casesBox.ybNum + casesBox.tbNum
        }
        commit('updateCaseBoxCount', count)
        // await dispatch('d2admin/menu/updateAsideMenus', creatAsideMenu({ agentBoxCount: 10, completedCount: 5, rollbackCount: 8 }))
        let menus = creatAsideMenu(count)
        // console.log('menus', menus)
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
