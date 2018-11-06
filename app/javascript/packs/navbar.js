function openNavMobile() {
    const openToggleMobile = document.querySelector(".drop-menu-mobile");
    openToggleMobile.addEventListener("click", (event) => {
      const navbarCircleMobile = document.querySelector(".circle-navbar-mobile");
      const mobileNavbar = document.querySelector(".navbar-walk-mobile");
      const links = document.querySelector(".mobile-links");

      const closeToggle = document.querySelector(".drop-menu-close-mobile");

      openToggleMobile.style.display = "none";

      navbarCircleMobile.style.borderRadius = "50%";
      navbarCircleMobile.style.top = "-48px";
      navbarCircleMobile.style.height = "300px"
      navbarCircleMobile.style.width = "300px"
      navbarCircleMobile.style.backgroundColor = "rgba(111, 112, 238, 0.85)"

      closeToggle.style.display = "flex";

      mobileNavbar.style.height = "164px";
      mobileNavbar.style.top = "146px";
      mobileNavbar.style.padding = "6px 0";

      links.style.display = "flex";
    });
}

function closeNavMobile() {
    const closeToggle = document.querySelector(".drop-menu-close-mobile");

    closeToggle.addEventListener("click", (event) => {

      const navbarCircleMobile = document.querySelector(".circle-navbar-mobile");
      const mobileNavbar = document.querySelector(".navbar-walk-mobile");
      const links = document.querySelector(".mobile-links");
      const openToggleMobile = document.querySelector(".drop-menu-mobile");

      closeToggle.style.display = "none";

      navbarCircleMobile.style.borderRadius = "50%";
      navbarCircleMobile.style.top = "-75px";
      navbarCircleMobile.style.height = "200px"
      navbarCircleMobile.style.width = "200px"

      openToggleMobile.style.display = "block";

      mobileNavbar.style.height = "55px";
      mobileNavbar.style.top = "145px";
      mobileNavbar.style.padding = "0";

      links.style.display = "none";
    });
}


function openNavDesktop() {
    const openToggleDesktop = document.querySelector(".drop-menu-desktop");
    openToggleDesktop.addEventListener("click", (event) => {
      const navbarCircleDesktop = document.querySelector(".circle-navbar-desktop");
      const desktopNavbar = document.querySelector(".navbar-walk-desktop");
      const links = document.querySelector(".desktop-links");

      const closeToggle = document.querySelector(".drop-menu-close-desktop");

      openToggleDesktop.style.display = "none";

      navbarCircleDesktop.style.borderRadius = "50%";
      navbarCircleDesktop.style.top = "-115px";
      navbarCircleDesktop.style.height = "450px"
      navbarCircleDesktop.style.width = "450px"
      navbarCircleDesktop.style.backgroundColor = "rgba(111, 112, 238, 0.85)"

      closeToggle.style.display = "flex";

      desktopNavbar.style.height = "170px";
      desktopNavbar.style.top = "289px";
      desktopNavbar.style.padding = "24px 0";

      links.style.display = "flex";
    });
}
function closeNavDesktop() {
    const closeToggle = document.querySelector(".drop-menu-close-desktop");

    closeToggle.addEventListener("click", (event) => {
      const navbarCircleDesktop = document.querySelector(".circle-navbar-desktop");
      const desktopNavbar = document.querySelector(".navbar-walk-desktop")
      const linksDesktop = document.querySelector(".desktop-links")
      const openToggleDesktop = document.querySelector(".drop-menu-desktop");

      closeToggle.style.display = "none";

      navbarCircleDesktop.style.borderRadius = "50%";
      navbarCircleDesktop.style.top = "-150px";
      navbarCircleDesktop.style.height = "400px"
      navbarCircleDesktop.style.width = "400px"

      openToggleDesktop.style.display = "block";

      desktopNavbar.style.height = "55px";
      desktopNavbar.style.top = "328px";
      desktopNavbar.style.padding = "0";

      linksDesktop.style.display = "none"
    });
}

export { openNavMobile, openNavDesktop, closeNavMobile, closeNavDesktop};
