L.mapbox.accessToken = 'pk.eyJ1IjoiaS1vd24tZG9nZSIsImEiOiJja2tzcjRhZmcwYXQ3MzBydTRhZm5meDZkIn0.G9AJgv513kOkd46cJXNCvA';
var map = L.mapbox.map('map')
    .setView([50, 50], 2)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'));


for(var toCountry in coordPairs) {
  var color = "#" + Math.floor(Math.random()*16777215).toString(16);
  var config = coordPairs[toCountry];

  for(var fromCountry in config) {
    var pairConfig = config[fromCountry];
    var toLangFull = langsAndCountries[pairConfig.toLang].full;
    var fromLangFull = langsAndCountries[pairConfig.fromLang].full;
    var it_says = fromLangFull + ' might say: it is all ' + toLangFull + ' to me!';
    var generator = new arc.GreatCircle(pairConfig.from, pairConfig.to, { name: it_says });
    var line = generator.Arc(100, { offset: 10 });
    L.geoJson(line.json(), {
      style: {
        color: color,
        opacity: 0.7,
        weight: 2
      }
    }).bindPopup(function (layer) {
      return layer.feature.properties.name;
    }).addTo(map);
  }
}
