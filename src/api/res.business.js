import request from '@/plugin/axios'

export function toDeclare(data) {
  return request({
    // url: '/mock/to-declare',
    url: '/management/declare',
    method: 'post',
    data
  })
}

export function getDictData(params) {
  return request({
    url: '/mock/system/dict',
    // url: '/system/dict',
    method: 'get',
    params
  })
}


export function getUploadImgConfig(params) {
  return request({
    url: '/mock/getUploadImgConfig',
    method: 'get',
    params
  })
}

/**
 * 申报信息列表
 * @param pageNum 分页页码
 * @param pageSize  每页数量
 * @param stage   当前阶段
 * @param queryForm 过滤条件参数对象
 */
export function getResidenceList(pageNum, pageSize, stage, queryForm) {
  return request({
    url: '/mock/getResidenceList',
    // url: '/management/declarelist',
    method: 'post',
    data: Object.assign({
      pageNum,
      pageSize,
      stage
    }, queryForm)
  })
}

export function deleteDeclare(id) {
  return request({
    // url: '/mock/deleteDeclare',
    url: '/management/declaredelete',
    method: 'delete',
    params: {
      id: id
    }
  })
}

/**
 * 审核接口：通过、回退
 * @param passFlag  是否通过，true/false
 * @param userName  申报唯一ID
 * @param userName  审核人员名称
 * @param checkForm  审核表单：审核意见opinion（回退原因）、下个阶段stage（[申报、街道审核、建房监管、审核汇总、退办]）
 */
export function toCheckBackOpinion(passFlag, id, userName, checkForm) {
  return request({
    // url: '/mock/toCheckOpinion',
    url: '/management/declarecheck',
    method: 'post',
    data: Object.assign({
      passFlag,
      userName,
      id,
    }, checkForm)
  })
}

//审核信息回填
export function tobackfill(data) {
  return request({
    url: '/management/declare',
    method: 'post',
    data
  })
}

