mapboxgl.accessToken = 'pk.eyJ1IjoiaS1vd24tZG9nZSIsImEiOiJja2tzcjRhZmcwYXQ3MzBydTRhZm5meDZkIn0.G9AJgv513kOkd46cJXNCvA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [50, 50],
  zoom: 2
});

function getRandomValue() {
  return Math.floor(Math.random() * 255);
}
function getRandomColor() {
  return "rgb(" + getRandomValue() + ", " + getRandomValue() + ", " + getRandomValue() + ")";
}

map.on('load', function() {
  var arcLayers = {};
  var pointLayers = {};

  function hideOtherLayers(layerName) {
    for(var otherLayer in arcLayers) {
      if(layerName != otherLayer) {
        map.setLayoutProperty(otherLayer, 'visibility', 'none');
        map.setLayoutProperty(otherLayer + '_point', 'visibility', 'none');
      }
    }
  }

  function showAllLayers() {
    for(var otherLayer in arcLayers) {
      map.setLayoutProperty(otherLayer, 'visibility', 'visible');
      map.setLayoutProperty(otherLayer + '_point', 'visibility', 'visible');
    }
  }

  for(var toCountry in coordPairs) {
    var color = getRandomColor();
    var config = coordPairs[toCountry];
  
    var arcFeatures = [];
    var fromCount = 0;
    var toLangs = {};
    for(var fromCountry in config) {
      var pairConfig = config[fromCountry];
      var toLangFull = langsAndCountries[pairConfig.toLang].full;
      var fromLangFull = langsAndCountries[pairConfig.fromLang].full;
      var it_says = '<b>' + fromLangFull + '</b> might say: it is all <b>' + toLangFull + '</b> to me!';
      var generator = new arc.GreatCircle(pairConfig.from, pairConfig.to, { name: it_says, identifier: toCountry });
      var line = generator.Arc(100, { offset: 10 });
      arcFeatures.push(line.json());
      fromCount ++;

      if(!toLangs[toLangFull]) {
        toLangs[toLangFull] = [];
      }
      toLangs[toLangFull].push('<b>' + fromLangFull + '</b>');
    }

    map.addSource(toCountry, {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': arcFeatures
      }
    });

    var ptSourceName = toCountry + '_point';

    var summary = [];
    for(var toLang in toLangs) {
      summary.push(toLangs[toLang].join(', ') + ' might say: it is all <b>' + toLang + '</b> to me!');
    }
    map.addSource(ptSourceName, {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [
            contryCoords[toCountry].x,
            contryCoords[toCountry].y
          ]},
          'properties': {
            fromCount: fromCount,
            identifier: toCountry,
            summary: summary.join('<br>')
          }
        }]
      }
    });
    
    var arcLayer = map.addLayer({
      'id': toCountry,
      type: 'line',
      'source': toCountry,
      'paint': {
        'line-color': color,
        'line-opacity': 0.7,
        'line-width': 2
      }
    });

    var pointLayer = map.addLayer({
      'id': ptSourceName,
      type: 'circle',
      'source': ptSourceName,
      'paint': {
        'circle-color': color,
        'circle-stroke-color': color,
        'circle-radius': fromCount * 3,
        'circle-opacity': 0.5
      }
    });

    arcLayers[toCountry] = arcLayer;
    pointLayers[toCountry] = pointLayer;

    map.on('click', toCountry, function (e) {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.name)
        .addTo(map);
    });

    map.on('click', ptSourceName, function (e) {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.summary)
        .addTo(map);
    });

    map.on('mouseenter', toCountry, function (e) {
      map.getCanvas().style.cursor = 'pointer';
      hideOtherLayers(e.features[0].properties.identifier);
    });
      
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', toCountry, function () {
      map.getCanvas().style.cursor = '';
      showAllLayers();
    });

    map.on('mouseenter', ptSourceName, function (e) {
      map.getCanvas().style.cursor = 'pointer';
      hideOtherLayers(e.features[0].properties.identifier);
    });
      
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', ptSourceName, function () {
      map.getCanvas().style.cursor = '';
      showAllLayers();
    });
  }
});
