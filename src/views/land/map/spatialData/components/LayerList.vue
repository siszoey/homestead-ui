<template>
  <div class="bubble">
    <div class="listItem">
      <input type="checkbox" />乔木林地
    </div>
    <div class="listItem">
      <input type="checkbox" />其他园地
    </div>
    <div class="listItem">
      <input type="checkbox" />农村道路
    </div>
    <div class="listItem">
      <input type="checkbox" />水田
    </div>
    <div class="listItem">
      <input type="checkbox" />农村宅基地
    </div>
    <div class="listItem">
      <input type="checkbox" />其他林地
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