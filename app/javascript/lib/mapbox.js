//Fonction qui affiche la map dans la div "map".
//Array d'array de coordonnée, pour centrer la carte comme il le faut.

export function map(inp) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A'
  var map = new mapboxgl.Map({
    container: 'map-final',

  // center au milieu de la france, pour un petit effet par la suite
    center: [2.918381, 47.026351],
    style: 'mapbox://styles/mapbox/basic-v9',
    zoom: 12
  });

  // Réduit inp en une seule géoloc puis centre la carte sur cette localisation
  var bounds = inp.reduce(function(bounds, coord) {
    return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(inp[0], inp[0]));

  map.fitBounds(bounds, {
      padding: 50
  });

// Création de marker sous forme de div      TO DO : retoucher aux marker pour les rendre plus sexy

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

// Fonction qui affiche un recap lorsqu'on clic sur des markers. id = array des ID des monuments dans la DB affichés sur la map
export function eventListener(ids) {
// Mise en place des events listener sur les recaps
  ids.forEach((id) => {
    document.getElementById(`marker-${id}`).addEventListener("click", () => {
      document.getElementById(`recap-monument-${id}`).style.bottom = "0px";
    });
  });
// Faire rentrer tous les recap lorsqu'on clic sur la croix (= repositionner tous les recap à - 1000)
  document.querySelectorAll(".close-under-map").forEach((e) => {
    e.addEventListener("click", () => {
      document.querySelectorAll(".under-map").forEach((e) => {
        e.style.bottom = "-1000px";
      });
    });
  });

// Affiche la fiche établissement lorsque le bouton dans le recap est utilisé
  // Mise en place des events listener sur les boutons fiche
  ids.forEach((id) => {
    document.getElementById(`btn-fiche-${id}`).addEventListener("click", () => {
      document.getElementById(`fiche-monument-${id}`).style.bottom = "0px";
    });
  });

// Rabaisse toutes les fiches
  document.querySelectorAll(".close-fiche-monument").forEach((e) => {
    e.addEventListener("click", () => {
      document.querySelectorAll(".fiche-final").forEach((e) => {
        e.style.bottom = "-1000px";
      })
      document.querySelectorAll(".under-map").forEach((e) => {
        e.style.bottom = "-1000px";
      })
    });
  });
}


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







