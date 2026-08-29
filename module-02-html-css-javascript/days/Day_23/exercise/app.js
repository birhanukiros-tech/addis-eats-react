/**
 * Addis Eats - Complete Application
 * State → Render → Events Loop
 */

// ============================================
// STATE OBJECT
// ============================================

const state = {
    dishes: [],            // All restaurants from data
    filtered: [],          // Filtered restaurants
    cart: [],              // Cart items
    searchTerm: '',        // Current search term
    cuisineFilter: '',     // Current cuisine filter
    priceFilter: '',       // Current price filter
    ratingFilter: '',      // Current rating filter
    isLoading: false,      // Loading state
    error: null,           // Error message
    cartOpen: false        // Cart sidebar open state
};

// ============================================
// DOM REFERENCES
// ============================================

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
    grid: $('#restaurantsGrid'),
    loading: $('#loadingState'),
    error: $('#errorState'),
    errorMessage: $('#errorMessage'),
    empty: $('#emptyState'),
    resultCount: $('#resultCount'),
    
    search: $('#searchInput'),
    searchBtn: $('#searchBtn'),
    cuisine: $('#cuisineFilter'),
    price: $('#priceFilter'),
    rating: $('#ratingFilter'),
    
    cart: $('#cartSidebar'),
    cartOverlay: $('#cartOverlay'),
    cartBody: $('#cartBody'),
    cartFooter: $('#cartFooter'),
    cartTotal: $('#cartTotal'),
    cartCount: $('#cartCount'),
    cartToggle: $('#cartToggle'),
    closeCart: $('#closeCart'),
    
    retryBtn: $('#retryBtn'),
    clearBtn: $('#clearFiltersBtn'),
    themeBtn: $('#themeToggle')
};

// ============================================
// STORAGE HELPERS (Step 6)
// ============================================

function saveCart() {
    try {
        localStorage.setItem('addis_cart', JSON.stringify(state.cart));
        return true;
    } catch (e) {
        console.error('Error saving cart:', e.message);
        return false;
    }
}

function loadCart() {
    try {
        const stored = localStorage.getItem('addis_cart');
        if (stored === null) return [];
        
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) {
            localStorage.removeItem('addis_cart');
            return [];
        }
        return parsed;
    } catch (e) {
        console.error('Error loading cart:', e.message);
        try { localStorage.removeItem('addis_cart'); } catch (err) {}
        return [];
    }
}

// ============================================
// DATA LOADING (Step 4)
// ============================================

async function loadData() {
    state.isLoading = true;
    state.error = null;
    updateUI();

    try {
        const response = await fetch('data/menu.json');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.restaurants || !Array.isArray(data.restaurants)) {
            throw new Error('Invalid data format: missing restaurants array');
        }
        
        state.dishes = data.restaurants;
        state.filtered = [...state.dishes];
        state.isLoading = false;
        
        render();
        
    } catch (error) {
        console.error('Error loading data:', error);
        state.isLoading = false;
        state.error = error.message || 'Failed to load restaurants';
        updateUI();
    }
}

// ============================================
// RENDER FUNCTIONS (Step 5)
// ============================================

function render() {
    renderFilters();
    renderRestaurants();
    renderCart();
    updateCounts();
}

function renderFilters() {
    // Cuisine filter options
    const cuisines = [...new Set(state.dishes.map(r => r.cuisine))];
    dom.cuisine.innerHTML = `
        <option value="">All Cuisines</option>
        ${cuisines.map(c => `<option value="${c}">${c}</option>`).join('')}
    `;
    dom.cuisine.value = state.cuisineFilter;
}

