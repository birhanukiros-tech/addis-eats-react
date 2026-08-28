/**
 * Birr Watch - Complete Application
 * Exercises 1-5 with all features implemented step by step
 */

// ============================================
// STATE OBJECT (Exercise 1)
// ============================================

const state = {
    rates: null,          // Exchange rates object { USD: 0.0177, KES: 2.29, ... }
    currencies: [],       // Array of currency objects [{ code, name, rate }]
    watchlist: [],        // Array of currency codes ['USD', 'KES']
    watchlistData: [],    // Full data for watchlist items
    isLoading: false,
    error: null,
    lastUpdated: null
};

// ============================================
// DOM REFERENCES
// ============================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const dom = {
    status: $('#status'),
    statusIcon: $('#status .status-icon'),
    statusText: $('#status .status-text'),
    
    currencySelect: $('#currency'),
    watchlistSelect: $('#watchlistSelect'),
    amountInput: $('#amount'),
    convertForm: $('#convertForm'),
    result: $('#result'),
    
    watchlist: $('#watchlist'),
    watchlistCount: $('#watchlistCount'),
    addWatchlistBtn: $('#addWatchlistBtn'),
    
    lastUpdated: $('#lastUpdated')
};

// ============================================
// UI HELPERS
// ============================================

function setStatus(type, message) {
    const status = dom.status;
    const icon = dom.statusIcon;
    const text = dom.statusText;

    status.className = 'status';
    
    if (type === 'loading') {
        status.classList.add('loading');
        icon.textContent = '⟳';
        text.textContent = message || 'Loading...';
    } else if (type === 'success') {
        status.classList.add('success');
        icon.textContent = '✓';
        text.textContent = message || 'Ready';
    } else if (type === 'error') {
        status.classList.add('error');
        icon.textContent = '✗';
        text.textContent = message || 'Error occurred';
    } else {
        // Default/ready
        icon.textContent = '●';
        text.textContent = message || 'Ready';
    }
}

function showResult(message, isError = false) {
    const result = dom.result;
    result.textContent = message;
    result.className = 'result';
    if (message) {
        result.classList.add('show');
        if (isError) {
            result.classList.add('error-result');
        }
    } else {
        result.classList.remove('show');
    }
}

function formatCurrency(amount, currency) {
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    } catch (e) {
        return `${currency} ${amount.toFixed(2)}`;
    }
}

// ============================================
// RENDER FUNCTIONS (Exercise 2)
// ============================================

/**
 * Render currency dropdowns from state
 */
function renderCurrencyDropdowns() {
    const currencies = state.currencies;
    
    // Main converter dropdown
    dom.currencySelect.innerHTML = `
        <option value="">Select currency...</option>
        ${currencies.map(c => `
            <option value="${c.code}">${c.code} - ${c.name}</option>
        `).join('')}
    `;

    // Watchlist add dropdown (exclude already added)
    const watchlistCodes = new Set(state.watchlist);
    const available = currencies.filter(c => !watchlistCodes.has(c.code));
    
    dom.watchlistSelect.innerHTML = `
        <option value="">Add currency...</option>
        ${available.map(c => `
            <option value="${c.code}">${c.code} - ${c.name}</option>
        `).join('')}
    `;

    dom.watchlistSelect.disabled = available.length === 0;
}

/**
 * Render watchlist from state (Exercise 5)
 */
function renderWatchlist() {
    const container = dom.watchlist;
    const data = state.watchlistData;

    // Update count
    dom.watchlistCount.textContent = data.length;

    if (data.length === 0) {
        container.innerHTML = '<li class="watchlist-empty">No currencies in watchlist</li>';
        return;
    }

    container.innerHTML = data.map(item => `
        <li class="watchlist-item" data-currency="${item.code}">
            <div class="currency-info">
                <span class="currency-code">${item.code}</span>
                <span class="currency-name">${item.name}</span>
            </div>
            <div class="currency-rate">
                1 ETB = ${item.rate.toFixed(4)} ${item.code}
            </div>
            <button class="btn btn-danger watchlist-remove" data-c="${item.code}">
                ✕ Remove
            </button>
        </li>
    `).join('');
}

/**
 * Update watchlist data with current rates
 */
function updateWatchlistData() {
    if (!state.rates || !state.watchlist) return;

    state.watchlistData = state.watchlist
        .filter(code => state.rates[code])
        .map(code => ({
            code: code,
            name: state.currencies.find(c => c.code === code)?.name || code,
            rate: state.rates[code]
        }));
}

/**
 * Update last updated timestamp
 */
function updateLastUpdated() {
    if (state.lastUpdated) {
        try {
            const date = new Date(state.lastUpdated);
            dom.lastUpdated.textContent = date.toLocaleString();
        } catch (e) {
            dom.lastUpdated.textContent = 'Just now';
        }
    }
}

/**
 * Main render function (Exercise 2)
 */
function render() {
    renderCurrencyDropdowns();
    updateWatchlistData();
    renderWatchlist();
    updateLastUpdated();
}

