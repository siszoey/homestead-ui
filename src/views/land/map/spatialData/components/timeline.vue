<template>
  <div class="timeSlider">
    <div class="layout-item">
      <div class="headbutton" @click="toPrev()">
        <div class="img"></div>
      </div>
    </div>

    <div class="layout-item" style="padding-right:3px">
      <div class="prebutton" @click="prev()">
        <div class="img"></div>
      </div>
    </div>

    <div class="progress-container">
      <div class="progress" ref="progress">
        <div class="progressbar" v-bind:style="progressbarStyle"></div>
      </div>
      <div class="track" ref="starttrack" v-bind:style="startTrackStyle"></div>
      <div class="track" v-bind:style="endTrackStyle" ref="endtrack"></div>
      <div class="ticks">
        <div class="tick" v-for="(time,i) in times" :key="i" @click="timeClick(time)">{{time}}</div>
      </div>
    </div>

    <div class="layout-item">
      <div class="nextbutton" @click="next()">
        <div class="img"></div>
      </div>
    </div>

    <div class="layout-item">
      <div class="endbutton" @click="toNext()">
        <div class="img"></div>
      </div>
    </div>
  </div>
</template>
<script>
// import global from "../../core/Global";
// import MapUtils from "../../core/MapUtils";
// import FeatureLayerUtil from "../../core/FeatureLayerUtil";
export default {
  data() {
    return {
      startTime: "2011",
      endTime: "2020",
      times: [
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020"
      ]
    };
  },
  mounted() {
    var that = this;
    this.$refs.starttrack.onmousedown = function(e) {
      var element = e.target;
      var width = that.$refs.progress.offsetWidth;
      var percent = element.offsetLeft / width;
      var lowPercent = 0;
      var highPercent = (100 * that.$refs.endtrack.offsetLeft) / width - 10;
      var startX = e.clientX;
      document.onmousemove = function(e) {
        var newWidth = e.clientX - startX;
        var newPercent =
          10 * Math.round((100 * (percent + newWidth / width)) / 10);
        if (newPercent < lowPercent) {
          newPercent = lowPercent;
        }
        if (newPercent > highPercent) {
          newPercent = highPercent;
        }
        that.startTime = that.times[Math.round(newPercent / 10)];
      };
      document.onmouseup = function() {
        // debugger;
        document.onmousemove = document.onmouseup = null;
        that.changeTime();
      };
      return false;
    };

    this.$refs.endtrack.onmousedown = function(e) {
      var element = e.target;
      var width = that.$refs.progress.offsetWidth;
      var percent = element.offsetLeft / width;
      var lowPercent = (100 * that.$refs.starttrack.offsetLeft) / width + 10;
      var highPercent = 99;
      var startX = e.clientX;
      document.onmousemove = function(e) {
        var newWidth = e.clientX - startX;
        var newPercent =
          10 * Math.round((100 * (percent + newWidth / width)) / 10);
        if (newPercent < lowPercent) {
          newPercent = lowPercent;
        }
        if (newPercent > highPercent) {
          newPercent = highPercent;
        }
        that.endTime = that.times[Math.round(newPercent / 10) - 1];
      };
      document.onmouseup = function() {
        document.onmousemove = document.onmouseup = null;
        that.changeTime();
      };
      return false;
    };
  },
  methods: {
    changeTime() {
      let whereclause =
        "xmnf>='" + this.startTime + "' and xmnf<='" + this.endTime + "'";
      // FeatureLayerUtil.filter(
      //   MapUtils.getFeatureLayer(global.layer_ntjsxm),
      //   whereclause
      // );
    },
    timeClick(time) {
      this.startTime = time;
      this.endTime = time;
      this.changeTime();
    },
    prev() {
      let startIndex = this.times.indexOf(this.startTime);
      let endIndex = this.times.indexOf(this.endTime);
      if (endIndex > startIndex) {
        this.endTime = this.times[endIndex - 1];
      }
      this.changeTime();
    },
    toPrev() {
      let startIndex = this.times.indexOf(this.startTime);
      let endIndex = this.times.indexOf(this.endTime);
      if (startIndex > 0) {
        this.startTime = this.times[startIndex - 1];
      }
      this.changeTime();
    },
    next() {
      let startIndex = this.times.indexOf(this.startTime);
      let endIndex = this.times.indexOf(this.endTime);
      if (startIndex < endIndex) {
        this.startTime = this.times[startIndex + 1];
      }
      this.changeTime();
    },
    toNext() {
      let startIndex = this.times.indexOf(this.startTime);
      let endIndex = this.times.indexOf(this.endTime);
      if (endIndex < this.times.length - 1) {
        this.endTime = this.times[endIndex + 1];
      }
      this.changeTime();
    }
  },

  computed: {
    progressbarStyle() {
      return {
        left: 10 * this.times.indexOf(this.startTime) + "%",
        width:
          10 *
            (this.times.indexOf(this.endTime) -
              this.times.indexOf(this.startTime) +
              1) +
          "%"
      };
    },
    startTrackStyle() {
      return {
        left: 10 * this.times.indexOf(this.startTime) + "%"
      };
    },
    endTrackStyle() {
      let percent = 10 * (this.times.indexOf(this.endTime) + 1);
      if (percent > 99) {
        percent = 99;
      }
      return {
        left: percent + "%"
      };
    }
  }
};
</script>
<style lang="scss" scoped>
// @import url("../fui.css");
.timeSlider {
  position: absolute;
  bottom: 30px;
  height: 60px;
  width: 45%;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.3);

  margin-left: 60%;
  transform: translateX(-50%);

  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.layout-item {
  padding-left: 3px;
}

.nextbutton,
.prebutton {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nextbutton:hover,
.prebutton:hover,
.headbutton:hover,
.endbutton:hover {
  box-sizing: content-box;
  border-radius: 50%;
  background-color: hsla(0, 0%, 100%, 0.7);
}

.nextbutton {
  .img {
    background-image: url("/image/mapicon/icon_next.png");
    width: 16px;
    height: 16px;
  }
}

.prebutton {
  .img {
    background-image: url("/image/mapicon/icon_next.png");
    width: 16px;
    height: 16px;
    transform: rotate(180deg);
  }
}

.headbutton,
.endbutton {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.headbutton {
  .img {
    background-image: url("/image/mapicon/icon_end.png");
    width: 32px;
    height: 32px;
    transform: rotate(180deg);
  }
}

.endbutton {
  .img {
    background-image: url("/image/mapicon/icon_end.png");
    width: 32px;
    height: 32px;
  }
}

.progress-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  flex: 1;
}

.progress {
  position: absolute;
  top: 25px;
  height: 8px;
  border-radius: 4px;
  width: 100%;
  background: gray;
  .progressbar {
    position: absolute;
    height: 8px;
    border-radius: 4px;
    background: #319ade;
  }
}

.track {
  position:absolute;
  border-radius: 50%;
  background: #fff;
  height: 12px;
  width: 12px;
  top: 23px;
  cursor: pointer;
}

.ticks {
  position: absolute;
  top: 40px;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  overflow: hidden;
  justify-content: start;
  .tick {
    border-left: 1px solid white;
    box-sizing: border-box;
    min-width: 10%;
    text-align: center;
    cursor: pointer;
    height: 18px;
    line-height: 18px;
    color: white;
  }
  .tick:hover {
    color: rgb(244, 234, 42);
  }
}
</style>