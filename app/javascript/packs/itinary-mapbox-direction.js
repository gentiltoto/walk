import { getRoute } from "../lib/mapbox-direction"
import { map } from "../lib/mapbox"
// Coordoonéees rentrée en durs

const mape = map([[3.0565, 50.6302],[3.1565, 50.6302],[3.1565, 50.5302]]);
mape.on('load', function() {
  getRoute(mape, [[3.0565, 50.6302],[3.1565, 50.6302],[3.1565, 50.5302]]);
});
