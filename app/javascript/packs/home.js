import Typed from 'typed.js';

function loadDynamicBannerText() {
  new Typed('#banner-typed-text', {
    strings: ["Crée ton itinéraire en un clic !"],
    typeSpeed: 70,
    loop: false
  });
}

loadDynamicBannerText()
