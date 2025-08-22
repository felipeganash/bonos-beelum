/**
 * Sistema de navegación para diapositivas individuales
 * Bonificaciones BeeLum - TikTok Live
 */

const slideNavigation = {
    // Configuración
    current: 1,
    total: 4,
    isTransitioning: false,
    availableSlides: [1, 2, 3, 4], // Todos los slides disponibles
    
    // Inicialización
    init() {
        // Obtener el número de slide actual desde la meta tag
        const slideMeta = document.querySelector('meta[name="slide-number"]');
        if (slideMeta) {
            this.current = parseInt(slideMeta.content);
        }
        
        // Configurar eventos de navegación
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
        this.setupFullscreen();
        
        // Pre-cargar slides adyacentes
        this.preloadAdjacentSlides();
        
        console.log(`📍 Slide ${this.current} de ${this.total} cargado`);
    },
    
    // Navegación con teclado
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previous();
                    break;
                case 'ArrowRight':
                case ' ':  // Espacio también avanza
                case 'Enter':  // Enter también avanza
                    e.preventDefault();
                    this.next();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(4);
                    break;
                case 'f':
                case 'F':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
            }
        });
    },
    
    // Navegación táctil/swipe
    setupTouchNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        this.handleSwipe = () => {
            if (this.isTransitioning) return;
            
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    this.next();
                } else {
                    // Swipe right - previous slide
                    this.previous();
                }
            }
        };
    },
    
    // Navegación entre slides
    navigate(slideNumber) {
        if (this.isTransitioning) return;
        if (slideNumber < 1 || slideNumber > 4) return;
        
        this.isTransitioning = true;
        
        const paddedNumber = String(slideNumber).padStart(2, '0');
        const nextUrl = `slide-${paddedNumber}.html`;
        
        // Transición suave
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = nextUrl;
        }, 300);
    },
    
    // Slide siguiente
    next() {
        const nextSlide = this.current + 1;
        if (nextSlide <= this.total) {
            this.navigate(nextSlide);
        }
    },
    
    // Slide anterior
    previous() {
        const prevSlide = this.current - 1;
        if (prevSlide >= 1) {
            this.navigate(prevSlide);
        }
    },
    
    // Ir a slide específico
    goToSlide(slideNumber) {
        if (this.availableSlides.includes(slideNumber)) {
            this.navigate(slideNumber);
        }
    },
    
    // Configurar pantalla completa
    setupFullscreen() {
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }
        
        // Actualizar icono cuando cambia el estado
        document.addEventListener('fullscreenchange', () => {
            this.updateFullscreenIcon();
        });
    },
    
    // Toggle pantalla completa
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    },
    
    // Actualizar icono de pantalla completa
    updateFullscreenIcon() {
        const icon = document.getElementById('fullscreenIcon');
        if (icon) {
            if (document.fullscreenElement) {
                icon.textContent = '✕';
            } else {
                icon.textContent = '⛶';
            }
        }
    },
    
    // Pre-cargar slides adyacentes
    preloadAdjacentSlides() {
        const preloadLinks = [];
        
        // Precargar slide anterior
        if (this.current > 1) {
            const prevNum = String(this.current - 1).padStart(2, '0');
            preloadLinks.push(`slide-${prevNum}.html`);
        }
        
        // Precargar slide siguiente
        if (this.current < this.total) {
            const nextNum = String(this.current + 1).padStart(2, '0');
            preloadLinks.push(`slide-${nextNum}.html`);
        }
        
        // Crear links de prefetch
        preloadLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = href;
            document.head.appendChild(link);
        });
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    slideNavigation.init();
    
    // Prevenir zoom en móviles
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
});

// Export para posible uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = slideNavigation;
}