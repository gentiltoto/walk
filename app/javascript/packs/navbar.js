function openNav() {
    const openToggle = document.querySelector(".drop-menu");
    openToggle.addEventListener("click", (event) => {
      const navbarCircle = document.querySelector(".circle-navbar");
      const closeToggle = document.querySelector(".drop-menu-close");
      const mobileNavbar = document.querySelector(".navbar-walk-mobile");
      const links = document.querySelector(".mobile-links");
      openToggle.style.display = "none";
      navbarCircle.style.borderRadius = "20%";
      navbarCircle.style.top = "35px";
      closeToggle.style.display = "flex";
      mobileNavbar.style.height = "165px";
      mobileNavbar.style.top = "35px";
      mobileNavbar.style.padding = "6px 0";
      links.style.display = "flex";
    });
}

function closeNav() {
    const closeToggle = document.querySelector(".drop-menu-close");
    closeToggle.addEventListener("click", (event) => {
      const navbarCircle = document.querySelector(".circle-navbar");
      const openToggle = document.querySelector(".drop-menu");
      const mobileNavbar = document.querySelector(".navbar-walk-mobile");
      const links = document.querySelector(".mobile-links");
      closeToggle.style.display = "none";
      navbarCircle.style.borderRadius = "50%";
      navbarCircle.style.top = "-75px";
      openToggle.style.display = "block";
      mobileNavbar.style.height = "55px";
      mobileNavbar.style.top = "145px";
      mobileNavbar.style.padding = "0";
      links.style.display = "none";
    });
}

export { openNav, closeNav };
