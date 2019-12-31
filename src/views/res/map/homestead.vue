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
            <div style="width: 70%;height: 100%;">
                <div style="background-color: #FFF;height: 50px">
                    <el-radio-group v-model="radio" style="padding-top: 17px;margin-left: 15px">
                        <el-radio :label="3" @change="lookAll">查看全部</el-radio>
                        <el-radio :label="6" @change="lookUse">使用中宅基地</el-radio>
                        <el-radio :label="9" @change="lookIdle">闲置宅基地</el-radio>
                    </el-radio-group>
                </div>
                <div style="width: 100%;height: 400px;" id="map1"></div>
            </div>


            <div style="background-color: #FFF;margin-left: 10px;width: 30%">
                <div style="padding-top:5px;padding-bottom:5px;display:flex;justify-content : center;border-bottom: 1px solid;border-top: 1px solid;margin-top: 10px;background-color: rgb(226,239,249)">
                    <span style="font-size: 25px">{{area}}宅基地分布图</span>
                </div>
                <div style="border: 1px solid gainsboro;height: 200px;">
                    <div style="margin-top:5px;margin-left:5px;font-size: 15px;font-weight: bold">闲置宅基地变化情况</div>
                    <div style="margin-top:5px;margin-left:5px;font-size: 13px">发展趋势</div>
                    <div style="margin-top:5px;margin-left:5px;font-size: 15px;font-weight: bold">逐年上升</div>
                    <div style="margin-top:5px;margin-left:5px;font-size: 14px">同比增长20%</div>
                    <div style="margin-top:5px;margin-left:5px;width: 90%;height: 80px;" ref="echart"></div>
                </div>

                <div style="margin-top:5px;margin-left:5px;">
                    <table style="width: 100%">
                        <tr>
                            <th>宅基地分类</th>
                            <th>数量</th>
                            <th>总面积</th>
                            <th>所占比例</th>
                        </tr>
                        <tr>
                            <td>总的农村宅基地</td>
                            <td>{{totalNumber}}</td>
                            <td>{{totalArea}} 平方米</td>
                            <td>100%</td>
                        </tr>
                        <tr>
                            <td>使用中的宅基地</td>
                            <td>{{useNumber}}</td>
                            <td>{{useArea}} 平方米</td>
                            <td>{{usePercent}}%</td>
                        </tr>
                        <tr>
                            <td>闲置宅基地</td>
                            <td>{{idleNumber}}</td>
                            <td>{{idleArea}} 平方米</td>
                            <td>{{idlePercent}}%</td>
                        </tr>
                    </table>
                </div>

                <div style="margin-top: 10px;font-size: 20px">图例说明</div>
                <div style="display: flex;margin-top: 10px;align-items : center">
                    <div style=" border-radius: 25px;background-color:#151518;width: 15px;height: 15px"></div>
                    <div style="font-size: 15px;margin-left: 10px">使用中宅基地</div>
                    <div style="margin-left:10px;border-radius: 25px;background-color:rgba(152,24,40,0.9);width: 15px;height: 15px"></div>
                    <div style="font-size: 15px;margin-left: 10px">闲置宅基地</div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
    tr{
        height: 30px;
    }
    th{
        font-size: 15px;
    }
    td {
        text-align: center;
        font-size: 13px;
    }
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
  import { Vector as VectorSource} from 'ol/source'
  import {Fill, Stroke, Circle, Style} from 'ol/style';
  import * as tdtUtil from '../../../libs/util.tdt'
  import {queryCode, queryHomestead} from '../../../api/map'

  export default {
    name: 'plan',
    data() {
      return {
        radio: 3,
        options: [],
        selectValue: [],
        map: null,
        draw: null,
        featureList: [],
        e: null,
        vectorUseLayer: null,
        vectorUseSource: null,
        vectorIdleLayer: null,
        vectorIdleSource: null,
        currentLayer: null,
        area: null,
        totalNumber:0,
        totalArea:0,
        useNumber:0,
        useArea:0,
        usePercent:0,
        idleNumber:0,
        idleArea:0,
        idlePercent:0
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      lookAll(){
        this.map.removeLayer(this.vectorUseLayer)
        this.map.removeLayer(this.vectorIdleLayer)
        this.map.addLayer(this.vectorUseLayer)
        this.map.addLayer(this.vectorIdleLayer)
      },
      lookUse(){
        this.map.removeLayer(this.vectorUseLayer)
        this.map.removeLayer(this.vectorIdleLayer)
        this.map.addLayer(this.vectorUseLayer)
      },
      lookIdle(){
        this.map.removeLayer(this.vectorUseLayer)
        this.map.removeLayer(this.vectorIdleLayer)
        this.map.addLayer(this.vectorIdleLayer)
      },
      search(){
        this.map.removeLayer(this.vectorUseLayer)
        this.map.removeLayer(this.vectorIdleLayer)
        let regionCode = {"regionCode": "320506006001"}
        queryHomestead(regionCode).then((res) => {
          console.log(res)
          this.addUseLayer(res)
          this.addIdleLayer(res)
          this.showEchart(res)
        })
      },
      init() {
        //获取行政区划数据
        queryCode().then((res) => {
          console.log(res)
          this.options = res
        })
        //初始化地图对象
        this.map = new Map({
          controls: defaults({attribution: false, zoom: false, rotate: false}).extend([]),
          layers: [tdtUtil.createTdtVecLayer(), tdtUtil.createTdtCvaLayer()],
          target: 'map1',
          view: new View({
            center: fromLonLat([120.64, 31.24]),
            // zoom: 14
            zoom: 4
          })
        });
      },
      showEchart(res) {
        let myChart = this.$echarts.init(this.$refs.echart)
        let echartOption = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2017', '2018', '2019']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: res.idle.yearChange,
            type: 'line',
            areaStyle: {}
          }]
        };
        myChart.setOption(echartOption);

        this.totalNumber = res.total.number
        this.totalArea = res.total.totalArea

        this.useArea = res.use.totalArea
        this.useNumber = res.use.number
        this.usePercent = res.use.percent

        this.idleArea = res.idle.totalArea
        this.idleNumber = res.idle.number
        this.idlePercent = res.idle.percent

        this.area = this.$refs.myCascader.getCheckedNodes()[0].label

      },
      addUseLayer(res){
        this.vectorUseSource = new VectorSource()
        let fill = new Fill({
          color: 'rgba(34,25,34,0.9)'
        });
        let stroke = new Stroke({
          color: 'rgba(34,25,34,0.9)',
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
        this.vectorUseLayer = new VectorLayer({
          style: styles,
          source: this.vectorUseSource
        });
        for (let i = 0; i < res.use.location.length; i++) {
          let feature = new Feature();
          let geo = new Point(fromLonLat([res.use.location[i].lx, res.use.location[i].ly]));
          feature.setGeometry(geo);
          this.vectorUseLayer.getSource().addFeature(feature);
        }
        this.map.addLayer(this.vectorUseLayer)
      },
      addIdleLayer(res){
        this.vectorIdleSource = new VectorSource()
        let fillIdle = new Fill({
          color: 'rgba(152,24,40,0.9)'
        });
        let strokeIdle = new Stroke({
          color: 'rgba(152,24,40,0.9)',
          width: 1.25
        });
        let stylesIdle = [
          new Style({
            image: new Circle({
              fill: fillIdle,
              stroke: strokeIdle,
              radius: 5
            }),
            fill: fillIdle,
            stroke: strokeIdle
          })
        ];
        this.vectorIdleLayer = new VectorLayer({
          style: stylesIdle,
          source: this.vectorIdleSource
        });
        for (let i = 0; i < res.idle.location.length; i++) {
          let feature = new Feature();
          let geo = new Point(fromLonLat([res.idle.location[i].lx, res.idle.location[i].ly]));
          feature.setGeometry(geo);
          this.vectorIdleLayer.getSource().addFeature(feature);
        }
        this.map.addLayer(this.vectorIdleLayer)
      }
    }
  }

</script>
