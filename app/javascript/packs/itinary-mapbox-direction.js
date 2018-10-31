import { getRoute } from "../lib/mapbox-direction"
import { map } from "../lib/mapbox"

const mape = map([3.0565, 50.6302])
mape.on('load', function() {
  getRoute(mape, [[3.0565, 50.6302],[3.1565, 50.6302],[3.1565, 50.5302]]);
});
