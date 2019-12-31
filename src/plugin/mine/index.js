
// 新德汇地图集
import XdhMap from 'xdh-map'
import 'xdh-map/lib/xdhmap.css'

// eCharts
import * as echarts from 'echarts'

// v-charts绘图插件
import VCharts from 'v-charts'

export default {
  async install (Vue, options) {
    // echarts
    Vue.prototype.$echarts = echarts

    // 插件
    Vue.use(XdhMap)
    Vue.use(VCharts)
  }
}
