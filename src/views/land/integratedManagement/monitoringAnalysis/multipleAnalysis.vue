<template>
    <div class="contents">
        <el-row class="warp">
            <el-col :span="14">
                <div class="charts">
                    <div class="yhdztj_div">
                        <div ref="barMain" class="chart_div"></div>
                    </div>
                    <div class="lnwfjztj_div">
                        <div ref="lineMain" class="chart_div"></div>
                    </div>
                    <div class="wfydtj_div">
                        <el-row style="width: 100%; height: 100%;">
                            <el-col :span="12">
                                <div ref="pieMain" class="chart_div"></div>
                            </el-col>
                            <el-col :span="12" style="float: right;">
                                <div class="chart_div">
                                    <div class="title">全年违法案件处理数</div>
                                    <div class="cls_div">
                                        <div class="clsText">已处理</div>
                                        <div class="clsNum">{{yclData}}</div>
                                    </div>
                                    <div class="cls_div">
                                        <div class="clsText">已处理</div>
                                        <div class="clsNum">{{wclData}}</div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>

                    </div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="map">
                    <oneMap :hiddenToolbar="flase"></oneMap>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { color } from "echarts/lib/export"
    export default {
        components: {
            OneMap: () => import('../../../land/map/spatialData/onemap.vue')
        },
        data() {
            return {
                barDatas: [
                    { name: "东路镇", value: "24" },
                    { name: "东郊镇", value: "17" },
                    { name: "东阁镇", value: "36" },
                    { name: "会文镇", value: "28" },
                    { name: "公坡镇", value: "29" },
                    { name: "冯坡镇", value: "29" },
                    { name: "抱罗镇", value: "24" },
                    { name: "文城镇", value: "10" }
                ],
                lineDatas: [
                    { name: "2012", value: "146" },
                    { name: "2013", value: "173" },
                    { name: "2014", value: "142" },
                    { name: "2015", value: "153" },
                    { name: "2016", value: "230" },
                    { name: "2017", value: "138" },
                    { name: "2018", value: "152" },
                    { name: "2019", value: "180" }
                ],
                pieDatas: [
                    { name: "超标用地", value: "230" },
                    { name: "占用农地", value: "180" },
                    { name: "临时违法用地", value: "220" },
                    { name: "未批先建", value: "370" }
                ],
                yclData: "6234",
                wclData: "1232",
                barChart: {},
                lineChart: {},
                pieChart: {}
            };
        },
        mounted() {
            this.InitChart();
            this.LineChart();
            this.IniPieChart();
            //当页面大小发生变化时，echarts统计图根据画布大小自动重新绘制
            window.addEventListener("resize", () => {
                this.barChart.resize();
                this.lineChart.resize();
                this.pieChart.resize();
            });
        },
        methods: {
            //柱状统计图
            InitChart() {
                const _dataList = this.barDatas;
                this.barChart = this.$echarts.init(this.$refs.barMain);
                if (_dataList.length > 0) {
                    const serieHs = {
                        name: "户数",
                        type: "bar",
                        color: "#33A062",
                        barWidth: 30,
                        label: {
                            show: true,
                            position: 'top',
                            color: '#000'
                        }
                    };
                    const dataHs = [];
                    const xAixs = [];
                    _dataList.forEach(item => {
                        xAixs.push(item.name);
                        dataHs.push(item.value);
                    });
                    serieHs.data = dataHs;
                    const option = {
                        title: {
                            text: '一户多宅统计'
                        },
                        xAxis: {
                            type: 'category',
                            axisLabel: {
                                textStyle: { //改变刻度字体样式
                                    color: '#aaa'
                                }
                            },
                            data: xAixs
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                textStyle: { //改变刻度字体样式
                                    color: '#aaa'
                                }
                            },
                            name: '户数',
                            nameTextStyle: {
                                color: '#aaa'
                            }
                        },
                        series: [serieHs]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    this.barChart.setOption(option);
                }
            },
            //折线统计图
            LineChart() {
                const _dataList = this.lineDatas;
                this.lineChart = this.$echarts.init(this.$refs.lineMain);
                if (_dataList.length > 0) {
                    const serieHs = {
                        name: "违法建筑数量",
                        type: "line",
                        smooth: true,
                        color: "#00AAFF"
                    };
                    const dataHs = [];
                    const xAixs = [];
                    _dataList.forEach(item => {
                        xAixs.push(item.name);
                        dataHs.push(item.value);
                    });
                    serieHs.data = dataHs;
                    const option = {
                        title: {
                            text: '历年违法建筑统计'
                        },
                        tooltip: {
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        xAxis: {
                            type: 'category',
                            axisLabel: {
                                textStyle: { //改变刻度字体样式
                                    color: '#aaa'
                                }
                            },
                            data: xAixs
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                textStyle: { //改变刻度字体样式
                                    color: '#aaa'
                                }
                            },
                            name: '违法建筑数量',
                            nameTextStyle: {
                                color: '#aaa'
                            }
                        },
                        series: [serieHs]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    this.lineChart.setOption(option);
                }
            },
            //扇形统计图
            IniPieChart() {
                const _dataList = this.pieDatas;
                this.pieChart = this.$echarts.init(this.$refs.pieMain);
                const option = {
                    title: {
                        text: '违法用地统计'
                    },
                    series: [
                        {
                            type: "pie",
                            radius: ["35%", "75%"],
                            avoidLabelOverlap: false,
                            hoverAnimation: false,
                            legendHoverLink: false,
                            silent: false,
                            label: {
                                formatter: "{b}\n{d}%",
                                color: "black"
                            },
                            labelLine: {
                                lineStyle: {
                                    color: "#666"
                                },
                                length: 10,
                                length2: 25
                            },
                            itemStyle: {
                                color: function (params) {
                                    var colorList = ["#FDDF37", "#38A8F5", "#7150F6", "#B0CE20"];
                                    return colorList[params.dataIndex];
                                }
                            },
                            data: this.pieDatas
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                this.pieChart.setOption(option);
            }
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

    .warp {
        width: 97%;
        height: 96%;
        margin: 1% 1.5%;
    }

    .el-col {
        height: 100%;
    }

    .charts {
        display: -webkit-flex;
        display: flex;
        -webkit-flex-direction: column;
        flex-direction: column;
        width: 98%;
        height: 100%;
    }

    .map {
        width: 100%;
        height: 100%;
        border: 1px solid #CDCDCD;
    }

    .yhdztj_div,
    .lnwfjztj_div,
    .wfydtj_div {
        width: 100%;
        height: 33%;
    }

    .title {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 2px;
        height: 30px;
        line-height: 30px;
    }

    .chart_div {
        height: 100%;
        width: 100%;
    }

    .cls_div {
        width: 80%;
        height: 20%;
        margin-top: 8%;
        border: 1px solid #CDCDCD;
        font-size: 18px;
        color: #aaa;
        letter-spacing: 1px;
        background: #F9F9F9;
    }

    .clsText,
    .clsNum {
        height: 100%;
        /*flex 布局*/
        display: flex;
        /*实现垂直居中*/
        align-items: center;
        /*实现水平居中*/
        justify-content: center;
        text-align: justify;
    }

    .clsText {
        width: 40%;
        float: left;
    }

    .clsNum {
        width: 60%;
        font-weight: 600;
        float: right;
    }
</style>