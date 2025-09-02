/* ===== REMIX E-COMMERCE APPLICATION JAVASCRIPT ===== */

// Product data with working images from picsum.photos
const PRODUCTS_DATA = [
  {"id":1,"title":"AeroBass Headphones","category":"Electronics","price":129.00,"oldPrice":179.00,"rating":4.6,"reviews":312,"image":"https://m.media-amazon.com/images/I/61LXdoeSvbL._UF1000,1000_QL80_.jpg?random=1","badge":"Sale","desc":"Wireless noise-cancelling headphones with long battery life."},
  {"id":2,"title":"Nimbus Joggers","category":"Clothing","price":49.00,"oldPrice":0,"rating":4.1,"reviews":78,"image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo-0QxVwyKDTpbIGPdP3AQmaiNB_u0z_zgsw&s?random=2","badge":"New","desc":"Ultra-soft joggers with moisture-wicking fabric."},
  {"id":3,"title":"Orbit Smartwatch","category":"Electronics","price":199.00,"oldPrice":249.00,"rating":4.7,"reviews":489,"image":"https://www.boat-lifestyle.com/cdn/shop/files/10_23ac1a49-76c9-410b-9938-42b497dd6154.jpg?v=1729508173?random=3","badge":"Top","desc":"Fitness-tracking smartwatch with AMOLED display."},
  {"id":4,"title":"Lumen Desk Lamp","category":"Home","price":39.00,"oldPrice":59.00,"rating":4.3,"reviews":142,"image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh345HHZFO7hvs6fciiwOv6Fkh588dPSk_zg&s?random=4","badge":"Sale","desc":"Minimal LED lamp with adjustable color temperature."},
  {"id":5,"title":"Crest Leather Wallet","category":"Accessories","price":29.00,"oldPrice":0,"rating":4.0,"reviews":54,"image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKmSpScgQi4Ug1CQEtBau2up4GoG2gbHX1A&s?random=5","badge":"","desc":"Slim bi-fold wallet in vegetable-tanned leather."},
  {"id":6,"title":"Terra Hiking Backpack","category":"Accessories","price":119.00,"oldPrice":149.00,"rating":4.5,"reviews":220,"image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx8yKIFlY9Cq6aE4VtzGc4f5Xzl0r5JbqO_A&s?random=6","badge":"Popular","desc":"Rugged, waterproof hiking backpack with support frame."},
  {"id":7,"title":"Glide Running Shoes","category":"Clothing","price":89.00,"oldPrice":109.00,"rating":4.4,"reviews":334,"image":"https://m.media-amazon.com/images/I/71F1N4cWpWL._UY1000_.jpg?random=7","badge":"New","desc":"Lightweight running shoes with breathable mesh."},
  {"id":8,"title":"Aura Ceramic Mug Set","category":"Home","price":24.00,"oldPrice":34.00,"rating":4.2,"reviews":41,"image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHKWaETcSlctms0MVSMrpM9QbcLjpwf2PnSQ&s?random=8","badge":"","desc":"Set of 4 artisan ceramic mugs."},
  {"id":9,"title":"Pulse Bluetooth Speaker","category":"Electronics","price":79.00,"oldPrice":99.00,"rating":4.5,"reviews":210,"image":"https://m.media-amazon.com/images/I/717OWmgriDL.jpg?random=9","badge":"Sale","desc":"Portable speaker with 12hr battery and deep bass."},
  {"id":10,"title":"Cloud Cotton Tee","category":"Clothing","price":19.00,"oldPrice":29.00,"rating":3.9,"reviews":66,"image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROyLzm-wIOg5nxTrl-0-BsBoRCm_3fk3kSeQ&s?random=10","badge":"","desc":"Organic cotton tee, pre-shrunk and soft."},
  {"id":11,"title":"Verde Plant Pot","category":"Home","price":34.00,"oldPrice":0,"rating":4.3,"reviews":28,"image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjFeqMCOIJJgrYEgLtla3LZBgQig_M4BEBSA&s?random=11","badge":"Eco","desc":"Self-watering plant pot for indoor gardens."},
  {"id":12,"title":"Nova Sunglasses","category":"Accessories","price":69.00,"oldPrice":99.00,"rating":4.6,"reviews":175,"image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1BuFHuiDU9Z4Vw3dRh56rJzswePQu8B_W7A&s?random=12","badge":"Top","desc":"Polarized sunglasses with UV400 protection."}
];

