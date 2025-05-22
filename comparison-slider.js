/**
 * Slider de Antes e Depois com efeito Fade - Medinova
 * Baseado no exemplo de código fornecido
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos os sliders com efeito fade
    initFadeSliders();
    
    // Animar entrada dos itens quando visíveis
    animateItemsOnScroll();
});

function initFadeSliders() {
    const sliders = document.querySelectorAll('.before-after-fade-slider');
    
    sliders.forEach((slider, index) => {
        const afterImage = slider.querySelector('.after-image');
        const sliderControl = slider.querySelector('.slider-control');
        const overlay = slider.querySelector('.fade-overlay');
        const labelAfter = slider.querySelector('.label-after');
        
        // Configurar evento de input para o controle range
        sliderControl.addEventListener('input', function(e) {
            handleSliderChange(e.target.value, afterImage, overlay, labelAfter);
        });
        
        // Atualizar para o estado inicial (0%)
        handleSliderChange(0, afterImage, overlay, labelAfter);
    });
}

function handleSliderChange(value, afterImage, overlay, labelAfter) {
    // Converter para número entre 0 e 1
    const percentage = value / 100;
    
    // Atualizar opacidade da imagem "depois"
    afterImage.style.opacity = percentage;
    
    // Atualizar texto do overlay
    overlay.textContent = `Comparação: ${value}%`;
    
    // Atualizar opacidade do label "Depois" baseado na posição do slider
    if (percentage > 0.5) {
        labelAfter.style.opacity = 1;
    } else {
        labelAfter.style.opacity = percentage * 2; // Multiplicar por 2 para atingir opacidade 1 em 50%
    }
}

/**
 * Animação de entrada dos itens quando visíveis no viewport
 */
function animateItemsOnScroll() {
    const checkScroll = function() {
        const items = document.querySelectorAll('.antes-depois-item');
        
        items.forEach(item => {
            const position = item.getBoundingClientRect();
            
            // Se o item estiver visível na tela
            if (position.top < window.innerHeight - 100) {
                item.classList.add('visible');
            }
        });
    };
    
    // Verificar itens visíveis no carregamento inicial
    checkScroll();
    
    // Verificar itens visíveis durante o scroll
    window.addEventListener('scroll', checkScroll);
}
