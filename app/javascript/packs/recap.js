import { transitionOutMobileRight, transitionInMobileRight, transitionOutMobileLeft, transitionInMobileLeft} from "../lib/transition.js"

function map(inp, offset0, offset1, padding) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A'
  var map = new mapboxgl.Map({
    container: 'map',

    center: [inp[0][0] - offset0, inp[0][1] - offset1],
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 11,
    pitch: 40
  });

  var bounds = inp.reduce(function(bounds, coord) {
    return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(inp[0], inp[0]));
  map.fitBounds(bounds, {
      padding: padding
  });
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
    el.classList.add("marker-app");
    let marker = new mapboxgl.Marker(el)
      .setLngLat(coord)
      .addTo(map);
    markers.push(marker);
  })
  return markers
}

function flyToMarker(id, map) {
  // FlyTo la destination
  let found = gonMonuments.find((e) => { return e.id === id });
  let flyToObject;
  if ($(window).width() < 992) {
    flyToObject = [formatCoord(found)[0], formatCoord(found)[1] - 0.002];
  } else {
    flyToObject = [formatCoord(found)[0] - 0.007, formatCoord(found)[1]];
  }
  map.flyTo({
        center: flyToObject,
        zoom: 15,
        speed: 0.5
    });

  $("[id*='marker-']").removeClass("marker-focus").addClass("marker");
  $(`#marker-${id}`).removeClass("marker").addClass("marker-focus");
}

let mapObject;
let markersObject;
let compteur = gon.monuments[0].id;
let index = 0;
let gonMonuments = gon.monuments;
const itineraire = gon.itineraire;

if ($(window).width() < 992) {
  mapObject = map(formatCoordAll(gonMonuments), 0, 0.002, {top: 100, bottom: 300, left: 40, right: 40});
  markersObject = addMarkers(formatCoordAll(gonMonuments), formatIdAll(gonMonuments), mapObject);
} else {
  mapObject = map(formatCoordAll(gonMonuments), 0.007, 0.002, {top: 150, bottom: 300, left: 500, right: 30});
  markersObject = addMarkers(formatCoordAll(gonMonuments), formatIdAll(gonMonuments), mapObject);
}

// Color the first marker
$(`#marker-${compteur}`).removeClass('marker').addClass('marker-focus');
// Color the first ball
// $(`#ball-${compteur}`).addClass("ball-monument-focus");

// Event on ball
// gonMonuments.forEach((mon) => {
//   $(`#ball-${mon.id}`).click((event) => {
//     $("[id*='ball-']").removeClass("ball-monument-focus");
//     event.currentTarget.classList.add('ball-monument-focus');
//     // Get the id
//     let regex = /\d+/;
//     let idBall = parseInt(event.currentTarget.id.match(regex)[0]);
//
//     // Changer la carte avec transition
//     if (compteur !== idBall) {
//       $(`#monument-${compteur}`).removeClass("animating transition in fly right");
//       $(`#monument-${compteur}`).addClass("animating transition out fly left");
//       $(`#monument-${idBall}`).removeClass("animating transition out fly left");
//       $(`#monument-${idBall}`).addClass("animating transition in fly right");
//       compteur = idBall;
//     }
//
//     // Function FlyTo
//     flyToMarker(idBall, mapObject);
//   });
// });

// Event on arrows
$(".img-arrow-right").click((event) => {
  // $("[id*='ball-']").removeClass("ball-monument-focus");
  transitionOutMobileRight(compteur);
  if (index === gonMonuments.length - 1) {
    index = 0;
  } else {
    index += 1;
  }
  compteur = gonMonuments[index].id;
  transitionInMobileRight(compteur);
  // $(`#ball-${compteur}`).addClass("ball-monument-focus");

  flyToMarker(gonMonuments[index].id, mapObject);
});

$(".img-arrow-left").click((event) => {
  // $("[id*='ball-']").removeClass("ball-monument-focus");
  transitionOutMobileLeft(compteur);
  if (index === 0) {
    index = gonMonuments.length - 1;
  } else {
    index -= 1
  }
  compteur = gonMonuments[index].id;
  transitionInMobileLeft(compteur);
  // $(`#ball-${compteur}`).addClass("ball-monument-focus");

  flyToMarker(gonMonuments[index].id, mapObject);
});

