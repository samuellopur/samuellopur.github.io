// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking on a nav link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.closeMenu();
                }
            });
        }
    }
    
    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScrolling {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        this.init();
    }
    
    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerOffset = 80; // Account for fixed navbar
                    const elementPosition = targetSection.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Active Navigation Highlighting
class ActiveNavigation {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.highlightActiveSection());
        this.highlightActiveSection(); // Set initial active state
    }
    
    highlightActiveSection() {
        const scrollPos = window.scrollY + 100; // Offset for navbar
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                this.navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
}

// Navbar Scroll Effect
class NavbarScrollEffect {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }
    
    init() {
        if (this.navbar) {
            window.addEventListener('scroll', () => this.handleScroll());
        }
    }
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            this.navbar.style.backdropFilter = 'blur(10px)';
        } else {
            this.navbar.style.backgroundColor = '#ffffff';
            this.navbar.style.backdropFilter = 'none';
        }
    }
}

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        // Elements to animate
        const animatedElements = document.querySelectorAll(
            '.timeline-item, .project-card, .skill-category, .education-card'
        );
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                this.observerOptions
            );
            
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            animatedElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }
}

// Typewriter Effect for Hero Section
class TypewriterEffect {
    constructor() {
        this.element = document.querySelector('.hero-subtitle');
        this.texts = [
            'Desarrollador Frontend',
            'Especialista en React',
            'Creador de Experiencias Web',
            'Apasionado por la Tecnología'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 2000;
        
        if (this.element) {
            this.init();
        }
    }
    
    init() {
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        let typeSpeedCurrent = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeedCurrent = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        }
        
        setTimeout(() => this.type(), typeSpeedCurrent);
    }
}

// Download CV Functionality
class CVDownloader {
    constructor() {
        this.downloadButton = document.querySelector('a[href*="CV-Samuel_Lopez_V4.pdf"]');
        this.init();
    }
    
    init() {
        if (this.downloadButton) {
            this.downloadButton.addEventListener('click', (e) => {
                // Add analytics or tracking here if needed
                console.log('CV download initiated');
                
                // Optional: Show a confirmation message
                this.showDownloadMessage();
            });
        }
    }
    
    showDownloadMessage() {
        // Create a temporary message
        const message = document.createElement('div');
        message.textContent = '¡Descargando CV!';
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 500;
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        // Animate in
        setTimeout(() => {
            message.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            message.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 3000);
    }
}

// Contact Form Enhancement (if needed in the future)
class ContactEnhancer {
    constructor() {
        this.contactButtons = document.querySelectorAll('.contact-buttons .btn');
        this.init();
    }
    
    init() {
        this.contactButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const href = button.getAttribute('href');
                
                if (href && href.startsWith('mailto:')) {
                    console.log('Email contact initiated');
                } else if (href && href.includes('linkedin')) {
                    console.log('LinkedIn contact initiated');
                } else if (href && href.includes('github')) {
                    console.log('GitHub contact initiated');
                }
            });
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Optimize scroll events
        this.optimizeScrollEvents();
    }
    
    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
    
    optimizeScrollEvents() {
        let ticking = false;
        
        const optimizedScrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-dependent operations go here
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    }
}

// Utility Functions
const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new MobileNavigation();
    new SmoothScrolling();
    new ActiveNavigation();
    new NavbarScrollEffect();
    new ScrollAnimations();
    new TypewriterEffect();
    new CVDownloader();
    new ContactEnhancer();
    new PerformanceOptimizer();
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    console.log('Portfolio website initialized successfully!');
});

// Handle window resize events
window.addEventListener('resize', Utils.debounce(() => {
    // Recalculate any size-dependent features
    console.log('Window resized, recalculating layout...');
}, 250));

// Handle visibility change (tab switching)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered: ', registration))
        //     .catch(registrationError => console.log('SW registration failed: ', registrationError));
    });
}