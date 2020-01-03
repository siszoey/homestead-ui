import {Tile as TileLayer} from 'ol/layer'
import {XYZ} from 'ol/source'

const TdtKey = '281e633b854f5a8bf20548eb1b5e6ae7';//天地图秘钥

export function createTdtXyzLayer(options) {
    let defaultoptions = {
        maxZoom: 18,
        projection: 'EPSG:4326',
        tileSize: 256,
        url: null
    };
    let opts = Object.assign(defaultoptions, options);
    opts.url = opts.url + '&tk=' + TdtKey;
    return new TileLayer({
        source: new XYZ(opts)
    })
}

//天地图底图
export function createTdtImgLayer() {
    let url = 'http://t' + Math.floor(Math.random() * 7) + '.tianditu.com/DataServer?T=img_c&x={x}&y={y}&l={z}';
    return createTdtXyzLayer({url: url})
}

//天地图底图
export function createTdtVecLayer() {
    let url = 'http://t' + Math.floor(Math.random() * 7) + '.tianditu.com/DataServer?T=vec_c&x={x}&y={y}&l={z}';
    return createTdtXyzLayer({url: url})
}

//天地图地点标注
export function createTdtCvaLayer() {
    let url = 'http://t' + Math.floor(Math.random() * 7) + '.tianditu.com/DataServer?T=cva_c&x={x}&y={y}&l={z}';
    return createTdtXyzLayer({url: url})
}
