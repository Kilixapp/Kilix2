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
        
        // دعم التوافق مع قارئات الشاشة ومنع التمرير أثناء فتح القائمة
        menuToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : ''; 
    };

    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    // إغلاق القائمة تلقائياً إذا قام المستخدم بتكبير الشاشة فوق 768px
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navContainer && navContainer.classList.contains('menu-open')) {
            toggleMenu();
        }
    });

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
                if (navContainer && navContainer.classList.contains('menu-open')) {
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
    // 3. إضافة تأثير الحركة الذكية للعناصر عند التمرير (Scroll Animations)
    // -------------------------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // تشغيل الحركة مرة واحدة فقط
            }
        });
    }, observerOptions);

    // العناصر المستهدفة بالحركة
    const animatedElements = document.querySelectorAll('.feature-card, .card-item, .trust-banner, .phone-wrapper');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        animateOnScroll.observe(el);
    });

    // إضافة الكلاس الخاص بالحركة عبر JS لتنسيق الانتقال
    document.addEventListener('scroll', () => {
        animatedElements.forEach(el => {
            if (el.classList.contains('animate-in')) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });

    // -------------------------------------------------------------
    // 4. تحسين استجابة الهيدر مع التمرير (Sticky Header Elevation)
    // -------------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

});
