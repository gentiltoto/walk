import { autocomplete } from "../lib/autocomplete.js"

const villes = ["Lille", "Orléans", "Olivet", "Rueil-Malmaison", "Cap town", "Levallois-Perret"]
autocomplete(document.getElementById("myInput"), villes);
