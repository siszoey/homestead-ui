<template>
    <d2-container>
        <el-form :inline="true" ref="queryForm" size="mini" style="padding: 0 20px">
            <el-form-item label="申请年份">
                <el-date-picker v-model="query_year" type="year" placeholder="选择年份" value-format="yyyy">
                </el-date-picker>
            </el-form-item>

            <div style="float: right">
                <el-form-item>
                    <el-button type="warning" icon="el-icon-upload2" v-on:click="report">上报</el-button>
                    <el-button type="primary" icon="el-icon-search" v-on:click="getTableData">查询</el-button>
                    <el-button type="default" @click="resetForm('queryForm')">
                        <d2-icon name="refresh" />
                    </el-button>
                </el-form-item>
            </div>
        </el-form>
        <el-divider content-position="left">审批上报</el-divider>
        <el-table :data="approvalList" height="300" v-loading="listLoading" element-loading-text="拼命加载中..."
            highlight-current-row stripe ref="approvalMultipleTable" @selection-change="approvalHandleSelectionChange"
            style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column align="center" label="项目编号" width="155">
                <template slot-scope="scope">
                    <span>{{scope.row.jcxx.sqid}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="申请类型">
                <template slot-scope="scope">
                    <span>{{getOptName('建房类型', scope.row.nzjdqk.jflx)}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="申请时间"
                :filters="[{ text: '第一季度', value: '1' }, { text: '第二季度', value: '2' }, { text: '第三季度', value: '3' }, { text: '第四季度', value: '4' }]"
                :filter-method="quarterFilter" :filter-multiple="false" :filtered-value="approvalQuarter"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                    <span>{{scope.row.qt.sqrrq}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="申请人">
                <template slot-scope="scope">
                    <span>{{scope.row.jcxx.xm}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="申请面积">
                <template slot-scope="scope">
                    <span>{{scope.row.nzjdqk.zjdmj}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="联系方式" width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.jcxx.lxdh}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="上报时间">
                <template slot-scope="scope">
                    <span>{{scope.row.qt.sqrrq}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="上报状态" width="185"
                :filters="[{ text: '已上报', value: '1' }, { text: '未上报', value: '2' }]" :filter-method="stateFilter"
                :filter-multiple="false" :filtered-value="approvalState" filter-placement="bottom-end">
                <template slot-scope="scope">
                    <span v-if="scope.row.jcxx.firstReport==1">已上报</span>
                    <span v-if="scope.row.jcxx.firstReport!=1">未上报</span>
                </template>
            </el-table-column>
        </el-table>

        <el-divider content-position="left">验收上报</el-divider>
        <el-table :data="acceptanceList" height="300" v-loading="listLoading" element-loading-text="拼命加载中..."
            highlight-current-row stripe ref="acceptanceMultipleTable"
            @selection-change="acceptanceHandleSelectionChange" style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column align="center" label="项目编号" width="155">
                <template slot-scope="scope">
                    <span>{{scope.row.jcxx.sqid}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="申请类型">
                <template slot-scope="scope">
                    <span>{{getOptName('建房类型', scope.row.nzjdqk.jflx)}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="申请时间"
                :filters="[{ text: '第一季度', value: '1' }, { text: '第二季度', value: '2' }, { text: '第三季度', value: '3' }, { text: '第四季度', value: '4' }]"
                :filter-method="quarterFilter" :filter-multiple="false" :filtered-value="acceptanceQuarter"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                    <span>{{scope.row.qt.sqrrq}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="申请人">
                <template slot-scope="scope">
                    <span>{{scope.row.jcxx.xm}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="申请面积">
                <template slot-scope="scope">
                    <span>{{scope.row.nzjdqk.zjdmj}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="联系方式" width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.jcxx.lxdh}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="上报时间">
                <template slot-scope="scope">
                    <span>{{scope.row.qt.sqrrq}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="上报状态" width="185"
                :filters="[{ text: '已上报', value: '3' }, { text: '未上报', value: '4' }]" :filter-method="stateFilter"
                :filter-multiple="false" :filtered-value="acceptanceState" filter-placement="bottom-end">
                <template slot-scope="scope">
                    <span v-if="scope.row.jcxx.secondReport==1">已上报</span>
                    <span v-if="scope.row.jcxx.secondReport!=1">未上报</span>
                </template>
            </el-table-column>
        </el-table>

    </d2-container>
</template>

<script>
    import request from "@/plugin/axios";
    import { PageData, DeleteProcess, BatchReport } from "../../../../api/land.business";
    import dictMixins from "../../mixnis/dict-mixnis";
    import processMixins from "../../mixnis/process-mixnis";
    import pageMixins from "../../mixnis/page-mixnis";
    import { mapState } from "vuex";
    import { clone } from "ol/extent";
    import JSZip from "jszip";
    import FileSaver from "file-saver";
    export default {
        name: "examine-all",
        components: {},
        mixins: [dictMixins, pageMixins, processMixins],
        data() {
            return {
                query_year: "",
                approvalList: [],
                acceptanceList: [],
                approvalQuarter: [],
                acceptanceQuarter: [],
                approvalState: [],
                acceptanceState: [],
                listLoading: false,
                approvalMultipleTable: [], //存放审批上报表格选中值的数组
                acceptanceMultipleTable: [], //存放验收上报表格选中值的数组
                backEndUrl: process.env.VUE_APP_END_URL,
                files: []
            };
        },
        created() {
            this.getTableData();
        },
        computed: {
            ...mapState("d2admin/user", ["info"])
        },
        methods: {
            getTableData() {
                this.listLoading = true;
                //获取表格内数据
                PageData(this.getTableDataParam())
                    .then(res => {
                        let list = res.records || res.list || res.data;
                        let resLists = list.filter(function (item) {
                            return item.zjdSqJl.xmzt == 6 || item.zjdSqJl.xmzt == 9;
                        });
                        let xmbhs = {};
                        let data2 = resLists.reduce((preVal, curVal) => {
                            xmbhs[curVal.jcxx.sqid] ? '' : xmbhs[curVal.jcxx.sqid] = true && preVal.push(curVal);
                            return preVal
                        }, []);
                        this.approvalList = data2.filter(function (item) {
                            return item.zjdSqJl.xmzt == 6;
                        });
                        this.acceptanceList = data2.filter(function (item) {
                            return item.zjdSqJl.xmzt == 9;
                        });
                    })
                    .catch(err => console.log(err))
                    .finally(() => {
                        this.listLoading = false;
                    });
                let nowDate = new Date();
                let month = nowDate.getMonth() + 1;
                if (month <= 3) {
                    this.approvalQuarter = ["1"];
                    this.acceptanceQuarter = ["1"];
                } else if (month <= 6) {
                    this.approvalQuarter = ["2"];
                    this.acceptanceQuarter = ["2"];
                } else if (month <= 9) {
                    this.approvalQuarter = ["3"];
                    this.acceptanceQuarter = ["3"];
                } else if (month <= 12) {
                    this.approvalQuarter = ["4"];
                    this.acceptanceQuarter = ["4"];
                }
            },
            //获取表格数据时的查询参数其他参数
            getTableDataParam() {
                let newQueryForm = Object.assign({});
                if (this.query_year && this.query_year.length > 0) {
                    let start_sqrrq = this.query_year + "-1-1";
                    let end_sqrrq = this.query_year + "-12-31";
                    newQueryForm["kssj"] = start_sqrrq;
                    newQueryForm["jssj"] = end_sqrrq;
                }
                return Object.assign(
                    {
                        pageNum: -1,
                        pageSize: -1
                    },
                    newQueryForm
                );
            },
            resetForm(formName) {
                this.query_year = "";
                this.$refs[formName].resetFields();
                this.getTableData();
            },
            //实现上报功能
            async report() {
                if (this.approvalMultipleTable.length > 0 || this.acceptanceMultipleTable.length > 0) {
                    await BatchReport({firstReportXmbhs:this.approvalMultipleTable,secondReportXmbhs:this.acceptanceMultipleTable}).then(res => {
                        this.getUploadedImages(this.approvalMultipleTable.concat(this.acceptanceMultipleTable)).then(res => {
                            this.$message({
                                type: "success",
                                message: "数据上报成功!"
                            });
                        })
                            .catch(err => console.log(err))
                            .finally(() => {
                                this.createBatchReportDialog = false;
                            });
                    })
                        .catch(err => console.log(err))
                        .finally(() => {
                            this.createBatchReportDialog = false;
                        });
                } else {
                    this.$message({
                        type: "warning",
                        message: "请选择需要进行上报的数据!"
                    });
                }
            },
            //获取图片材料
            async getUploadedImages(xmbhs) {
                this.files = [];
                for (let xmbh of xmbhs) {
                    let res = await this.getFileInfo(xmbh);
                }
                this.downImg();
            },
            //获取文件信息
            getFileInfo(xmbh) {
                return request
                    .get("management/uploadedimages", {
                        params: {
                            xmbh: xmbh,
                            stage: ""
                        }
                    })
                    .then(res => {
                        if (res) {
                            let files = res
                                .map(t => t.files)
                                .reduce((f, s) => [...f, ...s], [])
                                .map(s => s.images)
                                .reduce((f, s) => [...f, ...s], []);
                            let filePath = files.map(
                                k => this.backEndUrl + k.filepath.replace(/\\/g, "/")
                            );
                            let file = {};
                            file.xmbh = xmbh;
                            file.files = files;
                            this.files.push(file);
                        }
                    });
            },
            //****传入图片链接，返回base64数据
            getBase64Image(images, callback) {
                var img = new Image();
                img.setAttribute("crossOrigin", "anonymous");
                var canvas = document.createElement("canvas");
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
                    var dataURL = canvas.toDataURL();//使用canvas获取图片的base64数据
                    callback ? callback(dataURL) : null; //调用回调函数
                }
                img.src = images;
            },
            //下载并打包文件
            downImg() {
                let zip = new JSZip();//声明一个zip压缩包
                var imgArray = [];
                for (let file of this.files) {
                    for (let item of file.files) {
                        imgArray.push(file.xmbh + item.filepath);//循环拿到所有的图片
                    }
                }
                var array = Array.from(new Set(imgArray));
                var len = function (arr) {
                    var l = 0;
                    for (var key in arr) {
                        if (key.indexOf(".png") != -1) {
                            l++;
                        }
                    }
                    return l;
                }
                for (let i = 0; i < array.length; i++) {
                    var index = array[i].indexOf("/");
                    var imgUrl = this.backEndUrl + array[i].substring(index);
                    //对每一个图片链接获取base64的数据，并使用回调函数处理
                    this.getBase64Image(imgUrl, function (dataURL) {
                        //对获取的图片base64数据进行处理
                        var img_arr = dataURL.split(',');
                        zip.file(array[i].substring(0, array[i].lastIndexOf('.')) + ".png", img_arr[1], { base64: true });//根据base64数据在压缩包中生成jpg数据
                        var ziplength = len(zip.files);
                        if (ziplength == array.length) {//当所有图片都已经生成打包并保存zip
                            zip.generateAsync({ type: "blob" }).then(function (content) {
                                let date = new Date();
                                FileSaver.saveAs(
                                    content,
                                    "上报文件" +
                                    date.getFullYear() +
                                    (date.getMonth() + 1) +
                                    date.getDate() +
                                    date.getHours() +
                                    date.getMinutes() +
                                    date.getSeconds() +
                                    ".zip");
                            }, function (err) {//报错处理
                                this.$message({
                                    type: "error",
                                    message: "出现问题，请联系管理员!"
                                });
                            });
                        }
                    });
                }
            },
            //根据季度进行数据筛选
            quarterFilter(value, row) {
                let now = new Date(row.qt.sqrrq);
                if (value == 1) {
                    if (now.getMonth() + 1 <= 3) {
                        return row;
                    }
                } else if (value == 2) {
                    if (now.getMonth() + 1 >= 4 && now.getMonth() + 1 <= 6) {
                        return row;
                    }
                } else if (value == 3) {
                    if (now.getMonth() + 1 >= 7 && now.getMonth() + 1 <= 9) {
                        return row;
                    }
                } else if (value == 4) {
                    if (now.getMonth() + 1 >= 10 && now.getMonth() + 1 <= 12) {
                        return row;
                    }
                }
            },
            //根据不同状态进行数据筛选
            stateFilter(value, row) {
                if (value == 1) {
                    if (row.jcxx.firstReport == 1) {
                        return row;
                    }
                } else if (value == 2) {
                    if (row.jcxx.firstReport != 1) {
                        return row;
                    }
                } else if (value == 3) {
                    if (row.jcxx.secondReport == 1) {
                        return row;
                    }
                } else if (value == 4) {
                    if (row.jcxx.secondReport != 1) {
                        return row;
                    }
                }
            },
            approvalHandleSelectionChange(val) {
                this.approvalMultipleTable = Array.from(
                    new Set(
                        val.filter(function (item) {
                            return item.jcxx.firstReport != 1;
                        }).map(function (item, index, arr) {
                            return item.jcxx.sqid;
                        })
                    )
                );
            },
            acceptanceHandleSelectionChange(val) {
                this.acceptanceMultipleTable = Array.from(
                    new Set(
                        val.filter(function (item) {
                            return item.jcxx.secondReport != 1;
                        }).map(function (item, index, arr) {
                            return item.jcxx.sqid;
                        })
                    )
                );
            }
        }
    };
</script>

<style scoped>
    .el-divider {
        margin-top: 40px;
    }

    .el-divider__text {
        color: #2f74ff;
    }
</style>