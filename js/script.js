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
    
    // --- Interactive SVG Map Logic for EWB Page ---
    const mapContainer = document.getElementById('egypt-map-container');
    if (mapContainer) {
        const modalOverlay = document.getElementById('map-modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const modalClose = document.getElementById('modal-close');
        
        // Define data for clickable regions
        const governorateData = {
            sohag: {
                title: "Priority Projects in Sohag",
                content: `
                    <p>The villages of Sohag governorate are identified as having some of the highest poverty rates, ranging from 71% to 88%. AFYS & EWB have prioritized these communities for immediate intervention. Key villages include:</p>
                    <ul>
                        <li>Sheikh Makram, Sohag Center</li>
                        <li>Banawit, Al-Maragha Center</li>
                        <li>Mazata Sharq, Dar El-Salam Center</li>
                        <li>Al-Baskiya, Al-Balina Center</li>
                    </ul>
                    <p>These areas suffer from a severe lack of basic necessities. For instance, Banawit, with a population of over 18,000, has a poverty rate of 86.80% and lacks reliable access to clean drinking water and sanitation services, representing a critical need for a decent standard of living.</p>
                `
            }
            // You can add more data for other governorates here.
            // For example:
            // qena: { title: "Projects in Qena", content: "<p>Details about projects in Qena...</p>" }
        };

        document.querySelectorAll('#egypt-map .clickable').forEach(path => {
            path.addEventListener('click', () => {
                const governorateId = path.id;
                const data = governorateData[governorateId];

                if (data && modalOverlay) {
                    modalTitle.textContent = data.title;
                    modalBody.innerHTML = data.content;
                    modalOverlay.classList.add('active');
                }
            });
        });

        // Logic to close the modal
        if (modalOverlay) {
            modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
            
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    modalOverlay.classList.remove('active');
                }
            });
            
            // Listen for the escape key to close the modal
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                    modalOverlay.classList.remove('active');
                }
            });
        }
    }
});