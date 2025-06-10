document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('main-nav-menu'); 

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded.toString());
            
            if (isExpanded) {
                menuToggle.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
                menuToggle.setAttribute('aria-label', 'Close navigation menu');
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
                menuToggle.setAttribute('aria-label', 'Open navigation menu');
            }
        });

        // Close mobile menu when a navigation link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
                    menuToggle.setAttribute('aria-label', 'Open navigation menu');
                }
            });
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Active navigation link highlighting
    const navLinks = document.querySelectorAll('.nav-menu li a');
    if (navLinks.length > 0) {
        let currentPageFile = window.location.pathname.split('/').pop();
        if (currentPageFile === "" || currentPageFile === undefined) {
            currentPageFile = "index.html"; 
        }

        navLinks.forEach(link => {
            link.classList.remove('active'); 
            const linkHref = link.getAttribute('href');
            let linkFile = linkHref.split('/').pop();
            if (linkFile === "" && linkHref.endsWith('/')) { 
                linkFile = "index.html"; 
            } else if (linkFile === "" && !linkHref.endsWith('/')) {
                linkFile = linkHref; 
            }

            if (linkFile === currentPageFile) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll for in-page anchor links
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1 && targetId.startsWith('#')) { 
                try {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        if (!motionQuery.matches) { 
                            targetElement.scrollIntoView({
                                behavior: 'smooth'
                            });
                        } else { 
                            targetElement.scrollIntoView();
                        }
                    }
                } catch (error) {
                    console.warn("Smooth scroll: Invalid selector or element not found for", targetId, error);
                }
            }
        });
    });
});