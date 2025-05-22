// Controle de visibilidade dos menus com base na direção da rolagem

// Variáveis para controlar a rolagem
let lastScrollTop = 0;
let scrollTimer;
const header = document.querySelector('.header');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

// Configuração do botão de WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.getElementById('whatsapp-button');
    
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            const whatsappURL = 'https://wa.me/5531999999999?text=Olá! Gostaria de agendar uma avaliação na Medinova.';
            window.open(whatsappURL, '_blank');
        });
    }
});

// Função para controlar a visibilidade dos menus
function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Determinar a direção da rolagem
    if (scrollTop > lastScrollTop && scrollTop > 150) {
        // Rolando para baixo e além do limite - esconder os menus
        header.classList.add('header-hidden');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.add('menu-toggle-hidden');
        }
    } else {
        // Rolando para cima ou no topo - mostrar os menus
        header.classList.remove('header-hidden');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('menu-toggle-hidden');
        }
    }
    
    // Adicionar classe scrolled independente da direção
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Atualizar a posição da última rolagem
    lastScrollTop = scrollTop;
}

// Otimizar o event listener com throttling
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(handleScroll, 10); // Pequeno delay para performance
});

// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Função para abrir/fechar o menu mobile
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        
        // Controlar o scroll do body quando o menu está aberto
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Função específica para fechar o menu (independente do estado)
    function closeMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMenu);
    mobileMenuClose.addEventListener('click', closeMenu);
    
    // Inicialização do botão de fechamento com prioridade
    if (mobileMenuClose) {
        // Remover e readicionar para garantir que o evento seja registrado corretamente
        mobileMenuClose.removeEventListener('click', closeMenu);
        mobileMenuClose.addEventListener('click', closeMenu);
    }
    
    // Fechar o menu ao clicar em um link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu(); // Usando a função direta de fechamento em vez do toggle
            
            // Rolagem suave ao clicar nos links
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                setTimeout(() => {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 400); // Pequeno delay para melhorar a experiência
            }
        });
    });
});

// Efeito ripple para o botão CTA
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Rolagem suave para links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Antes e Depois Slider - implementação simplificada
    document.addEventListener('DOMContentLoaded', function() {
        initBeforeAfterSliders();
    });

    function initBeforeAfterSliders() {
        const sliders = document.querySelectorAll('.slider-container');
        
        sliders.forEach(slider => {
            const beforeImage = slider.querySelector('.before-image');
            const sliderHandle = slider.querySelector('.slider-handle');
            let isDragging = false;
            
            // Atualizar a posição do divisor
            function updateSliderPosition(clientX) {
                const rect = slider.getBoundingClientRect();
                const position = (clientX - rect.left) / rect.width;
                const percentage = Math.max(0.05, Math.min(position, 0.95)) * 100;
                
                // Atualizar o clip-path para mostrar a parte correta da imagem 'antes'
                beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
                sliderHandle.style.left = `${percentage}%`;
            }
            
            // Mouse events
            sliderHandle.addEventListener('mousedown', function(e) {
                isDragging = true;
                document.body.style.userSelect = 'none'; // Prevenir seleção de texto durante arrasto
            });
            
            document.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                updateSliderPosition(e.clientX);
            });
            
            document.addEventListener('mouseup', function() {
                isDragging = false;
                document.body.style.userSelect = '';
            });
            
            // Touch events
            sliderHandle.addEventListener('touchstart', function(e) {
                isDragging = true;
            });
            
            document.addEventListener('touchmove', function(e) {
                if (!isDragging) return;
                updateSliderPosition(e.touches[0].clientX);
            });
            
            document.addEventListener('touchend', function() {
                isDragging = false;
            });
            
            // Permitir clique diretamente no slider
            slider.addEventListener('click', function(e) {
                updateSliderPosition(e.clientX);
            });
        });
        
        // Animação de entrada para os itens
        setTimeout(function() {
            document.querySelectorAll('.antes-depois-item').forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 300);
    }
    
    // Animação de revelação dos itens "Antes e Depois" ao scroll
    const antesDepoisItems = document.querySelectorAll('.antes-depois-item');
    
    function revealOnScroll() {
        antesDepoisItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight - 100) {
                // Adiciona delay progressivo para cada item
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200); // 200ms de delay entre cada item
            }
        });
    }
    
    // Verifica na carga inicial e no scroll
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
});
