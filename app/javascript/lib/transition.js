function transitionOutMobileRight(compteur) {
  $(`#monument-${compteur}`).removeClass("animating transition in fly right left");
  $(`#monument-${compteur}`).addClass("animating transition out fly left");
}

function transitionInMobileRight(compteur) {
  $(`#monument-${compteur}`).removeClass("animating transition out fly left right");
  $(`#monument-${compteur}`).addClass("animating transition in fly right");
}

function transitionOutMobileLeft(compteur) {
  $(`#monument-${compteur}`).removeClass("animating transition in fly left right");
  $(`#monument-${compteur}`).addClass("animating transition out fly right");
}

function transitionInMobileLeft(compteur) {
  $(`#monument-${compteur}`).removeClass("animating transition out fly right left");
  $(`#monument-${compteur}`).addClass("animating transition in fly left");
}

export { transitionOutMobileRight, transitionInMobileRight, transitionOutMobileLeft, transitionInMobileLeft};
