import {mapState} from 'vuex'

import dictMixnis from "./dict-mixnis"
import {DoProcess} from "../../../api/land.business_activiti"
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
     * 流程变化请求
     * @param processInfo
     * @param passFlag
     */
    processRequest(processInfo, passFlag) {
      console.log("zjdSqJl", Object.assign({passFlag}, processInfo))
      let data = {
        "flag": passFlag ? 1 : 0, //1同意，0驳回
        "loginName": this.info.username,
        "taskid": processInfo.taskid,
        "type": processInfo.box == '待办' ? 1 : 0
      }
      console.log("processRequest", data)
      DoProcess(data).then(() => {
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
