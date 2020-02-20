<template>
    <div>
        <div class="wrap-top">
            <el-row type="flex" justify="space-around">
                <el-col :span="1">
                    <div class="grid-content"></div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <input id="yzxj-tab" type="radio" name="tab" v-model="checkedValue" value="1" />
                        <label for="yzxj-tab" class="label-tab"><img v-if="checkedValue==1"
                                :src="`image/examine/jflx_icon_check_1.png`"><img v-else
                                :src="`image/examine/jflx_icon_1.png`"> 原址新建</label>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <input id="gkj-tab" type="radio" name="tab" v-model="checkedValue" value="2" />
                        <label for="gkj-tab" class="label-tab"><img v-if="checkedValue==2"
                                :src="`image/examine/jflx_icon_check_2.png`"><img v-else
                                :src="`image/examine/jflx_icon_2.png`"> 改扩建</label>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <input id="yizxj-tab" type="radio" name="tab" v-model="checkedValue" value="3" />
                        <label for="yizxj-tab" class="label-tab"><img v-if="checkedValue==3"
                                :src="`image/examine/jflx_icon_check_3.png`"><img v-else
                                :src="`image/examine/jflx_icon_3.png`"> 异址新建</label>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <input id="zjdlz-tab" type="radio" name="tab" v-model="checkedValue" value="4" />
                        <label for="zjdlz-tab" class="label-tab"><img v-if="checkedValue==4"
                                :src="`image/examine/jflx_icon_check_4.png`"><img v-else
                                :src="`image/examine/jflx_icon_4.png`"> 宅基地流转</label>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content">
                        <input id="zjdtc-tab" type="radio" name="tab" v-model="checkedValue" value="5" />
                        <label for="zjdtc-tab" class="label-tab"><img v-if="checkedValue==5"
                                :src="`image/examine/jflx_icon_check_5.png`"><img v-else
                                :src="`image/examine/jflx_icon_5.png`"> 宅基地退出</label>
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="grid-content"></div>
                </el-col>
            </el-row>
        </div>

        <div class="wrap-middle">
            <div class="tab-panel" v-if="checkedValue==1">
                <businessTypeOne></businessTypeOne>
            </div>
            <div class="tab-panel" v-if="checkedValue==2">
                <!-- <businessTypeTwo></businessTypeTwo> -->
                <businessTypeOne></businessTypeOne>
            </div>
            <div class="tab-panel" v-if="checkedValue==3">
                <!-- <businessTypeThree></businessTypeThree> -->
                <businessTypeOne></businessTypeOne>
            </div>
            <div class="tab-panel" v-if="checkedValue==4">
                <!-- <businessTypeFour></businessTypeFour> -->
                <businessTypeOne></businessTypeOne>
            </div>
            <div class="tab-panel" v-if="checkedValue==5">
                <!-- <businessTypeFive></businessTypeFive> -->
                <businessTypeOne></businessTypeOne>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            businessTypeOne: () => import('./businessType/businessTypeOne.vue'),
            businessTypeTwo: () => import('./businessType/businessTypeTwo.vue'),
            businessTypeThree: () => import('./businessType/businessTypeThree.vue'),
            businessTypeFour: () => import('./businessType/businessTypeFour.vue'),
            businessTypeFive: () => import('./businessType/businessTypeFive.vue')
        },
        data() {
            return {
                checkedValue: "1"
            };
        }
    };
</script>

<style lang="scss" scoped>
    .el-row {
        margin-right: 0px;
        margin-bottom: 0px;
    }

    .grid-content {
        height: 100px;
        display: flex;
        align-items: center;
        /*定义body的元素垂直居中*/
        justify-content: center;
        /*定义body的里的元素水平居中*/
    }

    .wrap-top {
        height: 100px;
        width: 100%;
        background: #FFF;
        text-align: center;
    }

    .wrap-middle {
        margin-top: 10px;
        height: auto;
        background: #FFF;
    }

    input {
        display: none;
    }

    input:checked+label {
        color: #23709E;
        border: 1px solid #23709E;
        box-shadow: 2px 2px 6px 1px #d0d0d0;
    }

    label:hover {
        cursor: pointer;
        border: 1px solid #23709E;
    }

    .label-tab {
        display: inline-block;
        width: 100%;
        height: 55px;
        line-height: 55px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        font-family: 'Courier New', Courier, monospace;
        border: 1px solid #D5DAE1;
    }

    .fa {
        padding-right: 5px;
    }

    .tab-panel {
        position: absolute;
        padding: 0.25rem 0;
        height: auto;
        width: 100%;
        background: #FFF;
        margin: 0 auto;
    }

    img {
        height: 18px;
        width: 18px;
    }
</style>