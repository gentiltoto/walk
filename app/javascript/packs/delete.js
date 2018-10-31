function deleteCroix () {
  // Get the gon variable
  const itineraire = gon.itineraire
  //get the card to delete
  const deletecard = document.querySelector(".fiche-delete")
  // get the button delete
  const boutondelete = document.querySelector(".far");
  // récupérer l'id du monument lié au delete

  // add an event listener to the button
  boutondelete.addEventListener("click", (event) => {
    Rails.ajax({
      type: "DELETE",
      url: `/synthese/${itineraire.id}/${itineraire.monument.id}`,
      success: function() { console.log("bouyahhh!"); },
      error: function() { console.log("bouuuh!"); }
    });

  });


  // accéder au compteur
  // decrémenter le compteur d'1


}

deleteCroix();


