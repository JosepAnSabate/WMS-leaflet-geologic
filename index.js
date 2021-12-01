const center = [41.82045, 1.54907];
const crs25831 = new L.Proj.CRS('EPSG:25831','+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
{
resolutions: [1100, 550, 275, 100, 50, 25, 10, 5, 2, 1, 0.5, 0.25]
}
);

const serveiTopoCache = L.tileLayer
    .wms("https://geoserveis.icgc.cat/icc_mapesmultibase/utm/wms/service?", {
layers: 'topo',
format: 'image/jpeg',
crs: crs25831,
continuousWorld: true,
attribution: 'Institut Cartogràfic i Geològic de Catalunya',
});

// ICGC GET CAPABILITIES:   https://geoserveis.icgc.cat/arcgis/services/geologic/icgc_mg50m/MapServer/WMSServer?request=GetCapabilities&service=WMS
const serveiOrtoCache = L.tileLayer
    .wms("https://geoserveis.icgc.cat/arcgis/services/geologic/icgc_mg50m/MapServer/WMSServer?", {
layers: 'UGEO_PA',
format: 'image/png',
crs: crs25831,
transparent: true,
continuousWorld: true,
version: '1.3.0',
attribution: 'Institut Cartogràfic i Geològic de Catalunya',
});

const serveitopoGrisCache = L.tileLayer
    .wms("https://geoserveis.icgc.cat/icc_mapesmultibase/utm/wms/service?", {
layers: 'topogris',
format: 'image/jpeg',
crs: crs25831,
continuousWorld: true,
attribution: 'Institut Cartogràfic i Geològic de Catalunya',
});

const serveiortoGrisCache = L.tileLayer
    .wms("https://geoserveis.icgc.cat/icc_mapesmultibase/utm/wms/service?", {
layers: 'ortogris',
format: 'image/jpeg',
crs: crs25831,
continuousWorld: true,
attribution: 'Institut Cartogràfic i Geològic de Catalunya',
});

const wmsComarques = L.tileLayer.wms("https://geoserveis.icgc.cat/icgc_bm5m/wms/service?", {
layers: '20_COMARCA_PC,70_NOMCOMARCA_TX',
format: 'image/png',
crs: crs25831,
transparent: true,
continuousWorld: true,
attribution: 'Base Municipal 1:5.000 - ICGC',
});

let map = L.map('map', {
layers: [serveiTopoCache],
crs: crs25831,
continuousWorld: true,
worldCopyJump: false,
center: center,
zoom: 5,
});

let baseMaps = {
"Topogràfic": serveiTopoCache,
"Topogràfic gris": serveitopoGrisCache,
"Ortofoto": serveiOrtoCache,
"Ortofoto gris": serveiortoGrisCache
};
let overlayMaps = {
"Comarques": wmsComarques
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

