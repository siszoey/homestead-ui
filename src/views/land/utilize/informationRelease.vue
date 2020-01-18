<template>
  <div class="contents">
    <el-image :src="developing2"></el-image>
    <h2>功能正在开发中,敬请期待...</h2>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        developing1: "./image/developing/developing1.jpg",
        developing2: "./image/developing/developing2.jpg"
      };
    },
    mounted() {

    },
    methods: {

    }
  };
</script>

<style lang="scss" scoped>
  .contents {
    width: 100%;
    height: 100%;
    float: left;
    background: #FFF;
  }
  .el-image{
    position: absolute;
    top: 40%;
    left: 50%;
    font-size: 35px;
    text-transform: uppercase;
    transform: translate(-50%, -50%);
    display: block;
  }
  h2 {
    position: absolute;
    top: 60%;
    left: 50%;
    font-size: 35px;
    text-transform: uppercase;
    transform: translate(-50%, -50%);
    display: block;
    color: #12000a;
    font-weight: 300;
    font-family: Audiowide;
    text-shadow: 0px 0px 4px #12000a;
    animation: fadeInText 3s ease-in 3.5s forwards, flicker4 5s linear 7.5s infinite, hueRotate 6s ease-in-out 3s infinite;
  }
</style>