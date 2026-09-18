document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       1. MENU
    ========================================== */

    const menuToggle = document.getElementById("menuToggle");
    const menuWrapper = document.querySelector(".menu-wrapper");
    const menuDropdown = document.getElementById("menuDropdown");

    if (menuToggle && menuWrapper && menuDropdown) {

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

        menuToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            if (menuWrapper.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        /* إغلاق عند الضغط خارج القائمة */

        document.addEventListener("click", function (event) {

            if (!menuWrapper.contains(event.target)) {
                closeMenu();
            }

        });


        /* إغلاق بعد اختيار عنصر */

        menuDropdown.querySelectorAll("a").forEach(function (link) {

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
       2. SUPABASE DOWNLOAD + IOS APP STORE
    ========================================== */

    const SUPABASE_URL = "https://xsswxjaaqhkbsheeclge.supabase.co";
    const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_4Zq8XdOzwyqElOEd-4tPvQ_70y1weCa";
    const ANDROID_BUCKET = "android-apps";
    const ANDROID_FILE = "kilix.apk";

    let supabase = null;

    if (window.supabase && window.supabase.createClient) {
        supabase = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        );
    }

    /* Android: download the APK directly from Supabase Storage */
    const androidDownloadButton = document.querySelector(".btn-primary");

    if (androidDownloadButton) {
        androidDownloadButton.addEventListener("click", function (event) {
            event.preventDefault();

            if (!supabase) {
                alert("تعذر الاتصال بخادم التحميل. حاول مرة أخرى.");
                return;
            }

            const { data } = supabase.storage
                .from(ANDROID_BUCKET)
                .getPublicUrl(ANDROID_FILE, {
                    download: "kilix.apk"
                });

            if (!data || !data.publicUrl) {
                alert("تعذر تجهيز تحميل التطبيق. حاول مرة أخرى.");
                return;
            }

            window.location.href = data.publicUrl;
        });
    }

    /* iOS: register interest for App Store availability */
    const iosDownloadButton = document.getElementById("iosDownloadButton");

    if (iosDownloadButton) {
        iosDownloadButton.addEventListener("click", async function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (!supabase) {
                alert("يتوفر قريبًا على App Store");
                return;
            }

            const name = prompt("أدخل اسمك للتسجيل في قائمة الانتظار:");
            if (!name || name.trim().length < 2) {
                alert("يرجى إدخال اسم صحيح.");
                return;
            }

            const email = prompt("أدخل بريدك الإلكتروني:");
            if (!email || !email.includes("@")) {
                alert("يرجى إدخال بريد إلكتروني صحيح.");
                return;
            }

            const { error } = await supabase
                .from("ios_waitlist_registrations")
                .insert({
                    full_name: name.trim(),
                    email: email.trim(),
                    role: "أفضل عدم الإجابة"
                });

            if (error) {
                console.error("iOS waitlist registration failed:", error);
                alert("يتوفر قريبًا على App Store");
                return;
            }

            alert("تم تسجيلك بنجاح! سنخبرك عند توفر Kilix على App Store.");
        });
    }


    /* =========================================
       3. SMOOTH SCROLL
    ========================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
    );

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector(".navbar");

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
       4. SCROLL REVEAL
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".hero-content, .feature-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -30px 0px"
            }
        );


        revealElements.forEach(function (element, index) {

            element.style.transitionDelay =
                (index * 0.08) + "s";

            element.classList.add("reveal-element");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("is-visible");

        });

    }


    /* =========================================
       5. REDUCE MOTION
    ========================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }

});
