function validateButtons() {

  const itineraire = gon.itineraire
  const card = document.querySelector(".card-test");
  let compteur = gon.itineraire.compteur;
  let monument = itineraire.monuments[compteur];
  // TO-DO: Replace the h1 by the true card
  card.insertAdjacentHTML("beforeend", `<h1>${monument.name}</h1>`);

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

    // Test if there is stille monuments left to display
    if (compteur > gon.itineraire.monuments.length - 1) {
      // Clear the HTML of the precedent name
      card.innerHTML = "";
      // Display the fact that there is no more monuments
      card.insertAdjacentHTML("beforeend", `<h1>No more Monuments !</h1>`);
    } else {
      // Reassign the name
      let monument = itineraire.monuments[compteur];
      // Clear the HTML of the precedent name
      card.innerHTML = "";
      // Add the new name
      card.insertAdjacentHTML("beforeend", `<h1>${monument.name}</h1>`);
    }
  });

  noButton.addEventListener("click", (event) => {
    // If no button is clicked, increase the compteur
    compteur += 1;

    // Test if there is stille monuments left to display
    if (compteur > gon.itineraire.monuments.length - 1) {
      // Clear the HTML of the precedent name
      card.innerHTML = "";
      // Display the fact that there is no more monuments
      card.insertAdjacentHTML("beforeend", `<h1>No more Monuments !</h1>`);
    } else {
      // Reassign the name
      let monument = itineraire.monuments[compteur];
      // Clear the HTML of the precedent name
      card.innerHTML = "";
      // Add the new name
      card.insertAdjacentHTML("beforeend", `<h1>${monument.name}</h1>`);
    }

  });

}

export { validateButtons };
