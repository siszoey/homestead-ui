<template>
  <div class="bubble">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <span>农用地</span>
            </template>
            <el-menu-item-group>
              <div class="itembox">
                <div class="listItem">
                  <input type="checkbox" value="0101" checked />水田
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />水浇地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0103" checked />旱地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0201" checked />果园
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />茶园
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />橡胶园
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />其他园地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />乔木林地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />竹林地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />红树林地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />森林沼泽
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />灌木林地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />灌丛沼泽
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />其他林地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />天然牧草地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />沼泽草地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />人工牧草地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />农村道路
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />水库水面
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />坑塘水面
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />沟渠
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />设施农用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />田坎
                </div>
              </div>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>建设用地</span>
            </template>
            <el-menu-item-group>
              <div class="itembox">
                
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />物流仓储用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0103" checked />工业用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0201" checked />采矿用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />盐田
                </div>
                
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />科教文卫用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />公用设施用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />公园与绿地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />特殊用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />铁路用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />轨道交通用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />公路用地
                </div>
                
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />机场用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />港口码头用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />管道运输用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />水工建筑用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />空闲地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0101" checked />商业服务业设施用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />城镇村道路用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />交通服务场站用地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />机关团体新闻出版用地
                </div>
              </div>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span>未利用地</span>
            </template>
            <el-menu-item-group>
              <div class="itembox">
                <div class="listItem">
                  <input type="checkbox" value="0101" checked />其他草地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />河流水面
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0103" checked />湖泊水面
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0201" checked />沿海滩涂
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />内陆滩涂
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />沼泽地
                </div>
                
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />盐碱地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />沙地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />裸土地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />裸岩石砾地
                </div>
                <div class="listItem">
                  <input type="checkbox" value="0102" checked />冰川及永久积雪
                </div>
              </div>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
.bubble {
  position: relative;
  border-radius: 5px;
  width: 210px;
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
    padding-left: 5px;
    height: 25px;
    min-width: 100px;
    color: black;
    font-size: 12px;
    &:hover {
      background-color: rgb(241, 243, 247);
    }
  }

  .itembox {
    width: 210px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
  }
}
</style>