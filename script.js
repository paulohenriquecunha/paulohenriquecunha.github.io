// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add shadow to navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Contact form (mailto) handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formFeedback = document.getElementById('formFeedback');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Collect values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Simple client-side validation
            if (!name || !email || !subject || !message) {
                if (formFeedback) {
                    formFeedback.textContent = 'Por favor, preencha todos os campos.';
                    formFeedback.classList.remove('success');
                    formFeedback.classList.add('error');
                }
                return;
            }

            const to = 'ppaulo_henrique@hotmail.com';
            const mailSubject = encodeURIComponent(subject);
            const mailBody = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\n${message}`);
            const mailtoLink = `mailto:${to}?subject=${mailSubject}&body=${mailBody}`;

            if (formFeedback) {
                formFeedback.textContent = 'Abrindo seu cliente de e-mail...';
                formFeedback.classList.remove('error');
                formFeedback.classList.add('success');
            }

            // Open the default email client
            window.location.href = mailtoLink;

            // Reset form after short delay
            setTimeout(() => {
                contactForm.reset();
                if (formFeedback) {
                    formFeedback.textContent = 'Mensagem pronta no seu cliente de e-mail. Envie para concluir.';
                }
            }, 1000);
        });
    }
});