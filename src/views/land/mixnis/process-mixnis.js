import {mapState} from 'vuex'

import dictMixins from "./dict-mixnis"
import {DoProcess} from "../../../api/land.business_activiti"
import {CANNOT_GO_BACK_TASKS, BEFORE_EDIT_APPROVAL_TASK} from '../../../mock/data/land.constant'

export default {

  components: {},
  mounted() {
  },
  beforeDestroy() {
  },
  mixins: [
    dictMixins,
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
      return ''
    },
    isFirstProcess() {
      return this.info.role == '村民'
    },
    canNotGoBack(taskname){
      return CANNOT_GO_BACK_TASKS.includes(taskname)
    },
    canEditApproval(taskname){
      return BEFORE_EDIT_APPROVAL_TASK.includes(taskname)
    },
    isLastProcessByRole(role) {
      return role === this.lastProcessRole.optName
    },

    /**
     * 流程办理
     * @param processInfo
     * @param passFlag
     */
    processRequest(processInfo, passFlag) {
      console.log("processInfo", Object.assign({passFlag}, processInfo))
      let data = {
        "flag": passFlag ? 1 : 0, //1同意，0驳回
        "loginName": this.info.username,
        "taskid": processInfo.taskid,
        "type": processInfo.box == '退办' ? 0 : 1 //默认暂时为待办
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
