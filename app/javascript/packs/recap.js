function map(inp, offset0, offset1) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A'
  var map = new mapboxgl.Map({
    container: 'map',

    center: [inp[0][0] - offset0, inp[0][1] - offset1],
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 12
  });

  var bounds = inp.reduce(function(bounds, coord) {
    return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(inp[0], inp[0]));
  console.log(bounds);
  map.fitBounds(bounds, {
      padding: {top: 100, bottom: 300, left: 50, right: 50}
  });

// // Création de marker sous forme de div      TO DO : retoucher aux marker pour les rendre plus sexy
  return map
}

function formatCoord(nb) {
  let coord = [parseFloat(gonMonuments[nb].longitude), parseFloat(gonMonuments[nb].latitude)];
  return coord
}

function formatCoordAll(monuments) {
  let coords = [];
  for (let i = 0; i < monuments.length; i += 1) {
    coords.push([parseFloat(monuments[i].longitude), parseFloat(monuments[i].latitude)])
  }
  return coords
}

function addMarkers(inp, map) {
  let markers = [];
  inp.forEach((coord, index) => {
    let el = document.createElement('div');
    el.id = `marker-${index}`;
    el.classList.add("marker");
    let marker = new mapboxgl.Marker(el)
      .setLngLat(coord)
      .addTo(map);
    markers.push(marker);
  })
  return markers
}

let mapObject;
let markersObject;
let compteur = 0;
const gonMonuments = gon.monuments;

if ($(window).width() < 992) {
  console.log(formatCoordAll(gonMonuments));
  mapObject = map(formatCoordAll(gonMonuments), 0, 0.002);
  markersObject = addMarkers(formatCoordAll(gonMonuments), mapObject);
  console.log(markersObject);
} else {
  mapObject = map(formatCoordAll(gonMonuments), 0.007, 0);
  markersObject = addMarkers(formatCoordAll(gonMonuments), mapObject);
  console.log(markersObject);
}
