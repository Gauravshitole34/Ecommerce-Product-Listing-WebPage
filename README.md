# E-Commerce Product Listing Page

A modern, responsive e-commerce product catalog built with vanilla HTML5, CSS3, and JavaScript ES6, featuring advanced 3D interactions, smooth animations, and comprehensive accessibility features.

![Remix E-Commerce Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple)

## 🚀 Quick Start

1. **Download the project** (either clone or download zip)
2. **Open `index.html`** in any modern web browser
3. **That's it!** The application works completely offline after the initial load

```bash
# If you want to serve it locally with a simple HTTP server:
python -m http.server 8000
# or
npx serve .
```

## 📁 Project Structure

```
ecommerce-remix/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Complete stylesheet with Remix design system
├── js/
│   └── app.js              # Main JavaScript functionality
├── data/
│   └── products.json       # Sample product data
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

## 🎨 Customizing the Design

### Changing Colors

The entire color system is built on CSS custom properties. To customize:

1. **Open `css/styles.css`**
2. **Find the `:root` selector at the top**
3. **Modify the color variables:**

```css
:root {
  /* Change these hex values to customize the palette */
  --remix-500: #28C0BE;      /* Your new primary color */
  --remix-accent: #6B46C1;   /* Your new accent color */
  --remix-accent-2: #FF4D95; /* Your new CTA color */
  /* ... etc */
}
```

**Recommended Tools for Color Selection:**
- [Coolors.co](https://coolors.co) - Generate color palettes
- [Contrast Ratio Checker](https://webaim.org/resources/contrastchecker/) - Ensure accessibility

### Changing Fonts

The application uses Google Fonts (Poppins + Inter). To change:

1. **Update the Google Fonts link in `index.html`:**
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;600&display=swap" rel="stylesheet">
```

2. **Update the CSS font families in `:root`:**
```css
:root {
  --font-heading: 'YourHeadingFont', sans-serif;
  --font-body: 'YourBodyFont', sans-serif;
}
```

### Typography Scale

Adjust the text sizing by modifying these variables:
```css
:root {
  --text-xs: 0.75rem;   /* 12px */
  --text-sm: 0.875rem;  /* 14px */
  --text-base: 1rem;    /* 16px */
  --text-lg: 1.125rem;  /* 18px */
  --text-xl: 1.25rem;   /* 20px */
  --text-2xl: 1.5rem;   /* 24px */
  --text-3xl: 2.25rem;  /* 36px */
}
```

## 🔧 Advanced Configuration

### Adding New Products

Edit `data/products.json` to add new products:

```json
{
  "id": 13,
  "title": "Your Product Name",
  "category": "Electronics|Clothing|Home|Accessories",
  "price": 99.00,
  "oldPrice": 129.00,  // Set to 0 if no sale price
  "rating": 4.5,       // 1-5 scale
  "reviews": 150,
  "image": "https://source.unsplash.com/800x800/?product-keyword",
  "badge": "Sale|New|Top|Popular|Eco",  // Or empty string ""
  "desc": "Short product description for card display."
}
```

### Modifying Grid Layout

Change responsive breakpoints in `css/styles.css`:

```css
/* Current: xs=1, sm=2, md=3, lg=4 columns */
.product-grid {
  display: grid;
  grid-template-columns: 1fr;                    /* Mobile: 1 column */
}

@media (min-width: 576px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);      /* Small: 2 columns */
  }
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);      /* Medium: 3 columns */
  }
}

@media (min-width: 992px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);      /* Large: 4 columns */
  }
}
```

### Disabling 3D Effects

For users who prefer reduced motion or for performance reasons:

```css
/* Add this to disable all 3D transforms */
@media (prefers-reduced-motion: reduce) {
  .product-card {
    transform: none !important;
  }
  
  .hero-carousel {
    animation: none !important;
  }
}
```

Or manually disable by adding this class to `<body>`:
```css
.no-3d .product-card {
  transform: none !important;
}
```

## 🚀 Optional Enhancements

### Adding GSAP for Advanced Animations

For more sophisticated animations, you can integrate GSAP:

1. **Add GSAP CDN to `index.html`:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```

2. **Replace the reveal animations in `js/app.js`:**
```javascript
// Replace the CSS-based reveals with GSAP timeline
function animateProductCards() {
  gsap.from('.product-card', {
    duration: 0.6,
    y: 50,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out'
  });
}
```

### Converting Hero to Three.js

For a more interactive 3D hero section:

1. **Add Three.js CDN:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

2. **Replace the hero carousel container:**
```html
<div id="hero-3d-scene" style="width: 400px; height: 300px;"></div>
```

3. **Add 3D scene initialization:**
```javascript
// Add to js/app.js
function initHero3D() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 400/300, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  
  renderer.setSize(400, 300);
  document.getElementById('hero-3d-scene').appendChild(renderer.domElement);
  
  // Add your 3D objects here
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x28C0BE });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  camera.position.z = 5;
  
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
}
```

## 🏭 Production Deployment

### Optimization Checklist

Before deploying to production:

1. **Minify CSS and JavaScript**
   ```bash
   # Using online tools or build systems like Webpack/Vite
   ```

2. **Optimize Images**
   - Convert to WebP format for better compression
   - Use responsive image sizes (400px, 800px, 1200px)
   - Consider using a CDN like Cloudinary or ImageKit

3. **Enable Gzip Compression**
   ```apache
   # .htaccess for Apache
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/css text/javascript application/javascript
   </IfModule>
   ```

4. **Add Service Worker for Caching**
   ```javascript
   // sw.js
   const CACHE_NAME = 'remix-store-v1';
   const urlsToCache = [
     '/',
     '/css/styles.css',
     '/js/app.js',
     '/data/products.json'
   ];
   ```

### Performance Monitoring

Consider integrating:
- Google Analytics for user behavior
- Google PageSpeed Insights for performance metrics
- Lighthouse for comprehensive auditing

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

## 🤝 Contributing

This is a demo project, but improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or issues:
- Check the console for JavaScript errors
- Ensure all files are in the correct directory structure
- Verify that the browser supports modern JavaScript features
- Test with a different browser to isolate issues

## 🔄 Version History

**v1.0.0** - Initial Release
- Complete e-commerce product listing functionality
- Responsive design with Bootstrap 5
- 3D hover effects and smooth animations
- Full accessibility support
- LocalStorage-based cart system
- Advanced filtering and search capabilities

---

**Made with ❤️ using vanilla web technologies**
