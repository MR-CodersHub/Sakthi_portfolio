/* ==========================================================================
   SAKTHI — EDITORIAL PORTFOLIO SYSTEM
   Clean Scroll Reveal & Cinematic Micro-Animations (Steady & Stable Interactions)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 01. SMOOTH SCROLL REVEAL OBSERVER WITH EARLY TRIGGER
    const sections = document.querySelectorAll('section, .hero-container');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.02
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id !== 'expertise') { // Exclude expertise from generic observer
            section.classList.add('reveal-3d');
            sectionObserver.observe(section);
        }
    });

    // Ensure Hero, Introduction, and About sections reveal immediately when in viewport
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.classList.add('in-view');
    }

    const checkImmediateInView = (elementId) => {
        const el = document.getElementById(elementId);
        if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('in-view');
            }
        }
    };

    checkImmediateInView('introduction');
    checkImmediateInView('about');

    // DEDICATED ONE-TIME OBSERVER FOR CORE EXPERTISE SLOW LEFT-TO-RIGHT ANIMATION (25-30% VIEWPORT)
    const expertiseSec = document.getElementById('expertise');
    if (expertiseSec) {
        const expertiseObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    expertiseSec.classList.add('expertise-animated');
                    observer.unobserve(entry.target); // Trigger once only!
                }
            });
        }, {
            root: null,
            threshold: 0.28 // Trigger at 25-30% viewport intersection
        });

        expertiseObserver.observe(expertiseSec);
    }

    // 02. HERO PORTRAIT & 3D TYPOGRAPHY MOUSE & TOUCH PARALLAX
    const hero = document.getElementById('hero');
    const portrait = document.querySelector('.founder-portrait-img');
    const heroTitle = document.querySelector('.hero-title');
    const heroOutline = document.querySelector('.hero-title-outline');

    if (hero && portrait) {
        const handleHeroParallax = (clientX, clientY) => {
            const rect = hero.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = (x - centerX) / centerX;
            const moveY = (y - centerY) / centerY;

            // Dynamic 3D Parallax Offsets
            portrait.style.transform = `translate3d(${moveX * -12}px, ${moveY * -6}px, 0)`;
            
            if (heroTitle) {
                heroTitle.style.transform = `translate3d(${moveX * 18}px, ${moveY * 10}px, 0)`;
            }
            if (heroOutline) {
                heroOutline.style.transform = `translate3d(${moveX * 22}px, ${moveY * 12}px, 0)`;
            }
        };

        hero.addEventListener('mousemove', (e) => handleHeroParallax(e.clientX, e.clientY));
        hero.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                handleHeroParallax(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        const resetHero = () => {
            portrait.style.transform = `translate3d(0, 0, 0)`;
            if (heroTitle) heroTitle.style.transform = `translate3d(0, 0, 0)`;
            if (heroOutline) heroOutline.style.transform = `translate3d(0, 0, 0)`;
        };

        hero.addEventListener('mouseleave', resetHero);
        hero.addEventListener('touchend', resetHero);
    }

});
