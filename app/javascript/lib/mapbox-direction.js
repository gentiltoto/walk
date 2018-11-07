// Calcul l'itinéraire des "steps" sur la map "map". steps = array d'array.
export function getRoute(map, steps) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A'
// Initilisation du début de l'URL de l'API.
  let directionsRequestLocations = 'https://api.mapbox.com/directions/v5/mapbox/walking/';
// Ajoue des localisations des étapes.
  steps.forEach((step) =>{
    directionsRequestLocations += step[0] + ',' + step[1] + ';';
  })
// Suppression du ";" en trop sur la dernière localisation + ajoue de la deuxième partie de l'URL de l'API.
  var directionsRequest = directionsRequestLocations.slice(0, directionsRequestLocations.length-1) + '?geometries=geojson&access_token=' + mapboxgl.accessToken;
  $.ajax({
    method: 'GET',
    url: directionsRequest,
  }).done(function(data) {
    var route = data.routes[0].geometry;
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route
        }
      },
      paint: {
        'line-width': 6,
        'line-color': '#66FF66',
        'line-blur': 4
      }
    });

  // récupération des data sur la route en question (distance en metre + temps en seconde) (5km/h pour la marche)
  var distance = Number(Math.round(data.routes[0].distance/1000 + 'e2') + 'e-2') + ' km    '.replace(".", ",");
  var duration = data.routes[0].duration
  if (duration > 3600) {
    duration = Math.trunc(duration/3600) + 'h' + Math.round((duration%3600)/60) + ' mn'
  } else {
    duration = Math.round(duration/60) + ' mn'
  };
  var metricsDistance =
  `<div class="distance-wraper">
  <i class="fas fa-walking"></i>
  <p>${distance}</p>
  </div>`

   var metricsTemps =
  `<div class="time-wraper">
  <i class="far fa-clock"></i>
  <p>${duration}</p>
  </div>`
  document.getElementById('metrics-distance').insertAdjacentHTML('afterbegin', metricsDistance);
  document.getElementById('metrics-distance').insertAdjacentHTML('afterbegin', metricsTemps);
  document.getElementById('metrics-distance').style.display = "initial"
  });
}
