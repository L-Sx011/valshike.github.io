document.addEventListener('DOMContentLoaded', function() {
    
    // ═══════════════════════════════════════════════════════════════════
    // 1. ТЕМА — НАСЛЕДОВАНИЕ ОТ СИСТЕМЫ
    // ═══════════════════════════════════════════════════════════════════
    
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
    }
    
    // Инициализация
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(getSystemTheme());
    }
    
    // Слушаем изменения системной темы
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    // Кнопка переключения
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const current = html.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
        
        // Двойной клик — сброс к системной теме
        themeToggle.addEventListener('dblclick', function() {
            localStorage.removeItem('theme');
            applyTheme(getSystemTheme());
        });
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // 2. МОБИЛЬНОЕ МЕНЮ
    // ═══════════════════════════════════════════════════════════════════
    
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // 3. ШАПКА И КНОПКА "НАВЕРХ"
    // ═══════════════════════════════════════════════════════════════════
    
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scrollTop');
    
    function handleScroll() {
        const scrollY = window.scrollY;
        
        if (header) {
            header.classList.toggle('scrolled', scrollY > 50);
        }
        
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', scrollY > 400);
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // 4. АНИМАЦИИ ПРИ СКРОЛЛЕ
    // ═══════════════════════════════════════════════════════════════════
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkVisibility() {
        const windowHeight = window.innerHeight;
        
        animatedElements.forEach(function(el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < windowHeight * 0.88) {
                el.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
    
    // ═══════════════════════════════════════════════════════════════════
    // 5. ПЛАВНЫЙ СКРОЛЛ
    // ═══════════════════════════════════════════════════════════════════
    
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerH = header ? header.offsetHeight : 0;
                const targetPos = target.offsetTop - headerH;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════
    // 6. ВКЛАДКИ ТУРА
    // ═══════════════════════════════════════════════════════════════════
    
    const tourTabs = document.querySelectorAll('.tour-tab');
    const tourContents = document.querySelectorAll('.tour-tab-content');
    
    tourTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            tourTabs.forEach(t => t.classList.remove('active'));
            tourContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById('tab-' + targetTab).classList.add('active');
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════
    // 7. FAQ АККОРДЕОН
    // ═══════════════════════════════════════════════════════════════════
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ═══════════════════════════════════════════════════════════════════
    // 8. ГАЛЕРЕЯ
    // ═══════════════════════════════════════════════════════════════════
    
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (modal && modalImage) {
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

});