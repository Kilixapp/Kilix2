document.addEventListener('DOMContentLoaded', () => {

    // 1. القائمة الجانبية في الشريط العلوي (Mobile Menu Toggle)
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // يمكن ربطه بفتح القائمة عند الحاجة
            alert('تم الضغط على قائمة التصفح.');
        });
    }

    // 2. تفاعل والتمرير الناعم عند الضغط على أزرار التحميل
    const downloadButtons = document.querySelectorAll('.btn, .btn-download-nav');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                console.log('طلب تحميل التطبيق عبر:', button.innerText.trim());
            }
        });
    });

    // 3. تأثير حركي عند التمرير فوق بطاقات مميزات القسم الثاني (Hover Effect Log)
    const featureCards = document.querySelectorAll('.card-item');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--primary-orange)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'rgba(0, 0, 0, 0.04)';
        });
    });

    // 4. انيميشنظهور العناصر أثناء التمرير (Scroll Animation)
    const observerOptions = {
        threshold: 0.1
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // تطبيق الأنيميشن على بطاقات المميزات وشريط الضمانات
    const elementsToAnimate = document.querySelectorAll('.card-item, .trust-banner, .feature-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        revealOnScroll.observe(el);
    });

});
