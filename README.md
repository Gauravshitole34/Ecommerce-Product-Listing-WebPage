# E-Commerce Product Listing Page

A modern, responsive e-commerce product catalog built with vanilla HTML5, CSS3, and JavaScript ES6, featuring advanced 3D interactions, smooth animations, and comprehensive accessibility features.

![Remix E-Commerce Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple)

## 🚀 Quick Start

1. **Download the project** (either clone or download zip)
2. **Open `index.html`** in any modern web browser

## 📁 Project Structure

```
ecommerce-remix/
├── index.html              # Main HTML file
├── styles.css          # Complete stylesheet with Remix design system
├── app.js              # Main JavaScript functionality
├── products.json       # Sample product data
└── README.md              # This file
```

## ✨ Features

### 🎨 Design System - "Remix" Color Palette
The application uses a carefully crafted color system with accessibility in mind:

- **Primary Teal**: `#28C0BE` - Main brand color with excellent contrast
- **Purple Accent**: `#6B46C1` - Secondary actions and highlights  
- **Pink CTA**: `#FF4D95` - Call-to-action buttons and important interactions
- **Yellow Highlight**: `#FFD166` - Sale badges and promotional content

### 🏗️ Core Functionality

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Product Grid**: Configurable grid layout (1-4 columns based on screen size)
- **Advanced Filtering**: Category, price range, rating-based filters
- **Live Search**: Debounced search with instant results (300ms delay)
- **Smart Sorting**: Price (asc/desc), rating, and newest-first options
- **Shopping Cart**: LocalStorage-based cart with persistent data
- **Product Modals**: Detailed product views with focus management
- **3D Interactions**: Subtle tilt effects and depth animations on hover

### ♿ Accessibility Features

- **Semantic HTML5**: Proper use of `<main>`, `<nav>`, `<section>`, etc.
- **Keyboard Navigation**: Full keyboard accessibility throughout
- **Screen Reader Support**: ARIA labels, live regions, and descriptive text
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference

### ⚡ Performance Optimizations

- **Lazy Loading**: Images load only when needed via `IntersectionObserver`
- **Efficient Animations**: Uses only `transform` and `opacity` for smooth 60fps
- **Debounced Inputs**: Search and filter inputs are optimized to reduce computation
- **RequestAnimationFrame**: Smooth 3D animations without blocking the main thread



## 🧪 Browser Support

**Fully Supported:**
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

**Graceful Degradation:**
- Internet Explorer 11 (basic functionality, no 3D effects)
- Older mobile browsers (reduced animations)

## 📄 License & Credits

- **Design System**: Custom "Remix" palette optimized for accessibility
- **Icons**: [Remix Icons](https://remixicon.com/) (Apache 2.0 License)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Open Font License)
- **Framework**: [Bootstrap 5](https://getbootstrap.com/) (MIT License)
- **Images**: [Unsplash](https://unsplash.com/) for demo placeholders


## 🔄 Version History

**v1.0.0** - Initial Release
- Complete e-commerce product listing functionality
- Responsive design with Bootstrap 5
- 3D hover effects and smooth animations
- Full accessibility support
- LocalStorage-based cart system
- Advanced filtering and search capabilities

---

**Made By GAURAV SHITOLE**
