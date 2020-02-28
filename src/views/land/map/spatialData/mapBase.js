import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import GeoJSON from "ol/format/GeoJSON";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import { XYZ, TileWMS, Cluster, ImageWMS } from "ol/source";
import { Overlay, Feature } from "ol";
import VectorSource from "ol/source/Vector";
import { getCenter, getBottomLeft } from "ol/extent";
import Point from "ol/geom/Point";
import { defaults as defaultControls, Control } from 'ol/control';
import ImageLayer from "ol/layer/Image";

import request from 'axios'


//访问天地图网站的序号
var siteindex = Math.round(Math.random() * 7);

//天地图密钥
var key = "2868fd4f1f241116060a59a1897f2daf";

//天地图影像底图图层
var img_wLayer = new TileLayer({
    source: new XYZ({
        url: "https://t" + siteindex + ".tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" + key
    }),
    name: '天地图影像底图',
    maxZoom: 20
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

var geoserverURL = '';

var geoserver = '';


var geoserverConfig = [];

export default {
    img_wLayer,
    vec_wLayer,
    ter_wLayer,
    cia_wLayer,
    img_wLayer_g,

    key,

    geoserverURL,
    geoserver,

    InitGeoServer,
    geoserverConfig,

    BaseInitLayer,
    BaseCreateXZDCCGLayer,
    BaseCreateGTKJGHLayer,
    BaseCreateNFJSFBLayer,
    BaseCreateCZGHLayer,
    BaseCreateSingleZDLayer,

    BaseCJYX,
    BaseAddTruePoints,
    AddZD,
    BaseInitMap,
    BaseOverlay,
    BaseRegionStyle,
    BaseDKStyle,
    BaseAddLayer,
    BaseChangeRegionVector,
    BaseCreateRegionVectorFromServer,
    endWith,
    startWith,
}

async function InitGeoServer(code) {
    var res = await request.get("/test-data/geoRegions.json");

    geoserverConfig = res.data.find(t => t["code"] === code);
    geoserverURL = geoserverConfig.geoserverURL;
    geoserver = geoserverURL + 'TDLYXZ/ows?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application%2Fjson';

    // console.log(geoserverURL);
}

function BaseInitMap(div) {
    if (div === undefined)
        div = "map";
    var map = new Map({
        target: div,
        controls: defaultControls({ zoom: false }),
        attribution: false,
        layers: [
        ],
        view: new View({
            center: [0, 0],
            zoom: 7,
            projection: "EPSG:4326"
        }),
        //controls: defaults({ attribution: false, zoom: false, rotate: false })
    });
    //$('#' + div).css("background-color", "#00161F");
    return map;
}

function BaseCJYX() {
    //村级影像底图
    var img_CJYXLayer = new TileLayer({
        source: new TileWMS({
            url: geoserverURL + "TDLYXZ/wms",
            params: {
                'FORMAT': 'image/png',
                'VERSION': '1.1.1',
                tiled: true,
                "LAYERS": 'TDLYXZ:Puqian',
                "exceptions": 'application/vnd.ogc.se_inimage'
            },
        }),
        name: '东坡村影像底图'
        ,
        zindex: 1
    });
    return img_CJYXLayer;
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
    //  console.log(geoserver);
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

//切换行政区划图层
function BaseChangeRegionVector(map, xzqhdm, currentRegionLayer, zoomtolayer = true, zoomlevel = -1) {
    if (currentRegionLayer)
        map.removeLayer(currentRegionLayer);//移除当前界线图层
    currentRegionLayer = BaseCreateRegionVectorFromServer(xzqhdm);//创建新的图层
    currentRegionLayer.getSource().on('change', function (evt) {
        var source = evt.target;//图层矢量数据是异步加载的，所以要在事件里做缩放
        if (source.getState() === 'ready') {
            if (zoomtolayer)
                map.getView().fit(source.getExtent());//自动缩放
            if (zoomlevel != -1) {
                map.getView().setZoom(zoomlevel);
            }
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


function BaseInitLayer(map, currentlayer, LayerName, filter, xzqhdm, xzqhlevel) {
    if (currentlayer)
        map.removeLayer(currentlayer);
    if (xzqhlevel) {
        xzqhdm = geoserverConfig.regions.find(t => t["level"] === xzqhlevel).code;
    }
    var layer = null;
    if (LayerName == "XZDCCG") {
        layer = BaseCreateXZDCCGLayer(filter);
    } else if (LayerName == "GTKJGH") {
        layer = BaseCreateGTKJGHLayer(filter, xzqhdm);
    } else if (LayerName == "CZGH") {
        layer = BaseCreateCZGHLayer(filter, xzqhdm);
    } else if (LayerName == "NFJSFB") {
        layer = BaseCreateNFJSFBLayer();
    } else if (LayerName == "XZQ") {
        layer = BaseChangeRegionVector(map, xzqhdm);
        return layer;
    } else if (LayerName == "DT") {
        layer = img_wLayer;
    } else if (LayerName == "CJYX") {
        layer = BaseCJYX();
    }
    if (layer)
        map.addLayer(layer);
    return layer;
};



function BaseCreateXZDCCGLayer(filter) {
    var params = {
        LAYERS: "TDLYXZ:ZD",
        QUERY_LAYERS: "TDLYXZ:ZD"
    };
    if (filter) {
        params.CQL_FILTER = "DCQK" + filter;
    }
    var currentlayer = new TileLayer({
        source: new TileWMS({
            url: geoserverURL + "TDLYXZ/wms",
            params: params,
            serverType: "geoserver",
            VERSION: "1.1.1"
        }),
        zIndex: 20
    });
    return currentlayer;
};

function BaseCreateGTKJGHLayer(filter, xzqhdm) {
    var params = {
        LAYERS: "TDLYXZ:DLTB",
        QUERY_LAYERS: "TDLYXZ:DLTB"
    };
    if (filter && xzqhdm) {
        params.CQL_FILTER = "QSDWDM LIKE '" +
            xzqhdm +
            "%'" +
            " AND DLBM" +
            filter;
    }
    else if (xzqhdm) {
        params.CQL_FILTER = "QSDWDM LIKE '" +
            xzqhdm +
            "%'";
    }
    else if (filter) {
        params.CQL_FILTER =
            "DLBM" +
            filter;
    }
    var wmsLayer = new TileLayer({
        source: new TileWMS({
            url: geoserverURL + "TDLYXZ/wms",
            params: params,
            serverType: "geoserver",
            VERSION: "1.1.1"
        }),
        zIndex: 19
    });
    return wmsLayer;
};
//村庄规划
function BaseCreateCZGHLayer(filter, xzqhdm) {
    var params = {
        LAYERS: "TDLYXZ:CZGH",
        QUERY_LAYERS: "TDLYXZ:CZGH"
    };
    if (filter && xzqhdm) {
        params.CQL_FILTER = "ZLDWDM LIKE '" +
            xzqhdm +
            "%'" +
            " AND DLMC" +
            filter;
    }
    else if (xzqhdm) {
        params.CQL_FILTER = "ZLDWDM LIKE '" +
            xzqhdm +
            "%'";
    }
    else if (filter) {
        params.CQL_FILTER =
            "DLMC" +
            filter;
    }
    var wmsLayer = new TileLayer({
        source: new TileWMS({
            url: geoserverURL + "TDLYXZ/wms",
            params: params,
            serverType: "geoserver",
            VERSION: "1.1.1"
        }),
        zIndex: 19
    });
    return wmsLayer;
};
//农房建设分布（宅基地数据聚合）
function BaseCreateNFJSFBLayer() {
    var color = "#3399CC";
    var styleCache = {};
    var clusters = new VectorLayer({
        source: new Cluster({
            distance: 10,
            geometryFunction: function (features) {
                var coord = getCenter(features.getGeometry().getExtent());
                return new Feature(new Point(coord)).getGeometry();
            },
            source: new VectorSource({
                url: geoserver + "&typeName=TDLYXZ:ZD",
                format: new GeoJSON()
            })
        }),
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
        },
        zIndex: 21
    });
    return clusters;
};

function BaseCreateSingleZDLayer(zddm) {
    var layer = new VectorLayer({
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
    return layer;
}