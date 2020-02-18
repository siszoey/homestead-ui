import {mapState} from 'vuex'

import dictMixnis from "./dict-mixnis"
import {ApproalProcess} from "../../../api/land.business"
import {processRoles} from '../../../mock/data/land.role'

export default {

  components: {},
  mounted() {
  },
  beforeDestroy() {
  },
  mixins: [
    dictMixnis,
  ],
  computed: {
    ...mapState('d2admin/dict', [
      'dictList'
    ]),
    ...mapState('d2admin/user', [
      'info'
    ]),
    firstProcessRole(){
      return this.getDictByOptCode("流程角色", "1")
    },
    lastProcessRole(){
      return this.getDictByOptCode("流程角色", "9")
    }
  },
  /**
   * 流程的相关状态按字段表Code有序进行
   */
  methods: {
    getProcessRole(roleId) {
      let role = processRoles.find(r => r.role == roleId)
      return role ? `${role.stage}人员` : ''
    },
    isFirstProcess() {
      return this.info.role.includes(this.firstProcessRole.optName)
    },
    isLastProcessByRole(role) {
      return role === this.lastProcessRole.optName
    },
    /**
     * 获取下个流程的项目状态
     * @param currentXMZTCode
     * @param flag
     * @returns {*}
     */
    getNextProcessXMZT(currentXMZTCode, flag) {
      currentXMZTCode = Number.parseInt(currentXMZTCode)
      let xmztList = this.getDicts("项目状态")
      xmztList.sort(x => {
        return x.optCode
      })
      //项目申报
      let nextXMZTCode = 1
      if (flag) {
        //下个项目状态
        nextXMZTCode = currentXMZTCode == xmztList.length ? currentXMZTCode : currentXMZTCode + 1
      } else {
        //上个项目状态
        nextXMZTCode = currentXMZTCode == 1 ? 1 : currentXMZTCode - 1
      }
      let nextProcessXMZT = xmztList.find(x => {
        return x.optCode == nextXMZTCode
      })
      console.log('下个项目状态', nextProcessXMZT)
      return nextProcessXMZT
    },
    /**
     * 获取下个进程的办理状态
     * @param flag
     * @returns {*}
     */
    getNextProcessBLZT(flag) {
      let nextProcessBLZT = undefined
      if (flag) {
        //通过后都进入待办
        nextProcessBLZT = this.getDictByOptName("办理状态", "待办")
      } else {
        //不通过后都进入退办
        nextProcessBLZT = this.getDictByOptName("办理状态", "退办")
      }
      console.log('下个办理状态', nextProcessBLZT)
      return nextProcessBLZT
    },

    /**
     * 获取下个进程的角色
     * @param roleid
     * @param flag
     * @returns {*}
     */
    getNextProcessRole(roleid, flag) {
      let currentRole = this.getDictByOptName("流程角色", roleid)
      let currentRoleCode = Number.parseInt(currentRole.optCode)
      let roleList = this.getDicts("流程角色")
      roleList.sort(x => {
        return x.optCode
      })
      //sq-start
      let nextRoleCode = 1
      if (flag) {
        //下个项目状态的角色
        nextRoleCode = currentRoleCode == roleList.length ? currentRoleCode : currentRoleCode + 1
      } else {
        //上个项目状态的角色
        nextRoleCode = currentRoleCode == 1 ? 1 : currentRoleCode - 1
      }
      let nextProcessRole = roleList.find(x => {
        return x.optCode == nextRoleCode
      })
      console.log('下个流程角色', nextProcessRole)
      return nextProcessRole
    },

    /**
     * 流程变化请求
     * @param zjdSqji
     * @param passFlag
     */
    processRequest(zjdSqJl, passFlag) {
      console.log("zjdSqJl", Object.assign({passFlag}, zjdSqJl))
      let xmztCode = this.getNextProcessXMZT(zjdSqJl.xmzt, passFlag).optCode
      let nextRoleId = this.getNextProcessRole(zjdSqJl.roleid, passFlag).optName
      let data = {
        id: zjdSqJl.id,
        sqid: zjdSqJl.sqid,
        //下个角色看到的项目记录
        next_xmzt: xmztCode,
        next_blzt: this.getNextProcessBLZT(passFlag).optCode,
        next_roleid: nextRoleId,
        //当前角色所看到的项目记录
        now_xmzt: xmztCode,
        now_blzt: this.getOptCode("办理状态", "已办"),
        //判断是否最后个流程
        is_end: this.isLastProcessByRole(zjdSqJl.roleid) ? 1 : 0
      }
      console.log("processRequest", data)
      ApproalProcess(data).then(() => {
        this.$message({
          type: 'success',
          message: '成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '请求失败!'
        })
      }).finally(() => {
        //this.getTableData()
      })
    }

  }
}
