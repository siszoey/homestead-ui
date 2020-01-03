/**
 * 宅基地系统角色
 * @type {string[]}
 */
export const roles = [
  //管理员
  "admin",
  //申请表发起人、申请表审核人
  "sq-start", "sq-check",
  //审批表发起人、审批表审核人、审批表审批人
  "sp-start", "sp-check-1", "sp-check-2",
  //验收表发起人、验收表审核人、验收表审批人
  "ys-start", "ys-check-1", "ys-check-2",
]
