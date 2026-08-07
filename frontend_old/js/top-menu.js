document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.getElementById("hamburger");

    const navLinks = document.getElementById("navLinks");

    const userButton = document.getElementById("userButton");

    const dropdown = document.getElementById("dropdown");

    hamburger.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

    userButton.addEventListener("click", (e) => {

        e.stopPropagation();

        dropdown.classList.toggle("show");

    });

    document.addEventListener("click", () => {

        dropdown.classList.remove("show");

    });

});