import { getRoute } from "../lib/mapbox-direction"
import { map, eventListener } from "../lib/mapbox"
import { monumentsToCoords} from "../lib/coord"
// Coordoonéees rentrée en durs
console.log(monumentsToCoords(gon.monumentsOrdonne));
console.log(gon.idsOrdonee);

let mape;
if ($(window).width() < 992) {
  mape = map(monumentsToCoords(gon.monumentsOrdonne), gon.idsOrdonee, {top: 100, bottom: 200, left: 25, right: 25});
} else {
  mape = map(monumentsToCoords(gon.monumentsOrdonne), gon.idsOrdonee, {top: 0, bottom: 100, left: 150, right: 0});
}

mape.on('load', function() {
  getRoute(mape, gon.coordonees);
});
// argument = ID des monuments dans la data base.

mape.on("drag", function (e) {
  $("[id*='marker-']").removeClass("marker-focus").addClass("marker");
  $(".container-minirecap").removeClass("transition visible animating in scale");
  $(".container-minirecap").removeClass("transition visible animating out scale");
  $(".container-minirecap").css("z-index", "1"),
  $(".card").removeClass("transition visible animating in scale");
  $(".card").removeClass("transition visible animating out scale");
});


eventListener(gon.idsOrdonee, mape);

function addMarker(inp, map) {
  let el = document.createElement('div');
  el.id = `marker-perso`;
  el.classList.add("marker-perso");
  let marker = new mapboxgl.Marker(el)
    .setLngLat(inp)
    .addTo(map)
  return marker
}

/////// LOGIQUE POINT DE DEPART \\\\\\\\

// Si point de départ
if ((gon.coordonees.length - gon.monuments.length) === 2) {
  let el = document.createElement('div');
  el.id = `marker-point-depart`;
  el.classList.add("marker-point-depart");
  let marker = new mapboxgl.Marker(el)
    .setLngLat(gon.coordonees[0])
    .addTo(mape)
}


/////// LOGIQUE COORDONNEES GPS PERSO \\\\\\\\
let coordPerso;

navigator.geolocation.getCurrentPosition(function(position) {
  coordPerso = [position.coords.longitude, position.coords.latitude]
  addMarker(coordPerso, mape);
  $("#marker-perso").removeClass("marker");
});

function geoSuccess(position) {
  coordPerso = [position.coords.longitude, position.coords.latitude]
  $("#marker-perso").remove()
  addMarker(coordPerso, mape);
  $("#marker-perso").removeClass("marker");
}
function geoError() {
  setTimeout(function() { $("#no-geoloc").css("margin-right", "0"); }, 5000);
  setTimeout(function() { $("#no-geoloc").css("margin-right", "-350px"); }, 10000);
}

var watchPosition = navigator.geolocation.watchPosition(
  geoSuccess,
  geoError,
  {enableHighAccuracy: true, maximumAge: 30000, timeout: 27000}
);

$("#center-perso").click((event) => {
  let flyToObject;
  // Test if coordPerso defined
  if (coordPerso) {
    if ($(window).width() < 992) {
      flyToObject = [coordPerso[0], coordPerso[1] - 0.002];
    } else {
      flyToObject = [coordPerso[0] - 0.007, coordPerso[1]];
    }
    mape.flyTo({
          center: flyToObject,
          zoom: 15
    });
  } else {
    $("#no-geoloc").css("margin-right", "0");
    setTimeout(function() { $("#no-geoloc").css("margin-right", "-350px"); }, 10000);
  }

});
