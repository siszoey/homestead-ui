<template>
  <div class="timeLineContainer">
    <div class="timeLine">
      <div class="tickContainer">
        <div class="tick">
          <div class="label">2015</div>
          <div class="line"></div>
        </div>
        <div class="tick">
          <div class="label">2016</div>
          <div class="line"></div>
        </div>
        <div class="tick">
          <div class="label">2017</div>
          <div class="line"></div>
        </div>
        <div class="tick">
          <div class="label">2018</div>
          <div class="line"></div>
        </div>
        <div class="tick">
          <div class="label">2019</div>
          <div class="line"></div>
        </div>
      </div>
      <div class="progress" ref="progress">
        <div class="track" ref="track"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.handleTimeLine();
  },
  methods: {
    handleTimeLine() {
      var that = this;
      let tickIndex = 0;
      let years = [2015, 2016, 2017, 2018, 2019];
      this.$refs.track.onmousedown = function(e) {
        let element = e.target;
        let width = that.$refs.progress.offsetWidth;
        let tickLength = 50;
        let trackLength = 8;
        let tickCount = 4.0;
        let itemLength = (width - tickLength) / tickCount;
        let left = element.offsetLeft;
        let startX = e.clientX;
        document.onmousemove = function(e) {
          let trackDist = e.clientX - startX;
          let newLeft = left + trackDist;
          tickIndex = Math.ceil((newLeft - tickLength) / itemLength);
          if (tickIndex < 0) {
            tickIndex = 0;
          }
          if (tickIndex > tickCount) {
            tickIndex = tickCount;
          }
          newLeft = (tickLength - trackLength) / 2 + tickIndex * itemLength;
          element.style.left = newLeft + "px";
        };
        document.onmouseup = function(e) {
          document.onmousemove = document.onmouseup = null;
          that.changeYear(years[tickIndex]);
        };
        return false;
      };
    },
    changeYear(year) {
      //alert(year);
    }
  }
};
</script>
<style  lang="scss" scoped>
.timeLineContainer {
  position: absolute;
  bottom: 30px;
  width: 100%;
  user-select: none;
  .timeLine {
    width: 1000px;
    margin: 0 auto;

    .tickContainer {
      display: flex;
      justify-content: space-between;
      .tick {
        text-align: center;
        display: block;
        .label {
          width: 50px;
          height: 20px;
          background-color: rgba(128, 128, 128, 0.5);
          margin-bottom: 10px;
          border-radius: 3px;
          text-align: center;
          line-height: 20px;
          color: rgb(216, 216, 216);
          font-size: 12px;
        }
        .line {
          margin: 0 auto;
          height: 4px;
          width: 2px;
          background-color: rgb(216, 216, 216);
        }
      }
    }

    .progress {
      width: 100%;
      border-radius: 2px;
      background-color: rgb(216, 216, 216);
      height: 5px;
      position: relative;
      .track {
        position: absolute;
        height: 17px;
        left: 971px;
        width: 8px;
        background-color: rgb(216, 216, 216);
        border-radius: 3px;
        top: -6px;
        cursor: pointer;
      }
    }
  }
}
</style>