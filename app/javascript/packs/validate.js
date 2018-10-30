function validateButtons() {

  const itineraire = gon.itineraire
  const card = document.querySelector(".card-test");
  let compteur = 0;
  let monument = itineraire.monuments[compteur];
  card.insertAdjacentHTML("beforeend", `<h1>${monument.name}</h1>`);

  const yesButton = document.querySelector('.validate-yes');
  const noButton = document.querySelector('.validate-no');

  yesButton.addEventListener("click", (event) => {
    Rails.ajax({
      type: "POST",
      url: `/vos-monuments/${itineraire.id}/${itineraire.monuments[compteur].id}`,
      data: 'first_name=Ricky&last_name=Bobby',
      success: function(data) {
        console.log("AAAAAAAA");
      },
      error: function() { console.log("Shit"); }
    });
    // If no button is clicked, increase the compteur
    compteur += 1;
    // Reassign the name
    let monument = itineraire.monuments[compteur];
    // Clear the HTML of the precedent name
    card.innerHTML = "";
    // Add the new name
    card.insertAdjacentHTML("beforeend", `<h1>${monument.name}</h1>`);
  });

  noButton.addEventListener("click", (event) => {
    // If no button is clicked, increase the compteur
    compteur += 1;
    // Reassign the name
    let monument = itineraire.monuments[compteur];
    // Clear the HTML of the precedent name
    card.innerHTML = "";
    // Add the new name
    card.insertAdjacentHTML("beforeend", `<h1>${monument.name}</h1>`);
  });

}

export { validateButtons };