function renderRestaurants() {
    const items = state.filtered;
    
    // Update result count
    dom.resultCount.textContent = items.length;
    
    // Show/hide states
    dom.loading.style.display = state.isLoading ? 'block' : 'none';
    dom.error.style.display = state.error ? 'block' : 'none';
    dom.empty.style.display = (!state.isLoading && !state.error && items.length === 0) ? 'block' : 'none';
    dom.grid.style.display = (!state.isLoading && !state.error && items.length > 0) ? 'grid' : 'none';
    
    // Show error message
    if (state.error) {
        dom.errorMessage.textContent = state.error;
    }
    
    // Render grid
    if (items.length === 0 || state.isLoading || state.error) return;
    
    dom.grid.innerHTML = items.map(r => `
        <div class="restaurant-card" data-id="${r.id}">
            <img 
                src="${r.image || 'https://images.unsplash.com/photo-1600783246026-4e3f4c3e0c8b?w=400&h=300&fit=crop'}" 
                alt="${r.name}"
                class="restaurant-image"
                onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23dfe6e9%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22%23636e72%22 font-size=%2224%22%3E🍽️%3C/text%3E%3C/svg%3E'"
            >
            <div class="restaurant-info">
                <div class="restaurant-name">${r.name}</div>
                <div class="restaurant-cuisine">${r.cuisine}</div>
                <div class="restaurant-details">
                    <span class="restaurant-rating">⭐ ${r.rating || 'N/A'}</span>
                    <span class="restaurant-price">${getPriceLabel(r.price)}</span>
                </div>
                <p style="color:var(--gray-400);font-size:0.9rem;margin-bottom:12px;">${r.description || ''}</p>
                <div class="restaurant-actions">
                    <button class="btn btn-primary add-to-cart" data-id="${r.id}">Add to Cart</button>
                    <button class="btn btn-secondary view-details" data-id="${r.id}">Details</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderCart() {
    const items = state.cart;
    const body = dom.cartBody;
    const footer = dom.cartFooter;
    
    if (items.length === 0) {
        body.innerHTML = `
            <div class="cart-empty">
                <span>🛒</span>
                <p>Your cart is empty</p>
            </div>
        `;
        footer.style.display = 'none';
        return;
    }
    
    body.innerHTML = items.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.dish}</div>
                <div class="cart-item-restaurant">${item.restaurant}</div>
            </div>
            <div class="cart-item-actions">
                <button class="cart-qty-btn" data-index="${index}" data-action="decrease">−</button>
                <span style="min-width:20px;text-align:center;">${item.qty}</span>
                <button class="cart-qty-btn" data-index="${index}" data-action="increase">+</button>
                <button class="cart-qty-btn" data-index="${index}" data-action="remove" style="background:#e74c3c;color:white;">✕</button>
            </div>
            <div class="cart-item-price">${(item.price * item.qty).toFixed(2)} ETB</div>
        </div>
    `).join('');
    
    // Calculate total with reduce (Step 6)
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    dom.cartTotal.textContent = `${total.toFixed(2)} ETB`;
    footer.style.display = 'block';
}

function updateCounts() {
    const total = state.cart.reduce((sum, item) => sum + item.qty, 0);
    dom.cartCount.textContent = total;
}

