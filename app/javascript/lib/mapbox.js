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

// Création de marker sous forme de div TO DO : retoucher aux marker pour les rendre plus sexy
var miniFiche = '<div> TEST <div>'; // TO DO : implémentation de la récupération de la fiche
inp.forEach((coord, index) => {
  let el = document.createElement('div');
  el.id = `marker${index}`;
  el.classList.add("marker");
  el.addEventListener("click", () => {
  map = document.getElementById('map-final');
  map.insertAdjacentHTML('afterend',miniFiche);
})
  new mapboxgl.Marker(el)
    .setLngLat(coord)
    .addTo(map);
})




// retourne une map, pour pouvoir l'utiliser sur un itinéraire par la suite
  return map;
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









