import { getRoute } from "../lib/mapbox-direction"
import { map, eventListener } from "../lib/mapbox"
// Coordoonéees rentrée en durs


const mape = map(gon.coordonees, gon.ids);


mape.on('load', function() {
  getRoute(mape, gon.coordonees);
});
// argument = ID des monuments dans la data base.


eventListener(gon.ids);
