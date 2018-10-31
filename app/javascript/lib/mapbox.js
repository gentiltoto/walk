//Fonction qui affiche la map dans la div "map".
export function map(inp) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A'

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/basic-v9',
    center: inp,
    zoom: 12
  });

  return map;
}


//Fonction qui affiche un marker dans la map.
export function marker(map, inp) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A'
  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(inp)
    .addTo(map);
}
