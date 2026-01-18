// Efeitos de Parallax Surreal e Absurdo - VERSÃO ATUALIZADA
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o dispositivo é móvel para reduzir efeitos
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Se o usuário prefere reduzir movimento ou é dispositivo móvel, não aplica efeitos pesados
    if (prefersReducedMotion || isMobile) {
        console.log('Efeitos de parallax reduzidos para melhor performance.');
        return;
    }
    
    // Verifica se o menu está aberto para pausar efeitos
    function isMenuOpen() {
        const navLinks = document.getElementById('navLinks');
        return navLinks && navLinks.classList.contains('active');
    }
    
    // Elementos de fundo flutuantes
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    // Elementos com efeito de parallax
    const parallaxElements = document.querySelectorAll('[data-speed]');
    const parallaxCards = document.querySelectorAll('.parallax-card');
    const parallaxTips = document.querySelectorAll('.parallax-tip');
    
    // Controle de rolagem
    let scrollPosition = 0;
    let ticking = false;
    
    // Aplica efeito de parallax baseado no scroll
    function applyParallax() {
        // Se o menu estiver aberto, não aplica efeitos
        if (isMenuOpen()) return;
        
        // Move formas flutuantes de fundo
        floatingShapes.forEach((shape, index) => {
            const speed = 0.05 + (index * 0.02);
            const yOffset = scrollPosition * speed;
            const xOffset = Math.sin(scrollPosition * 0.001 + index) * 50;
            
            shape.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
        });
        
        // Aplica parallax em elementos com data-speed
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            const yOffset = scrollPosition * speed * 0.5;
            
            // Para títulos e textos, aplicamos um movimento mais sutil
            if (element.classList.contains('parallax-title') || 
                element.classList.contains('parallax-heading') ||
                element.classList.contains('parallax-subheading')) {
                element.style.transform = `translate3d(0, ${yOffset * 0.3}px, 0)`;
            } else if (element.classList.contains('parallax-text') || 
                      element.classList.contains('parallax-subtitle')) {
                element.style.transform = `translate3d(0, ${yOffset * 0.2}px, 0)`;
            } else if (element.classList.contains('parallax-btn')) {
                element.style.transform = `translate3d(0, ${yOffset * 0.4}px, 0) rotate(${Math.sin(scrollPosition * 0.01) * 2}deg)`;
            } else {
                element.style.transform = `translate3d(0, ${yOffset * 0.5}px, 0)`;
            }
        });
        
        // Efeito surreal para cards - movimento 3D absurdo
        parallaxCards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.top + cardRect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distanceFromCenter = cardCenter - viewportCenter;
            
            // Movimento baseado na posição na tela
            const speed = parseFloat(card.getAttribute('data-speed')) || 0.5;
            const rotation = parseFloat(card.getAttribute('data-rotation')) || 0;
            
            // Movimento absurdo: rotação e translação exageradas
            const rotateX = (distanceFromCenter / viewportCenter) * 10;
            const rotateY = (Math.sin(scrollPosition * 0.005) * rotation * 2);
            const translateY = scrollPosition * speed * 0.3;
            const translateX = Math.sin(scrollPosition * 0.003 + cardRect.top) * 20;
            
            // Efeito de "flutuação" adicional
            const floatEffect = Math.sin(scrollPosition * 0.002 + cardRect.left) * 15;
            
            card.style.transform = `
                translate3d(${translateX + floatEffect}px, ${translateY}px, 0)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
            
            // Efeito de brilho baseado na posição
            const glowIntensity = Math.abs(distanceFromCenter / viewportCenter) * 0.3;
            card.style.boxShadow = `
                0 15px 35px rgba(217, 140, 163, ${0.2 + glowIntensity}),
                0 5px 15px rgba(127, 191, 182, ${0.1 + glowIntensity})
            `;
        });
        
        // Efeito para as dicas - movimento de "ondulação"
        parallaxTips.forEach(tip => {
            const tipRect = tip.getBoundingClientRect();
            const direction = parseInt(tip.getAttribute('data-direction')) || 1;
            const speed = parseFloat(tip.getAttribute('data-speed')) || 0.5;
            
            // Movimento de onda absurdo
            const waveX = Math.sin(scrollPosition * 0.002 + tipRect.top * 0.01) * 30 * direction;
            const waveY = Math.cos(scrollPosition * 0.0015 + tipRect.left * 0.01) * 20;
            const rotation = Math.sin(scrollPosition * 0.001 + tipRect.top) * 3;
            
            tip.style.transform = `
                translate3d(${waveX}px, ${waveY + (scrollPosition * speed * 0.1)}px, 0)
                rotate(${rotation}deg)
            `;
            
            // Efeito de borda pulsante
            const pulse = Math.sin(scrollPosition * 0.003 + tipRect.top) * 0.5 + 0.5;
            tip.style.borderLeftColor = `rgba(217, 140, 163, ${0.7 + pulse * 0.3})`;
        });
        
        // Efeito na navbar - ela "respira" com o scroll
        const navbar = document.querySelector('.navbar');
        if (navbar && !isMenuOpen()) {
            const breathe = Math.sin(scrollPosition * 0.005) * 2;
            navbar.style.transform = `translateY(${breathe}px)`;
        }
        
        // Efeito absurdo no vídeo do hero - distorção surreal
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            const scale = 1 + Math.sin(scrollPosition * 0.0005) * 0.05;
            const rotate = Math.sin(scrollPosition * 0.0003) * 0.5;
            
            heroVideo.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
        }
        
        // Efeito de "respiração" para elementos de formulário
        const formElements = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
        formElements.forEach(element => {
            const breathe = Math.sin(scrollPosition * 0.002 + element.offsetTop) * 2;
            element.style.transform = `translateY(${breathe}px)`;
        });
        
        // Efeito de rotação absurda para ícones (apenas se não estiver no menu)
        const icons = document.querySelectorAll('.contact-item i, .tip i');
        icons.forEach((icon, index) => {
            const rotation = scrollPosition * 0.05 + (index * 10);
            icon.style.transform = `rotate(${rotation % 360}deg)`;
        });
    }
    
    // Atualiza a posição do scroll de forma otimizada
    function updateScroll() {
        // Se o menu estiver aberto, não atualiza o parallax
        if (isMenuOpen()) return;
        
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                applyParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Inicializa o efeito de parallax
    function initParallax() {
        // Configura os estilos iniciais
        parallaxElements.forEach(element => {
            element.style.willChange = 'transform';
            element.style.transition = 'transform 0.1s linear';
        });
        
        parallaxCards.forEach(card => {
            card.style.willChange = 'transform, box-shadow';
            card.style.transition = 'transform 0.1s linear, box-shadow 0.1s linear';
        });
        
        parallaxTips.forEach(tip => {
            tip.style.willChange = 'transform, border-color';
            tip.style.transition = 'transform 0.1s linear, border-color 0.1s linear';
        });
        
        // Adiciona listeners
        window.addEventListener('scroll', updateScroll, { passive: true });
        window.addEventListener('resize', updateScroll, { passive: true });
        
        // Aplica efeito inicial
        updateScroll();
        
        console.log('Efeitos de parallax surreal ativados! Prepare-se para uma experiência visual absurda!');
    }
    
    // Inicia os efeitos após um pequeno delay para garantir que tudo carregou
    setTimeout(initParallax, 100);
});