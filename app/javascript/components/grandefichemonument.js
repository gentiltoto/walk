// function flip() {
//   const card = document.getElementById('flip-card');
//   const flipBtn = document.querySelector('#flip-card-button');

//   document.getElementById('flip-card-button').addEventListener('click', function() {
//     card.classList.toggle('do-flip');
//     console.log("hello")
//   }, false);
// }

// export { flip }

function flip() {
  const monument = document.getElementById("flip-card-front");
  const map = document.getElementById("flip-card-back");
  const flip = document.getElementById("flip-card");

  flip.addEventListener('click', function() {
    flip.classList.toggle('do-flip');

    console.log("hello")
  })
}

export { flip }