// Application state
class RemixStore {
    constructor() {
        this.products = PRODUCTS_DATA;
        this.filteredProducts = [...this.products];
        this.cart = [];
        this.favorites = [];
        this.filters = {
            search: '',
            category: 'all',
            minPrice: 0,
            maxPrice: 1000,
            minRating: 0
        };
        this.sortBy = 'featured';
        this.currentView = 'grid';
        
        // Wait for DOM to be ready, then initialize
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('Initializing Remix Store...');
        try {
            this.renderCategoryFilters();
            this.renderRatingFilters();
            this.renderProducts();
            this.updateCartBadges();
            this.updateCartDisplay();
            this.setupEventListeners();
            this.setupIntersectionObserver();
            this.setup3DTilt();
            this.setupImageFallbacks();
            console.log('Remix Store initialized successfully');
        } catch (error) {
            console.error('Error initializing Remix Store:', error);
        }
    }

    // ===== IMAGE HANDLING =====
    
    setupImageFallbacks() {
        // Set up image error handling for all images on the page
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                const img = e.target;
                if (!img.dataset.fallbackAttempted) {
                    img.dataset.fallbackAttempted = 'true';
                    const productTitle = img.alt || 'Product';
                    img.src = `https://via.placeholder.com/400x400/28C0BE/FFFFFF?text=${encodeURIComponent(productTitle)}`;
                }
            }
        }, true);
    }

    // ===== UTILITY METHODS =====
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===== FILTERING & SEARCH =====

    filterProducts() {
        console.log('Filtering products with filters:', this.filters);
        
        this.filteredProducts = this.products.filter(product => {
            // Search filter
            const searchMatch = !this.filters.search || 
                product.title.toLowerCase().includes(this.filters.search.toLowerCase()) ||
                product.desc.toLowerCase().includes(this.filters.search.toLowerCase()) ||
                product.category.toLowerCase().includes(this.filters.search.toLowerCase());

            // Category filter
            const categoryMatch = this.filters.category === 'all' || 
                product.category === this.filters.category;

            // Price filter
            const priceMatch = product.price >= this.filters.minPrice && 
                (this.filters.maxPrice === 0 || this.filters.maxPrice >= 1000 || product.price <= this.filters.maxPrice);

            // Rating filter
            const ratingMatch = product.rating >= this.filters.minRating;

            return searchMatch && categoryMatch && priceMatch && ratingMatch;
        });

        this.sortProducts();
        this.renderProducts();
        this.updateResultsCount();
    }

    sortProducts() {
        switch (this.sortBy) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                const badgePriority = { 'New': 4, 'Sale': 3, 'Top': 2, 'Popular': 1 };
                this.filteredProducts.sort((a, b) => {
                    const aPriority = badgePriority[a.badge] || 0;
                    const bPriority = badgePriority[b.badge] || 0;
                    return bPriority - aPriority;
                });
                break;
            default: // featured
                this.filteredProducts.sort((a, b) => {
                    if (a.badge === 'Top' && b.badge !== 'Top') return -1;
                    if (b.badge === 'Top' && a.badge !== 'Top') return 1;
                    return 0;
                });
                break;
        }
    }

    updateResultsCount() {
        const count = this.filteredProducts.length;
        const countElement = document.getElementById('resultsCount');
        if (countElement) {
            countElement.textContent = count;
        }

        const emptyState = document.getElementById('emptyState');
        const productsGrid = document.getElementById('productsGrid');
        
        if (count === 0) {
            if (emptyState) emptyState.classList.remove('hidden');
            if (productsGrid) productsGrid.classList.add('hidden');
        } else {
            if (emptyState) emptyState.classList.add('hidden');
            if (productsGrid) productsGrid.classList.remove('hidden');
        }
    }

    // ===== RENDERING METHODS =====

    renderCategoryFilters() {
        const categories = [...new Set(this.products.map(p => p.category))];
        const filterContainer = document.getElementById('categoryFilters');
        
        if (!filterContainer) {
            console.warn('Category filters container not found');
            return;
        }

        const allCategoriesHtml = `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="category" id="cat-all" value="all" checked>
                <label class="form-check-label" for="cat-all">
                    All Categories (${this.products.length})
                </label>
            </div>
        `;

        const categoryHtml = categories.map(category => `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="category" id="cat-${category.replace(/\s+/g, '-').toLowerCase()}" value="${category}">
                <label class="form-check-label" for="cat-${category.replace(/\s+/g, '-').toLowerCase()}">
                    ${category} (${this.products.filter(p => p.category === category).length})
                </label>
            </div>
        `).join('');

        filterContainer.innerHTML = allCategoriesHtml + categoryHtml;
    }

    renderRatingFilters() {
        const ratingContainer = document.getElementById('ratingFilters');
        if (!ratingContainer) {
            console.warn('Rating filters container not found');
            return;
        }

        const allRatingsHtml = `
            <div class="rating-option">
                <input type="radio" name="rating" id="rating-all" value="0" checked>
                <label for="rating-all">All ratings</label>
            </div>
        `;

        const ratings = [4, 3, 2, 1];
        const ratingHtml = ratings.map(rating => `
            <div class="rating-option">
                <input type="radio" name="rating" id="rating-${rating}" value="${rating}">
                <label for="rating-${rating}" class="d-flex align-items-center gap-2">
                    <div class="stars">
                        ${Array.from({length: 5}, (_, i) => 
                            `<span class="star ${i < rating ? '' : 'empty'}">★</span>`
                        ).join('')}
                    </div>
                    <span>& up</span>
                </label>
            </div>
        `).join('');

        ratingContainer.innerHTML = allRatingsHtml + ratingHtml;
    }

    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) {
            console.error('Products grid container not found');
            return;
        }

        console.log(`Rendering ${this.filteredProducts.length} products`);

        if (this.filteredProducts.length === 0) {
            this.updateResultsCount();
            return;
        }

        // Clear existing products
        productsGrid.innerHTML = '';

        // Render each product
        this.filteredProducts.forEach((product, index) => {
            const productCard = this.createProductCard(product);
            productsGrid.appendChild(productCard);
            
            // Add reveal animation with delay
            setTimeout(() => {
                productCard.style.opacity = '0';
                productCard.style.transform = 'translateY(30px)';
                
                requestAnimationFrame(() => {
                    productCard.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    productCard.style.opacity = '1';
                    productCard.style.transform = 'translateY(0)';
                });
            }, index * 50);
        });

        this.updateResultsCount();
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-product-id', product.id);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${product.title}`);

        const isFavorite = this.favorites.includes(product.id);
        const oldPriceHtml = product.oldPrice && product.oldPrice > 0 ? 
            `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : '';
        const badgeHtml = product.badge ? 
            `<div class="product-badge badge-${product.badge.toLowerCase()}">${product.badge}</div>` : '';

        card.innerHTML = `
            <div class="product-image">
                ${badgeHtml}
                <div class="product-actions">
                    <button class="action-btn favorite-btn ${isFavorite ? 'active' : ''}" 
                            aria-label="Add to favorites" data-product-id="${product.id}">
                        <i class="ri-heart-${isFavorite ? 'fill' : 'line'}"></i>
                    </button>
                    <button class="action-btn quick-view-btn" 
                            aria-label="Quick view" data-product-id="${product.id}">
                        <i class="ri-eye-line"></i>
                    </button>
                </div>
                <img src="${product.image}" 
                     alt="${product.title}" 
                     loading="lazy" 
                     onerror="this.onerror=null;this.src='https://via.placeholder.com/400x400/28C0BE/FFFFFF?text=${encodeURIComponent(product.title)}'"
                     onload="this.style.opacity='1'">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-rating">
                    <div class="stars">
                        ${Array.from({length: 5}, (_, i) => 
                            `<span class="star ${i < Math.floor(product.rating) ? '' : 'empty'}">★</span>`
                        ).join('')}
                    </div>
                    <span class="rating-text">${product.rating} (${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${oldPriceHtml}
                </div>
                <div class="product-cta">
                    <button class="btn-add-cart" data-product-id="${product.id}">
                        <i class="ri-shopping-cart-line me-1"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        `;

        // Add click handler for product card (excluding buttons)
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.action-btn, .btn-add-cart')) {
                this.openProductModal(product);
            }
        });

        return card;
    }

    // ===== MODAL FUNCTIONALITY =====

    openProductModal(product) {
        const modal = document.getElementById('productModal');
        const modalContent = document.getElementById('modalContent');
        const modalLabel = document.getElementById('productModalLabel');

        if (!modal || !modalContent || !modalLabel) {
            console.error('Modal elements not found');
            return;
        }

        modalLabel.textContent = product.title;

        const oldPriceHtml = product.oldPrice && product.oldPrice > 0 ? 
            `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : '';

        modalContent.innerHTML = `
            <div class="product-modal-content">
                <div class="modal-image">
                    <img src="${product.image}" 
                         alt="${product.title}" 
                         id="modalProductImage" 
                         onerror="this.onerror=null;this.src='https://via.placeholder.com/400x400/28C0BE/FFFFFF?text=${encodeURIComponent(product.title)}'">
                </div>
                <div class="modal-info">
                    <h3>${product.title}</h3>
                    <div class="product-rating">
                        <div class="stars">
                            ${Array.from({length: 5}, (_, i) => 
                                `<span class="star ${i < Math.floor(product.rating) ? '' : 'empty'}">★</span>`
                            ).join('')}
                        </div>
                        <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${oldPriceHtml}
                    </div>
                    <p class="product-desc">${product.desc}</p>
                    <div class="quantity-selector">
                        <label>Quantity:</label>
                        <div class="quantity-controls">
                            <button class="quantity-btn" id="decreaseQty">-</button>
                            <input type="number" class="quantity-input" id="modalQuantity" value="1" min="1" max="10">
                            <button class="quantity-btn" id="increaseQty">+</button>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn-add-cart" data-product-id="${product.id}">
                            <i class="ri-shopping-cart-line me-1"></i>Add to Cart
                        </button>
                        <button class="btn-buy-now" data-product-id="${product.id}">
                            <i class="ri-flashlight-line me-1"></i>Buy Now
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.setupQuantityControls();
        this.setupModalImageParallax();

        // Show modal
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    }

    setupQuantityControls() {
        const decreaseBtn = document.getElementById('decreaseQty');
        const increaseBtn = document.getElementById('increaseQty');
        const quantityInput = document.getElementById('modalQuantity');

        if (decreaseBtn && increaseBtn && quantityInput) {
            decreaseBtn.addEventListener('click', () => {
                const currentValue = parseInt(quantityInput.value);
                if (currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                }
            });

            increaseBtn.addEventListener('click', () => {
                const currentValue = parseInt(quantityInput.value);
                if (currentValue < 10) {
                    quantityInput.value = currentValue + 1;
                }
            });
        }
    }

    setupModalImageParallax() {
        const modalImage = document.getElementById('modalProductImage');
        if (!modalImage) return;

        const modal = document.getElementById('productModal');
        modal.addEventListener('mousemove', (e) => {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                const rect = modalImage.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) * 0.02;
                const deltaY = (e.clientY - centerY) * 0.02;
                
                modalImage.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
            }
        });

        modal.addEventListener('mouseleave', () => {
            modalImage.style.transform = 'translate(0px, 0px) scale(1)';
        });
    }

    // ===== CART FUNCTIONALITY =====

    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ ...product, quantity });
        }

        this.updateCartBadges();
        this.updateCartDisplay();
        
        // Show feedback
        this.showNotification(`${product.title} added to cart!`);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartBadges();
        this.updateCartDisplay();
    }

    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity > 0) {
                item.quantity = quantity;
            } else {
                this.removeFromCart(productId);
            }
            this.updateCartBadges();
            this.updateCartDisplay();
        }
    }

    clearCart() {
        this.cart = [];
        this.updateCartBadges();
        this.updateCartDisplay();
        this.showNotification('Cart cleared!');
    }

    calculateCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    updateCartBadges() {
        const cartBadges = document.querySelectorAll('#cartBadge, #mobileCart .badge');
        const favoritesBadges = document.querySelectorAll('#favoritesBadge, #mobileFavorites .badge');

        const cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);
        const favoritesCount = this.favorites.length;

        cartBadges.forEach(badge => badge.textContent = cartCount);
        favoritesBadges.forEach(badge => badge.textContent = favoritesCount);
    }

    updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCartElement = document.getElementById('empty-cart');
        const cartFooterElement = document.getElementById('cart-footer');
        const cartTotalElement = document.getElementById('cart-total');

        if (!cartItemsContainer) return;

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = '';
            if (emptyCartElement) emptyCartElement.style.display = 'block';
            if (cartFooterElement) cartFooterElement.style.display = 'none';
        } else {
            if (emptyCartElement) emptyCartElement.style.display = 'none';
            if (cartFooterElement) cartFooterElement.style.display = 'block';

            cartItemsContainer.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" 
                             alt="${item.title}" 
                             onerror="this.onerror=null;this.src='https://via.placeholder.com/60x60/28C0BE/FFFFFF?text=${encodeURIComponent(item.title.charAt(0))}'">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="window.remixStore.updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="window.remixStore.updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="window.remixStore.removeFromCart(${item.id})" aria-label="Remove item">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
            `).join('');

            if (cartTotalElement) {
                cartTotalElement.textContent = this.calculateCartTotal().toFixed(2);
            }
        }
    }

    toggleFavorite(productId) {
        const index = this.favorites.indexOf(productId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(productId);
        }
        
        this.updateCartBadges();
        this.updateFavoriteButtons();
    }

    updateFavoriteButtons() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const productId = parseInt(btn.dataset.productId);
            const isFavorite = this.favorites.includes(productId);
            
            btn.classList.toggle('active', isFavorite);
            btn.querySelector('i').className = `ri-heart-${isFavorite ? 'fill' : 'line'}`;
        });
    }

    showNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // ===== 3D TILT EFFECTS =====

    setup3DTilt() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.product-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                if (e.clientX >= rect.left && e.clientX <= rect.right &&
                    e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    
                    const deltaX = (e.clientX - centerX) / (rect.width / 2);
                    const deltaY = (e.clientY - centerY) / (rect.height / 2);
                    
                    const tiltX = deltaY * -10;
                    const tiltY = deltaX * 10;
                    const depth = 20;
                    
                    card.style.setProperty('--tiltX', `${tiltX}deg`);
                    card.style.setProperty('--tiltY', `${tiltY}deg`);
                    card.style.setProperty('--depth', `${depth}px`);
                } else {
                    card.style.setProperty('--tiltX', '0deg');
                    card.style.setProperty('--tiltY', '0deg');
                    card.style.setProperty('--depth', '0px');
                }
            });
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.product-card, .hero-card').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== EVENT LISTENERS =====

    setupEventListeners() {
        // Search functionality with debouncing
        const searchInputs = document.querySelectorAll('.search-input');
        const debouncedSearch = this.debounce((value) => {
            this.filters.search = value;
            this.filterProducts();
        }, 300);

        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                debouncedSearch(e.target.value);
                // Sync both search inputs
                searchInputs.forEach(otherInput => {
                    if (otherInput !== input) {
                        otherInput.value = e.target.value;
                    }
                });
            });
        });

        // Category and rating filters
        document.addEventListener('change', (e) => {
            if (e.target.name === 'category') {
                this.filters.category = e.target.value;
                this.filterProducts();
            }
            
            if (e.target.name === 'rating') {
                this.filters.minRating = parseFloat(e.target.value);
                this.filterProducts();
            }
        });

        // Price filters
        const minPriceInput = document.getElementById('minPrice');
        const maxPriceInput = document.getElementById('maxPrice');
        
        if (minPriceInput) {
            minPriceInput.addEventListener('input', this.debounce((e) => {
                this.filters.minPrice = parseFloat(e.target.value) || 0;
                this.filterProducts();
            }, 500));
        }

        if (maxPriceInput) {
            maxPriceInput.addEventListener('input', this.debounce((e) => {
                this.filters.maxPrice = parseFloat(e.target.value) || 1000;
                this.filterProducts();
            }, 500));
        }

        // Sort functionality
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.filterProducts();
            });
        }

        // Clear filters and cart actions
        document.addEventListener('click', (e) => {
            if (e.target.matches('#clearFilters, #clearAllFilters')) {
                this.clearAllFilters();
            }

            if (e.target.matches('#clear-cart')) {
                this.clearCart();
            }

            if (e.target.matches('#checkout-btn')) {
                this.showNotification('Redirecting to checkout...');
            }
        });

        // View toggle
        const gridViewBtn = document.getElementById('gridView');
        const listViewBtn = document.getElementById('listView');
        
        if (gridViewBtn && listViewBtn) {
            gridViewBtn.addEventListener('click', () => {
                this.currentView = 'grid';
                gridViewBtn.classList.add('active');
                listViewBtn.classList.remove('active');
            });

            listViewBtn.addEventListener('click', () => {
                this.currentView = 'list';
                listViewBtn.classList.add('active');
                gridViewBtn.classList.remove('active');
            });
        }

        // Product interactions - using event delegation for better performance
        document.addEventListener('click', (e) => {
            // Favorite toggle
            if (e.target.closest('.favorite-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const btn = e.target.closest('.favorite-btn');
                const productId = parseInt(btn.dataset.productId);
                this.toggleFavorite(productId);
            }

            // Add to cart
            if (e.target.closest('.btn-add-cart')) {
                e.preventDefault();
                e.stopPropagation();
                const btn = e.target.closest('.btn-add-cart');
                const productId = parseInt(btn.dataset.productId);
                const quantityInput = document.getElementById('modalQuantity');
                const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                this.addToCart(productId, quantity);
            }

            // Buy now
            if (e.target.closest('.btn-buy-now')) {
                e.preventDefault();
                const btn = e.target.closest('.btn-buy-now');
                const productId = parseInt(btn.dataset.productId);
                const quantityInput = document.getElementById('modalQuantity');
                const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                this.addToCart(productId, quantity);
                this.showNotification('Redirecting to checkout...');
            }

            // Quick view
            if (e.target.closest('.quick-view-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const btn = e.target.closest('.quick-view-btn');
                const productId = parseInt(btn.dataset.productId);
                const product = this.products.find(p => p.id === productId);
                if (product) {
                    this.openProductModal(product);
                }
            }
        });

        // Category dropdown navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('.dropdown-item[data-category]')) {
                e.preventDefault();
                const category = e.target.dataset.category;
                this.filters.category = category;
                
                const radioBtn = document.querySelector(`input[name="category"][value="${category}"]`);
                if (radioBtn) {
                    radioBtn.checked = true;
                }
                
                this.filterProducts();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal.show');
                if (modal) {
                    const bootstrapModal = bootstrap.Modal.getInstance(modal);
                    if (bootstrapModal) {
                        bootstrapModal.hide();
                    }
                }
            }

            if (e.key === 'Enter' && e.target.matches('.product-card')) {
                const productId = parseInt(e.target.dataset.productId);
                const product = this.products.find(p => p.id === productId);
                if (product) {
                    this.openProductModal(product);
                }
            }
        });

        this.syncMobileFilters();
    }

    clearAllFilters() {
        this.filters = {
            search: '',
            category: 'all',
            minPrice: 0,
            maxPrice: 1000,
            minRating: 0
        };

        document.querySelectorAll('.search-input').forEach(input => input.value = '');
        const allCategoryRadio = document.querySelector('input[name="category"][value="all"]');
        if (allCategoryRadio) allCategoryRadio.checked = true;
        
        const allRatingRadio = document.querySelector('input[name="rating"][value="0"]');
        if (allRatingRadio) allRatingRadio.checked = true;
        
        const minPriceInput = document.getElementById('minPrice');
        const maxPriceInput = document.getElementById('maxPrice');
        if (minPriceInput) minPriceInput.value = '';
        if (maxPriceInput) maxPriceInput.value = '';

        this.filterProducts();
    }

    syncMobileFilters() {
        const desktopFilters = document.getElementById('filtersContent');
        const mobileFilters = document.getElementById('mobileFilterContent');
        
        if (desktopFilters && mobileFilters) {
            mobileFilters.innerHTML = desktopFilters.innerHTML;
            
            const observer = new MutationObserver(() => {
                mobileFilters.innerHTML = desktopFilters.innerHTML;
            });
            
            observer.observe(desktopFilters, { childList: true, subtree: true });
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Remix Store...');
    window.remixStore = new RemixStore();
    
    setupHeaderScroll();
    setupHeroParallax();
    setupNewsletterForm();
});

// Header scroll effect
function setupHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

function setupHeroParallax() {
    const heroCards = document.querySelectorAll('.hero-card');
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || heroCards.length === 0) {
        return;
    }

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        heroCards.forEach((card, index) => {
            const multiplier = (index + 1) * 0.3;
            const currentTransform = card.style.transform;
            const baseTransform = currentTransform.replace(/translateY\([^)]*\)/, '').trim();
            card.style.transform = `${baseTransform} translateY(${rate * multiplier}px)`;
        });
    });
}

function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.footer .input-group');
    if (!newsletterForm) return;

    const button = newsletterForm.querySelector('button');
    const input = newsletterForm.querySelector('input');

    if (button && input) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const email = input.value.trim();
            
            if (email && email.includes('@')) {
                if (window.remixStore) {
                    window.remixStore.showNotification('Thanks for subscribing!');
                }
                input.value = '';
            } else {
                if (window.remixStore) {
                    window.remixStore.showNotification('Please enter a valid email address.');
                }
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                button.click();
            }
        });
    }
}