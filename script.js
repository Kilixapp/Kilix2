document.addEventListener('DOMContentLoaded', () => {

    // 1. القائمة الجانبية للشاشات الصغيرة (Mobile Navigation Drawer)
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');

    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navContainer.classList.toggle('menu-open');
        });
    }

    // 2. إدارة أزرار التحميل والتمرير السلس (Smooth Scroll & Download Action)
    const downloadButtons = document.querySelectorAll('.btn, .btn-download-nav');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 3. تأثير التمرير التدريجي للعناصر (Intersection Observer Animation)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // تطبيق مراقبة الظهور على البطاقات والعناصر الرئيسية
    const elementsToAnimate = document.querySelectorAll('.card-item, .trust-banner, .feature-card, .hero-content, .why-us-visual');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal-element');
        revealOnScroll.observe(el);
    });

});
