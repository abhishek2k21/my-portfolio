// Smooth scroll for navigation links
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

// Minimal Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.background = 'rgba(5, 5, 5, 0.9)';
        navbar.style.borderBottom = '1px solid var(--border-subtle)';
    } else {
        navbar.style.background = 'rgba(5, 5, 5, 0.7)';
        navbar.style.borderBottom = '1px solid transparent';
    }
});

// Parallax effect for gradient orbs
// Parallax effect removed for minimal theme

// Advanced Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'active');

            // Add stagger classes directly to Grid children if the Grid itself is revealed
            if (entry.target.classList.contains('skills-grid') || entry.target.classList.contains('projects-grid')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.transitionDelay = `${index * 100}ms`;
                    child.classList.add('reveal', 'active');
                });
            }

            // navigate away
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

// Elements to animate
const revealSelectors = [
    '.hero-title',
    '.hero-description',
    '.hero-cta',
    '.stat-item',
    '.section-header',
    '.timeline-item',
    '.contact-content',
    '.skills-grid',  // Verify we observe the grid container for staggering
    '.projects-grid'
];

document.querySelectorAll(revealSelectors.join(', ')).forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Also observe individual glass cards just in case they aren't caught by grid logic
document.querySelectorAll('.skill-category, .project-card').forEach(el => {
    el.classList.add('reveal');
    // If parent is observed grid, don't observe individually to avoid double trigger
    if (!el.parentElement.classList.contains('skills-grid') && !el.parentElement.classList.contains('projects-grid')) {
        revealObserver.observe(el);
    }
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = 'var(--text-secondary)';
            });
            if (navLink) {
                navLink.style.color = 'var(--text-primary)';
            }
        }
    });
});

// Glass card hover effect with mouse tracking
// Mouse tracking for Deep Glass Spotlight effect
document.querySelectorAll('.skill-category, .project-card, .timeline-content').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // 3D Tilt Effect
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5; // Max -5deg to 5deg
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
    });
});

// Typing effect for hero title (optional - can be disabled)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle && heroTitle.dataset.typing === 'true') {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    setTimeout(typeWriter, 500);
}

// Add dynamic year to footer
const footer = document.querySelector('.footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} Abhishek Kumar. Designed & Built with passion.`;
}

console.log('%c Portfolio loaded successfully! 🚀', 'color: #00d9ff; font-size: 16px; font-weight: bold;');

// Dynamic Page Fading on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const scrollY = window.scrollY;

    // Fading sections based on scroll position
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;

        // Calculate distance from center
        const distance = Math.abs(viewportCenter - sectionCenter);
        const maxDist = windowHeight * 0.7; // Start fading when 70% away from center

        // Calculate opacity: 1 at center, fading to 0.4 at edges
        let opacity = 1 - Math.min((distance / maxDist), 0.6);

        section.style.opacity = opacity.toFixed(2);
        section.style.transform = `scale(${0.95 + (opacity * 0.05)})`;
        section.style.transition = 'opacity 0.1s ease-out, transform 0.1s ease-out';
    });
});