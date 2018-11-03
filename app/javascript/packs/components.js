function map(inp, offset0, offset1) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A'
  var map = new mapboxgl.Map({
    container: 'map',

    center: [inp[0][0] - offset0, inp[0][1] - offset1],
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 15
  });

// // Création de marker sous forme de div      TO DO : retoucher aux marker pour les rendre plus sexy
//
  inp.forEach((coord, index) => {
    let el = document.createElement('div');
    el.id = `marker-${index}`; // L'ID du marker devra être celui du monument dans la DATABASE
    el.classList.add("marker");
    new mapboxgl.Marker(el)
      .setLngLat(coord)
      .addTo(map)
  })

  return map
}

let mapObject;

if ($(window).width() < 992) {
  mapObject = map([[3.063333, 50.637222]], 0, 0.002);
} else {
  mapObject = map([[3.063333, 50.637222]], 0.007, 0);
}

$(window).resize(function(event) {
  if ($(window).width() < 992) {
    mapObject = map([[3.063333, 50.637222]], 0, 0.002);
  } else {
    mapObject = map([[3.063333, 50.637222]], 0.007, 0);
  }
});
