
export const declareColumns = [
  {
    key: 'xmbh',
    label: '项目编号'
  },
  {
    key: 'declareType',
    label: '项目类型',
    options: []
  },
  {
    key: 'userName',
    label: '申请人',
  },

  {
    key: 'cardId',
    label: '身份证号',
  },
  {
    key: 'residence',
    label: '户口',
  },
  {
    key: 'residenceType',
    label: '户口性质',
    options: []
  },
  {
    key: 'residenceFrom',
    label: '户口所属村',
  },
  {
    key: 'residenceAddress',
    label: '户口所在地',
  },
  {
    key: 'address',
    label: '现住地',
  },
  {
    key: 'mobile',
    label: '联系方式',
  },
  {
    key: 'area',
    label: '住宅面积',
  },
  {
    key: 'isHouseHolder',
    label: '是否户主',
    options: [],
    type: '是否'
  },
  // {
  //   key: "imgByCardObverse",
  //   label: '身份证正面',
  //   upload: true,
  // },
  // {
  //   key: "imgByCardReverse",
  //   label: '身份证反面',
  //   upload: true,
  // },
]


export const declareColumnsFilter = function(isTrue, keys){
  if(keys && keys.length == 0){
    return declareColumns
  }
  isTrue == null ? true : isTrue
  return declareColumns.filter(m => {
    if(isTrue){
      return keys.includes(m.key)
    } else {
      return !keys.includes(m.key)
    }
  })
}

