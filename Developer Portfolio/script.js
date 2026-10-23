/* =========================================
   KASSIM UMAR - PORTFOLIO INTERACTIONS
   ========================================= */


/* ---------- Mobile Navigation ---------- */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navigationLinks = document.querySelectorAll(".nav-link");


function closeMobileMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.classList.remove("active");
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });


    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {
            closeMobileMenu();
        });

    });


    document.addEventListener("click", (event) => {

        const clickedInsideNavigation =
            navLinks.contains(event.target) ||
            menuToggle.contains(event.target);

        if (!clickedInsideNavigation) {
            closeMobileMenu();
        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 760) {
            closeMobileMenu();
        }

    });

}


/* ---------- Dark and Light Themes ---------- */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const savedTheme = localStorage.getItem("portfolio-theme");


function updateThemeButton() {

    const isLightTheme = document.body.classList.contains("light-theme");

    if (themeIcon) {
        themeIcon.textContent = isLightTheme ? "☾" : "☀";
    }

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            isLightTheme
                ? "Switch to dark theme"
                : "Switch to light theme"
        );

        themeToggle.setAttribute(
            "title",
            isLightTheme
                ? "Switch to dark theme"
                : "Switch to light theme"
        );
    }

}


if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}


updateThemeButton();


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const currentTheme =
            document.body.classList.contains("light-theme")
                ? "light"
                : "dark";

        localStorage.setItem("portfolio-theme", currentTheme);

        updateThemeButton();

    });

}


/* ---------- Project Details Modal ---------- */

const projectModal = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");
const projectButtons = document.querySelectorAll("[data-project]");

let previousFocusedElement = null;


function openProjectModal() {

    if (!projectModal) return;

    previousFocusedElement = document.activeElement;

    projectModal.classList.add("open");
    projectModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    if (modalClose) {
        modalClose.focus();
    }

}


function closeProjectModal() {

    if (!projectModal) return;

    projectModal.classList.remove("open");
    projectModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (
        previousFocusedElement &&
        typeof previousFocusedElement.focus === "function"
    ) {
        previousFocusedElement.focus();
    }

}


projectButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const projectName = button.dataset.project;

        if (projectName === "fixit") {
            openProjectModal();
        }

    });

});


if (modalClose) {

    modalClose.addEventListener("click", closeProjectModal);

}


if (projectModal) {

    projectModal.addEventListener("click", (event) => {

        if (event.target.hasAttribute("data-close-modal")) {
            closeProjectModal();
        }

    });

}


document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        projectModal &&
        projectModal.classList.contains("open")
    ) {
        closeProjectModal();
    }

});


/* ---------- Active Navigation Link ---------- */

const sections = document.querySelectorAll("main section[id]");


if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const currentSectionId = entry.target.id;

                navigationLinks.forEach((link) => {

                    const isActive =
                        link.getAttribute("href") === `#${currentSectionId}`;

                    link.classList.toggle("active", isActive);

                });

            });

        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );


    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


/* ---------- Automatically Update Footer Year ---------- */

const currentYear = document.getElementById("current-year");


if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}