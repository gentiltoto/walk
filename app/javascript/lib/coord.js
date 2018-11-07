export function monumentsToCoords (monuments) {
  var coords = [];
  monuments.forEach(monument => {
    let coord = [];
    coord.push(parseFloat(monument[0].longitude));
    coord.push(parseFloat(monument[0].latitude));
    coords.push(coord);
  });
  return coords
}
