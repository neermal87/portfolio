// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    initEmailJS();
    
    // Initialize all functionality
    initSmoothScrolling();
    initNavbarScroll();
    initMobileMenu();
    initContactForm();
    initScrollToTop();
    initAnimations();
    initTypingEffect();
    initGmailLinks();
});

// Initialize EmailJS
function initEmailJS() {
    // Check if EmailJS is available
    if (typeof emailjs !== 'undefined') {
        // Initialize EmailJS with your public key
        emailjs.init('user_8QZxK9Y7vL2nR4pS1tM6w'); // Replace with your actual EmailJS public key
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.professional-nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        lastScrollTop = scrollTop;
    });
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.professional-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const navbarToggler = document.querySelector('.professional-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            // Toggle aria-expanded
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarCollapse.contains(e.target) && 
                !navbarToggler.contains(e.target) && 
                navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }
}

// Contact Form Validation and Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    }
}

// Form Validation
function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate Individual Field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    // Required field validation
    if (!value) {
        isValid = false;
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
    } else {
        // Email validation
        if (fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Name validation
        if (fieldName === 'name') {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long.';
            }
        }
        
        // Message validation
        if (fieldName === 'message') {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long.';
            }
        }
    }
    
    // Apply validation classes
    if (isValid) {
        field.classList.add('is-valid');
    } else {
        field.classList.add('is-invalid');
    }
    
    // Update error message
    const feedbackElement = field.parentNode.querySelector('.invalid-feedback');
    if (feedbackElement) {
        feedbackElement.textContent = errorMessage;
    }
    
    return isValid;
}

// Submit Form
function submitForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Check if EmailJS is properly configured
    if (typeof emailjs !== 'undefined') {
        // Send email using EmailJS
        emailjs.send('service_8QZxK9Y7vL2nR4pS1tM6w', 'template_contact', {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            to_email: 'cnirmal811@gmail.com'
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            form.reset();
            form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
                field.classList.remove('is-valid', 'is-invalid');
            });
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            // Fallback to Gmail compose
            openGmailCompose(data);
        })
        .finally(function() {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    } else {
        // Fallback: Open Gmail compose with pre-filled data
        setTimeout(() => {
            openGmailCompose(data);
            
            // Reset form
            form.reset();
            form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
                field.classList.remove('is-valid', 'is-invalid');
            });
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1000);
    }
}

// Open Gmail Compose as Fallback
function openGmailCompose(data) {
    const email = 'cnirmal811@gmail.com';
    const subject = `Portfolio Contact: ${data.subject}`;
    const body = `Hello Nirmal,

I found your portfolio website and would like to get in touch.

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
This message was sent from your portfolio contact form.`;
    
    // Create Gmail URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');
    
    // Show notification
    showNotification('Opening Gmail compose window. Please send the email manually.', 'info');
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Scroll to Top Button
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .about-feature');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    const words = originalText.split(' ');
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentWord = words[currentWordIndex];
        
        if (isDeleting) {
            heroTitle.textContent = words.slice(0, currentWordIndex).join(' ') + 
                                   currentWord.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            heroTitle.textContent = words.slice(0, currentWordIndex).join(' ') + 
                                   currentWord.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
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
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .professional-nav.scrolled {
        background: rgba(15, 23, 42, 0.95) !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        padding: 0.5rem 0;
    }
    
    .professional-link.active {
        background: rgba(0, 123, 255, 0.15);
        color: var(--primary-color) !important;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Handle external links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.href && !e.target.href.startsWith(window.location.origin)) {
        e.target.setAttribute('target', '_blank');
        e.target.setAttribute('rel', 'noopener noreferrer');
    }
});

// Initialize Gmail Links
function initGmailLinks() {
    // Add Gmail functionality to email links
    const emailLinks = document.querySelectorAll('a[href*="mailto"], .social-link[href*="mailto"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = 'cnirmal811@gmail.com';
            const subject = 'Contact from Portfolio Website';
            const body = 'Hello Nirmal,\n\nI found your portfolio website and would like to get in touch.\n\n';
            
            // Create Gmail URL
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open Gmail in new tab
            window.open(gmailUrl, '_blank');
        });
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
