/**
 * Animações para a seção de Depoimentos - Medinova
 * Implementa fade-in sequencial dos cards de depoimento quando entram na viewport
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animações dos depoimentos
    initDepoimentosAnimations();
});

/**
 * Inicializa as animações dos cards de depoimentos
 */
function initDepoimentosAnimations() {
    const depoimentoCards = document.querySelectorAll('.depoimento-card');
    
    // Configurar o observador de interseção para detectar quando os cards entram na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Quando o card estiver visível na viewport
            if (entry.isIntersecting) {
                const card = entry.target;
                const delay = parseInt(card.getAttribute('data-delay') || 0);
                
                // Animar com fade-in sequencial
                setTimeout(() => {
                    card.style.animation = `fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
                }, delay * 150); // Cada card anima com 150ms de intervalo
                
                // Remover o observador após a animação
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.2, // Animar quando pelo menos 20% do card estiver visível
        rootMargin: '0px 0px -50px 0px' // Ajuste para começar a animação um pouco antes
    });
    
    // Observar cada card de depoimento
    depoimentoCards.forEach(card => {
        observer.observe(card);
    });
    
    // Adicionar efeito de hover aos cards
    depoimentoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}
