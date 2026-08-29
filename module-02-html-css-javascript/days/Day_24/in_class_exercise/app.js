/**
 * Addis Eats - Module Project Core (Refactored)
 * State → Render → Events Loop
 * Added: Checkout validation, order confirmation, refactored code
 */

// ============================================
// CONSTANTS
// ============================================

const STORAGE_KEY = 'addis_cart';
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;
const PRICE_VALUES = {
    budget: 150,
    moderate: 350,
    premium: 600
};
const PRICE_LABELS = {
    budget: '💰 Budget',
    moderate: '💰💰 Moderate',
    premium: '💰💰💰 Premium'
};
const DEFAULT_IMAGE = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23dfe6e9%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22%23636e72%22 font-size=%2224%22%3E🍽️%3C/text%3E%3C/svg%3E';

// ============================================
// STATE OBJECT
// ============================================

const state = {
    dishes: [],
    filtered: [],
    cart: [],
    searchTerm: '',
    cuisineFilter: '',
    priceFilter: '',
    ratingFilter: '',
    isLoading: false,
    error: null,
    cartOpen: false,
    checkoutMode: false
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
    
    checkoutForm: $('#checkoutForm'),
    checkoutBtn: $('#checkoutBtn'),
    placeOrderBtn: $('#placeOrderBtn'),
    customerName: $('#customerName'),
    customerPhone: $('#customerPhone'),
    nameError: $('#nameError'),
    phoneError: $('#phoneError'),
    
    confirmationModal: $('#confirmationModal'),
    confirmationMessage: $('#confirmationMessage'),
    orderDetails: $('#orderDetails'),
    closeConfirmation: $('#closeConfirmation'),
    
    retryBtn: $('#retryBtn'),
    clearBtn: $('#clearFiltersBtn'),
    themeBtn: $('#themeToggle')
};

// ============================================
// STORAGE HELPERS
// ============================================

function saveCart() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
        return true;
    } catch (e) {
        console.error('Error saving cart:', e.message);
        return false;
    }
}

function loadCart() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === null) return [];
        
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) {
            localStorage.removeItem(STORAGE_KEY);
            return [];
        }
        return parsed;
    } catch (e) {
        console.error('Error loading cart:', e.message);
        try { localStorage.removeItem(STORAGE_KEY); } catch (err) {}
        return [];
    }
}

// ============================================
// DATA LOADING
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
// RENDER FUNCTIONS
// ============================================

function render() {
    renderFilters();
    renderRestaurants();
    renderCart();
    updateCounts();
}

function renderFilters() {
    const cuisines = [...new Set(state.dishes.map(r => r.cuisine))];
    dom.cuisine.innerHTML = `
        <option value="">All Cuisines</option>
        ${cuisines.map(c => `<option value="${c}">${c}</option>`).join('')}
    `;
    dom.cuisine.value = state.cuisineFilter;
}

