import { getRoute } from "../lib/mapbox-direction"
import { map, eventListener } from "../lib/mapbox"
import { monumentsToCoords} from "../lib/coord"
// Coordoonéees rentrée en durs
console.log(monumentsToCoords(gon.monumentsOrdonne));
console.log(gon.idsOrdonee);

let mape;
if ($(window).width() < 992) {
  mape = map(monumentsToCoords(gon.monumentsOrdonne), gon.idsOrdonee, {top: 100, bottom: 200, left: 25, right: 25});
} else {
  mape = map(monumentsToCoords(gon.monumentsOrdonne), gon.idsOrdonee, {top: 0, bottom: 100, left: 150, right: 0});
}

mape.on('load', function() {
  getRoute(mape, gon.coordonees);
});
// argument = ID des monuments dans la data base.

mape.on("drag", function (e) {
  $("[id*='marker-']").removeClass("marker-focus").addClass("marker");
  $(".container-minirecap").removeClass("transition visible animating in scale");
  $(".container-minirecap").removeClass("transition visible animating out scale");
  $(".container-minirecap").css("z-index", "1"),
  document.querySelectorAll(".card").forEach(card => {
    $(".card").removeClass("transition visible animating in scale");
    $(".card").removeClass("transition visible animating out scale");
  });
});


eventListener(gon.idsOrdonee, mape);