// ============================================
// FAKE DATA (Exercise 2)
// ============================================

function loadFakeData() {
    console.log('📊 Loading fake data for testing...');
    
    const fakeRates = {
        USD: 0.0177,
        KES: 2.29,
        EUR: 0.0298,
        GBP: 0.0256,
        CAD: 0.0321,
        JPY: 4.56
    };

    state.rates = fakeRates;
    state.lastUpdated = new Date().toISOString();
    
    // Create currencies array
    state.currencies = Object.keys(fakeRates)
        .sort()
        .map(code => ({
            code: code,
            name: getCurrencyName(code),
            rate: fakeRates[code]
        }));

    render();
    setStatus('success', '✅ Fake data loaded for testing');
}

// ============================================
// CURRENCY NAMES (Helper)
// ============================================

function getCurrencyName(code) {
    const names = {
        'USD': 'US Dollar',
        'EUR': 'Euro',
        'GBP': 'British Pound',
        'JPY': 'Japanese Yen',
        'CHF': 'Swiss Franc',
        'CAD': 'Canadian Dollar',
        'AUD': 'Australian Dollar',
        'CNY': 'Chinese Yuan',
        'INR': 'Indian Rupee',
        'BRL': 'Brazilian Real',
        'ZAR': 'South African Rand',
        'NGN': 'Nigerian Naira',
        'KES': 'Kenyan Shilling',
        'TZS': 'Tanzanian Shilling',
        'UGX': 'Ugandan Shilling',
        'RWF': 'Rwandan Franc'
    };
    return names[code] || code;
}

// ============================================
// API FUNCTIONS (Exercise 3)
// ============================================

/**
 * Load real exchange rates from API
 */
async function loadRates() {
    if (state.isLoading) return;

    state.isLoading = true;
    setStatus('loading', 'Fetching live exchange rates...');

    try {
        // Primary API
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/ETB', {
            signal: AbortSignal.timeout(10000)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.rates || typeof data.rates !== 'object') {
            throw new Error('Invalid response: missing rates');
        }

        // Update state
        state.rates = data.rates;
        state.lastUpdated = data.timestamp || new Date().toISOString();
        
        // Build currencies array
        state.currencies = Object.keys(state.rates)
            .filter(code => code !== 'ETB')
            .sort()
            .map(code => ({
                code: code,
                name: getCurrencyName(code),
                rate: state.rates[code]
            }));

        // Save to localStorage cache
        saveRatesCache(data);

        render();
        setStatus('success', `✅ Rates updated (${state.currencies.length} currencies)`);

    } catch (error) {
        console.error('Error loading rates:', error);
        
        // Try to load from cache
        const cached = loadRatesCache();
        if (cached && cached.rates) {
            state.rates = cached.rates;
            state.lastUpdated = cached.timestamp || getLastUpdated();
            
            state.currencies = Object.keys(state.rates)
                .filter(code => code !== 'ETB')
                .sort()
                .map(code => ({
                    code: code,
                    name: getCurrencyName(code),
                    rate: state.rates[code]
                }));

            render();
            setStatus('warning', `⚠️ Using cached rates (${error.message})`);
        } else {
            // No cache available
            setStatus('error', `❌ Failed to load rates: ${error.message}`);
            state.error = error.message;
            render();
        }
    } finally {
        state.isLoading = false;
    }
}

// ============================================
// STORAGE HELPERS (Exercise 6)
// ============================================

function saveWatchlist() {
    try {
        if (!Array.isArray(state.watchlist)) {
            throw new Error('Watchlist must be an array');
        }
        localStorage.setItem('birr_watchlist', JSON.stringify(state.watchlist));
        return true;
    } catch (error) {
        console.error('Error saving watchlist:', error.message);
        return false;
    }
}

function loadWatchlist() {
    try {
        const stored = localStorage.getItem('birr_watchlist');
        
        if (stored === null) {
            return [];
        }

        const parsed = JSON.parse(stored);
        
        if (!Array.isArray(parsed)) {
            console.warn('Corrupt watchlist data, resetting...');
            localStorage.removeItem('birr_watchlist');
            return [];
        }

        return parsed.filter(code => typeof code === 'string' && code.length > 0);
    } catch (error) {
        console.error('Error loading watchlist:', error.message);
        try {
            localStorage.removeItem('birr_watchlist');
        } catch (e) {
            console.error('Failed to remove corrupt data:', e.message);
        }
        return [];
    }
}

function saveRatesCache(ratesData) {
    try {
        if (!ratesData || typeof ratesData !== 'object') {
            throw new Error('Invalid rates data');
        }
        localStorage.setItem('birr_rates_cache', JSON.stringify(ratesData));
        localStorage.setItem('birr_rates_timestamp', new Date().toISOString());
        return true;
    } catch (error) {
        console.error('Error saving rates cache:', error.message);
        return false;
    }
}

