// Controle de visibilidade dos menus com base na direção da rolagem

// Variáveis para controlar a rolagem
let lastScrollTop = 0;
let scrollTimer;
const header = document.querySelector('.header');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

// Configuração do popup do chatbot - desativado para evitar conflito
// O popup agora é gerenciado diretamente no index.html
document.addEventListener('DOMContentLoaded', function() {
    // O comportamento do botão whatsappButton foi movido para o index.html
    
    // Função para abrir o popup do chatbot
    function openChatbotPopup() {
        // Verificar se o popup já existe para evitar duplicação
        if (document.getElementById('chatbot-popup')) {
            document.getElementById('chatbot-popup').style.display = 'flex';
            return;
        }
        
        // Criar o container do popup
        const popupContainer = document.createElement('div');
        popupContainer.id = 'chatbot-popup';
        popupContainer.className = 'chatbot-popup';
        
        // Criar o conteúdo do popup
        popupContainer.innerHTML = `
            <div class="chatbot-popup-content">
                <div class="chatbot-popup-header">
                    <h3>Assistente Virtual Medinova</h3>
                    <button id="close-popup" aria-label="Fechar popup">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="chatbot-popup-body">
                    <iframe src="https://n8n-n8n-start.kof6cn.easypanel.host/webhook/97577522-1b6f-4c92-861f-a02391ffd13b/chat" frameborder="0"></iframe>
                </div>
            </div>
        `;
        
        // Adicionar o popup ao body
        document.body.appendChild(popupContainer);
        
        // Adicionar o CSS para o popup
        const style = document.createElement('style');
        style.textContent = `
            .chatbot-popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                backdrop-filter: blur(5px);
                animation: fadeIn 0.3s ease-out;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .chatbot-popup-content {
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                width: 90%;
                max-width: 400px;
                height: 600px;
                max-height: 80vh;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                animation: scaleIn 0.3s ease-out;
            }
            
            @keyframes scaleIn {
                from { transform: scale(0.9); }
                to { transform: scale(1); }
            }
            
            .chatbot-popup-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                background-color: #D9C7B6;
                color: #8D6E63;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }
            
            .chatbot-popup-header h3 {
                margin: 0;
                font-family: 'Playfair Display', serif;
                font-weight: 600;
            }
            
            #close-popup {
                background: none;
                border: none;
                color: #8D6E63;
                font-size: 18px;
                cursor: pointer;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s;
            }
            
            #close-popup:hover {
                background-color: rgba(141, 110, 99, 0.1);
            }
            
            .chatbot-popup-body {
                flex: 1;
                padding: 0;
                overflow: hidden;
            }
            
            .chatbot-popup-body iframe {
                width: 100%;
                height: 100%;
                border: none;
            }
            
            @media (max-width: 600px) {
                .chatbot-popup-content {
                    width: 95%;
                    height: 70vh;
                }
            }
        `;
        
        document.head.appendChild(style);
        
        // Configurar o botão de fechar
        document.getElementById('close-popup').addEventListener('click', function() {
            document.getElementById('chatbot-popup').style.display = 'none';
        });
        
        // Fechar ao clicar fora do popup
        popupContainer.addEventListener('click', function(e) {
            if (e.target === popupContainer) {
                popupContainer.style.display = 'none';
            }
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
        // Se não for o botão de WhatsApp, aplicar normalmente
        if (button.id !== 'whatsapp-button') {
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
        } else {
            // Para o botão de WhatsApp, adicionar o efeito ripple mas prevenir comportamento padrão
            button.addEventListener('click', function(e) {
                // Prevenir qualquer ação padrão
                e.preventDefault();
                e.stopPropagation();
                
                // Adicionar efeito ripple
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
                
                // Mostrar o popup do chatbot
                const chatbotPopup = document.getElementById('chatbot-popup');
                if (chatbotPopup) {
                    chatbotPopup.style.display = 'flex';
                }
            });
        }
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
