<template>
  <div class="toolbarContainer">
    <div class="toolbar">
      <div class="toolButton top">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      layerOn: false
    };
  },
  methods: {
    showLayer() {
      //this.layerOn = !this.layerOn;
    }
  }
};
</script>
<style lang="scss" scoped>
.toolbarContainer {
  right: 30px;
  top: 10px;
  position: absolute;
}
.toolbar {
  z-index: 10;
  float: left;
  box-shadow: 0px 0px 1px gray;
  border-radius: 5px;
  .toolButton {
    width: 40px;
    height: 40px;
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
</style>