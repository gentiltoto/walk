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
        'line-width': 2
      }
    });
    // Création des marker pour les étapes
  steps.forEach((step, index) => {
    map.addLayer({
      id: `step ${index}`,
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: steps[index]
          }
        }
      }
    });
  })
  // récupération des data sur la route en question (distance en mettre + temps en seconde) (5km/h pour la marche)
  var distance = data.routes[0].distance
  var duration = data.routes[0].duration
  });
}
