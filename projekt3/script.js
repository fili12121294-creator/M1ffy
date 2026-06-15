// Плавна прокрутка до секцій при клику на навігацію
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Кнопка "Дізнатися більше" - скрол до характеристик
const heroBtn = document.querySelector('.btn-hero');
if (heroBtn) {
    heroBtn.addEventListener('click', function() {
        document.getElementById('specs').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Кнопка "Купити зараз"
const buyBtn = document.querySelector('.btn-primary');
if (buyBtn && buyBtn.textContent.includes('Купити')) {
    buyBtn.addEventListener('click', function() {
        alert('Спасибі за ваш інтерес! Товар додано до кошика. Перейдіть до оформлення замовлення.');
    });
}

// Контактна форма
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;
        
        // Валідація
        if (!name || !email || !phone || !message) {
            alert('Будь ласка, заповніть всі поля!');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Будь ласка, введіть коректну пошту!');
            return;
        }
        
        console.log('Дані форми:', { name, email, phone, message });
        alert('Спасибі за вашу розпитку! Ми зв\'яжемося з вами найближчим часом.');
        this.reset();
    });
}

// Активна навігаційна посилання
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Счётчик при наведенні на ціну
let isAnimating = false;
const priceElement = document.querySelector('.price');
if (priceElement) {
    priceElement.addEventListener('mouseenter', function() {
        if (!isAnimating) {
            isAnimating = true;
            let count = 0;
            const target = 2499;
            const increment = target / 30;
            
            const counter = setInterval(() => {
                count += increment;
                if (count >= target) {
                    this.textContent = '₴' + target;
                    clearInterval(counter);
                    isAnimating = false;
                } else {
                    this.textContent = '₴' + Math.floor(count);
                }
            }, 20);
        }
    });
}

// Затемнення навігації при скролінгу
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }
});

// Галерея - більш детальний перегляд
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const p = this.querySelector('p');
        console.log('Клік по фото:', p.textContent);
        // Можна додати модальне вікно для більшого перегляду
    });
});

// Анімація при скролінгу - з'явлення елементів
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Анімація карток
document.querySelectorAll('.spec-card, .advantage-card, .review-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

console.log('✓ Сайт Lifana SR220 успішно завантажений!');