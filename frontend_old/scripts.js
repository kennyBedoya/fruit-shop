document.addEventListener("DOMContentLoaded", async () => {

    await loadModule("top-menu", "html/top-menu.html");
    await loadModule("footer", "html/footer.html");
    await loadModule("content", "html/home.html");

});

async function loadModule(container, file) {

    const response = await fetch(file);

    const html = await response.text();

    document.getElementById(container).innerHTML = html;

}