
export const declareColumns = [
    {
      key: 'sqid',
      label: '项目编号',
    }, 
    {
        key: 'jflx',
        label: '建房类型',
        options: []
    },
    {
      key: 'jssj',
      label: '结束时间'
    },
 
    {
      key: 'sqsj',
      label: '申请时间',
    },
  
    {
      key: 'xmzt',
      label: '项目状态',
      options: []
    },
  
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
  
  