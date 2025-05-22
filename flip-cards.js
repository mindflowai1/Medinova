/**
 * Cards interativos de Antes e Depois - Medinova
 * Permite alternar entre as imagens "antes" e "depois" com efeito flip 3D
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar os cards interativos
    initFlipCards();
    
    // Animar entrada dos cards quando visíveis
    animateCardsOnScroll();
});

/**
 * Inicializa a funcionalidade de transição nos cards com animação aprimorada
 */
function initFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        // Pré-calcular transform para melhorar performance
        const baseTransform = window.getComputedStyle(card).transform;
        
        // Adicionar efeito de brilho sutil ao passar o mouse
        card.addEventListener('mousemove', function(e) {
            if (card.classList.contains('animating')) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posição X do mouse em relação ao card
            const y = e.clientY - rect.top;  // Posição Y do mouse em relação ao card
            
            // Calcular a intensidade do efeito 3D baseado na posição do mouse
            const tiltX = (y / rect.height - 0.5) * 4; // Efeito mais suave
            const tiltY = (0.5 - x / rect.width) * 4;
            
            // Aplicar transformação 3D sutil usando translate3d para aceleração por hardware
            card.style.transform = `perspective(1000px) translate3d(0, -5px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        // Remover efeito 3D ao tirar o mouse
        card.addEventListener('mouseleave', function() {
            if (!card.classList.contains('animating')) {
                card.style.transform = '';
            }
        });
        
        // Evento principal de clique com transição otimizada
        card.addEventListener('click', function() {
            // Prevenir cliques rápidos consecutivos
            if (card.classList.contains('animating')) return;
            
            // Usar requestAnimationFrame para otimizar performance
            requestAnimationFrame(() => {
                // Adicionar classe de animação em andamento
                card.classList.add('animating');
                
                // Forçar reflow para garantir que animações sejam aplicadas corretamente
                void card.offsetWidth;
                
                // Adicionar efeito premium de revelaÃ§Ã£o
                // Primeiro, um leve efeito de pulso elegante
                card.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
                card.style.transform = 'translate3d(0, -2px, 0) scale3d(1.01, 1.01, 1.01)';
                
                // Timing preciso para a sequÃªncia de animaÃ§Ãµes
                setTimeout(() => {
                    // Preparar o card para a transição principal
                    card.style.transition = '';
                    
                    // Forçar reflow para garantir que as animações sejam aplicadas corretamente
                    void card.offsetWidth;
                    
                    // Adicionar classe de filtro especial para efeito de depth
                    card.classList.add('depth-transition');
                    
                    // Alternar a classe 'flipped' para ativar a animação sofisticada
                    card.classList.toggle('flipped');
                    
                    // Adicionar som de transição sutil (opcional)
                    // const transitionSound = new Audio('sounds/transition.mp3');
                    // transitionSound.volume = 0.2;
                    // transitionSound.play().catch(e => console.log('Auto-play prevented'));
                    
                    // Atualizar o atributo aria-label para acessibilidade
                    if (card.classList.contains('flipped')) {
                        card.setAttribute('aria-label', 'Depois do tratamento. Clique para ver antes.');
                    } else {
                        card.setAttribute('aria-label', 'Antes do tratamento. Clique para ver depois.');
                    }
                    
                    // Remover classes de transição após a conclusão
                    setTimeout(() => {
                        card.classList.remove('animating');
                        card.classList.remove('depth-transition');
                        
                        // Resetar transform apenas se não estiver com hover
                        if (!card.matches(':hover')) {
                            card.style.transform = '';
                        }
                    }, 750); // Ajustado para a nova duração da transição CSS
                }, 80); // Timing reduzido para resposta mais rápida
            });
        });
        
        // Adicionar evento de teclado para acessibilidade
        card.addEventListener('keydown', function(e) {
            // Ativar com a tecla Enter ou Espaço
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
        
        // Tornar o card focável para navegação por teclado
        card.setAttribute('tabindex', '0');
    });
}

/**
 * Detecta quando os cards estão visíveis na tela para animá-los
 */
function animateCardsOnScroll() {
    const cards = document.querySelectorAll('.flip-card');
    
    function checkVisibility() {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                card.style.opacity = '1';
            }
        });
    }
    
    // Verificar visibilidade inicial e ao rolar
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
}

// Adicionar dica visual de hover
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.flip-card')) {
        const card = e.target.closest('.flip-card');
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    }
});
