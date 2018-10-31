function validateButtons() {
  // Get the gon variable
  const itineraire = gon.itineraire
  // Get the card of monument
  const card = document.querySelector(".nom-test");

  // Get the no-more card
  const noMore = document.querySelector(".no-more");
  // Get the link of the card
  const linkFetch = document.querySelector(".link-fetch")
  // Get the map in the back
  const mapBack = document.querySelector("#flip-card-back")

  // Initialize the compteur
  let compteur = gon.itineraire.compteur;
  let monument = itineraire.monuments[compteur];

  // TO-DO: Replace the h1 by the true card
  card.insertAdjacentHTML("beforeend", `${monument.name}`);
  mapBack.insertAdjacentHTML("beforeend", `<img src="https://api.mapbox.com/styles/v1/mapbox/light-v9/static/pin-s-marker+285A98(${monument.latitude},${monument.longitude})/${monument.latitude},${monument.longitude},11,0,0/360x220@2x?access_token=pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A" alt="monument" class= "map-image"><i class="fas fa-image" id="flip-card-button"></i>`);

  const yesButton = document.querySelector('.validate-yes');
  const noButton = document.querySelector('.validate-no');

  yesButton.addEventListener("click", (event) => {
    // Generate the POST request to add the monuments to the itineraire
    Rails.ajax({
      type: "POST",
      url: `/vos-monuments/${itineraire.id}/${itineraire.monuments[compteur].id}`,
      data: `compteur=${compteur}`,
      success: function() { console.log("Réussi boy!"); },
      error: function() { console.log("Shit!"); }
    });

    // If no button is clicked, increase the compteur
    compteur += 1;

    // Test if there is still monuments left to display
    if (compteur > gon.itineraire.monuments.length - 1) {
      // Clear the HTML of the precedent name
      card.innerHTML = "";
      // Remove the card
      document.querySelector(".active").style.display = "none";
      // Display the card no-more
      noMore.style.display = "block";
    } else {
      // Reassign the name
      let monument = itineraire.monuments[compteur];
      // Clear the HTML of the precedent name
      card.innerHTML = "";
      // Add the new name
      card.insertAdjacentHTML("beforeend", `${monument.name}`);
      // Set the new map
      mapBack.innerHTML = "";
      mapBack.insertAdjacentHTML("beforeend", `<img src="https://api.mapbox.com/styles/v1/mapbox/light-v9/static/pin-s-marker+285A98(${monument.latitude},${monument.longitude})/${monument.latitude},${monument.longitude},11,0,0/360x220@2x?access_token=pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A" alt="monument" class= "map-image"><i class="fas fa-image" id="flip-card-button"></i>`);
    }
  });

  noButton.addEventListener("click", (event) => {
    // If no button is clicked, increase the compteur
    compteur += 1;

    // Test if there is still monuments left to display
    if (compteur > gon.itineraire.monuments.length - 1) {
      // Clear the HTML of the precedent name
      card.innerHTML = "";
      // Remove the card
      document.querySelector(".active").style.display = "none";
      // Display the card no-more
      noMore.style.display = "block";
    } else {
      // Reassign the name
      let monument = itineraire.monuments[compteur];
      // Clear the HTML of the precedent name
      card.innerHTML = "";
      // Add the new name
      card.insertAdjacentHTML("beforeend", `${monument.name}`);
      // Set the new map
      mapBack.innerHTML = "";
      mapBack.insertAdjacentHTML("beforeend", `<img src="https://api.mapbox.com/styles/v1/mapbox/light-v9/static/pin-s-marker+285A98(${monument.latitude},${monument.longitude})/${monument.latitude},${monument.longitude},11,0,0/360x220@2x?access_token=pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A" alt="monument" class= "map-image"><i class="fas fa-image" id="flip-card-button"></i>`);
    }
  });

  linkFetch.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.reload();
  });
}

validateButtons();
