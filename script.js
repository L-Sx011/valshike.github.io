// ═══════════════════════════════════════════════════════════════════════
// СКРИПТЫ ДЛЯ САЙТА
// Этот файл отвечает за анимации и интерактивность
// ═══════════════════════════════════════════════════════════════════════

// Ждём полной загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // ═══════════════════════════════════════════════════════════════════
    // 1. МОБИЛЬНОЕ МЕНЮ
    // ═══════════════════════════════════════════════════════════════════
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Открытие/закрытие меню при клике на кнопку
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике на ссылку
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════
    // 2. АНИМАЦИИ ПРИ СКРОЛЛЕ
    // ═══════════════════════════════════════════════════════════════════
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Функция проверки видимости элемента
    function checkVisibility() {
        animatedElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Если элемент виден на 80% высоты окна
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    }
    
    // Проверяем при загрузке
    checkVisibility();
    
    // Проверяем при скролле
    window.addEventListener('scroll', checkVisibility);
    
    // ═══════════════════════════════════════════════════════════════════
    // 3. ИЗМЕНЕНИЕ ШАПКИ ПРИ СКРОЛЛЕ
    // ═══════════════════════════════════════════════════════════════════
    
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // ═══════════════════════════════════════════════════════════════════
    // 4. МОДАЛЬНОЕ ОКНО ДЛЯ ГАЛЕРЕИ
    // ═══════════════════════════════════════════════════════════════════
    
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Открытие модального окна при клике на фото
    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-image');
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокируем скролл
        });
    });
    
    // Закрытие по кнопке
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Закрытие по клику вне картинки
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Возвращаем скролл
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // 5. ОБРАБОТКА ФОРМЫ
    // ═══════════════════════════════════════════════════════════════════
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Предотвращаем отправку
            
            // Получаем данные формы
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Простая валидация
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            // Проверка email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Пожалуйста, введите корректный email');
                return;
            }
            
            // ═══════════════════════════════════════════════════════════
            // 🔧 ВАЖНО: Форма сейчас просто показывает сообщение
            // Чтобы получать письма, нужно настроить сервис (см. раздел ниже)
            // ═══════════════════════════════════════════════════════════
            
            alert('Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset(); // Очищаем форму
            
            // Вместо alert можно показать красивое уведомление
            // или перенаправить на страницу благодарности
        });
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // 6. ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ
    // ═══════════════════════════════════════════════════════════════════
    
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════
    // 7. ЭФФЕКТ ПАРАЛЛАКСА ДЛЯ HERO (опционально)
    // ═══════════════════════════════════════════════════════════════════
    
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    }

});

// ═══════════════════════════════════════════════════════════════════════
// ДОПОЛНИТЕЛЬНО: Защита от XSS атак
// ═══════════════════════════════════════════════════════════════════════

// Функция для безопасного вывода текста
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}