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
const itineraire = gon.itineraire;

if ($(window).width() < 992) {
  mapObject = map(formatCoord(compteur), 0, 0.002);
  markerObject = addMarker(formatCoord(compteur), mapObject);
} else {
  mapObject = map(formatCoord(compteur), 0.007, 0);
  markerObject = addMarker(formatCoord(compteur), mapObject);
}

// Validate buttons handlers
const choiceNo = $(".choice-no").click((event) => {
  console.log($(`#monument-${gonMonuments[compteur].id}`));
  $(`#monument-${gonMonuments[compteur].id}`).transition();
  compteur += 1;
  $(`#monument-${gonMonuments[compteur].id}`).transition('fly up');
  defineNewMarker(compteur, mapObject, markerObject);
});
const choiceYes = $(".choice-yes").click((event) => {
  Rails.ajax({
    type: "POST",
    url: `/vos-monuments/${itineraire.id}/${gonMonuments[compteur].id}`,
    data: `compteur=${compteur}`,
    success: function() { console.log("Réussi boy!"); },
    error: function() { console.log("Shit!"); }
  });
  $(`#monument-${gonMonuments[compteur].id}`).transition('fly right');
  compteur += 1;
  $(`#monument-${gonMonuments[compteur].id}`).transition('fly up');
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


// Button listener
$("#green-choice").click((event) => {
  event.currentTarget.style.right = "-50px";
});

$(document).ready(function(){
    $('#green-choice').transition({
        debug     : true,
        animation : 'jiggle',
        duration  : 500,
        interval  : 200
    });
});
