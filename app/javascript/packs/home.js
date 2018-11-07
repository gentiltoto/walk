import Typed from 'typed.js';

function loadDynamicBannerText() {
  new Typed('#banner-typed-text', {
    strings: ["Crée ton itinéraire en un click !"],
    typeSpeed: 60,
    loop: true
  });
}

loadDynamicBannerText()