function renderRestaurants() {
    const items = state.filtered;
    
    dom.resultCount.textContent = items.length;
    
    // Guard clause: show states
    if (state.isLoading) {
        dom.loading.style.display = 'block';
        dom.error.style.display = 'none';
        dom.empty.style.display = 'none';
        dom.grid.style.display = 'none';
        return;
    }
    
    if (state.error) {
        dom.loading.style.display = 'none';
        dom.error.style.display = 'block';
        dom.errorMessage.textContent = state.error;
        dom.empty.style.display = 'none';
        dom.grid.style.display = 'none';
        return;
    }
    
    if (items.length === 0) {
        dom.loading.style.display = 'none';
        dom.error.style.display = 'none';
        dom.empty.style.display = 'block';
        dom.grid.style.display = 'none';
        return;
    }
    
    dom.loading.style.display = 'none';
    dom.error.style.display = 'none';
    dom.empty.style.display = 'none';
    dom.grid.style.display = 'grid';
    
    dom.grid.innerHTML = items.map(r => `
        <article class="restaurant-card" data-id="${r.id}" role="listitem">
            <img 
                src="${r.image || DEFAULT_IMAGE}" 
                alt="${r.name}"
                class="restaurant-image"
                loading="lazy"
                onerror="this.src='${DEFAULT_IMAGE}'"
            >
            <div class="restaurant-info">
                <h3 class="restaurant-name">${r.name}</h3>
                <div class="restaurant-cuisine">${r.cuisine}</div>
                <div class="restaurant-details">
                    <span class="restaurant-rating">⭐ ${r.rating || 'N/A'}</span>
                    <span class="restaurant-price">${getPriceLabel(r.price)}</span>
                </div>
                <p style="color:var(--gray-400);font-size:0.9rem;margin-bottom:12px;">${r.description || ''}</p>
                <div class="restaurant-actions">
                    <button class="btn btn-primary add-to-cart" data-id="${r.id}" aria-label="Add ${r.name} to cart">
                        Add to Cart
                    </button>
                    <button class="btn btn-secondary view-details" data-id="${r.id}" aria-label="View ${r.name} details">
                        Details
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

function renderCart() {
    const items = state.cart;
    const body = dom.cartBody;
    const footer = dom.cartFooter;
    const checkoutForm = dom.checkoutForm;
    const checkoutBtn = dom.checkoutBtn;
    
    if (items.length === 0) {
        body.innerHTML = `
            <div class="cart-empty">
                <span aria-hidden="true">🛒</span>
                <p>Your cart is empty</p>
            </div>
        `;
        footer.style.display = 'none';
        checkoutForm.style.display = 'none';
        checkoutBtn.style.display = 'none';
        state.checkoutMode = false;
        return;
    }
    
    body.innerHTML = items.map((item, index) => `
        <div class="cart-item" role="listitem">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.dish}</div>
                <div class="cart-item-restaurant">${item.restaurant}</div>
            </div>
            <div class="cart-item-actions">
                <button class="cart-qty-btn" data-index="${index}" data-action="decrease" aria-label="Decrease quantity">−</button>
                <span style="min-width:20px;text-align:center;">${item.qty}</span>
                <button class="cart-qty-btn" data-index="${index}" data-action="increase" aria-label="Increase quantity">+</button>
                <button class="cart-qty-btn" data-index="${index}" data-action="remove" style="background:#e74c3c;color:white;" aria-label="Remove item">✕</button>
            </div>
            <div class="cart-item-price">${(item.price * item.qty).toFixed(2)} ETB</div>
        </div>
    `).join('');
    
    // Computed total with reduce
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    dom.cartTotal.textContent = `${total.toFixed(2)} ETB`;
    
    // Show footer and checkout button
    footer.style.display = 'block';
    checkoutBtn.style.display = 'block';
    
    // Hide checkout form if not in checkout mode
    if (!state.checkoutMode) {
        checkoutForm.style.display = 'none';
    }
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
    return PRICE_LABELS[price] || price;
}

function getPriceValue(price) {
    return PRICE_VALUES[price] || 300;
}

function getTotal() {
    return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// ============================================
// FILTER FUNCTIONS
// ============================================

function filterRestaurants() {
    let result = [...state.dishes];
    
    if (state.searchTerm) {
        const term = state.searchTerm.toLowerCase().trim();
        result = result.filter(r =>
            r.name.toLowerCase().includes(term) ||
            r.cuisine.toLowerCase().includes(term) ||
            (r.description && r.description.toLowerCase().includes(term)) ||
            (r.dishes && r.dishes.some(d => d.toLowerCase().includes(term)))
        );
    }
    
    if (state.cuisineFilter) {
        result = result.filter(r => r.cuisine === state.cuisineFilter);
    }
    
    if (state.priceFilter) {
        result = result.filter(r => r.price === state.priceFilter);
    }
    
    if (state.ratingFilter) {
        const min = parseFloat(state.ratingFilter);
        result = result.filter(r => (r.rating || 0) >= min);
    }
    
    state.filtered = result;
    render();
}

// ============================================
// CART OPERATIONS
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

function clearCart() {
    state.cart = [];
    saveCart();
    render();
}

// ============================================
// CHECKOUT VALIDATION (New)
// ============================================

function validateCheckout(name, phone) {
    // Guard clauses
    if (!name || name.trim().length < 2) {
        return { valid: false, field: 'name', message: '❌ Name must be at least 2 characters long.' };
    }
    
    if (!phone || !PHONE_REGEX.test(phone.trim())) {
        return { valid: false, field: 'phone', message: '❌ Invalid phone number. Use 0912345678 or +251912345678.' };
    }
    
    if (state.cart.length === 0) {
        return { valid: false, field: 'cart', message: '❌ Your cart is empty. Add items before checkout.' };
    }
    
    return { valid: true };
}

function placeOrder() {
    const name = dom.customerName.value.trim();
    const phone = dom.customerPhone.value.trim();
    
    // Clear previous errors
    clearErrors();
    
    // Validate
    const validation = validateCheckout(name, phone);
    
    if (!validation.valid) {
        showFieldError(validation.field, validation.message);
        return;
    }
    
    // Order confirmed
    const total = getTotal();
    const orderSummary = state.cart.map(item => 
        `${item.dish} x${item.qty} = ${(item.price * item.qty).toFixed(2)} ETB`
    ).join('\n');
    
    showConfirmation(name, total, orderSummary);
    
    // Clear cart after order
    clearCart();
    state.checkoutMode = false;
    dom.checkoutForm.style.display = 'none';
    dom.checkoutBtn.style.display = 'block';
}

function clearErrors() {
    dom.nameError.textContent = '';
    dom.phoneError.textContent = '';
    dom.customerName.classList.remove('error', 'success');
    dom.customerPhone.classList.remove('error', 'success');
}

function showFieldError(field, message) {
    if (field === 'name') {
        dom.nameError.textContent = message;
        dom.customerName.classList.add('error');
    } else if (field === 'phone') {
        dom.phoneError.textContent = message;
        dom.customerPhone.classList.add('error');
    } else {
        showNotification(message);
    }
}

// ============================================
// UI HELPERS
// ============================================

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

function showConfirmation(name, total, summary) {
    const modal = dom.confirmationModal;
    const message = dom.confirmationMessage;
    const details = dom.orderDetails;
    
    message.textContent = `Thank you ${name}! Your order has been confirmed.`;
    
    details.innerHTML = `
        <div class="detail-row"><span>Customer:</span><span>${name}</span></div>
        <div class="detail-row"><span>Items:</span><span>${state.cart.length}</span></div>
        <div class="detail-row total"><span>Total:</span><span>${total.toFixed(2)} ETB</span></div>
    `;
    
    modal.style.display = 'flex';
}

// ============================================
// EVENT HANDLERS
// ============================================

function setupEvents() {
    // Search - live on input
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
        dom.cartToggle.setAttribute('aria-expanded', dom.cart.classList.contains('active'));
        
        // Reset checkout mode when closing
        if (!dom.cart.classList.contains('active')) {
            state.checkoutMode = false;
            dom.checkoutForm.style.display = 'none';
            dom.checkoutBtn.style.display = 'block';
        }
    });
    
    dom.closeCart.addEventListener('click', () => {
        dom.cart.classList.remove('active');
        dom.cartOverlay.classList.remove('active');
        dom.cartToggle.setAttribute('aria-expanded', 'false');
        state.checkoutMode = false;
        dom.checkoutForm.style.display = 'none';
        dom.checkoutBtn.style.display = 'block';
    });
    
    dom.cartOverlay.addEventListener('click', () => {
        dom.cart.classList.remove('active');
        dom.cartOverlay.classList.remove('active');
        dom.cartToggle.setAttribute('aria-expanded', 'false');
        state.checkoutMode = false;
        dom.checkoutForm.style.display = 'none';
        dom.checkoutBtn.style.display = 'block';
    });
    
    // Checkout button - show form
    dom.checkoutBtn.addEventListener('click', () => {
        if (state.cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }
        state.checkoutMode = true;
        dom.checkoutBtn.style.display = 'none';
        dom.checkoutForm.style.display = 'block';
        dom.customerName.focus();
    });
    
    // Place order
    dom.placeOrderBtn.addEventListener('click', placeOrder);
    
    // Enter key on form fields
    dom.customerName.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            dom.customerPhone.focus();
        }
    });
    
    dom.customerPhone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            placeOrder();
        }
    });
    
    // Real-time validation feedback
    dom.customerName.addEventListener('input', () => {
        const name = dom.customerName.value.trim();
        if (name.length >= 2) {
            dom.customerName.classList.remove('error');
            dom.customerName.classList.add('success');
            dom.nameError.textContent = '';
        } else if (name.length > 0) {
            dom.customerName.classList.add('error');
            dom.customerName.classList.remove('success');
            dom.nameError.textContent = '❌ Name must be at least 2 characters';
        } else {
            dom.customerName.classList.remove('error', 'success');
            dom.nameError.textContent = '';
        }
    });
    
    dom.customerPhone.addEventListener('input', () => {
        const phone = dom.customerPhone.value.trim();
        if (phone.length > 0 && PHONE_REGEX.test(phone)) {
            dom.customerPhone.classList.remove('error');
            dom.customerPhone.classList.add('success');
            dom.phoneError.textContent = '';
        } else if (phone.length > 0) {
            dom.customerPhone.classList.add('error');
            dom.customerPhone.classList.remove('success');
            dom.phoneError.textContent = '❌ Use 0912345678 or +251912345678';
        } else {
            dom.customerPhone.classList.remove('error', 'success');
            dom.phoneError.textContent = '';
        }
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
    
    // Cart quantity (event delegation)
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
    
    // Close confirmation
    dom.closeConfirmation.addEventListener('click', () => {
        dom.confirmationModal.style.display = 'none';
    });
    
    dom.confirmationModal.addEventListener('click', (e) => {
        if (e.target === dom.confirmationModal) {
            dom.confirmationModal.style.display = 'none';
        }
    });
    
    // Theme toggle
    dom.themeBtn.addEventListener('click', () => {
        const isDark = document.body.style.background !== '#1a1a2e';
        document.body.style.background = isDark ? '#1a1a2e' : '#f5f6fa';
        document.body.style.color = isDark ? '#eee' : '#2d3436';
        dom.themeBtn.textContent = isDark ? '☀️' : '🌙';
        
        document.querySelectorAll('.restaurant-card, .cart-sidebar, .confirmation-content, .header, .footer').forEach(el => {
            el.style.background = isDark ? '#2d2d44' : 'white';
            if (el.classList.contains('header') || el.classList.contains('footer')) {
                el.style.background = isDark ? '#1a1a2e' : 'white';
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dom.cart.classList.remove('active');
            dom.cartOverlay.classList.remove('active');
            dom.cartToggle.setAttribute('aria-expanded', 'false');
            dom.confirmationModal.style.display = 'none';
            state.checkoutMode = false;
            dom.checkoutForm.style.display = 'none';
            dom.checkoutBtn.style.display = 'block';
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

async function init() {
    console.log('🚀 Addis Eats starting...');
    console.log('📋 State initialized with dishes, cart, filters');
    
    // Load cart from localStorage
    state.cart = loadCart();
    console.log(`📋 Loaded ${state.cart.length} cart items from localStorage`);
    
    // Load data
    await loadData();
    
    // Setup events
    setupEvents();
    
    console.log(`✅ Loaded ${state.dishes.length} restaurants`);
    console.log('🔄 UI driven entirely from state → render()');
}

// Start the app
document.addEventListener('DOMContentLoaded', init);