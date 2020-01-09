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


//访问天地图网站的序号
var siteindex = Math.round(Math.random() * 7);

//天地图密钥
var key = "2868fd4f1f241116060a59a1897f2daf";

//天地图影像底图图层
var img_wLayer = new TileLayer({
    source: new XYZ({
        url: "https://t" + siteindex + ".tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" + key
    }),
    name: '天地图影像底图'
    ,
    zindex: 1
});

//谷歌地图影像底图图层
var img_wLayer_g = new TileLayer({
    source: new XYZ({
        url: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
    }),
    name: '谷歌地图影像底图'
    ,
    zindex: 1
});



var vec_wLayer = new TileLayer({
    source: new XYZ({
        url: "https://t" + siteindex + ".tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=" + key
    }),
    name: '天地图矢量底图'
    ,
    zindex: 1
});

var ter_wLayer = new TileLayer({
    source: new XYZ({
        url: "https://t" + siteindex + ".tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=" + key
    }),
    name: '天地图地形底图'
    ,
    zindex: 1
});

//天地图影像注记图层
var cia_wLayer = new TileLayer({
    source: new XYZ({
        url: "https://t" + siteindex + ".tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=" + key
    }),
    name: '天地图影像注记'
    ,
    zindex: 2
});

var geoserverURL = 'http://101.91.199.54:8060/geoserver/';

var geoserver = geoserverURL + 'TDLYXZ/ows?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application%2Fjson';
var dkserver = geoserverURL + 'TDLYXZ/wms';

export default {
    img_wLayer,
    vec_wLayer,
    ter_wLayer,
    cia_wLayer,
    img_wLayer_g,

    geoserverURL,
    geoserver,
    dkserver,

    BaseAddTruePoints,
    AddZD,
    BaseInitMap,
    BaseOverlay,
    BaseRegionStyle,
    BaseDKStyle,
    BaseAddLayer,
    BaseChangeRegionVector,
    BaseChangeRegionVectorWithPoints,
    BaseAddPoints,
    BaseCreateRegionVectorFromServer,
    endWith,
    startWith


}

function BaseInitMap(div) {
    if (div === undefined)
        div = "map";
    var map = new Map({
        target: div,
        layers: [
        ],
        view: new View({
            center: [0, 0],
            zoom: 10
        })
    });
    //$('#' + div).css("background-color", "#00161F");
    return map;
}

function BaseOverlay(map, div, positioning) {
    if (positioning === undefined)
        positioning = "center-left";
    var overlay = new Overlay({
        element: document.getElementById(div),
        positioning: positioning
    });
    map.addOverlay(overlay);
    return overlay;
}

function BaseRegionStyle() {
    //行政区边界图层样式
    var regionStyle = new Style({
        fill: new Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(255, 255, 255, 0)'
        }),
        stroke: new Stroke({ //边界样式
            color: 'rgba(30,144,255, 1)',
            width: 2
        }),
        text: new Text({ //文本样式
            font: '14px 微软雅黑',
            scale: 1,
            fill: new Fill({ //矢量图层填充颜色，以及透明度
                color: 'rgba(255, 255, 255, 1)'
            }),
            stroke: new Stroke({
                color: '#1b1c1d',
                width: 3
            })
        })
    });
    return regionStyle;
}

function BaseDKStyle() {
    var regionStyle = new Style({
        fill: new Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(0, 0, 255, 0.6)'
        }),
        stroke: new Stroke({ //边界样式
            color: 'rgba(	0,0,255, 1)',
            width: 2
        }),
        text: new Text({ //文本样式
            font: '14px 微软雅黑',
            scale: 1,
            fill: new Fill({ //矢量图层填充颜色，以及透明度
                color: 'rgba(255, 255, 255, 1)'
            }),
            stroke: new Stroke({
                color: '#1b1c1d',
                width: 3
            })
        })
    });
    return regionStyle;
}

function BaseAddLayer(map, url, params) {
    var currentDK = new TileLayer({
        mType: 4,
        source: new TileWMS({
            url: url,
            params: params,
            serverType: 'geoserver'
        })
        ,
        zindex: 3
    });

    map.addLayer(currentDK);
    return currentDK;
}

function BaseCreateRegionVectorFromServer(xzqhdm) {
    var sjqy = '&typeName=TDLYXZ:SJXZQ';
    var xjqy = '&typeName=TDLYXZ:XZQ';
    var cjqy = '&typeName=TDLYXZ:CJDCQ';
    var finalurl = '';
    if (xzqhdm.length === 2) {//省级，加载所有市
        finalurl = geoserver + sjqy + "&CQL_FILTER=ADCODE99 LIKE %27" + xzqhdm + "%25%27";
    }
    else if (xzqhdm.length === 6) {//县级，加载整个县的所有镇
        finalurl = geoserver + xjqy;
    }
    else if (xzqhdm.length === 9) {//乡镇级，加载该乡镇的所有村
        finalurl = geoserver + cjqy + "&CQL_FILTER=ZLDWDM LIKE %27" + xzqhdm + "%25%27";
    }
    else {//村级，加载一个村
        finalurl = geoserver + cjqy + "&CQL_FILTER=ZLDWDM LIKE %27" + xzqhdm + "%25%27";
    }
    var regionVector = new VectorLayer({
        source: new VectorSource({
            url: finalurl
            ,
            format: new GeoJSON()

        })
        ,
        style: function (feature, resolution) {
            var name = feature.get('XZQMC');
            if (name === undefined)
                name = feature.get('ZLDWMC');
            if (name === undefined)
                name = feature.get('LAST_NAME9');
            var style = BaseRegionStyle();
            style.getText().setText(name);
            //style.setText(name);
            return style;
        }
        ,
        zindex: 9
    });
    return regionVector;
}

