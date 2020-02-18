<template>
    <div class="container">
        <div id="maponemap" class="mapDiv"></div>
    </div>
</template>
<script>
    import BaseMap from "../../../land/map/spatialData/mapBase.js";

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
    import Axios from "axios";

    export default {
        props: {
            zoomToZD: {
                type: Boolean,
                default: false
            }
        },
        name: "survey",
        data() {
            return {
                map: null,
                currentZD: null,
                DT: {
                    Layer: null,
                    Visible: true,
                    Features: [],
                    Boxs: []
                },
                zddms:["469005115003JC99012","469005115003JC99013","469005115003JC99014","469005115003JC99015","469005115003JC99016"]
            };
        },
        mounted() {
            this.$nextTick(function () {
                //初始化地图
                this.map = BaseMap.BaseInitMap("maponemap");
                this.DT.Layer = this.InitDT();
                //行政区置顶

                if (this.zoomToZD) this.doZoomToZD();
            });
        },

        methods: {
            doZoomToZD() {
                if (!this.zoomToZD) return;
                var zddm = this.zddms[Math.floor(Math.random()*this.zddms.length)];
                let _this = this;
                if (this.currentZD != null) this.map.removeLayer(this.currentZD);
                this.currentZD = new VectorLayer({
                    source: new VectorSource({
                        url:
                            BaseMap.geoserver +
                            "&typeName=TDLYXZ:ZD" +
                            "&CQL_FILTER=zddm_bf = %27" +
                            zddm +
                            "%27",
                        format: new GeoJSON()
                    }),
                    zIndex: 20
                });
                this.currentZD.getSource().on("change", function (evt) {
                    var source = evt.target; //图层矢量数据是异步加载的，所以要在事件里做缩放
                    if (source.getState() === "ready") {
                        var center = getCenter(source.getExtent());
                        _this.map.getView().animate(
                            {
                                center: center,
                                duration: 1
                            },
                            {
                                zoom: 18,
                                duration: 1
                            }
                        );
                    }
                });
                this.map.addLayer(this.currentZD);
            },
            //天地图底图
            InitDT() {
                this.map.addLayer(BaseMap.img_wLayer);
                return BaseMap.img_wLayer;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100%;
        padding: 0px;
        margin: 0px;
        position: relative;
        display: flex;
        overflow: hidden;
    }

    .mapDiv {
        height: 100%;
        padding: 0px;
        padding: 0px;
        margin: 0px;
        width: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
    }
</style>