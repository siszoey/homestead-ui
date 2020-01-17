/**
 * 宅基地系统用户
 * @type {string[]}
 */
export const userDB = [
  {
    username: 'admin', password: 'admin', uuid: 'admin-uuid', name: '管理员', role:
      [
        'admin',
        'sq-start',//'sq-check',
        'sp-start','sp-check-1','sp-check-2','sp-check-3',
        'ys-start','ys-check-1','ys-check-2','ys-check-3',
      ]
  },

  {
    username: 'cm', password: '111111', uuid: 'cunmin-uuid', name: '村民', role: ['sq-start']
  },

  {
    username: 'czz_fqry', password: '111111', uuid: 'czz_fqry-uuid', name: '村组织-发起人员', role: ['sq-start']
  },
  {
    username: 'czz_shry', password: '111111', uuid: 'czz_shry-uuid', name: '村组织-审核人员', role: ['sq-check']
  },

  {
    username: 'xzzf_sjry', password: '111111', uuid: 'xzzf_sjry-uuid', name: '乡镇政府-收件人员', role: ['sp-start']
  },
  {
    username: 'nync_shry', password: '111111', uuid: 'nync_shry-uuid', name: '农业农村部门-审核人员', role: ['sp-check-1']
  },
  {
    username: 'zrzy_shry', password: '111111', uuid: 'zrzy_shry-uuid', name: '自然资源部门-审核人员', role: ['sp-check-2']
  },
  {
    username: 'xzzf_spry', password: '111111', uuid: 'xzzf_spry-uuid', name: '乡镇政府-审批人员', role: ['sp-check-3']
  },

  {
    username: 'xzzf_yssjry', password: '111111', uuid: 'xzzf_yssjry-uuid', name: '乡镇政府-验收收件人员', role: ['ys-start']
  },
  {
    username: 'nync_ysry', password: '111111', uuid: 'nync_ysry-uuid', name: '农业农村部门-验收人员', role: ['ys-check-1']
  },
  {
    username: 'zrzy_ysry', password: '111111', uuid: 'zrzy_ysry-uuid', name: '自然资源部门-验收人员', role: ['ys-check-2']
  },
  {
    username: 'xzzf_ysry', password: '111111', uuid: 'xzzf_ysry-uuid', name: '乡镇政府-验收人员', role: ['ys-check-3']
  },

]
