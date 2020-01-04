<template>
  <div class="bubble">
    <div class="listItem">
      <input type="checkbox" checked />保护林地
    </div>
    <div class="listItem">
      <input type="checkbox" checked />公路用地
    </div>
    <div class="listItem">
      <input type="checkbox" checked />后备林地
    </div>
    <div class="listItem">
      <input type="checkbox" checked />基本农田
    </div>
    <div class="listItem">
      <input type="checkbox" checked />旅游建设用地
    </div>
    <div class="listItem">
      <input type="checkbox" checked />其他建设用地
    </div>
    <div class="listItem">
      <input type="checkbox" checked />其他农用地
    </div>
    <div class="listItem">
      <input type="checkbox" checked />其他设施用地
    </div>
    <div class="listItem">
      <input type="checkbox" checked />水工建筑用地
    </div>
    <div class="listItem">
      <input type="checkbox" checked />水库水面
    </div>
    <div class="listItem">
      <input type="checkbox" checked />滩涂
    </div>
    <div class="listItem">
      <input type="checkbox" checked />河流湖泊水面
    </div>
    <div class="listItem">
      <input type="checkbox" checked />乡村建设用地
    </div>
    <div class="listItem">
      <input type="checkbox" checked />一般耕地
    </div>
    <div class="listItem">
      <input type="checkbox" checked />园地
    </div>
    <div class="listItem">
      <input type="checkbox" checked />自然保留地
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.bubble {
  position: relative;
  border-radius: 5px;
  width: 150px;
  user-select: none;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: white;
  z-index: 10;

  &::after {
    content: " ";
    position: absolute;
    width: 16px;
    height: 16px;
    z-index: -1;
    background: white;
    transform: rotate(135deg);
    top: 20px;
    right: -8px;
  }
  .listItem {
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 10px;
    height: 30px;
    color: black;
    font-size: 12px;
    &:hover {
      background-color: rgb(241, 243, 247);
    }
  }
}
</style>