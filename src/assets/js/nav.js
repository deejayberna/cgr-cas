document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("site-header");
    const navToggle = document.querySelector(".nav-toggle");
    const siteNav = document.getElementById("site-nav");

    if (header) {
        const onScroll = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (navToggle && siteNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = siteNav.classList.toggle("is-open");
            navToggle.classList.toggle("is-active", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
            navToggle.setAttribute(
                "aria-label",
                isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
            );
        });

        siteNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                siteNav.classList.remove("is-open");
                navToggle.classList.remove("is-active");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.setAttribute("aria-label", "Abrir menú de navegación");
            });
        });
    }
});
