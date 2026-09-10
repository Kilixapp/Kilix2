document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       1. MENU
    ========================================== */

    const menuToggle = document.getElementById("menuToggle");
    const menuWrapper = document.querySelector(".menu-wrapper");
    const menuDropdown = document.getElementById("menuDropdown");

    if (menuToggle && menuWrapper && menuDropdown) {

        menuToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const isOpen = menuWrapper.classList.contains("open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        function openMenu() {

            menuWrapper.classList.add("open");
            menuToggle.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        function closeMenu() {

            menuWrapper.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /* إغلاق عند الضغط خارج القائمة */

        document.addEventListener("click", function (event) {

            if (!menuWrapper.contains(event.target)) {
                closeMenu();
            }

        });


        /* إغلاق بعد اختيار عنصر من القائمة */

        const menuLinks =
            menuDropdown.querySelectorAll("a");

        menuLinks.forEach(function (link) {

            link.addEventListener("click", function () {
                closeMenu();
            });

        });


        /* إغلاق بزر Escape */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

    }


    /* =========================================
       2. SMOOTH SCROLL
    ========================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]:not([href="#"])'
        );

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header =
                document.querySelector(".navbar");

            const headerHeight =
                header ? header.offsetHeight : 0;

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
    ========================================== */

    const revealElements =
        document.querySelectorAll(
            ".hero-content, .feature-card"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

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
                    rootMargin: "0px 0px -30px 0px"
                }
            );


        revealElements.forEach(
            function (element, index) {

                element.style.transitionDelay =
                    (index * 0.08) + "s";

                element.classList.add(
                    "reveal-element"
                );

                observer.observe(element);

            }
        );

    } else {

        revealElements.forEach(function (element) {

            element.classList.add(
                "is-visible"
            );

        });

    }


    /* =========================================
       4. REDUCE MOTION
    ========================================== */

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
