<template>
    <div>

        <div style="background-color: #FFF;margin-top: 10px;width: 100%;height: 100px">
            <div style="padding-top: 10px;margin-left: 20px;margin-bottom: 10px">
                <span style="font-size: 15px;font-weight: bold">行政区划选择</span>
            </div>
            <hr/>
            <div style="margin-top: 10px;margin-left: 20px">
                <span style="font-size: 15px">行政区划：</span>
                <el-cascader ref="myCascader" v-model="selectValue" :options="options" size="small">
                </el-cascader>
                <el-button style="margin-left: 10px" size="small" type="primary" @click="search">查询</el-button>
            </div>
        </div>

        <div style="display: flex;margin-top: 10px">
            <div style="width: 70%;height: 400px;" id="map" class="map"></div>
            <div style="background-color: #FFF;margin-left: 10px;width: 30%">
                <div style="padding-top:5px;padding-bottom:5px;display:flex;justify-content : center;border-bottom: 1px solid;border-top: 1px solid;margin-top: 10px;background-color: rgb(226,239,249)">
                    <span style="font-size: 25px">{{area}}总体规划</span>
                </div>
                <div style="margin-top: 20px;font-size: 20px">图例说明</div>
                <div style="display: flex;margin-top: 10px;align-items : center">
                    <div style=" border-radius: 25px;background-color:#151518;width: 15px;height: 15px"></div>
                    <div style="font-size: 15px;margin-left: 10px">宅基地指标</div>
                </div>
                <div style="margin-top: 15px;font-size: 15px">指标完成情况说明</div>

                <div style="border:1px solid #a1a1a1;margin-top: 20px">
                    <div style="margin-top: 10px;margin-left: 10px;font-size: 13px">宅基地指标</div>
                    <div style="margin-top: 10px;margin-left: 10px;font-size: 13px">宅基地指标说明</div>
                    <el-progress :percentage="zjindex"
                                 style="margin-top: 10px;margin-left: 10px;margin-bottom: 10px"></el-progress>
                </div>
                <div style="border:1px solid #a1a1a1;margin-top: 20px">
                    <div style="margin-top: 10px;margin-left: 10px;font-size: 13px">绿化建设指标</div>
                    <div style="margin-top: 10px;margin-left: 10px;font-size: 13px">绿化建设指标说明</div>
                    <el-progress :percentage="lhindex"
                                 style="margin-top: 10px;margin-left: 10px;margin-bottom: 10px"></el-progress>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
  import 'ol/ol.css'
  import Map from 'ol/Map'
  import View from 'ol/View'
  import {defaults} from 'ol/control'
  import Feature from 'ol/Feature'
  import Point from 'ol/geom/Point'
  import {fromLonLat} from 'ol/proj'
  import { Vector as VectorLayer} from 'ol/layer'
  import {Vector as VectorSource} from 'ol/source'
  import {Fill, Stroke, Circle, Style} from 'ol/style';
  import * as tdtUtil from '../../../libs/util.tdt'
  import {queryCode, queryPlan} from '../../../api/map'

  export default {
    name: 'plan',
    data() {
      return {
        options: [],
        selectValue: [],
        map: null,
        draw: null,
        featureList: [],
        e: null,
        vectorLayer: null,
        vectorSource: null,
        isShowStatus: true,
        currentLayer: null,
        area: null,
        zjindex: 0,
        lhindex: 0
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        //获取行政区划数据
        queryCode().then((res) => {
          this.options = res
        })
        //初始化地图对象
        this.map = new Map({
          controls: defaults({attribution: false, zoom: false, rotate: false}).extend([]),
          layers: [tdtUtil.createTdtVecLayer(), tdtUtil.createTdtCvaLayer()],
          target: 'map',
          view: new View({
            center: fromLonLat([120.64, 31.24]),
            // zoom: 14
            zoom: 4
          })
        });
      },
      addLayer(res) {
        this.map.removeLayer(this.vectorLayer)
        this.vectorSource = new VectorSource()
        let fill = new Fill({
          color: 'rgba(34,25,34,0.9)'
        });
        let stroke = new Stroke({
          color: '#121117',
          width: 1.25
        });
        let styles = [
          new Style({
            image: new Circle({
              fill: fill,
              stroke: stroke,
              radius: 5
            }),
            fill: fill,
            stroke: stroke
          })
        ];
        this.vectorLayer = new VectorLayer({
          style: styles,
          source: this.vectorSource
        });
        for (let i = 0; i < res.regioncode.length; i++) {
          let feature = new Feature();
          let geo = new Point(fromLonLat([res.regioncode[i].lx, res.regioncode[i].ly]));
          feature.setGeometry(geo);
          this.vectorLayer.getSource().addFeature(feature);
        }
        this.map.addLayer(this.vectorLayer)
        this.zjindex = res.zjdPercent
        this.lhindex = res.lhPercent
      },
      search() {
        let regionCode = {"regionCode": "320506006001"}
        queryPlan(regionCode).then((res) => {
          this.addLayer(res)
          this.area = this.$refs.myCascader.getCheckedNodes()[0].label
        })
      }


    }
  }

</script>
