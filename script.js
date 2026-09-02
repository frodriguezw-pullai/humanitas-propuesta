/* ============================================
   PULLAI PRESENTATION — BASE SCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');

    // --- Navbar scroll effect ---
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.pageYOffset > 100);
    });

    // --- Mobile hamburger toggle ---
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // --- Active nav link tracking ---
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 120;
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink);

    // --- Smooth scrolling with navbar offset ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Gantt bar animation ---
    const ganttBars = document.querySelectorAll('.gantt-bar');
    ganttBars.forEach(bar => {
        bar.style.animationPlayState = 'paused';
    });

    if (ganttBars.length > 0) {
        const ganttObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.gantt-bar');
                    bars.forEach(bar => {
                        bar.style.animationPlayState = 'running';
                    });
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.gantt-chart').forEach(chart => {
            ganttObserver.observe(chart);
        });
    }

    // --- Scroll reveal ---
    const revealSelectors = [
        '.card', '.stat-card', '.phase-card', '.budget-card',
        '.case-card', '.roadmap-card', '.why-card', '.pillar-card',
        '.platform-card', '.result-card', '.tech-category',
        '.e2e-step', '.process-step', '.medallion-layer',
        '.benefit-card', '.limitation-item', '.diagnostic-card',
        '.kpi-card', '.before-card', '.after-card', '.mockup-window',
        '.timeline-item'
    ].join(', ');

    const revealElements = document.querySelectorAll(revealSelectors);

    if (revealElements.length > 0) {
        // Inject reveal style
        const style = document.createElement('style');
        style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
        document.head.appendChild(style);

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, index * 50);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            revealObserver.observe(el);
        });
    }

    // --- Resize handler ---
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
        }
    });

    // --- Initial state ---
    window.addEventListener('load', () => {
        if (window.pageYOffset === 0) {
            const firstLink = document.querySelector('a[href="#inicio"]');
            if (firstLink) firstLink.classList.add('active');
        }
    });

    // --- Mermaid init (if present) ---
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'neutral',
            themeVariables: {
                primaryColor: '#f5f5f5',
                primaryBorderColor: '#000',
                primaryTextColor: '#333',
                lineColor: '#333',
                secondaryColor: '#e0e0e0',
                tertiaryColor: '#f5f5f5'
            }
        });
    }
});
