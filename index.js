document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SCROLL ACTIONS (HEADER EFFECTS & ACTIVE LINKS)
       ========================================================================== */
    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const handleScroll = () => {
        // Shrink and blur header on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlight based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init on load


    /* ==========================================================================
       2. MOBILE MENU NAVIGATION
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuLinks = document.querySelectorAll('.nav-link, .btn-sm');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });


    /* ==========================================================================
       3. TESTIMONIALS SLIDER
       ========================================================================== */
    const track = document.getElementById('testimonials-track');
    const slides = Array.from(track.children);
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('slider-dots');
    
    let currentIndex = 0;
    let autoplayInterval;

    // Create Navigation Dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoplay();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    const updateSlider = () => {
        // Move track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateSlider();
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    };

    // Click events
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    // Autoplay function
    const startAutoplay = () => {
        autoplayInterval = setInterval(nextSlide, 6000);
    };

    const resetAutoplay = () => {
        clearInterval(autoplayInterval);
        startAutoplay();
    };

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    track.addEventListener('mouseleave', startAutoplay);

    startAutoplay();


    /* ==========================================================================
       4. APPOINTMENT FORM HANDLING
       ========================================================================== */
    const form = document.getElementById('appointment-form');
    const successOverlay = document.getElementById('form-success');
    const successUserName = document.getElementById('success-user-name');
    const resetFormBtn = document.getElementById('reset-form-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Perform basic validation
        const nameVal = document.getElementById('name').value.trim();
        const phoneVal = document.getElementById('phone').value.trim();
        const emailVal = document.getElementById('email').value.trim();
        const privacyVal = document.getElementById('privacy').checked;

        if (nameVal === '' || phoneVal === '' || emailVal === '' || !privacyVal) {
            alert('Por favor, rellena todos los campos obligatorios y acepta la política de privacidad.');
            return;
        }

        // Simulate successful API call
        successUserName.textContent = nameVal;
        successOverlay.classList.add('active');
        
        // Clear the form
        form.reset();
    });

    resetFormBtn.addEventListener('click', () => {
        successOverlay.classList.remove('active');
    });


    /* ==========================================================================
       5. INTERSECTION OBSERVER FOR ENTRANCE ANIMATIONS
       ========================================================================== */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Unobserve once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });

    // Handle early load elements
    setTimeout(() => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const elements = heroSection.querySelectorAll('.animate-on-scroll');
            elements.forEach(el => el.classList.add('appear'));
        }
    }, 100);

});
