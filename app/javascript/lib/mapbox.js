//Fonction qui affiche la map dans la div "map".
//Array d'array de coordonnée, pour centrer la carte comme il le faut.
export function map(coord, ids) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A'
  var map = new mapboxgl.Map({
    container: 'map-final',

  // center au milieu de la france, pour un petit effet par la suite
    center: [2.918381, 47.026351],
    style: 'mapbox://styles/mapbox/basic-v9',
    zoom: 12
  });

  // Réduit inp en une seule géoloc puis centre la carte sur cette localisation
  var bounds = coord.reduce(function(bounds, coord) {
    return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coord[0], coord[0]));

  map.fitBounds(bounds, {
      padding: 50
  });

// Création de marker sous forme de div      TO DO : retoucher aux marker pour les rendre plus sexy

  ids.forEach((id, index) => {
    let el = document.createElement('div');
    el.id = `marker-id-${id}`; // L'ID du marker devra être celui du monument dans la DATABASE
    el.classList.add("marker");
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
  //afficher le mini recap
    document.getElementById(`marker-id-${id}`).addEventListener("click", () => {
      document.querySelectorAll(".minirecap").forEach((miniRecap) => {
        miniRecap.style.display = "none";
      });
      document.querySelectorAll(".card-recap-final").forEach((cardRecap) => {
        cardRecap.style.display = "none";
      });
      document.getElementById(`minirecap-${id}`).style.display = "block"
    });
    //afficher le recap
    document.getElementById(`open-id-${id}`).addEventListener("click", () => {
      document.getElementById(`recap-final-${id}`).style.display = "block";
        let found = monuments.find((e) => { return e.id === id });
        let flyToObject;
          if ($(window).width() < 992) {
            flyToObject = [formatCoord(found)[0], formatCoord(found)[1]];
          } else {
            flyToObject = [formatCoord(found)[0], formatCoord(found)[1]];
          }
          map.flyTo({
                center: flyToObject
          });

        $("[id*='marker-']").removeClass("marker-focus").addClass("marker");
        $(`#marker-${id}`).removeClass("marker").addClass("marker-focus");
    });
    // Faire rentrer recap + mini recap lorsqu'on clic sur le chevron down
    document.querySelectorAll(".fa-chevron-circle-down").forEach((e) => {
      e.addEventListener("click", () => {
        document.getElementById(`minirecap-${id}`).style.display = "none";
        document.getElementById(`recap-final-${id}`).style.display = "none";
      });
    });
  });
};

  // Affiche la fiche établissement lorsque le bouton dans le recap est utilisé
  // Mise en place des events listener sur les boutons fiche
//   ids.forEach((id) => {
//     document.getElementById(`btn-fiche-${id}`).addEventListener("click", () => {
//       document.getElementById(`fiche-monument-${id}`).style.bottom = "0px";
//     });
//   });

// // Rabaisse toutes les fiches
//   document.querySelectorAll(".close-fiche-monument").forEach((e) => {
//     e.addEventListener("click", () => {
//       document.querySelectorAll(".fiche-final").forEach((e) => {
//         e.style.bottom = "-1000px";
//       })
//       document.querySelectorAll(".under-map").forEach((e) => {
//         e.style.bottom = "-1000px";
//       })
//     });
//   });
// }


//Fonction qui affiche un marker dans la map. CETTE FONCTION A ETE IMPLEMENTE DANS MAP
// export function marker(map, inp) {
//   mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A'
//   // create a HTML element for each feature
//   var el = document.createElement('div');
//   el.className = 'marker';

//   // make a marker for each feature and add to the map
//   new mapboxgl.Marker(el)
//     .setLngLat(inp)
//     .addTo(map);
// }







