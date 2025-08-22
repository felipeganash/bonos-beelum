#!/usr/bin/env node

/**
 * Build Script para Optimización de Slides BeeLum
 * ================================================
 * 
 * Este script genera versiones optimizadas de las diapositivas:
 * - Inline Critical CSS
 * - Minifica HTML, CSS y JavaScript
 * - Reduce el uso de RAM del cliente
 * - Mejora el tiempo de carga inicial
 */

const fs = require('fs').promises;
const path = require('path');
const { minify } = require('html-minifier-terser');

// Configuración
const config = {
    inputDir: './slides',
    outputDir: './dist',
    cssDir: './css',
    jsDir: './js',
    // CSS crítico que se va a inline en cada página
    criticalCSS: `
        /* Critical CSS - Above the fold */
        :root {
            --color-black: #000000;
            --color-white: #FFFFFF;
            --color-gold: #FDB813;
            --color-cyan: #00F2EA;
            --color-pink: #FF0050;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { font-size: 16px; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #000;
            color: #fff;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }
        .slide-container {
            width: 100vw;
            height: 100vh;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .slide-content {
            position: relative;
            z-index: 10;
            text-align: center;
            padding: 2rem;
        }
        .fade-in { opacity: 0; animation: fadeIn 0.8s ease forwards; }
        @keyframes fadeIn {
            to { opacity: 1; transform: translateY(0); }
        }
        h1 { font-size: 3rem; font-weight: 700; }
        .gradient-text {
            background: linear-gradient(90deg, #00F2EA, #FF0050, #FDB813);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    `
};

// Función para minificar CSS
function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Replace multiple spaces
        .replace(/\s*{\s*/g, '{') // Remove spaces around {
        .replace(/\s*}\s*/g, '}') // Remove spaces around }
        .replace(/\s*:\s*/g, ':') // Remove spaces around :
        .replace(/\s*;\s*/g, ';') // Remove spaces around ;
        .replace(/\s*,\s*/g, ',') // Remove spaces around ,
        .trim();
}

// Función para optimizar HTML
async function optimizeHTML(htmlContent, fileName) {
    // Inline critical CSS
    const criticalCSSTag = `<style>${minifyCSS(config.criticalCSS)}</style>`;
    
    // Reemplazar link a CSS con critical CSS inline y lazy load del resto
    htmlContent = htmlContent.replace(
        /<link rel="stylesheet" href="\.\.\/css\/styles\.css">/,
        `${criticalCSSTag}
        <link rel="preload" href="../css/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <noscript><link rel="stylesheet" href="../css/styles.css"></noscript>`
    );
    
    // Lazy load para CSS no crítico
    htmlContent = htmlContent.replace(
        /<link rel="stylesheet" href="\.\.\/css\/animations\.css">/,
        '<link rel="preload" href="../css/animations.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">'
    );
    
    htmlContent = htmlContent.replace(
        /<link rel="stylesheet" href="\.\.\/css\/components\.css">/,
        '<link rel="preload" href="../css/components.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">'
    );
    
    // Defer JavaScript
    htmlContent = htmlContent.replace(
        /<script src="\.\.\/js\/slide-navigation\.js"><\/script>/,
        '<script src="../js/slide-navigation.js" defer></script>'
    );
    
    // Minificar HTML
    const minified = await minify(htmlContent, {
        collapseWhitespace: true,
        removeComments: true,
        removeOptionalTags: false, // Mantener estructura HTML válida
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        processScripts: ['text/javascript']
    });
    
    return minified;
}

// Función principal de build
async function build() {
    console.log('🚀 Iniciando optimización de slides...\n');
    
    try {
        // Crear directorio de salida
        await fs.mkdir(config.outputDir, { recursive: true });
        await fs.mkdir(path.join(config.outputDir, 'slides'), { recursive: true });
        
        // Copiar recursos estáticos
        console.log('📁 Copiando recursos estáticos...');
        await fs.cp('./Recursos', path.join(config.outputDir, 'Recursos'), { recursive: true });
        await fs.cp('./css', path.join(config.outputDir, 'css'), { recursive: true });
        await fs.cp('./js', path.join(config.outputDir, 'js'), { recursive: true });
        
        // Optimizar index.html
        console.log('📄 Optimizando index.html...');
        const indexContent = await fs.readFile('./index.html', 'utf-8');
        const optimizedIndex = await minify(indexContent, {
            collapseWhitespace: true,
            removeComments: true
        });
        await fs.writeFile(path.join(config.outputDir, 'index.html'), optimizedIndex);
        
        // Optimizar cada slide
        const slides = await fs.readdir(config.inputDir);
        const htmlFiles = slides.filter(file => file.endsWith('.html'));
        
        for (const file of htmlFiles) {
            console.log(`📄 Optimizando ${file}...`);
            const content = await fs.readFile(path.join(config.inputDir, file), 'utf-8');
            const optimized = await optimizeHTML(content, file);
            await fs.writeFile(path.join(config.outputDir, 'slides', file), optimized);
        }
        
        // Crear archivo de estadísticas
        const stats = {
            originalSize: 0,
            optimizedSize: 0,
            files: []
        };
        
        for (const file of htmlFiles) {
            const originalPath = path.join(config.inputDir, file);
            const optimizedPath = path.join(config.outputDir, 'slides', file);
            const originalStats = await fs.stat(originalPath);
            const optimizedStats = await fs.stat(optimizedPath);
            
            stats.originalSize += originalStats.size;
            stats.optimizedSize += optimizedStats.size;
            stats.files.push({
                name: file,
                original: originalStats.size,
                optimized: optimizedStats.size,
                reduction: ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(2) + '%'
            });
        }
        
        console.log('\n✅ Optimización completada!\n');
        console.log('📊 Estadísticas:');
        console.log(`   Tamaño original: ${(stats.originalSize / 1024).toFixed(2)} KB`);
        console.log(`   Tamaño optimizado: ${(stats.optimizedSize / 1024).toFixed(2)} KB`);
        console.log(`   Reducción total: ${((1 - stats.optimizedSize / stats.originalSize) * 100).toFixed(2)}%\n`);
        
        stats.files.forEach(file => {
            console.log(`   ${file.name}: ${file.reduction} reducción`);
        });
        
        console.log('\n📁 Archivos optimizados guardados en:', path.resolve(config.outputDir));
        
    } catch (error) {
        console.error('❌ Error durante la optimización:', error);
        process.exit(1);
    }
}

// Ejecutar build
build();