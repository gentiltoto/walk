// function map(inp, offset0, offset1) {
//   mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A'
//   var map = new mapboxgl.Map({
//     container: 'map-explics',

//     center: [inp[0] - offset0, inp[1] - offset1],
//     style: 'mapbox://styles/mapbox/light-v9',
//     zoom: 10
//   });

// // // Création de marker sous forme de div      TO DO : retoucher aux marker pour les rendre plus sexy
//   return map
// }


// map([gon.city.lat], 0, 0)
// map([gon.city.longitude, gon.city.latitude], 0, 0)
import Typed from 'typed.js';

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



function loadDynamicBannerText() {
  new Typed('.banner-typed-text', {
    strings: ["Comment devenir un seetyseur ?"],
    typeSpeed: 70,
    loop: false
  });
}

loadDynamicBannerText()
