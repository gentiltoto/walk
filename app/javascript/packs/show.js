// function googleMap {

//   if (UIApplication.shared.canOpenURL(URL(string:"comgooglemaps://")!)) {
//     UIApplication.shared.openURL(URL(string:
//       "comgooglemaps://?center=40.765819,-73.975866&zoom=14&views=traffic")!)
//   } else {
//     print("Can't use comgooglemaps://");
//   }

// }



console.log('robinetterie')
console.log(gon.coordonees)

function googleMap() {
    console.log('rouleau de sopalin')
    const bouton = document.getElementById("green-choice")
    bouton.addEventListener("click", (event) => {
        console.log("spatule")
        const coords = gon.coordonees
        const origin = gon.coordonees.shift()
        const fin = gon.coordonees.pop()

        const originLatitude = gon.coordonees[0][1]
        const originLongitude = gon.coordonees[0][0]
        const test = coords.map(element => `${element[1]},${element[0]}`);
        const test2 = test.join('|')
        const url = `https://www.google.com/maps/dir/?api=1&origin=${originLatitude},${originLongitude}&destination=${originLatitude},${originLongitude}&waypoints=${test2}`


        window.open(url)
    })
}

googleMap()
