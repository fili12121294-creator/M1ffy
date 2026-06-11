// Плавна прокрутка
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

// Обробка форми контактів
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (name && email && message) {
            alert(`Дякуємо, ${name}! Ваше повідомлення отримано. Ми зв'яжемось з вами на ${email}`);
            contactForm.reset();
        }
    });
}

// Анімація при прокручуванні
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// CTA кнопки
document.querySelectorAll('.cta-nav, .btn-primary, .btn-large').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('CTA клік:', this.textContent);
    });
});

console.log('ByteFlow - Tech Startup website loaded! 🚀');