import {mapState} from 'vuex'

export default {
  components: {},
  mounted() {
  },
  beforeDestroy() {
  },
  computed: {
    ...mapState('d2admin/dict', [
      'dictList'
    ])
  },
  methods: {
    /**
     * 初始化字典下拉框
     * @param filters
     */
    initOption(filters) {
      console.log('mixins-method: initOption')

      if (this.columnOptions === undefined) {
        return
      }

      let currentDictList = this.dictList.filter(d => filters.includes(d.type))
      this.columnOptions.map(co => {
        if (co.options !== undefined) {
          co.options = []
          currentDictList.map(dict => {
            if (co.label == dict.type || co.type == dict.type) {
              co.options.push(dict)
            }
          })
        }
      })
    },

    getOptions(type){
      return this.dictList.filter(dict => dict.type == type)
    },

    getOption(type, code){
      let dict = this.dictList.find(dict => dict.type == type && dict.code == code)
      if(dict == undefined){
        this.$message({
          message: '数据字典不存在',
          type: 'warning'
        })
      }
      return dict
    },

    getOptionByContent(type, content){
      let dict = this.dictList.find(dict => dict.type == type && dict.content == content)
      if(dict == undefined){
        this.$message({
          message: '数据字典不存在',
          type: 'warning'
        })
      }
      return dict

    },

    selected(type, code) {
      let dict = this.dictList.find((value, index, arr) => value.type == type && value.code == code)
      if(dict == undefined){
        return dict
      }
      return dict.content
    },
    getCode (type, content) {
      let dict = this.dictList.find(t=> t.type === type && t.content === content)
      if (dict) {
        return dict.code
      }
      return ''
    }
  }
}
