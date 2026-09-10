document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. MOBILE MENU
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navContainer = document.querySelector(".nav-container");

    if (menuToggle && navContainer) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {

            const isOpen = navContainer.classList.toggle("menu-open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.style.overflow = isOpen
                ? "hidden"
                : "";
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

            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const header = document.querySelector(".navbar");

            const headerHeight = header
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

            /* Close mobile menu */

            if (
                navContainer &&
                navContainer.classList.contains("menu-open")
            ) {
                navContainer.classList.remove("menu-open");

                menuToggle?.classList.remove("active");

                menuToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.style.overflow = "";
            }

        });

    });



    /* =========================================
       3. SCROLL REVEAL
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".hero-content, .hero-image, .feature-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach((element, index) => {

            element.style.transitionDelay =
                `${index * 0.08}s`;

            element.classList.add("reveal-element");

            observer.observe(element);

        });

    } else {

        /* Fallback for older browsers */

        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

    }



    /* =========================================
       4. DESKTOP PHONE PARALLAX
    ========================================= */

    const phoneWrappers =
        document.querySelectorAll(".phone-wrapper");

    let ticking = false;

    window.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth <= 992) return;

            if (ticking) return;

            ticking = true;

            window.requestAnimationFrame(() => {

                const centerX =
                    window.innerWidth / 2;

                const centerY =
                    window.innerHeight / 2;

                const moveX =
                    (event.clientX - centerX) / 80;

                const moveY =
                    (event.clientY - centerY) / 100;


                phoneWrappers.forEach(wrapper => {

                    wrapper.style.setProperty(
                        "--parallax-x",
                        `${moveX}px`
                    );

                    wrapper.style.setProperty(
                        "--parallax-y",
                        `${moveY}px`
                    );

                });

                ticking = false;

            });

        },
        { passive: true }
    );



    /* =========================================
       5. RESET PARALLAX
    ========================================= */

    document.addEventListener("mouseleave", () => {

        if (window.innerWidth <= 992) return;

        phoneWrappers.forEach(wrapper => {

            wrapper.style.setProperty(
                "--parallax-x",
                "0px"
            );

            wrapper.style.setProperty(
                "--parallax-y",
                "0px"
            );

        });

    });



    /* =========================================
       6. REDUCE MOTION
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
