function map(inp, offset0, offset1) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A'
  var map = new mapboxgl.Map({
    container: 'map',

    center: [inp[0] - offset0, inp[1] - offset1],
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 15
  });

// // Création de marker sous forme de div      TO DO : retoucher aux marker pour les rendre plus sexy
  return map
}

function addMarker(inp, map) {
  let el = document.createElement('div');
  el.id = `marker-0`;
  el.classList.add("marker");
  let marker = new mapboxgl.Marker(el)
    .setLngLat(inp)
    .addTo(map)
  return marker
}

function appendToDOM(nb) {
  const imageDiv = $(".monument-image-div");
  const nameDiv = $(".monument-name");

  imageDiv.html("");
  nameDiv.html("");
  imageDiv.append(`<img class="monument-image-new" src="${gonMonuments[nb].photo.url}">`);
  nameDiv.append(`${gonMonuments[nb].name}`)
}

function formatCoord(nb) {
  let coord = [parseFloat(gonMonuments[nb].longitude), parseFloat(gonMonuments[nb].latitude)];
  return coord
}

function defineNewMarker(nb, map, marker) {
  markerObject.remove()
  markerObject = addMarker(formatCoord(nb), mapObject);
  let flyToObject;
  if ($(window).width() < 992) {
    flyToObject = [formatCoord(nb)[0], formatCoord(nb)[1] - 0.002];
  } else {
    flyToObject = [formatCoord(nb)[0] - 0.007, formatCoord(nb)[1]];
  }
  mapObject.flyTo({
        center: flyToObject
    });
}

let mapObject;
let markerObject;
let compteur = 0;
const gonMonuments = gon.monuments;

if ($(window).width() < 992) {
  mapObject = map(formatCoord(compteur), 0, 0.002);
  markerObject = addMarker(formatCoord(compteur), mapObject);
} else {
  mapObject = map(formatCoord(compteur), 0.007, 0);
  markerObject = addMarker(formatCoord(compteur), mapObject);
}

// Validate buttons handlers
const choiceNo = $(".choice-no").click((event) => {
  compteur += 1;
  appendToDOM(compteur);
  defineNewMarker(compteur, mapObject, markerObject);
});
const choiceYes = $(".choice-yes").click((event) => {
  console.log("POST");
  compteur += 1;
  appendToDOM(compteur);
  defineNewMarker(compteur, mapObject, markerObject);
});


// Resize handler
$(window).resize(function(event) {
  if ($(window).width() < 992) {
    mapObject = map(formatCoord(compteur), 0, 0.002);
    markerObject = addMarker(formatCoord(compteur), mapObject);
  } else {
    mapObject = map(formatCoord(compteur), 0.007, 0);
    markerObject = addMarker(formatCoord(compteur), mapObject);
  }
});
