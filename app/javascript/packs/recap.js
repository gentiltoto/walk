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

function formatCoord(monument) {
  let coord = [parseFloat(monument.longitude), parseFloat(monument.latitude)];
  return coord
}

function formatCoordAll(monuments) {
  let coords = [];
  for (let i = 0; i < monuments.length; i += 1) {
    coords.push([parseFloat(monuments[i].longitude), parseFloat(monuments[i].latitude)])
  }
  return coords
}

function formatIdAll(monuments) {
  let ids = [];
  for (let i = 0; i < monuments.length; i += 1) {
    ids.push(monuments[i].id)
  }
  return ids
}

function addMarkers(inp, ids, map) {
  let markers = [];
  inp.forEach((coord, index) => {
    let el = document.createElement('div');
    el.id = `marker-${ids[index]}`;
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
let compteur = gon.monuments[0].id;
let index = 0;
const gonMonuments = gon.monuments;

if ($(window).width() < 992) {
  console.log(formatCoordAll(gonMonuments));
  mapObject = map(formatCoordAll(gonMonuments), 0, 0.002);
  markersObject = addMarkers(formatCoordAll(gonMonuments), formatIdAll(gonMonuments), mapObject);
  console.log(markersObject);
} else {
  mapObject = map(formatCoordAll(gonMonuments), 0.007, 0);
  markersObject = addMarkers(formatCoordAll(gonMonuments), formatIdAll(gonMonuments), mapObject);
  console.log(markersObject);
}

gonMonuments.forEach((mon) => {
  $(`#ball-${mon.id}`).click((event) => {
    // Get the id
    let regex = /\d+/;
    let idBall = parseInt(event.currentTarget.id.match(regex)[0]);

    // Changer la carte avec transition
    if (compteur !== idBall) {
      $(`#monument-${compteur}`).removeClass("animating transition in fly right");
      $(`#monument-${compteur}`).addClass("animating transition out fly left");
      $(`#monument-${idBall}`).removeClass("animating transition out fly left");
      $(`#monument-${idBall}`).addClass("animating transition in fly right");
      compteur = idBall;
    }

    // Changer le marker

    // FlyTo la destination
    let found = gonMonuments.find((e) => { return e.id === idBall });
    let flyToObject;
    if ($(window).width() < 992) {
      flyToObject = [formatCoord(found)[0], formatCoord(found)[1] - 0.009];
    } else {
      flyToObject = [formatCoord(found)[0] - 0.007, formatCoord(found)[1]];
    }
    mapObject.flyTo({
          center: flyToObject
      });

  });
});

// Event on arrows
$(".img-arrow-right").click((event) => {
  $(`#monument-${compteur}`).removeClass("animating transition in fly right left");
  $(`#monument-${compteur}`).addClass("animating transition out fly left");
  if (index === gonMonuments.length - 1) {
    index = 0;
  } else {
    index += 1;
  }
  compteur = gonMonuments[index].id;
  $(`#monument-${compteur}`).removeClass("animating transition out fly left right");
  $(`#monument-${compteur}`).addClass("animating transition in fly right");
});
$(".img-arrow-left").click((event) => {
  $(`#monument-${compteur}`).removeClass("animating transition in fly left right");
  $(`#monument-${compteur}`).addClass("animating transition out fly right");
  if (index === 0) {
    index = gonMonuments.length - 1;
  } else {
    index -= 1    
  }
  compteur = gonMonuments[index].id;
  $(`#monument-${compteur}`).removeClass("animating transition out fly right left");
  $(`#monument-${compteur}`).addClass("animating transition in fly left");
});
