import request from '@/plugin/axios'

export function statisticsData (data) {
  return request({
    url: '/statistics/data',
    method: 'post',
    data
  })
}


export function soilHumidityData (data) {
  return request({
    url: '/statistics/soil-humidity',
    method: 'post',
    data
  })
}
