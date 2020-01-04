<template>
  <div class="bubble">
    <div class="listItem">
      <input type="checkbox" checked />未批已建
    </div>
    <div class="listItem">
      <input type="checkbox" checked />已建无人居
    </div>
    <div class="listItem">
      <input type="checkbox" checked />已批未建
    </div>
    <div class="listItem">
      <input type="checkbox" checked />已建季节性居住
    </div>
    <div class="listItem">
      <input type="checkbox" checked />已批已建
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