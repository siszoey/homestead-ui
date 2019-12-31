<template>  
  <div>
    <div class="wrap-top">
      <p class="header-title">宅基地申请各阶段数量统计</p>
      <el-row :gutter="20" class="progress-box">
        <el-col :span="progressWidth" v-for="(progress,index) in progressList" :key="index">
          <div class="grid-content">
            <el-progress type="circle" :percentage="progress.progressPercent" :color="progressColor[index]"></el-progress>
            <p class="state">{{progress.progressType}}</p>
            <p class="num">{{progress.progressNum}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="wrap-middle">
      <el-row :gutter="20">
        <el-col :span="18">
          <p class="header-title" :style="{background:'white'}">最新申请进度</p>
          <el-table :data="tableData" style="width: 100%;padding:15px;height:367px">
            <el-table-column prop="name" label="申请人" width='150'></el-table-column>
            <el-table-column prop="idCard" label="身份证号" width='210'></el-table-column>
            <el-table-column prop="addressNum" label="户号"></el-table-column>
            <el-table-column label="户口性质">
              <template slot-scope="scope">
                <span>{{selected('户口性质', scope.row.hukouType)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="申请类型">
              <template slot-scope="scope">
                <span>{{selected('项目类型', scope.row.requestType)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="所处阶段">
              <template slot-scope="scope">
                <span>{{selected('项目阶段', scope.row.state)}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="7" :style="{width: '24.5%',height:'420px',background:'white'}">
          <p class="header-title">申请类型分析</p>
          <div ref="main" :style="{width: '200px',height:'360px',margin:'0 auto'}"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {getChartData, getProgressData,getTableData} from "../../../api/res.home"
import selectOption from '../business/compoments/select-options.js'
export default {
    name:'res-home',
    mixins:[selectOption],
    data() {
        return {
          tableData: [],
          dataList:[
            {
              value:898, 
              name:'原地翻建'
            },
            {
              value:1088, 
              name:'辅房修复'
            },
            {
              value:735, 
              name:'新建'
            }
          ],
          progressList:[],
          progressColor:['#66CCFF','#0096FA','#FEC03D','#35ff73','#66CC66','#ff356d','#56eadd'],
          progressWidth:''
        }
      },
      mounted () {
        this.getChartData()
        this.getTableData();
        this.getProgressData();
        this.ringDrag();
      },
      methods:{
        getChartData() {
          getChartData({}).then(res => {
            // console.log(res);
            this.dataList=res;
            this.ringDrag();
          })
        },
        getTableData() {
          getTableData({}).then(res => {
            var tableDataArr=res.filter(function(tabledata){
              return tabledata.uid>=res.length-6;
            })
            // console.log(tableDataArr)
            this.tableData=tableDataArr;
          })
        },
        getProgressData() {
          getProgressData({}).then(res => {
            // console.log(res.length)
            this.progressList=res;
            this.progressWidth=24/res.length;
          })
        },
        ringDrag(){
          const _dataList=this.dataList;
          const myChart = this.$echarts.init(this.$refs.main);
          const option = {
            legend: {
              orient: 'vertical',
              left: 6,
              bottom: '10%',
              data:this.dataList.name,
              padding:[0,10,0,0],
              selectedMode:false,
              itemWidth:10,
              itemHeight:10,
              icon:'rect',
              textStyle:{
                fontSize:16,
                width:160,
                rich:{
                  a:{
                    align:'left',
                    color:'#77899c',
                    padding:[0,0,0,10],
                    fontSize:16
                  },
                  b:{
                    align:'right',
                    color:'black',
                    fontSize:16
                  },
                  c:{
                    align:'right',
                    color:'black',
                    fontSize:16
                  },
                }
              },
              tooltip: {
                show: false
              },
              formatter: function (name) {
                let _index=0;
                _dataList.forEach((item,i)=>{
                  if(item.name == name){
                    _index = i;
                  }
                });
                let arr;
                if(name=='原地翻建'){
                  arr = [
                  '{a|'+name+'}',
                  '{b|'+_dataList[_index].value+'}'
                  ]
                }else{
                  arr = [
                  '{a|'+name+'}',
                  '{c|'+_dataList[_index].value+'}'
                  ]
                }
                return arr.join('');
              }
            },
            series: [
              {
                type:'pie',
                radius: ['50%', '70%'],
                center: [100, 100],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                legendHoverLink:false,
                silent:false,
                label: {
                  normal:{
                    show: false,
                  },
                  emphasis: {
                    show: false,
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                itemStyle:{
                  color:function(params){
                    var colorList=['#4ed139','#289cf4','#fdca57']
                    return colorList[params.dataIndex];
                  }
                },
                data:this.dataList
              }
            ]
            };        
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }       
      }
}
</script>

<style lang="scss" scoped>
  p{
    margin:0;
    padding:0;
  }
  .body{
    overflow:auto;
  }
  .wrap-top{
    background:#FFFFFF;
    // margin-top:10px;
  }
  .header-title{
    margin:0;
    font-size: 18px;
    color: #333333;
    padding:15px;
    font-weight: bold;
  }
  .progress-box{
    margin-top: 10px;
    padding-bottom:30px;
    display: flex;
    justify-content: space-between;
  }
  .grid-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .state{
    font-size: 16px;
    margin-top: 10px;
    color:#8E8E8E;
  }
  .num{
    font-size: 22px;
    margin-top: 10px;
    font-weight: bold;
    color:#606060;
  }
  .wrap-middle{
    margin-top: 20px;
  }
</style>