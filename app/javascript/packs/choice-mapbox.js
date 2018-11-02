import { map, marker } from "../lib/mapbox.js"

//Les coordonnéees suivantes sont rentrés en dur en attendant gone + rable rails.
// ATTENTION, il faut rentrer un array d'array dans cette fonction, même s'il y a qu'un seul point.


const gonVariable = gon.monuments;
const coordonees = new Array;

for (let i = 0; i < gonVariable.length; i++) {
  coordonees.push([gonVariable[i]["longitude"], gonVariable[i]["latitude"]])
}

console.log(coordonees);

const mape = map(coordonees);
