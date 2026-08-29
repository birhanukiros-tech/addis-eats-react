/**
 * Addis Eats - Harden Your Project
 * All states handled, refactored, guards in place
 * No console errors
 */

// ============================================
// CONSTANTS (No magic values)
// ============================================

const STORAGE_KEY = 'addis_cart';
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;
const MIN_NAME_LENGTH = 2;

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
// STATE
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
// DOM REFS
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
    checkoutError: $('#checkoutError'),
    checkoutBtn: $('#checkoutBtn'),
    placeOrderBtn: $('#placeOrderBtn'),
    customerName: $('#customerName'),
    customerPhone: $('#customerPhone'),
    
    confirmationModal: $('#confirmationModal'),
    confirmationMessage: $('#confirmationMessage'),
    orderDetails: $('#orderDetails'),
    closeConfirmation: $('#closeConfirmation'),
    
    retryBtn: $('#retryBtn'),
    clearBtn: $('#clearFiltersBtn'),
    themeBtn: $('#themeToggle')
};

// ============================================
// STORAGE
// ============================================

function saveCart() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
        return true;
    } catch (error) {
        console.error('Error saving cart:', error.message);
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
    } catch (error) {
        console.error('Error loading cart:', error.message);
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
        
        // Guard: check response
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Guard: validate data structure
        if (!data.restaurants || !Array.isArray(data.restaurants)) {
            throw new Error('Invalid data format');
        }
        
        state.dishes = data.restaurants;
        state.filtered = [...state.dishes];
        state.isLoading = false;
        
        render();
        
    } catch (error) {
        console.error('Error loading data:', error);
        state.isLoading = false;
        state.error = 'Failed to load restaurants. Please try again.';
        updateUI();
    }
}

// ============================================
// RENDER
// ============================================

function render() {
    renderFilters();
    renderRestaurants();
    renderCart();
    updateCounts();
}

function renderFilters() {
    // Guard: no dishes
    if (!state.dishes || state.dishes.length === 0) {
        dom.cuisine.innerHTML = '<option value="">All Cuisines</option>';
        return;
    }
    
    const cuisines = [...new Set(state.dishes.map(r => r.cuisine))];
    dom.cuisine.innerHTML = `
        <option value="">All Cuisines</option>
        ${cuisines.map(c => `<option value="${c}">${c}</option>`).join('')}
    `;
    dom.cuisine.value = state.cuisineFilter;
}

function renderRestaurants() {
    const items = state.filtered || [];
    
    dom.resultCount.textContent = items.length;
    
    // Guard: loading state
    if (state.isLoading) {
        showLoadingState();
        return;
    }
    
    // Guard: error state
    if (state.error) {
        showErrorState(state.error);
        return;
    }
    
    // Guard: empty state
    if (items.length === 0) {
        showEmptyState();
        return;
    }
    
    showRestaurantGrid(items);
}

function showLoadingState() {
    dom.loading.style.display = 'block';
    dom.error.style.display = 'none';
    dom.empty.style.display = 'none';
    dom.grid.style.display = 'none';
}

function showErrorState(error) {
    dom.loading.style.display = 'none';
    dom.error.style.display = 'block';
    dom.errorMessage.textContent = error;
    dom.empty.style.display = 'none';
    dom.grid.style.display = 'none';
}

function showEmptyState() {
    dom.loading.style.display = 'none';
    dom.error.style.display = 'none';
    dom.empty.style.display = 'block';
    dom.grid.style.display = 'none';
}

function showRestaurantGrid(items) {
    dom.loading.style.display = 'none';
    dom.error.style.display = 'none';
    dom.empty.style.display = 'none';
    dom.grid.style.display = 'grid';
    
    dom.grid.innerHTML = items.map(renderRestaurantCard).join('');
}

function renderRestaurantCard(restaurant) {
    // Guard: missing restaurant data
    if (!restaurant) return '';
    
    const image = restaurant.image || DEFAULT_IMAGE;
    const name = restaurant.name || 'Unknown Restaurant';
    const cuisine = restaurant.cuisine || 'Unknown Cuisine';
    const rating = restaurant.rating || 'N/A';
    const price = getPriceLabel(restaurant.price);
    const description = restaurant.description || '';
    
    return `
        <article class="restaurant-card" data-id="${restaurant.id}" role="listitem">
            <img 
                src="${image}" 
                alt="${name}"
                class="restaurant-image"
                loading="lazy"
                onerror="this.src='${DEFAULT_IMAGE}'"
            >
            <div class="restaurant-info">
                <h3 class="restaurant-name">${name}</h3>
                <div class="restaurant-cuisine">${cuisine}</div>
                <div class="restaurant-details">
                    <span class="restaurant-rating">⭐ ${rating}</span>
                    <span class="restaurant-price">${price}</span>
                </div>
                <p style="color:var(--gray-400);font-size:0.9rem;margin-bottom:12px;">${description}</p>
                <div class="restaurant-actions">
                    <button class="btn btn-primary add-to-cart" data-id="${restaurant.id}" aria-label="Add ${name} to cart">
                        Add to Cart
                    </button>
                    <button class="btn btn-secondary view-details" data-id="${restaurant.id}" aria-label="View ${name} details">
                        Details
                    </button>
                </div>
            </div>
        </article>
    `;
}

