import util from '@/libs/util.js'
import jsonFileHandler from "@/libs/util.jsonfile.js"
export default {
  methods: {
    getRegionCode () {
      return util.cookies.get('regionCode')
    },
    async getRegions () {
      let code = this.getRegionCode()
      let data = await jsonFileHandler.getData('test-data/dataRegions.json', 'code', code)
      return data.regions
    }
  }
}
