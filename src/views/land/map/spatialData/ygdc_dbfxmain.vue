<template>
  <div class="wrapper">
    <div class="half">
      <singleMap ref="mapleft" mapid="mapleft" v-on:inited="initFinished"></singleMap>
    </div>
    <div class="half">
      <singleMap ref="mapright" mapid="mapright" v-on:inited="initFinished"></singleMap>
    </div>
  </div>
</template>
<script>
import singleMap from "../spatialData/ygdc_dbfx.vue";
import BaseMap from "../spatialData/mapBase.js";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import GeoJSON from "ol/format/GeoJSON";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import { XYZ, TileWMS, Cluster } from "ol/source";
import { Overlay, Feature } from "ol";
import VectorSource from "ol/source/Vector";
import { getCenter, getBottomLeft } from "ol/extent";
import Point from "ol/geom/Point";

export default {
  name: "ygdc_dbfxmain",
  data() {
    return {
      viewbinded: false
    };
  },
  components: {
    singleMap
  },
  mounted() {
    // var view = this.$refs.mapleft.map.getView();
    // this.$refs.mapright.map.setView(view);
  },

  methods: {
    initFinished() {
      if (!this.viewbinded) {
        try {
          //如果右边也加载完了
          this.$refs.mapright.map.setView(this.$refs.mapleft.map.getView());
          this.viewbinded = true;
        } catch (e) {}
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}
.half {
  // padding: 0 5px;
  width: 50%;
  height: 100%;
}
</style>