<template>
    <div class="wrap-middle">
        <div class="version-select">
            <p class="current-version">当前版本：{{regionName}}</p>
            修改版本：
            <el-select v-model="code" @change="changeData" style="width:150px">
                <el-option v-for="(item,index) in options" :value="item.code" :label="item.name" :key="index">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    import jsonFileHandler from "@/libs/util.jsonfile.js"
    import util from '@/libs/util.js'
    export default {
        name: 'DataChange',
        inject: ['reload'],
        data() {
            return {
                code: "",
                options: [],
                regionName: ""
            }
        },
        created() {
            this.code = util.cookies.get('regionCode') || ''
            if (!this.code) {
                this.code = "46",
                    util.cookies.set('regionCode', '46')
            }
            this.getOptions()
        },
        methods: {
            getOptions() {
                jsonFileHandler.getAllData('/test-data/dataRegions.json')
                    .then(data => {
                        this.options = data.data.map(t => { return { code: t.code, name: t.name, dataRegion: t.dataRegion } })
                        this.regionName = this.options.find(t => t.code === this.code).name
                    })
            },
            changeData(currentValue) {
                this.code = currentValue
                util.cookies.set('regionCode', currentValue)
                let dataRegion = this.options.find(t => t.code === this.code).dataRegion
                util.cookies.set('dataRegion', dataRegion)
                this.reload();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wrap-middle {
        height: 100%;
        background: #FFF;
        font-size: 15px;
    }

    .current-version {
        margin-bottom: 20px;
    }

    .version-select {
        position: relative;
        top: 5%;
        left: 5%;
        letter-spacing: 1px;
    }
</style>