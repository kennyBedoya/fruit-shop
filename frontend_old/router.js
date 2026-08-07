class Router {

    constructor(contentId) {

        this.content = document.getElementById(contentId);

        this.routes = {};

        this.currentModule = null;

        this.currentCss = null;

    }

    register(name, config) {

        this.routes[name] = config;

    }

    async navigate(routeName) {

        const route = this.routes[routeName];

        if (!route) {

            console.error("Ruta no encontrada:", routeName);

            return;

        }

        // Destruir módulo actual
        if (
            this.currentModule &&
            typeof window[this.currentModule]?.destroy === "function"
        ) {

            window[this.currentModule].destroy();

        }

        // Eliminar CSS anterior
        if (this.currentCss) {

            this.currentCss.remove();

            this.currentCss = null;

        }

        // Cargar HTML
        const response = await fetch(route.html);

        const html = await response.text();

        this.content.innerHTML = html;

        // Cargar CSS
        if (route.css) {

            const link = document.createElement("link");

            link.rel = "stylesheet";

            link.href = route.css;

            document.head.appendChild(link);

            this.currentCss = link;

        }

        // Cargar JS
        if (route.js) {

            await this.loadScript(route.js);

        }

        this.currentModule = route.module;

        // Inicializar módulo
        if (
            window[route.module] &&
            typeof window[route.module].init === "function"
        ) {

            window[route.module].init();

        }

        // Actualizar URL
        location.hash = routeName;

    }

    async loadScript(src) {

        const previous = document.querySelector(
            `script[data-module="${src}"]`
        );

        if (previous) {

            previous.remove();

        }

        return new Promise((resolve, reject) => {

            const script = document.createElement("script");

            script.src = src;

            script.dataset.module = src;

            script.onload = resolve;

            script.onerror = reject;

            document.body.appendChild(script);

        });

    }

    start(defaultRoute) {

        window.addEventListener("hashchange", () => {

            const route =
                location.hash.replace("#", "") || defaultRoute;

            this.navigate(route);

        });

        const firstRoute =
            location.hash.replace("#", "") || defaultRoute;

        this.navigate(firstRoute);

    }

}