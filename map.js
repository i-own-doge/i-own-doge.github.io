L.mapbox.accessToken = 'pk.eyJ1IjoiaS1vd24tZG9nZSIsImEiOiJja2tzcjRhZmcwYXQ3MzBydTRhZm5meDZkIn0.G9AJgv513kOkd46cJXNCvA';
var map = L.mapbox.map('map')
    .setView([50, 50], 2)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'));


for(var pair in coordPairs) {
  var coords = coordPairs[pair];
  var generator = new arc.GreatCircle(coords.from, coords.to, { name: pair });
  var line = generator.Arc(100, { offset: 10 });
  L.geoJson(line.json(), {
    style: {
      color: "#" + Math.floor(Math.random()*16777215).toString(16),
      weight: 1
    }
  }).addTo(map);
}