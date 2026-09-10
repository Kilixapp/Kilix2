document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------
    // 1. القائمة الجانبية للشاشات الصغيرة (Mobile Nav & Overlay)
    // -------------------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const navContainer = document.querySelector('.nav-container');
    
    // إنشاء طبقة تظليل خلف القائمة (Overlay)
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    const toggleMenu = () => {
        const isOpen = navContainer.classList.toggle('menu-open');
        menuToggle.classList.toggle('active', isOpen);
        overlay.classList.toggle('active', isOpen);
        
        // دعم التوافق مع قارئات الشاشة
        menuToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : ''; // منع التمرير أثناء فتح القائمة
    };

    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    // -------------------------------------------------------------
    // 2. التمرير السلس وإغلاق القائمة عند النقر على الروابط
    // -------------------------------------------------------------
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                // إغلاق القائمة الجانبية في حال كانت مفتوحة
                if (navContainer.classList.contains('menu-open')) {
                    toggleMenu();
                }

                if (targetElement) {
                    const headerOffset = 80; // ارتفاع الهيدر الثابت
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // -------------------------------------------------------------
    // 3. تحريك العناصر تدريجياً عند التمرير (Staggered Scroll Animation)
    // -------------------------------------------------------------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // إيقاف المراقبة بعد الظهور للحفاظ على الأداء
            }
        });
    }, observerOptions);

    // تطبيق التأثير وتحديد التأخير التدريجي للبطاقات المتقاربة
    const gridContainers = document.querySelectorAll('.features-grid, .features-cards-grid');
    gridContainers.forEach(grid => {
        Array.from(grid.children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.15}s`;
        });
    });

    const elementsToAnimate = document.querySelectorAll(
        '.card-item, .trust-banner, .feature-card, .hero-content, .why-us-visual, .hero-image'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal-element');
        revealOnScroll.observe(el);
    });

    // -------------------------------------------------------------
    // 4. تأثير Parallax الخفيف على صور الهاتف في خلفية الصفحة
    // -------------------------------------------------------------
    const phoneImages = document.querySelectorAll('.phone-img');
    
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;

        phoneImages.forEach(img => {
            img.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    });

});