function renderCart() {
    const items = state.cart || [];
    const body = dom.cartBody;
    const footer = dom.cartFooter;
    const checkoutForm = dom.checkoutForm;
    const checkoutBtn = dom.checkoutBtn;
    
    // Guard: empty cart
    if (items.length === 0) {
        renderEmptyCart(body, footer, checkoutForm, checkoutBtn);
        return;
    }
    
    renderCartItems(items, body);
    updateCartFooter(items, footer, checkoutForm, checkoutBtn);
}

function renderEmptyCart(body, footer, checkoutForm, checkoutBtn) {
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
}

function renderCartItems(items, body) {
    body.innerHTML = items.map((item, index) => `
        <div class="cart-item" role="listitem">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.dish || 'Item'}</div>
                <div class="cart-item-restaurant">${item.restaurant || 'Restaurant'}</div>
            </div>
            <div class="cart-item-actions">
                <button class="cart-qty-btn" data-index="${index}" data-action="decrease" aria-label="Decrease quantity">−</button>
                <span style="min-width:20px;text-align:center;">${item.qty || 0}</span>
                <button class="cart-qty-btn" data-index="${index}" data-action="increase" aria-label="Increase quantity">+</button>
                <button class="cart-qty-btn" data-index="${index}" data-action="remove" style="background:#e74c3c;color:white;" aria-label="Remove item">✕</button>
            </div>
            <div class="cart-item-price">${((item.price || 0) * (item.qty || 0)).toFixed(2)} ETB</div>
        </div>
    `).join('');
}

function updateCartFooter(items, footer, checkoutForm, checkoutBtn) {
    const total = getTotal();
    dom.cartTotal.textContent = `${total.toFixed(2)} ETB`;
    
    footer.style.display = 'block';
    checkoutBtn.style.display = 'block';
    
    if (!state.checkoutMode) {
        checkoutForm.style.display = 'none';
    }
}

function updateCounts() {
    const total = state.cart.reduce((sum, item) => sum + (item.qty || 0), 0);
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
// HELPERS
// ============================================

function getPriceLabel(price) {
    return PRICE_LABELS[price] || price;
}

function getPriceValue(price) {
    return PRICE_VALUES[price] || 300;
}

function getTotal() {
    return state.cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);
}

function getCartItemCount() {
    return state.cart.reduce((sum, item) => sum + (item.qty || 0), 0);
}

// ============================================
// FILTERS
// ============================================