function updateUI() {
    dom.loading.style.display = state.isLoading ? 'block' : 'none';
    dom.error.style.display = state.error ? 'block' : 'none';
    dom.grid.style.display = (!state.isLoading && !state.error && state.filtered.length > 0) ? 'grid' : 'none';
    dom.empty.style.display = (!state.isLoading && !state.error && state.filtered.length === 0) ? 'block' : 'none';
    
    if (state.error) {
        dom.errorMessage.textContent = state.error;
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getPriceLabel(price) {
    const labels = {
        budget: '💰 Budget',
        moderate: '💰💰 Moderate',
        premium: '💰💰💰 Premium'
    };
    return labels[price] || price;
}

function getPriceValue(price) {
    const values = {
        budget: 150,
        moderate: 350,
        premium: 600
    };
    return values[price] || 300;
}

// ============================================
// FILTER FUNCTIONS (Step 5)
// ============================================

function filterRestaurants() {
    let result = [...state.dishes];
    
    // Search filter
    if (state.searchTerm) {
        const term = state.searchTerm.toLowerCase().trim();
        result = result.filter(r =>
            r.name.toLowerCase().includes(term) ||
            r.cuisine.toLowerCase().includes(term) ||
            (r.description && r.description.toLowerCase().includes(term)) ||
            (r.dishes && r.dishes.some(d => d.toLowerCase().includes(term)))
        );
    }
    
    // Cuisine filter
    if (state.cuisineFilter) {
        result = result.filter(r => r.cuisine === state.cuisineFilter);
    }
    
    // Price filter
    if (state.priceFilter) {
        result = result.filter(r => r.price === state.priceFilter);
    }
    
    // Rating filter
    if (state.ratingFilter) {
        const min = parseFloat(state.ratingFilter);
        result = result.filter(r => (r.rating || 0) >= min);
    }
    
    state.filtered = result;
    render();
}

// ============================================
// CART OPERATIONS (Step 6)
// ============================================

function addToCart(restaurantId, dishName) {
    const restaurant = state.dishes.find(r => r.id === restaurantId);
    if (!restaurant) return;
    
    const dish = dishName || (restaurant.dishes && restaurant.dishes[0]) || 'Meal';
    const price = getPriceValue(restaurant.price);
    
    const existing = state.cart.find(item => 
        item.restaurantId === restaurantId && item.dish === dish
    );
    
    if (existing) {
        existing.qty++;
    } else {
        state.cart.push({
            restaurantId: restaurantId,
            restaurant: restaurant.name,
            dish: dish,
            price: price,
            qty: 1
        });
    }
    
    saveCart();
    render();
    showNotification(`${dish} added to cart!`);
}

function removeFromCart(index) {
    state.cart.splice(index, 1);
    saveCart();
    render();
}

function updateCartQty(index, delta) {
    const item = state.cart[index];
    if (!item) return;
    
    item.qty += delta;
    if (item.qty <= 0) {
        state.cart.splice(index, 1);
    }
    saveCart();
    render();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideUp 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// ============================================
// EVENT HANDLERS
// ============================================

function setupEvents() {
    // Search - live on input (Step 5)
    dom.search.addEventListener('input', (e) => {
        state.searchTerm = e.target.value;
        filterRestaurants();
    });
    
    dom.search.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            state.searchTerm = dom.search.value;
            filterRestaurants();
        }
    });
    
    // Filters
    dom.cuisine.addEventListener('change', (e) => {
        state.cuisineFilter = e.target.value;
        filterRestaurants();
    });
    
    dom.price.addEventListener('change', (e) => {
        state.priceFilter = e.target.value;
        filterRestaurants();
    });
    
    dom.rating.addEventListener('change', (e) => {
        state.ratingFilter = e.target.value;
        filterRestaurants();
    });
    
    // Cart toggle
    dom.cartToggle.addEventListener('click', () => {
        dom.cart.classList.toggle('active');
        dom.cartOverlay.classList.toggle('active');
    });
    
    dom.closeCart.addEventListener('click', () => {
        dom.cart.classList.remove('active');
        dom.cartOverlay.classList.remove('active');
    });
    
    dom.cartOverlay.addEventListener('click', () => {
        dom.cart.classList.remove('active');
        dom.cartOverlay.classList.remove('active');
    });
    
    // Add to cart (event delegation)
    dom.grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart');
        if (!btn) return;
        
        const id = parseInt(btn.dataset.id);
        const restaurant = state.dishes.find(r => r.id === id);
        if (restaurant) {
            addToCart(id, restaurant.dishes?.[0]);
        }
    });
    
    // Cart quantity buttons (event delegation)
    dom.cartBody.addEventListener('click', (e) => {
        const btn = e.target.closest('.cart-qty-btn');
        if (!btn) return;
        
        const index = parseInt(btn.dataset.index);
        const action = btn.dataset.action;
        
        if (action === 'increase') {
            updateCartQty(index, 1);
        } else if (action === 'decrease') {
            updateCartQty(index, -1);
        } else if (action === 'remove') {
            removeFromCart(index);
        }
    });
    
    // Retry
    dom.retryBtn.addEventListener('click', () => {
        loadData();
    });
    
    // Clear filters
    dom.clearBtn.addEventListener('click', () => {
        state.searchTerm = '';
        state.cuisineFilter = '';
        state.priceFilter = '';
        state.ratingFilter = '';
        dom.search.value = '';
        dom.cuisine.value = '';
        dom.price.value = '';
        dom.rating.value = '';
        filterRestaurants();
    });
    
    // Theme toggle
    dom.themeBtn.addEventListener('click', () => {
        const isDark = document.body.style.background !== '#1a1a2e';
        document.body.style.background = isDark ? '#1a1a2e' : '#f5f6fa';
        document.body.style.color = isDark ? '#eee' : '#2d3436';
        dom.themeBtn.textContent = isDark ? '☀️' : '🌙';
        
        document.querySelectorAll('.restaurant-card').forEach(card => {
            card.style.background = isDark ? '#2d2d44' : 'white';
            card.style.color = isDark ? '#eee' : '#2d3436';
        });
        
        document.querySelectorAll('.header, .footer').forEach(el => {
            el.style.background = isDark ? '#1a1a2e' : 'white';
        });
    });
    
    // Keyboard shortcut: Escape to close cart
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dom.cart.classList.remove('active');
            dom.cartOverlay.classList.remove('active');
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

async function init() {
    console.log('🚀 Addis Eats starting...');
    
    // Load cart from localStorage (Step 6)
    state.cart = loadCart();
    console.log(`📋 Loaded ${state.cart.length} cart items`);
    
    // Load data (Step 4)
    await loadData();
    
    // Setup events
    setupEvents();
    
    console.log(`✅ Loaded ${state.dishes.length} restaurants`);
}

// Start the app
document.addEventListener('DOMContentLoaded', init);