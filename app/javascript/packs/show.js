function googleMap() {
  const bouton = document.getElementById("export")
  bouton.addEventListener("click", (event) => {
    const names = gon.monumentsOrdonne
    const nameorigin = gon.monumentsOrdonne[0][0].name
    const origin = gon.monumentsOrdonne.shift()
    const name = names.map(element => `${element[0].name}`);
    const nameinform = name.join('%7C')

    const url = `https://www.google.com/maps/dir/?api=1&origin=${nameorigin}&destination=${nameorigin}&waypoints=${nameinform}&travelmode=walking`

    window.open(url)
    })
}

googleMap()
