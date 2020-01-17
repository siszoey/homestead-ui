/**
 * 宅基地流程角色参考
 * 具体根据字典表【流程角色】【项目状态状态】有序获取
 * @type {string[]}
 */

export const processRoles = [
  {
    seq: 1,
    role: 'sq-start',
    stage: '村组织办理'
    // stage: '村民申请',
  },
  // {
  //   seq: 2,
  //   role: 'sq-check',
  //   stage: '村委审核',
  // },
  {
    seq: 2,
    role: 'sp-start',
    stage: '乡镇受理',
  },
  {
    seq: 3,
    role: 'sp-check-1',
    stage: '农经审核',
  },
  {
    seq: 4,
    role: 'sp-check-2',
    stage: '自然资源审核',
  },
  {
    seq: 5,
    role: 'sp-check-3',
    stage: '乡镇政府审批',
  },
  // {
  //   seq: 8,
  //   role: 'sq-start',
  //   stage: '村民验收申请',
  // },
  {
    seq: 6,
    role: 'ys-start',
    stage: '乡镇政府验收收件',
  },
  {
    seq: 7,
    role: 'ys-check-1',
    stage: '农经验收审核',
  },
  {
    seq: 8,
    role: 'ys-check-2',
    stage: '自然资源验收审核',
  },
  {
    seq: 9,
    role: 'ys-check-3',
    stage: '乡镇政府验收审批备案',
  },
]
