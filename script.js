document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. MENU
       ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const menuWrapper = document.querySelector(".menu-wrapper");

    if (menuToggle && menuWrapper) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", event => {

            event.stopPropagation();

            const isOpen =
                menuWrapper.classList.toggle("open");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        /* Close when clicking outside */

        document.addEventListener("click", event => {

            if (!menuWrapper.contains(event.target)) {

                menuWrapper.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });


        /* Close after selecting an option */

        const menuLinks =
            menuWrapper.querySelectorAll(
                ".menu-dropdown a"
            );

        menuLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuWrapper.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =========================================
       2. SMOOTH SCROLL
       ========================================= */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
    );

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const header =
                document.querySelector(".navbar");

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================================
       3. SCROLL REVEAL
       ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".hero-content, .feature-card"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.1,
                    rootMargin:
                        "0px 0px -30px 0px"
                }
            );


        revealElements.forEach(
            (element, index) => {

                element.style.transitionDelay =
                    `${index * 0.08}s`;

                element.classList.add(
                    "reveal-element"
                );

                observer.observe(element);

            }
        );

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "is-visible"
            );

        });

    }


    /* =========================================
       4. REDUCE MOTION
       Accessibility
       ========================================= */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }

});
