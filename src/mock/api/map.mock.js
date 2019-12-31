import Mock from 'mockjs'

function getPlan(config) {
  // let a = config.body
  let plan = Mock.mock({
    "data": {
      "regioncode": [
        {
          "lx": 120,
          "ly": 31
        }, {
          "lx": 122,
          "ly": 32
        }
      ],
      "zjdPercent": 50,
      "lhPercent": 40
    }
  })
  return plan
}

function getHomestead(config) {
  let home = Mock.mock({
    "data": {
      "total": {
        "location": [
          {
            "lx": 120,
            "ly": 31
          },
          {
            "lx": 121,
            "ly": 33
          }
        ],
        "totalArea": 1100,
        "number": 15,
        "percent": 100,
        "yearChange": [
          1000,
          1100,
          1200
        ]
      },
      "use": {
        "location": [
          {
            "lx": 125,
            "ly": 33
          },
          {
            "lx": 129,
            "ly": 29
          }
        ],
        "totalArea": 500,
        "number": 8,
        "percent": 70,
        "yearChange": [
          500,
          600,
          700
        ]
      },
      "idle": {
        "location": [
          {
            "lx": 128,
            "ly": 28
          },
          {
            "lx": 133,
            "ly": 27
          }
        ],
        "totalArea": 600,
        "number": 7,
        "percent": 30,
        "yearChange": [
          300,
          400,
          800
        ]
      }
    }
  })
  return home
}

function getCode(config) {
  let code = Mock.mock({
    "data": [{
      value: '320506006',
      label: '香山街道',
      children: [{
        value: '320506006001',
        label: '蒋墩社区居委会',
      }, {
        value: '320506006004',
        label: '长沙社区居委会',
      }]
    }]
  })
  return code
}

function getSqLx(config) {
  let sqlx = Mock.mock({
    "data": {
      ydfjTotal: 100,
      ffxfTotal: 60,
      xjTotal: 40
    }
  })
  return sqlx
}

function getLnLx(config) {
  let lnlx = Mock.mock({
    "data": {
      ydfj: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],//原地翻建数量2019年12个月的数据
      ffxf: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],//复房修复数量2019年12个月的数据
      xj: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]//新建数量2019年12个月的数据
    }
  })
  return lnlx
}

function getMj(config) {
  let mj = Mock.mock({
    "data": {
      zjdmj: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]//宅基地面积历年数据,2010-2019年数据
    }
  })
  return mj
}

function getGdq(config) {
  let gdq = Mock.mock({
    "data": {
      xzqh: ["墅里社区居委会", "小横山社区居委会", "渔帆社区居民委员会"],//行政区划各个村的名称
      zjd: [2, 4, 8],//各个村总宅基地数量
      syz: [1, 2, 5],//各个村使用中宅基地数量
      xz: [1, 2, 3],//各个村闲置宅基地数量
    }
  })
  return gdq
}

function getProgress(config) {
  let progress = Mock.mock({
    "data":[
    {
      "uid": 0,
      "progressType": "街道审核",
      "progressPercent": 15,
      "progressNum": 3
    },
    {
      "uid": 1,
      "progressType": "审核汇总",
      "progressPercent": 5,
      "progressNum": 1
    },
    {
      "uid": 2,
      "progressType": "建房监管",
      "progressPercent": 10,
      "progressNum": 2
    },
    {
      "uid": 3,
      "progressType": "未通过",
      "progressPercent": 0,
      "progressNum": 0
    },
    {
      "uid": 4,
      "progressType": "已完成",
      "progressPercent": 0,
      "progressNum": 0
    },
    {
      "uid": 5,
      "progressType": "项目申报",
      "progressPercent": 10,
      "progressNum": 2
    }
  ]
  })
  debugger
  return progress
}

// Mock.mock(/\/map\/queryCode/, 'get', getCode)
// Mock.mock(/\/map\/queryPlan/, 'post', getPlan)
// Mock.mock(/\/map\/queryHomestead/, 'get', getHomestead)
// Mock.mock(/\/map\/query\/zjd\/sq\/lx/, 'get', getSqLx)
// Mock.mock(/\/map\/query\/zjd\/ln\/lx/, 'get', getLnLx)
// Mock.mock(/\/map\/query\/zjd\/sq\/mj/, 'get', getMj)
// Mock.mock(/\/map\/query\/zjd\/gdq/, 'get', getGdq)
// Mock.mock(/\/index\/progress/, 'post', getProgress)

