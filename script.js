// ===== THEME MANAGEMENT =====
const htmlElement = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme') || 'light';

// Initialize theme
function initTheme() {
    htmlElement.setAttribute('data-theme', storedTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Theme toggle with animation
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add rotation animation
    themeToggle.classList.add('rotate');
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
    
    setTimeout(() => {
        themeToggle.classList.remove('rotate');
    }, 600);
});

// ===== LANGUAGE MANAGEMENT =====
const langButtons = document.querySelectorAll('.lang-btn');
const htmlLang = document.documentElement;
const storedLang = localStorage.getItem('language') || 'de';

// Initialize language
function initLanguage() {
    htmlLang.setAttribute('data-lang', storedLang);
    updateLanguageUI();
    updateAllText();
}

function updateLanguageUI() {
    const currentLang = localStorage.getItem('language') || 'de';
    
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateAllText(lang = null) {
    const currentLang = lang || localStorage.getItem('language') || 'de';
    
    const elements = document.querySelectorAll('[data-de][data-en]');
    elements.forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) {
            el.textContent = text;
        }
    });

    // Update form labels and placeholders
    const labels = document.querySelectorAll('label[data-de][data-en]');
    labels.forEach(label => {
        label.textContent = label.getAttribute(`data-${currentLang}`);
    });

    const buttons = document.querySelectorAll('button[data-de][data-en]:not(.lang-btn):not(.control-btn)');
    buttons.forEach(btn => {
        btn.textContent = btn.getAttribute(`data-${currentLang}`);
    });
}

// Language button listeners
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const selectedLang = btn.dataset.lang;
        
        // Get current language from localStorage (not from initial variable)
        const currentLang = localStorage.getItem('language') || 'de';
        if (selectedLang === currentLang) return;
        
        // Update language in localStorage
        localStorage.setItem('language', selectedLang);
        htmlLang.setAttribute('data-lang', selectedLang);
        
        // Animate language change
        document.body.style.opacity = '0.7';
        setTimeout(() => {
            updateLanguageUI();
            updateAllText(selectedLang); // Pass the new language
            document.body.style.opacity = '1';
        }, 150);
    });
});

// ===== HAMBURGER MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Update active link with smooth transition
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ===== SCROLL TRACKING & ACTIVE LINK UPDATE =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and portfolio items
document.querySelectorAll('.service-card, .portfolio-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    observer.observe(el);
});

// ===== FORM SUBMISSION =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Formspree handles the submission
        const submitBtn = this.querySelector('button[type="submit"]');
        
        // Add visual feedback
        submitBtn.style.pointerEvents = 'none';
        submitBtn.style.opacity = '0.7';
        
        setTimeout(() => {
            submitBtn.style.pointerEvents = 'auto';
            submitBtn.style.opacity = '1';
        }, 1000);
    });
}

// ===== INTERACTIVE BUTTON EFFECTS =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.width = ripple.style.height = '20px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = (x - 10) + 'px';
        ripple.style.top = (y - 10) + 'px';
    });
});

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(4);
        }
    }
`;
document.head.appendChild(style);

// ===== SERVICE CARDS HOVER TILT EFFECT =====
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ===== FORM INPUT FOCUS EFFECTS =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.animation = 'inputFocus 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.style.animation = 'none';
    });
});

// Add input focus animation
const inputStyle = document.createElement('style');
inputStyle.textContent = `
    @keyframes inputFocus {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-5px);
        }
    }
`;
document.head.appendChild(inputStyle);

// ===== PARALLAX EFFECT ON HERO =====
window.addEventListener('scroll', () => {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && window.innerWidth > 768) {
        const scrollPosition = window.pageYOffset;
        const parallaxAmount = scrollPosition * 0.5;
        heroVisual.style.transform = `translateY(${parallaxAmount}px)`;
    }
});

// ===== NAVBAR SHADOW ON SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-md)';
    }
});

// ===== PAGE LOAD ANIMATIONS =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Stagger animations for different sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animation = `fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s both`;
    });
});

// Initialize theme and language on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    
    // Add smooth transition to body
    document.body.style.transition = 'opacity 0.3s ease';
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Tab through navigation links
    if (e.key === 'Tab') {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('nav-link')) {
            navLinks.forEach(link => link.classList.remove('active'));
            activeElement.classList.add('active');
        }
    }
});

// ===== ACCESSIBILITY: PREFERS REDUCED MOTION =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.animation = 'none !important';
        el.style.transition = 'none !important';
    });
}

// ===== DEVICE MOCKUP HOVER EFFECT =====
const deviceScreen = document.querySelector('.device-screen');
if (deviceScreen) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const rect = deviceScreen.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 50;
            const y = (e.clientY - rect.top - rect.height / 2) / 50;
            
            deviceScreen.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        }
    });
    
    deviceScreen.addEventListener('mouseleave', () => {
        deviceScreen.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
}

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 Vopelo - Premium Web Design', 'font-size: 24px; font-weight: bold; color: #0071e3;');
console.log('%cProfessional. Modern. Powerful.', 'font-size: 14px; color: #666;');
