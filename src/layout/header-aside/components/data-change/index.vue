<template>
  <el-select v-model="code" @change="changeData" style="width:100px">
      <el-option
        v-for="(item,index) in options"
        :value="item.code"
        :label="item.name"
        :key="index"
      >
      </el-option>
  </el-select>
</template>

<script>
import jsonFileHandler from "@/libs/util.jsonfile.js"
import util from '@/libs/util.js'
export default {
    name: 'DataChange',
    data() {
      return {
          code: "",
          options: []
      }
    },
    created() {
       this.code = util.cookies.get('regionCode') || ''
       if(!this.code){
           this.code = "46",
           util.cookies.set('regionCode','46')
       }
       this.getOptions()
    },
    methods: {
        getOptions () {
          jsonFileHandler.getAllData('/test-data/dataRegions.json')
          .then(data => {
              this.options = data.data
          })
        },
        changeData (currentValue) {
            this.code = currentValue
            util.cookies.set('regionCode',currentValue)
        }
    }
}
</script>
