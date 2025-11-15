// Script principal do site de portfólio
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle do menu mobile
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');

            const expanded = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Rolagem suave para âncoras internas (se existirem)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (!targetId || targetId === '#' || targetId.length === 1) {
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sombra dinâmica na navbar conforme o scroll
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.12)';
        } else {
            navbar.style.boxShadow = '0 5px 15px rgba(15, 23, 42, 0.08)';
        }
    });

    // Handler do formulário de contato (abre o cliente de e-mail)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formFeedback = document.getElementById('formFeedback');

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            if (!name || !email || !subject || !message) {
                if (formFeedback) {
                    formFeedback.textContent = 'Por favor, preencha todos os campos antes de enviar.';
                    formFeedback.classList.remove('success');
                    formFeedback.classList.add('error');
                }
                return;
            }

            const to = 'ppaulo_henrique@hotmail.com';
            const mailSubject = encodeURIComponent(subject);
            const mailBody = encodeURIComponent(
                `Nome: ${name}\nE-mail: ${email}\n\n${message}`
            );
            const mailtoLink = `mailto:${to}?subject=${mailSubject}&body=${mailBody}`;

            if (formFeedback) {
                formFeedback.textContent = 'Abrindo o seu cliente de e-mail...';
                formFeedback.classList.remove('error');
                formFeedback.classList.add('success');
            }

            window.location.href = mailtoLink;

            setTimeout(() => {
                contactForm.reset();
                if (formFeedback) {
                    formFeedback.textContent = 'Mensagem preparada no seu cliente de e-mail. Basta conferir e enviar.';
                }
            }, 800);
        });
    }
});
