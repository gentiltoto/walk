function openNav() {
    const toggle = document.querySelector(".drop-menu");
    toggle.addEventListener("click", (event) => {
      const sidebar = document.querySelector("#side-navbar");
      sidebar.style.left = "0";
    });
}

function closeNav() {
    const toggle = document.querySelector(".close");
    toggle.addEventListener("click", (event) => {
      const sidebar = document.querySelector("#side-navbar");
      sidebar.style.left = "-250px";
    });
}

export { openNav, closeNav };