// Event on marker
gonMonuments.forEach((mon) => {
  $(`#marker-${mon.id}`).click((envet) => {
    // Get the id
    let regex = /\d+/;
    let idBall = parseInt(event.currentTarget.id.match(regex)[0]);

    // Function FlyTo
    flyToMarker(idBall, mapObject);

    // $("[id*='ball-']").removeClass("ball-monument-focus");
    // $(`#ball-${idBall}`).addClass("ball-monument-focus");

    if (compteur !== idBall) {
      $(`#monument-${compteur}`).removeClass("animating transition in fly right");
      $(`#monument-${compteur}`).addClass("animating transition out fly left");
      $(`#monument-${idBall}`).removeClass("animating transition out fly left");
      $(`#monument-${idBall}`).addClass("animating transition in fly right");
      compteur = idBall;
    }
  });
});

// Button listener
let clicks = 0;
$("#green-choice").click((event) => {
  if (clicks % 2 === 0) {
    $(".choice-made").show();
    $(".green-choice-i").removeClass('far fa-check-circle').addClass('fas fa-times');
    clicks += 1;
  } else {
    $(".choice-made").hide();
    $(".green-choice-i").removeClass('fas fa-times').addClass('far fa-check-circle');
    clicks += 1;
  }
});

// Delete listener
gonMonuments.forEach((mon) => {
  $(`#delete-id-${mon.id}`).click((event) => {
    event.preventDefault();

    Rails.ajax({
      type: "DELETE",
      url: `/vos-monuments/delete/${itineraire.id}/${mon.id}`,
      data: "rien=rien",
      success: function() { console.log("Réussi boy!"); },
      error: function() { console.log("Shit!"); }
    });
    // $(`#ball-${mon.id}`).remove();
    $(`#monument-${mon.id}`).remove();
    $(`#marker-${mon.id}`).remove();
    let indexTmp = gonMonuments.findIndex(function(e) { return e.id === mon.id});
    compteur = 0
    gonMonuments = gonMonuments.filter(function(value, index, arr) {
      return value.id != mon.id
    });

    const idNext = gonMonuments[compteur].id;
    // Display all - monument, ball, marker
    $(`#monument-${idNext}`).removeClass("animating transition out fly left right");
    $(`#monument-${idNext}`).addClass("animating transition in fly right");

    // $("[id*='ball-']").removeClass("ball-monument-focus");
    // $(`#ball-${idNext}`).addClass("ball-monument-focus");

    flyToMarker(idNext, mapObject);
  });
});

// Event Modal
$("#displayGeocoder").click((event) => {
  // Affiche le geocoder
  $(".modal-body").removeClass("modal-pt-body");

  // Changer le boutton pour un ajout
  $('#displayGeocoder').remove();

  $('#addPointDepart').show();
});

// Event on form
$('.form-container').submit((event) => {
  event.preventDefault();
  $('#container-geocode p ').remove();
  console.log(event.currentTarget);
  let query = document.getElementById("myInput").value;
  console.log(query);
  let response;
  Rails.ajax({
    type: 'GET',
    url: '/geocoder',
    data: `query=${query}`,
    success: function(data) {
      console.log(data);
      let inject = "";
      data['results'].forEach((e) => {
        inject += `<p data-lat="${e['data']['geometry']['lat']}" data-lng="${e['data']['geometry']['lng']}">${e['data']['formatted']}</p>`
      });
      $('#container-geocode').append(inject);

      // Event on list
      $('#container-geocode p').click((event) => {
        $('#container-geocode p').removeClass('focus-modal-body');
        event.currentTarget.classList.add('focus-modal-body');
      });

    },
    error: function() { console.log("Shit!"); }
  });
});

// Listen to a focus to submit
$('#addPointDepart').click((event) => {
  if ($('.focus-modal-body').length) {
    console.log("Does the thing");
  } else {
    event.preventDefault();
    $('.form-container').addClass('animating transition shake');
    setTimeout(function(){ $('.form-container').removeClass('animating transition shake'); }, 1000);
  }
});
