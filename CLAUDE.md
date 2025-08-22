# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TikTok Live rewards presentation system for BeeLum Agency. It's a static website with 4 animated slides showcasing bonus programs for content creators based on diamond accumulation.

## Key Commands

### Development Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js (requires http-server)
npm run serve:dev

# Using VS Code Live Server
# Right-click index.html > "Open with Live Server"
```

### Build & Optimization
```bash
# Build optimized version
npm run build

# Clean build directory
npm run clean

# Serve optimized build
npm run serve
```

## Architecture & Structure

### Navigation System
- **Single-page slides**: Each slide is an independent HTML file (`slide-01.html` to `slide-04.html`)
- **Navigation controller**: `js/slide-navigation.js` handles keyboard, touch, and button navigation
- **Preloading**: Adjacent slides are automatically prefetched for smooth transitions

### Styling Architecture
- **styles.css**: Core styles, CSS variables, layout grid
- **animations.css**: All keyframe animations and transition effects
- **components.css**: Reusable UI components (buttons, badges, tables)

### Scroll Fix Pattern
All slides use a fixed background with scrollable content overlay:
```html
<!-- Fixed background -->
<div class="slide-bg" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;">

<!-- Scrollable content -->
<div class="slide-content" style="position: relative; z-index: 2; padding-top: 5rem; padding-bottom: 3rem; min-height: 100vh;">
```

### Color Scheme
- **BeeLum Gold**: `#FDB813`
- **TikTok Cyan**: `#00F2EA` 
- **TikTok Pink**: `#FF00A1`
- **Background**: `#0A0A0A` (dark)

## Important Implementation Details

### Slide Requirements
- Each slide must include navigation metadata in `<head>`
- Slides use number-based navigation (1-4)
- All slides must load `slide-navigation.js`

### Animation Delays
- Use `.delay-1` through `.delay-12` classes for staggered animations
- Animations should cascade from top to bottom for better UX

### Table Structure (slide-04)
The bonus table follows a specific structure with highlight for the maximum tier (4M diamonds = $22,000)

### Assets Location
- Logos: `/Recursos/logo-beelum/` and `/Recursos/logo-tiktok/`
- Inspiration designs: `/Inspiracion/` (reference images for the presentation)

## Common Tasks

### Adding a New Slide
1. Copy an existing slide as template
2. Update slide number in meta tags
3. Update navigation links (prev/next)
4. Add to `availableSlides` array in `slide-navigation.js`

### Modifying Bonus Table
Edit the table in `slide-04.html`. The last row should have class `highlight-row` for emphasis.

### Adjusting Animations
Modify timing in `css/animations.css`. Standard durations:
- Fast: 0.8s
- Normal: 1.5s
- Slow: 3s

## Performance Considerations
- Images should be optimized and compressed
- Use CSS transforms for animations (GPU accelerated)
- Prefetch adjacent slides for smooth navigation
- Minimize inline styles when possible