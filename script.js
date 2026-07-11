document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // MOBILE NAV MENU TOGGLE
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Toggle hamburger icon between bars and xmark
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('open')) {
                    icon.className = 'fa-solid fa-xmark';
                } else {
                    icon.className = 'fa-solid fa-bars';
                }
            }
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fa-solid fa-bars';
                }
            }
        });
    });

    // ==========================================
    // ACTIVE NAVIGATION LINKS ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    const navObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the section is visible
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // ==========================================
    // CONTACT FORM INTERACTIVE FEEDBACK
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && submitBtn && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Set loading state
            const origButtonHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span>Sending...</span>
                <i class="fa-solid fa-spinner fa-spin btn-icon-right"></i>
            `;

            // Clear previous feedback
            formFeedback.className = 'form-feedback hidden';
            formFeedback.textContent = '';

            // Get form values
            const nameInput = document.getElementById('name');
            const nameValue = nameInput ? nameInput.value.trim() : 'Guest';

            // Simulate form submission API delay
            setTimeout(() => {
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = origButtonHTML;

                // Show success feedback
                formFeedback.className = 'form-feedback success';
                formFeedback.innerHTML = `
                    <i class="fa-solid fa-circle-check icon-spacing"></i>
                    <strong>Thank you, ${nameValue}!</strong> Your message has been sent successfully. I will get back to you soon.
                `;

                // Reset form
                contactForm.reset();

                // Smooth scroll to feedback message if on mobile/small screen
                formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1800);
        });
    }
});
