import { getRoute } from "../lib/mapbox-direction"
import { map, eventListener } from "../lib/mapbox"
import { monumentsToCoords} from "../lib/coord"
// Coordoonéees rentrée en durs
console.log(monumentsToCoords(gon.monumentsOrdonne))
console.log(gon.idsOrdonee)
const mape = map(monumentsToCoords(gon.monumentsOrdonne), gon.idsOrdonee);

mape.on('load', function() {
  getRoute(mape, gon.coordonees);
});
// argument = ID des monuments dans la data base.

mape.on("drag", function (e) {
  document.querySelectorAll(".container-minirecap").forEach(minirecap => {
    minirecap.style.visibility = "hidden"
  });
  document.querySelectorAll(".card").forEach(card => {
    card.style.visibility = "hidden"
  });
});


eventListener(gon.idsOrdonee, mape);