function loadRatesCache() {
    try {
        const stored = localStorage.getItem('birr_rates_cache');
        
        if (stored === null) {
            return null;
        }

        const parsed = JSON.parse(stored);
        
        if (!parsed.rates || typeof parsed.rates !== 'object') {
            console.warn('Corrupt rates cache, removing...');
            localStorage.removeItem('birr_rates_cache');
            localStorage.removeItem('birr_rates_timestamp');
            return null;
        }

        return parsed;
    } catch (error) {
        console.error('Error loading rates cache:', error.message);
        try {
            localStorage.removeItem('birr_rates_cache');
            localStorage.removeItem('birr_rates_timestamp');
        } catch (e) {
            console.error('Failed to remove corrupt data:', e.message);
        }
        return null;
    }
}

function getLastUpdated() {
    try {
        return localStorage.getItem('birr_rates_timestamp');
    } catch (error) {
        console.error('Error getting last updated:', error.message);
        return null;
    }
}

// ============================================
// CONVERTER (Exercise 4)
// ============================================

/**
 * Handle conversion form submission
 */
function handleConvert(event) {
    event.preventDefault();

    const amount = parseFloat(dom.amountInput.value);
    const currency = dom.currencySelect.value;

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
        showResult('❌ Please enter a valid amount greater than 0', true);
        return;
    }

    // Validate currency
    if (!currency) {
        showResult('❌ Please select a currency', true);
        return;
    }

    // Check if rates are loaded
    if (!state.rates) {
        showResult('❌ Exchange rates not loaded. Please refresh.', true);
        return;
    }

    // Look up rate
    const rate = state.rates[currency];
    if (!rate) {
        showResult(`❌ Rate for ${currency} not available`, true);
        return;
    }

    // Calculate conversion
    const result = amount * rate;
    
    // Show result
    showResult(`
        <div>
            <span class="result-amount">${formatCurrency(amount, 'ETB')}</span>
            = 
            <span class="result-amount">${formatCurrency(result, currency)}</span>
        </div>
        <div class="result-rate">
            1 ETB = ${rate.toFixed(4)} ${currency}
        </div>
    `);
    
    setStatus('success', `✅ Converted ${amount} ETB to ${currency}`);
}

// ============================================
// WATCHLIST FUNCTIONS (Exercise 5)
// ============================================

/**
 * Add currency to watchlist
 */
function addToWatchlist(currencyCode) {
    if (!currencyCode || !state.rates[currencyCode]) {
        setStatus('error', '❌ Invalid currency selected');
        return;
    }

    // Check for duplicates
    if (state.watchlist.includes(currencyCode)) {
        setStatus('error', `❌ ${currencyCode} is already in your watchlist`);
        return;
    }

    // Add to watchlist
    state.watchlist.push(currencyCode);
    
    // Save to localStorage (Exercise 6)
    saveWatchlist();
    
    // Update and render
    updateWatchlistData();
    render();
    
    setStatus('success', `✅ Added ${currencyCode} to watchlist`);
}

/**
 * Remove currency from watchlist
 */
function removeFromWatchlist(currencyCode) {
    if (!currencyCode) return;

    const index = state.watchlist.indexOf(currencyCode);
    if (index === -1) return;

    // Remove from watchlist
    state.watchlist.splice(index, 1);
    
    // Save to localStorage (Exercise 6)
    saveWatchlist();
    
    // Update and render
    updateWatchlistData();
    render();
    
    setStatus('success', `✅ Removed ${currencyCode} from watchlist`);
}

// ============================================
// EVENT HANDLERS
// ============================================

// Converter form
dom.convertForm.addEventListener('submit', handleConvert);

// Add to watchlist
dom.addWatchlistBtn.addEventListener('click', () => {
    const currency = dom.watchlistSelect.value;
    if (!currency) {
        setStatus('error', '❌ Please select a currency to add');
        return;
    }
    addToWatchlist(currency);
});

// Remove from watchlist (delegation - Exercise 5)
dom.watchlist.addEventListener('click', (event) => {
    const removeBtn = event.target.closest('.watchlist-remove');
    if (!removeBtn) return;

    const currencyCode = removeBtn.dataset.c;
    if (!currencyCode) return;

    removeFromWatchlist(currencyCode);
});

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        showResult('');
        setStatus('success', 'Ready');
    }
});

// ============================================
// INITIALIZATION (Exercise 6)
// ============================================

async function init() {
    console.log('🚀 Initializing Birr Watch...');
    
    // Load watchlist from localStorage (Exercise 6)
    state.watchlist = loadWatchlist();
    console.log(`📋 Loaded ${state.watchlist.length} watchlist items from localStorage`);
    
    // Try to load real rates
    await loadRates();
    
    // If rates failed to load and no cache, use fake data for demo
    if (!state.rates) {
        console.log('⚠️ No rates loaded, using fake data for demo');
        loadFakeData();
    }
    
    // Update UI
    render();
    
    console.log('✅ Birr Watch initialized successfully');
    console.log(`📊 ${state.currencies.length} currencies available`);
    console.log(`⭐ ${state.watchlist.length} watchlist items`);
}

// Start the app
init();