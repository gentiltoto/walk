function modifyDOM(monument) {
  // Get the card of monument
  let card = document.querySelector(".container-texte");
  // Get the picture on the front
  let picFront = document.querySelector("#flip-card-front");
  // Get the map in the back
  let mapBack = document.querySelector("#flip-card-back");

  // Clear the HTML of the precedent name
  card.innerHTML = "";
  picFront.innerHTML = "";
  mapBack.innerHTML = "";

  card.insertAdjacentHTML("beforeend", `
  <h2>${monument.name}</h2>
  <p>Stars Yelp</p>
  <p>${monument.description}</p>
  <h3>Horaires d'ouverture</h3>
  <p></p>
  <h3>Avis</h3>
  <p>Super j'ai adoré</p>
  <p>magnifiik surtout quand il fait beau</p>
  `);

  picFront.insertAdjacentHTML("beforeend", `
  <img src="${monument.photo.url}" alt="monument" class="monument-image"><i class="fas fa-map-marked-alt" id="flip-card-button"></i>
  `);

  mapBack.insertAdjacentHTML("beforeend", `<img src="https://api.mapbox.com/styles/v1/mapbox/light-v9/static/pin-s-marker+285A98(${monument.longitude},${monument.latitude})/${monument.longitude},${monument.latitude},11,0,0/360x220@2x?access_token=pk.eyJ1IjoiaGVucmk0NSIsImEiOiJjam52bjV4anAwYjc2M3ZxdHd5NjlpbGc5In0.jNKjBZ2d3T4G7qzcmRb77A" alt="monument" class= "map-image"><i class="fas fa-image" id="flip-card-button"></i>`);
}



function validateButtons() {
  // Get the gon variable
  const itineraire = gon.itineraire
  
  // Get the no-more card
  const noMore = document.querySelector(".no-more");
  // Get the link of the card
  const linkFetch = document.querySelector(".link-fetch")
  

  // Initialize the compteur
  let compteur = gon.itineraire.compteur;
  let monument = gon.monuments[compteur];

  modifyDOM(monument);

  const yesButton = document.querySelector('.validate-yes');
  const noButton = document.querySelector('.validate-no');

  yesButton.addEventListener("click", (event) => {
    // Generate the POST request to add the monuments to the itineraire
    console.log(itineraire);
    console.log(monument);
    Rails.ajax({
      type: "POST",
      url: `/vos-monuments/${itineraire.id}/${monument.id}`,
      data: `compteur=${compteur}`,
      success: function() { console.log("Réussi boy!"); },
      error: function() { console.log("Shit!"); }
    });

    // If no button is clicked, increase the compteur
    compteur += 1;

    // Test if there is still monuments left to display
    if (compteur > gon.monuments.length - 1) {
      let card = document.querySelector(".container-texte");
      // Clear the HTML of the precedent name
      card.innerHTML = "";
      // Remove the card
      document.querySelector(".active").style.display = "none";
      // Display the card no-more
      noMore.style.display = "block";
    } else {
      // Reassign the name
      monument = gon.monuments[compteur];

      modifyDOM(monument);
    }
  });

  noButton.addEventListener("click", (event) => {
    // If no button is clicked, increase the compteur
    compteur += 1;

    // Test if there is still monuments left to display
    if (compteur > gon.monuments.length - 1) {
      let card = document.querySelector(".container-texte");
      // Clear the HTML of the precedent name
      card.innerHTML = "";
      // Remove the card
      document.querySelector(".active").style.display = "none";
      // Display the card no-more
      noMore.style.display = "block";
    } else {
      // Reassign the name
      monument = gon.monuments[compteur];
      
      modifyDOM(monument);
    }
  });

  linkFetch.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.reload();
  });
}

validateButtons();
