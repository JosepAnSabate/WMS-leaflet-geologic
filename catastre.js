
	var map = L.map('map').setView( [40.965, -5.004], 16);
		
	var pnoa = L.tileLayer.wms("http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?", {
	   layers: "Catastro",//nombre de la capa (ver get capabilities)
	   format: 'image/jpeg',
	   transparent: true,
	   version: '1.1.1',//wms version (ver get capabilities)
	   attribution: "DIRECCION GENERAL DEL CATASTRO"
	}).addTo(map);


	var source = L.WMS.source("http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?", {
		  opacity: 0.1,
	});
	source.getLayer("PARCELA").addTo(map);
		