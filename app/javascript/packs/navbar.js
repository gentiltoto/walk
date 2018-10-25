function openNav() {
    const toggle = document.querySelector(".drop-menu");
    toggle.addEventListener("click", (event) => {
      const sidebar = document.querySelector("#side-navbar");
      sidebar.style.width = "250px";
    });
}

function closeNav() {
    const toggle = document.querySelector(".close");
    toggle.addEventListener("click", (event) => {
      const sidebar = document.querySelector("#side-navbar");
      sidebar.style.width = "0";
    });
}

export { openNav, closeNav };
