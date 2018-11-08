//Fonction qui affiche la map dans la div "map".
//Array d'array de coordonnée, pour centrer la carte comme il le faut.
export function map(coord, ids, padding) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A'
  var map = new mapboxgl.Map({
    container: 'map-final',

  // center au milieu de la france, pour un petit effet par la suite
    center: [2.918381, 47.026351],
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 15,
    pitch: 40
  });

  // Réduit inp en une seule géoloc puis centre la carte sur cette localisation
  var bounds = coord.reduce(function(bounds, coord) {
    return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coord[0], coord[0]));

  map.fitBounds(bounds, {
      padding: padding
  });

// Création de marker sous forme de div      TO DO : retoucher aux marker pour les rendre plus sexy

  ids.forEach((id, index) => {
    let el = document.createElement('div');
    el.id = `marker-id-${id}`; // L'ID du marker devra être celui du monument dans la DATABASE
    el.classList.add("marker-app");
    new mapboxgl.Marker(el)
      .setLngLat(coord[index])
      .addTo(map)
  })
  return map
};


function formatCoord(monument) {
  let coord = [parseFloat(monument.longitude), parseFloat(monument.latitude)];
  return coord
};



// Fonction qui affiche un recap lorsqu'on clic sur des markers. id = array des ID des monuments dans la DB affichés sur la map
export function eventListener(ids, map) {
  // Mise en place des events listener sur les markers pour afficher un mini recap
  var monuments = gon.monuments
  ids.forEach((id) => {

    $(`#marker-id-${id}`).click((event) => {
      // Si mobile
      if ($(window).width() < 992) {
        $(`.container-minirecap`).css("z-index", "1");
        $(`#${id}`).css("z-index", "601");
        $(`#${id}`).removeClass("transition visible animating out scale");
        $(`#${id}`).addClass("transition visible animating in scale");
        $(`#open-id-${id}`).click((event) => {
          $(`#${id}`).css("z-index", "1");
          $(`#${id}`).removeClass("transition visible animating in scale");
          $(`#${id}`).addClass("transition visible animating out scale");
          $(`#monument-${id}`).css("z-index", "300");
          $(`#monument-${id}`).removeClass("transition visible animating out scale");
          $(`#monument-${id}`).addClass("transition visible animating in scale");
        });
      } else {
        $(`#monument-${id}`).css("z-index", "300");
        $(`#monument-${id}`).removeClass("transition visible animating out scale");
        $(`#monument-${id}`).addClass("transition visible animating in scale");
      }

      // Plus d'infos listener
      $(`#plus-info-${id}`).click((event) => {
        // Remove the card classic
        $(`#monument-${id}`).removeClass("transition visible animating in scale fly right left");
        $(`#monument-${id}`).addClass("transition visible animating out scale");

        // Add the card info
        $(`#monument-info-${id}`).css("z-index", "900")
        $(`#monument-info-${id}`).removeClass("transition visible animating out scale");
        $(`#monument-info-${id}`).addClass("transition visible animating in scale");
      });

      $(`#delete-info-${id}`).click((event) => {
        // Remove the card info
        $(`#monument-info-${id}`).css("z-index", "0")
        $(`#monument-info-${id}`).removeClass("transition visible animating in scale");
        $(`#monument-info-${id}`).addClass("transition visible animating out scale");

        // Add the card classic
        $(`#monument-${id}`).removeClass("transition visible animating out scale");
        $(`#monument-${id}`).addClass("transition visible animating in scale");
        });

      // Nouvel event pour fermer la fiche
      $(`#close-info-${id}`).click((event) => {
        $(`#monument-${id}`).css("z-index", "1");
        $(`#monument-${id}`).removeClass("transition visible animating in scale");
        $(`#monument-${id}`).addClass("transition visible animating out scale");
      });

      let found = monuments.find((e) => { return e.id === id });
      let flyToObject;
      if ($(window).width() < 992) {
        flyToObject = [formatCoord(found)[0], formatCoord(found)[1] - 0.002];
      } else {
        flyToObject = [formatCoord(found)[0] - 0.007, formatCoord(found)[1]];
      }
      map.flyTo({
            center: flyToObject,
            zoom: 15
      });

      $("[id*='marker-']").removeClass("marker-focus").addClass("marker");
      $(`#marker-id-${id}`).removeClass("marker").addClass("marker-focus");
    });
  });
};
