// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if(navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    menuBtn.classList.remove('active');
                }
            }
        });
    });

    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(this);
            let isValid = true;
            let errorMessages = [];

            // Validate email
            const email = formData.get('email');
            if (!email || !/\S+@\S+\.\S+/.test(email)) {
                isValid = false;
                errorMessages.push('Please enter a valid email address');
            }

            // Validate other required fields
            formData.forEach((value, key) => {
                if (!value.trim()) {
                    isValid = false;
                    errorMessages.push(`Please fill in ${key}`);
                }
            });

            if (isValid) {
                // Show success message
                showNotification('Message sent successfully!', 'success');
                this.reset();
            } else {
                // Show error messages
                showNotification(errorMessages.join('\n'), 'error');
            }
        });
    }

    // Notification System
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Animate on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements to animate
    document.querySelectorAll('.service-card, .process-step, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // Dynamic Counter Animation for Stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target === Math.floor(target) ? '+' : '%');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === Math.floor(target) ? '+' : '%');
            }
        }, 20);
    }

    // Initialize stat counters when visible
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = Number(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => statsObserver.observe(stat));
});

// Add these styles to your CSS
const styles = `
    .scroll-top-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .scroll-top-btn.show {
        opacity: 1;
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    }

    .notification.success {
        background: #4CAF50;
    }

    .notification.error {
        background: #f44336;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .animate {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Add the styles to your document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Add to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Smooth transition when leaving page
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            document.body.style.opacity = 0;
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
});

function sendEmail(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const mailtoLink = `mailto:monstermindservices@gmail.com?subject=Contact from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    
    window.location.href = mailtoLink;
}

// Optional: Add floating label effect
document.querySelectorAll('.form-group input, .form-group textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    element.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});