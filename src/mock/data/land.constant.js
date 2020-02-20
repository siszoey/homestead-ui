/**
 * 根据流程设计图，不能回退的节点
 * @type {string[]}
 */
export const CANNOT_GO_BACK_TASKS = [
  '村民申请','乡镇政府审批','乡政府验收收件','农经验收审核','自然资源验收审核','乡政府验收审批备案'
]
/**
 * [乡镇政府审批]节点之后不可修改审批表
 * @type {string}
 */
export const BEFORE_EDIT_APPROVAL_TASK = [
  '村民申请','村委审批','乡镇受理', '农经审核', '自然资源审核' /*'乡镇政府审批'*/
]