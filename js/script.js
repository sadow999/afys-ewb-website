document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('main-nav-menu'); 
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded.toString());
            menuToggle.innerHTML = isExpanded ? '<i class="fas fa-times" aria-hidden="true"></i>' : '<i class="fas fa-bars" aria-hidden="true"></i>';
        });

        // Close mobile menu when a navigation link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
                }
            });
        });
    }

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const bodyEl = document.body;
    if (themeToggle) {
        // Check saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            bodyEl.classList.add('dark');
            themeToggle.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
            themeToggle.setAttribute('aria-label', 'Activate light mode');
            themeToggle.setAttribute('aria-pressed', 'true');
        } else {
            themeToggle.setAttribute('aria-label', 'Activate dark mode');
            themeToggle.setAttribute('aria-pressed', 'false');
        }

        themeToggle.addEventListener('click', () => {
            const isDark = bodyEl.classList.toggle('dark');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun" aria-hidden="true"></i>' : '<i class="fas fa-moon" aria-hidden="true"></i>';
            themeToggle.setAttribute('aria-label', isDark ? 'Activate light mode' : 'Activate dark mode');
            themeToggle.setAttribute('aria-pressed', isDark.toString());
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // --- Fade-in on scroll ---
    const faders = document.querySelectorAll('.fade-in');
    if (faders.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        faders.forEach(el => observer.observe(el));
    }

    // --- Dynamic Copyright Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Active Navigation Link Highlighting ---
    const navLinks = document.querySelectorAll('.nav-menu a');
    if (navLinks.length > 0) {
        let currentPageFile = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            link.classList.remove('active'); 
            let linkFile = link.getAttribute('href').split('/').pop() || 'index.html';
            if (linkFile === currentPageFile) {
                link.classList.add('active');
            }
        });
    }

    // No interactive map JavaScript is needed anymore. The Google My Maps embed is self-contained.
    // The previous SVG map logic has been removed.
});