// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Header scroll state
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Active Link Update
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if(navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-item.active')?.classList.remove('active');
            navLink.parentElement.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.getElementById('heroVideo');
    
    // Check if video exists
    if (heroVideo) {
        // Handle video loading errors
        heroVideo.addEventListener('error', function(e) {
            console.error('Error loading video:', e);
            heroVideo.style.display = 'none';
        });

        // Ensure video plays
        heroVideo.play().catch(function(error) {
            console.log("Video autoplay failed:", error);
            // Add play button if autoplay fails
            const playButton = document.createElement('button');
            playButton.innerHTML = '▶ Play';
            playButton.className = 'video-play-button';
            heroVideo.parentNode.appendChild(playButton);
            
            playButton.addEventListener('click', () => {
                heroVideo.play();
                playButton.style.display = 'none';
            });
        });

        // Reload video if it stops
        heroVideo.addEventListener('stalled', function() {
            heroVideo.load();
            heroVideo.play();
        });
    }

    const testimonialWrapper = document.querySelector('.testimonials-wrapper');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    function updateSlides() {
        testimonialWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active states
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-advance slides
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    testimonialWrapper.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    testimonialWrapper.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Marquee Animation
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        marqueeContent.innerHTML = marqueeContent.innerHTML + marqueeContent.innerHTML;
    }

    // Enhanced Header Functionality
    document.addEventListener('DOMContentLoaded', () => {
        const header = document.querySelector('#header');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        const logo = document.querySelector('.logo'); // Logo selector
        let lastScroll = 0;
        let isMenuOpen = false; // Track menu state

        // Function to toggle mobile menu
        const toggleMobileMenu = () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            isMenuOpen = !isMenuOpen; // Update menu state
        };

        // Smooth scroll for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', e => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerOffset = header.offsetHeight + 20; // Dynamic header offset
                        const elementPosition = target.offsetTop;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        // Close mobile menu if open
                        if (isMenuOpen) {
                            toggleMobileMenu();
                        }
                    }
                }
            });
        });

        // Enhanced scroll interactions
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const headerHeight = header.offsetHeight; // Get header height dynamically

            // Add/remove scrolled class
            if (currentScroll > headerHeight / 2) {
                header.classList.add('header-scrolled');
                header.classList.remove('header-transparent');
                logo.classList.add('logo-scrolled'); // Add class to logo on scroll
            } else {
                header.classList.remove('header-scrolled');
                header.classList.add('header-transparent');
                logo.classList.remove('logo-scrolled'); // Remove class from logo
            }

            // Hide/Show header on scroll
            if (currentScroll > lastScroll && currentScroll > headerHeight * 2) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });

        // Mobile menu toggle with animation
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Active link update on scroll
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - header.offsetHeight; // Adjust for header height
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

                if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector('.nav-item.active')?.classList.remove('active');
                    navLink.closest('.nav-item').classList.add('active');
                }
            });
        });

        // Initial setup to ensure correct header state on load
        window.dispatchEvent(new Event('scroll'));
    });
});