function BaseChangeRegionVectorWithPoints(map, xzqhdm, currentRegionLayer) {
    map.removeLayer(currentRegionLayer);//移除当前界线图层
    currentRegionLayer = BaseCreateRegionVectorFromServer(xzqhdm);//创建新的图层

    currentRegionLayer.getSource().on('change', function (evt) {
        var source = evt.target;//图层矢量数据是异步加载的，所以要在事件里做缩放
        if (source.getState() === 'ready') {
            map.values_.view.fit(source.getExtent());//自动缩放
            map.addLayer(AddPoints(source.getExtent()));
        }
    });
    map.addLayer(currentRegionLayer);//加载图层
}


function AddZD(map) {
    var vecLayer = new VectorLayer({
        source: new VectorSource({
            url: geoserver + "&typeName=TDLYXZ:ZD",
            format: new GeoJSON()
        })
    });
    map.addLayer(vecLayer);

    vecLayer.getSource().on("change", function (evt) {
        var source = evt.target; //图层矢量数据是异步加载的，所以要在事件里做缩放
        if (source.getState() === "ready") {
            //map.values_.view.fit(source.getExtent()); //自动缩放
        }
    });
}


function BaseAddPoints(map, xzqhdm, currentRegionLayer) {
    //map.removeLayer(currentRegionLayer);//移除当前界线图层
    currentRegionLayer = BaseCreateRegionVectorFromServer(xzqhdm);//创建新的图层

    currentRegionLayer.getSource().on('change', function (evt) {
        var source = evt.target;//图层矢量数据是异步加载的，所以要在事件里做缩放
        if (source.getState() === 'ready') {
            map.values_.view.fit(source.getExtent());//自动缩放
            map.addLayer(AddPoints(source.getExtent()));
        }
    });
    map.addLayer(currentRegionLayer);//加载图层
}

function BaseAddTruePoints(map, color) {
    if (color == undefined)
        color = "#3399CC";
    var vecLayer = new VectorLayer({
        source: new VectorSource({
            url: geoserver + "&typeName=TDLYXZ:ZD",
            format: new GeoJSON()
        })
    });
    var clusters = null;
    vecLayer.getSource().on('change', function (evt) {

        var source = evt.target;//图层矢量数据是异步加载的，所以要在事件里做缩放
        if (source.getState() === 'ready') {
            var features = source.getFeatures();
            var features1 = new Array(features.length);
            for (var i = 0; i < features.length; i++) {
                var coord = getCenter(features[i].getGeometry().getExtent());
                features1[i] = new Feature(new Point(coord));
            }
            var source = new VectorSource({
                features: features1
            });

            var clusterSource = new Cluster({
                //distance: parseInt(distance.value, 10),
                distance: 50,
                source: source
            });

            var styleCache = {};
            clusters = new VectorLayer({
                source: clusterSource,
                style: function (feature) {
                    var size = feature.get("features").length;
                    var style = styleCache[size];
                    if (!style) {
                        style = new Style({
                            image: new CircleStyle({
                                radius: 10,
                                stroke: new Stroke({
                                    color: "#fff"
                                }),
                                fill: new Fill({
                                    color: color
                                })
                            }),
                            text: new Text({
                                text: size.toString(),
                                fill: new Fill({
                                    color: "#fff"
                                })
                            })
                        });
                        styleCache[size] = style;
                    }
                    return style;
                }
            });
            map.addLayer(clusters);
            vecLayer.setVisible(false);
        }
    });
    map.addLayer(vecLayer);//加载图层

}


function BaseChangeRegionVector(map, xzqhdm, currentRegionLayer) {
    map.removeLayer(currentRegionLayer);//移除当前界线图层
    currentRegionLayer = BaseCreateRegionVectorFromServer(xzqhdm);//创建新的图层

    currentRegionLayer.getSource().on('change', function (evt) {
        var source = evt.target;//图层矢量数据是异步加载的，所以要在事件里做缩放
        if (source.getState() === 'ready') {
            map.values_.view.fit(source.getExtent());//自动缩放
        }
    });
    map.addLayer(currentRegionLayer);//加载图层
    return currentRegionLayer;
}

function endWith(str) {
    if (str === null || str === "" || this.length === 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) === str)
        return true;
    else
        return false;
};

function startWith(str) {
    if (str === null || str === "" || this.length === 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) === str)
        return true;
    else
        return false;
};

function AddPoints(extent) {
    var center = getCenter(extent);
    var count = 500;
    var features = new Array(count);
    for (var i = 0; i < count; ++i) {
        var coordinates = [
            center[0] + (Math.random() * 4000),
            center[1] + (Math.random() * 4000)
        ];
        features[i] = new Feature(new Point(coordinates));
    }

    var source = new VectorSource({
        features: features
    });

    var clusterSource = new Cluster({
        //distance: parseInt(distance.value, 10),
        distance: 50,
        source: source
    });

    var styleCache = {};
    var clusters = new VectorLayer({
        source: clusterSource,
        style: function (feature) {
            var size = feature.get("features").length;
            var style = styleCache[size];
            if (!style) {
                style = new Style({
                    image: new CircleStyle({
                        radius: 10,
                        stroke: new Stroke({
                            color: "#fff"
                        }),
                        fill: new Fill({
                            color: "#3399CC"
                        })
                    }),
                    text: new Text({
                        text: size.toString(),
                        fill: new Fill({
                            color: "#fff"
                        })
                    })
                });
                styleCache[size] = style;
            }
            return style;
        }
    });

    return clusters;
}