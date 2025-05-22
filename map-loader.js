// Script para carregamento preguiçoso (lazy loading) do mapa
document.addEventListener('DOMContentLoaded', function() {
    const mapPlaceholder = document.getElementById('map-placeholder');
    const mapIframe = document.getElementById('map-iframe');
    const googleMap = document.getElementById('google-map');
    
    if (mapPlaceholder && mapIframe && googleMap) {
        mapPlaceholder.addEventListener('click', function() {
            // Obter a URL do atributo data-src
            const mapSrc = googleMap.getAttribute('data-src');
            
            // Definir o src do iframe (isso fará com que o mapa carregue)
            googleMap.setAttribute('src', mapSrc);
            
            // Mostrar o iframe do mapa
            mapIframe.style.display = 'block';
            
            // Ocultar o placeholder
            mapPlaceholder.style.display = 'none';
            
            // Adicionar classe para animação suave
            mapIframe.classList.add('map-fade-in');
        });
    }
});
