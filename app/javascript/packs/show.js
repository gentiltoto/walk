function googleMap() {
  const bouton = document.getElementById("export")
  bouton.addEventListener("click", (event) => {
    const names = gon.monumentsOrdonne
    let nameorigin = gon.monumentsOrdonne[0][0].name + ' ' + gon.itineraire.name
    const origin = gon.monumentsOrdonne.shift()
    const name = names.map(element => `${element[0].name} ${gon.itineraire.name}`);
    const nameinform = name.join('%7C')

    if (gon.pointDepart) {
      nameorigin = gon.pointDepart.address
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${nameorigin}&destination=${nameorigin}&waypoints=${nameinform}&travelmode=walking`

    window.open(url)
    })
}

googleMap();
