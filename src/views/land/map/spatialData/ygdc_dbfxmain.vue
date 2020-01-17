<template>
  <div class="wrapper">
    <div class="half">
      <singleMap ref="mapleft" mapid="mapleft"></singleMap>
    </div>
    <div class="half">
      <singleMap ref="mapright"mapid="mapright"></singleMap>
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
    return {};
  },
  components: {
    singleMap
  },
  mounted() {
    var view = this.$refs.mapleft.map.getView();
    this.$refs.mapright.map.setView(view);
  },

  methods: {}
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 98%;
  height: 96%;
}
.half {
  // padding: 0 5px;
  width: 50%;
  height: 100%;
}
</style>