function filterRestaurants() {
    let result = [...state.dishes];
    
    // Guard: no dishes
    if (!result || result.length === 0) {
        state.filtered = [];
        render();
        return;
    }
    
    // Search filter
    if (state.searchTerm) {
        const term = state.searchTerm.toLowerCase().trim();
        result = result.filter(r =>
            (r.name && r.name.toLowerCase().includes(term)) ||
            (r.cuisine && r.cuisine.toLowerCase().includes(term)) ||
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
// CART OPERATIONS
// ============================================

function addToCart(restaurantId, dishName) {
    // Guard: find restaurant
    const restaurant = state.dishes.find(r => r.id === restaurantId);
    if (!restaurant) {
        showNotification('Restaurant not found');
        return;
    }
    
    const dish = dishName || (restaurant.dishes && restaurant.dishes[0]) || 'Meal';
    const price = getPriceValue(restaurant.price);
    
    const existing = state.cart.find(item => 
        item.restaurantId === restaurantId && item.dish === dish
    );
    
    if (existing) {
        existing.qty = (existing.qty || 0) + 1;
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
    // Guard: valid index
    if (index < 0 || index >= state.cart.length) {
        console.warn('Invalid cart index:', index);
        return;
    }
    
    state.cart.splice(index, 1);
    saveCart();
    render();
}

function updateCartQty(index, delta) {
    // Guard: valid index
    if (index < 0 || index >= state.cart.length) {
        console.warn('Invalid cart index:', index);
        return;
    }
    
    const item = state.cart[index];
    if (!item) return;
    
    item.qty = (item.qty || 0) + delta;
    
    // Guard: remove if quantity <= 0
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
// CHECKOUT VALIDATION
// ============================================

function validateCheckout(name, phone) {
    const errors = [];
    
    // Guard: name validation
    if (!name || name.trim().length < MIN_NAME_LENGTH) {
        errors.push('❌ Name must be at least 2 characters long.');
    }
    
    // Guard: phone validation
    if (!phone || !PHONE_REGEX.test(phone.trim())) {
        errors.push('❌ Invalid phone number. Use 0912345678 or +251912345678.');
    }
    
    // Guard: cart validation
    if (!state.cart || state.cart.length === 0) {
        errors.push('❌ Your cart is empty. Add items before checkout.');
    }
    
    return errors;
}

function placeOrder() {
    const name = dom.customerName.value.trim();
    const phone = dom.customerPhone.value.trim();
    
    // Clear previous errors
    clearErrors();
    
    // Validate
    const errors = validateCheckout(name, phone);
    
    // Guard: show errors if any
    if (errors.length > 0) {
        showCheckoutError(errors.join(' '));
        return;
    }
    
    // Build order object
    const order = {
        customerName: name,
        customerPhone: phone,
        items: [...state.cart],
        total: getTotal(),
        orderDate: new Date().toISOString(),
        orderId: Date.now()
    };
    
    showConfirmation(order);
    
    // Clear cart after order
    clearCart();
    state.checkoutMode = false;
    dom.checkoutForm.style.display = 'none';
    dom.checkoutBtn.style.display = 'block';
}

function clearErrors() {
    dom.checkoutError.textContent = '';
    dom.checkoutError.classList.remove('show');
    dom.customerName.classList.remove('error', 'success');
    dom.customerPhone.classList.remove('error', 'success');
}

function showCheckoutError(message) {
    dom.checkoutError.textContent = message;
    dom.checkoutError.classList.add('show');
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

function showConfirmation(order) {
    const modal = dom.confirmationModal;
    const message = dom.confirmationMessage;
    const details = dom.orderDetails;
    
    message.textContent = `Thank you ${order.customerName}! Your order has been confirmed.`;
    
    const itemsList = order.items.map(item => 
        `${item.dish} x${item.qty} = ${((item.price || 0) * (item.qty || 0)).toFixed(2)} ETB`
    ).join('<br>');
    
    details.innerHTML = `
        <div class="detail-row"><span>Order #:</span><span>${order.orderId}</span></div>
        <div class="detail-row"><span>Customer:</span><span>${order.customerName}</span></div>
        <div class="detail-row"><span>Phone:</span><span>${order.customerPhone}</span></div>
        <div class="detail-row"><span>Items:</span><span>${order.items.length}</span></div>
        <div style="margin-top:8px;font-size:0.9rem;color:var(--gray-400);">${itemsList}</div>
        <div class="detail-row total"><span>Total:</span><span>${order.total.toFixed(2)} ETB</span></div>
    `;
    
    modal.style.display = 'flex';
}

// ============================================
// EVENTS
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
        
        if (!dom.cart.classList.contains('active')) {
            state.checkoutMode = false;
            dom.checkoutForm.style.display = 'none';
            dom.checkoutBtn.style.display = 'block';
            clearErrors();
        }
    });
    
    dom.closeCart.addEventListener('click', () => {
        dom.cart.classList.remove('active');
        dom.cartOverlay.classList.remove('active');
        dom.cartToggle.setAttribute('aria-expanded', 'false');
        state.checkoutMode = false;
        dom.checkoutForm.style.display = 'none';
        dom.checkoutBtn.style.display = 'block';
        clearErrors();
    });
    
    dom.cartOverlay.addEventListener('click', () => {
        dom.cart.classList.remove('active');
        dom.cartOverlay.classList.remove('active');
        dom.cartToggle.setAttribute('aria-expanded', 'false');
        state.checkoutMode = false;
        dom.checkoutForm.style.display = 'none';
        dom.checkoutBtn.style.display = 'block';
        clearErrors();
    });
    
    // Checkout button - show form
    dom.checkoutBtn.addEventListener('click', () => {
        // Guard: check cart not empty
        if (!state.cart || state.cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }
        state.checkoutMode = true;
        dom.checkoutBtn.style.display = 'none';
        dom.checkoutForm.style.display = 'block';
        dom.customerName.focus();
        clearErrors();
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
        if (name.length >= MIN_NAME_LENGTH) {
            dom.customerName.classList.remove('error');
            dom.customerName.classList.add('success');
        } else if (name.length > 0) {
            dom.customerName.classList.add('error');
            dom.customerName.classList.remove('success');
        } else {
            dom.customerName.classList.remove('error', 'success');
        }
        clearErrors();
    });
    
    dom.customerPhone.addEventListener('input', () => {
        const phone = dom.customerPhone.value.trim();
        if (phone.length > 0 && PHONE_REGEX.test(phone)) {
            dom.customerPhone.classList.remove('error');
            dom.customerPhone.classList.add('success');
        } else if (phone.length > 0) {
            dom.customerPhone.classList.add('error');
            dom.customerPhone.classList.remove('success');
        } else {
            dom.customerPhone.classList.remove('error', 'success');
        }
        clearErrors();
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
            clearErrors();
        }
    });
}

// ============================================
// INIT
// ============================================

async function init() {
    console.log('🚀 Addis Eats starting...');
    console.log('📋 All states handled, guards in place');
    
    // Load cart from localStorage
    state.cart = loadCart();
    console.log(`📋 Loaded ${state.cart.length} cart items from localStorage`);
    
    // Load data
    await loadData();
    
    // Setup events
    setupEvents();
    
    console.log(`✅ Loaded ${state.dishes.length} restaurants`);
    console.log('✅ No console errors expected');
    console.log('✅ Ready for presentation!');
}

// Start the app
document.addEventListener('DOMContentLoaded', init);