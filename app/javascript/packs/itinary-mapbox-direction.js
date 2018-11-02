import { getRoute } from "../lib/mapbox-direction"
import { map, eventListener } from "../lib/mapbox"
// Coordoonéees rentrée en durs

console.log(gon.coordonees);

const mape = map(gon.coordonees);
mape.on('load', function() {
  getRoute(mape, gon.coordonees);
});
// argument = ID des monuments dans la data base.
eventListener([0,1]);
