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

map([1.978410, 46.077757], 0, 0)
