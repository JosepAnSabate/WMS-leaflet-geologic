const center = [41.82045, 1.54907];
const crs25831 = new L.Proj.CRS('EPSG:25831','+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
{
resolutions: [1100, 550, 275, 100, 50, 25, 10, 5, 2, 1, 0.5, 0.25]
}
);

let map = new L.map('map', {
    //layers: [geologic],
    crs: crs25831,
    continuousWorld: true,
    worldCopyJump: false,
    center: center,
    zoom: 5,
});

// ICGC GET CAPABILITIES:   https://geoserveis.icgc.cat/arcgis/services/geologic/icgc_mg50m/MapServer/WMSServer?request=GetCapabilities&service=WMS
// WMS function from wms.js
const geologic = new L.TileLayer.WMS("https://geoserveis.icgc.cat/arcgis/services/geologic/icgc_mg50m/MapServer/WMSServer?", {
layers: 'UGEO_PA',
format: 'image/png',
crs: crs25831,
transparent: true,
continuousWorld: true,
version: '1.3.0',
attribution: 'Institut Cartogràfic i Geològic de Catalunya',
}).addTo(map);




// Perform 'GetFeatureInfo' request.
map.on('click', function(e) {
    geologic.getFeatureInfo({
      latlng: e.latlng,
      done: function(featureCollection) {
      console.log('getFeatureInfosucceed: ', featureCollection);
      console.log(featureCollection.features[0].properties);
      console.log(featureCollection.features[0].properties.DESCRIPCIO)
      let codi = featureCollection.features[0].properties.CODI_CAS;
      let clasLito = featureCollection.features[0].properties.ClasLitoEd;
      let descripcio = featureCollection.features[0].properties.DESCRIPCIO;
      let epoca = featureCollection.features[0].properties.EPOCA;
      let era = featureCollection.features[0].properties.ERA;
      let periode = featureCollection.features[0].properties.PERIODE;
      $('.geologicDescription').html(`
      
      <table class="table">
      <tbody>
        <tr>
          <th scope="row">Codi:</th>
          <td class="leftTabEl">${codi}</td>
        </tr>
        <tr>
          <th scope="row">Classificació litològica: </th>
          <td class="leftTabEl">${clasLito}</td>
        </tr>
        <tr>
        <th scope="row">Descripció: </th>
        <td class="leftTabEl">${descripcio}</td>
      </tr>
      <tr>
        <th scope="row">Classificació litològica: </th>
        <td class="leftTabEl">${clasLito}</td>
      </tr>
      <tr>
      <th scope="row">Època: </th>
      <td class="leftTabEl">${epoca}</td>
    </tr>
    <tr>
        <th scope="row">Era: </th>
        <td class="leftTabEl">${era}</td>
      </tr>
      <tr>
      <th scope="row">Període: </th>
      <td class="leftTabEl">${periode}</td>
    </tr>


      </tbody>
      </table>
      `)
    },
    fail: function(errorThrown) {
      console.log('getFeatureInfo failed: ', errorThrown);
    },
    always: function() {
        console.log('getFeatureInfo finished');
    }
    });
  });


  // Perform 'GetCapabilities' request.
geologic.getCapabilities({
    done: function(capabilities) {
    console.log('getCapabilitiessucceed: ', capabilities);
    },
    fail: function(errorThrown) {
    console.log('getCapabilitiesfailed: ', errorThrown);
    },
    always: function() {
    console.log('getCapabilitiesfinished');
    }
  });