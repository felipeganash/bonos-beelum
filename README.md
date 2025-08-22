# 🎯 Bonificaciones BeeLum - Sistema de Recompensas TikTok

## 📝 Descripción
Presentación web interactiva del sistema de bonificaciones BeeLum para creadores de contenido en TikTok Live. Una experiencia visual moderna que comunica de forma clara y atractiva el programa de recompensas basado en diamantes.

## ✨ Características

### 🎨 Diseño Visual
- **Interfaz moderna** con animaciones fluidas y efectos visuales
- **Paleta de colores** inspirada en BeeLum (dorado) y TikTok (cyan/pink)
- **Efectos neón** y partículas flotantes para mayor dinamismo
- **100% responsivo** para todos los dispositivos

### 🚀 Funcionalidades
- **Navegación intuitiva** con teclado, mouse y gestos táctiles
- **Modo pantalla completa** para presentaciones
- **Indicadores de progreso** y navegación visual
- **Animaciones optimizadas** con GPU acceleration
- **Precarga inteligente** de diapositivas adyacentes

### 📊 Contenido (4 Diapositivas)
1. **Portada** - Introducción a las bonificaciones BeeLum
2. **Sistema de Diamantes** - Explicación del sistema de recompensas
3. **Requisitos** - Condiciones para participar en el programa
4. **Tabla de Bonificaciones** - Niveles de recompensas detallados

## 🛠️ Tecnologías Utilizadas
- HTML5 semántico
- CSS3 con animaciones avanzadas
- JavaScript Vanilla (sin dependencias)
- SVG para gráficos vectoriales
- Web Fonts (Google Fonts)

## 📁 Estructura del Proyecto
```
Bonificaciones/
├── index.html                  # Página principal con redirección
├── slides/                     # Diapositivas individuales
│   ├── slide-01.html          # Portada
│   ├── slide-02.html          # Sistema de Diamantes
│   ├── slide-03.html          # Requisitos
│   └── slide-04.html          # Tabla de Bonificaciones
├── css/                       # Estilos
│   ├── styles.css            # Estilos principales
│   ├── animations.css        # Animaciones
│   └── components.css        # Componentes reutilizables
├── js/                        # Scripts
│   └── slide-navigation.js   # Sistema de navegación
└── Recursos/                  # Assets (logos e imágenes)
```

## 🚀 Instalación y Uso

### Opción 1: Servidor Local con Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Opción 2: Servidor Local con Node.js
```bash
# Instalar servidor global (una vez)
npm install -g serve

# Ejecutar servidor
serve .
```

### Opción 3: Live Server en VS Code
1. Instalar extensión "Live Server"
2. Click derecho en `index.html`
3. Seleccionar "Open with Live Server"

### Acceder a la Presentación
Abrir navegador y visitar: `http://localhost:8000`

## ⌨️ Controles de Navegación

### Teclado
- `→` / `Espacio` / `Enter` - Siguiente diapositiva
- `←` / `Backspace` - Diapositiva anterior
- `Home` - Primera diapositiva
- `End` - Última diapositiva
- `F` / `F11` - Pantalla completa
- `Esc` - Salir de pantalla completa
- `1-4` - Ir directamente a la diapositiva

### Mouse
- Click en botones de navegación
- Click en indicadores de diapositivas

### Táctil (Móvil/Tablet)
- Swipe izquierda - Siguiente diapositiva
- Swipe derecha - Diapositiva anterior
- Tap en botones de navegación

## 💎 Tabla de Bonificaciones

| Diamantes | Ganancia Base | Bono BeeLum | Total |
|-----------|---------------|-------------|-------|
| 100,000 | $500 | $50 | **$550** |
| 200,000 | $1,000 | $100 | **$1,100** |
| 300,000 | $1,500 | $150 | **$1,650** |
| 500,000 | $2,500 | $250 | **$2,750** |
| 1,000,000 | $5,000 | $500 | **$5,500** |
| 2,500,000 | $12,500 | $1,250 | **$13,750** |
| 4,000,000 | $20,000 | $2,000 | **$22,000** |

## 📋 Requisitos para Participar

✅ **22 días de transmisión mensual**
- Cumplir con el mínimo de días activos

✅ **60 horas acumuladas**
- Las horas pueden distribuirse durante el mes

✅ **Mínimo 2 horas por transmisión**
- Cada transmisión debe durar al menos 2 horas

## 🎨 Personalización

### Colores
Editar variables en `/css/styles.css`:
```css
:root {
    --color-gold: #FDB813;    /* Color BeeLum */
    --color-cyan: #00F2EA;    /* TikTok Cyan */
    --color-pink: #FF0050;    /* TikTok Pink */
}
```

### Animaciones
Ajustar velocidades en `/css/animations.css`:
```css
.slow { animation-duration: 3s; }
.normal { animation-duration: 1.5s; }
.fast { animation-duration: 0.8s; }
```

## 🔧 Optimización

### Performance
- Imágenes optimizadas y comprimidas
- CSS y JS minificados para producción
- Precarga de recursos críticos
- Lazy loading implementado
- Animaciones con GPU acceleration

### SEO
- Meta tags completos
- Open Graph para redes sociales
- Estructura semántica HTML5
- URLs amigables

## 📱 Compatibilidad

### Navegadores
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Opera 76+ ✅

### Dispositivos
- Desktop (optimizado para 1920x1080)
- Tablets (iPad, Android tablets)
- Móviles (iPhone, Android)
- Smart TVs con navegador

## 🚀 Deployment

### GitHub Pages
```bash
git add .
git commit -m "Deploy presentación"
git push origin main
```

### Servidor Web
1. Subir todos los archivos al servidor
2. Configurar permisos (644 archivos, 755 carpetas)
3. Habilitar compresión gzip
4. Configurar caché de navegador

## 📄 Licencia
Proyecto desarrollado para **BeeLum Agency**. Todos los derechos reservados.

## 👥 Créditos
- **Cliente:** BeeLum Agency
- **Desarrollo:** Juan Ganash
- **Fecha:** Enero 2025
- **Versión:** 1.0.0

## 📞 Soporte
Para soporte o consultas sobre el proyecto, contactar con BeeLum Agency.

## 🔄 Actualizaciones Futuras
- [ ] Agregar más niveles de bonificación
- [ ] Integración con API de TikTok
- [ ] Dashboard de estadísticas en tiempo real
- [ ] Sistema de notificaciones
- [ ] Modo oscuro/claro
- [ ] Exportación a PDF
- [ ] Multi-idioma

---

*Desarrollado con ❤️ para BeeLum Agency*