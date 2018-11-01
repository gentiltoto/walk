import { autocomplete } from "../lib/autocomplete.js"

let data = gon.cities
const villes = [];

for (let i = 0; i < data.length; i++) {
  villes.push(data[i].name);
}

autocomplete(document.getElementById("myInput"), villes);
