<template>
  <div class="toolbarContainer">
    <div class="toolbar">
      <div class="toolButton top" v-on:click="showxzqhlist=!showxzqhlist">
        <img :src="`${$baseUrl}image/mapicon/sldt.png`" />
      </div>
      <div class="toolButton bottom highlight">
        <img :src="`${$baseUrl}image/mapicon/yxdt.png`" />
      </div>
    </div>
    <div class="toolbar" style="margin-left:10px">
      <div class="toolButton top">
        <img :src="`${$baseUrl}image/mapicon/sjjc.png`" />
      </div>
      <div class="toolButton bottom">
        <img :src="`${$baseUrl}image/mapicon/cggx.png`" />
      </div>
    </div>
    <div class="toolbar" style="margin-left:10px">
      <div :class="layerOn ?'toolButton top selected':'toolButton top '" @click="showLayer">
        <img :src="`${$baseUrl}image/mapicon/tcgl.png`" />
      </div>
      <div class="toolButton">
        <img :src="`${$baseUrl}image/mapicon/sqgl.png`" />
      </div>
      <div class="toolButton">
        <img :src="`${$baseUrl}image/mapicon/fpdb.png`" />
      </div>
      <div class="toolButton bottom">
        <img :src="`${$baseUrl}image/mapicon/zbdw.png`" />
      </div>
    </div>
    <div v-show="showxzqhlist" class="xzqhlist">
      <el-cascader v-model="selectXzqh" :options="xzqhTree" @change="xzqhChanged"></el-cascader>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    xzqhList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      layerOn: false,
      showxzqhlist: false,
      xzqhTree: [],
      selectXzqh: []
    };
  },
  watch: {
    xzqhList: {
      deep: true, // 深度监听
      handler(newVal, oldVal) {
        this.bindxzqhTree();
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.bindxzqhTree();
    });
  },
  methods: {
    showLayer() {
      //this.layerOn = !this.layerOn;
    },
    bindxzqhTree() {
      this.xzqhTree = [
        {
          value: "469005115001",
          label: "铺前圩社区"
        },
        {
          value: "469005115200",
          label: "地太村"
        },
        {
          value: "469005115201",
          label: "东坡村"
        },
        {
          value: "469005115202",
          label: "林梧村"
        },
        {
          value: "469005115203",
          label: "隆丰村"
        },
        {
          value: "469005115204",
          label: "美港村"
        },
        {
          value: "469005115205",
          label: "铺港村"
        },
        {
          value: "469005115206",
          label: "铺龙村"
        },
        {
          value: "469005115207",
          label: "铺前村"
        },
        {
          value: "469005115209",
          label: "七岭村"
        },
        {
          value: "469005115210",
          label: "仕后村"
        },
        {
          value: "469005115202",
          label: "林梧村"
        }
      ];
    },
    xzqhChanged() {
      this.showxzqhlist = !this.showxzqhlist;
      this.$emit("switchXzqh", this.selectXzqh);
    }
  }
};
</script>
<style lang="scss" scoped>
.toolbarContainer {
  right: 30px;
  top: 30px;
  position: absolute;
}
.toolbar {
  z-index: 10;
  float: left;
  box-shadow: 0px 0px 1px gray;
  border-radius: 5px;
  .toolButton {
    width: 30px;
    height: 30px;
    display: flex;
    float: left;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    background-color: gray;

    &:hover {
      opacity: 1;
      background-color: white;
    }
  }
  .highlight {
    opacity: 1;
    background-color: rgba(128, 128, 128, 0.5);
  }
  .selected {
    opacity: 1;
    background-color: white;
  }
  .top {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .bottom {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}

.xzqhlist {
  margin-top: 40px;
  position: absolute;
}
</style>