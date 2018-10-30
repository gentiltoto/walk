export function flip() {
  const monument = document.getElementById("flip-card-front");
  const map = document.getElementById("flip-card-back");
  const flip = document.getElementById("flip-card");

  flip.addEventListener('click', function() {
    flip.classList.toggle('do-flip');

  })
}
