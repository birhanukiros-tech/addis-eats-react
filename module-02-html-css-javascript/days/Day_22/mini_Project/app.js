/**
 * Birr Watch - Complete Application
 * State → Render → Events Loop
 */

// ============================================
// STATE OBJECT
// ============================================

const state = {
    rates: null,          // Exchange rates object { USD: 0.0177, KES: 2.29 }
    currencies: [],       // Array of currency objects [{ code, name, rate }]
    watchlist: [],        // Array of currency codes ['USD', 'KES']
    watchlistData: [],    // Full data for watchlist items
    lastCurrency: '',     // Last selected currency for persistence
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
    
    currencySelect: $('#currencySelect'),
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
// STORAGE HELPERS
// ============================================

const STORAGE_KEYS = {
    WATCHLIST: 'birr_watchlist',
    LAST_CURRENCY: 'birr_last_currency',
    RATES_CACHE: 'birr_rates_cache',
    RATES_TIMESTAMP: 'birr_rates_timestamp'
};

function saveWatchlist() {
    try {
        if (!Array.isArray(state.watchlist)) return false;
        localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(state.watchlist));
        return true;
    } catch (e) {
        console.error('Error saving watchlist:', e.message);
        return false;
    }
}

function loadWatchlist() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
        if (stored === null) return [];
        
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) {
            localStorage.removeItem(STORAGE_KEYS.WATCHLIST);
            return [];
        }
        
        return parsed.filter(code => typeof code === 'string' && code.length > 0);
    } catch (e) {
        console.error('Error loading watchlist:', e.message);
        try { localStorage.removeItem(STORAGE_KEYS.WATCHLIST); } catch (err) {}
        return [];
    }
}

function saveLastCurrency(currency) {
    try {
        if (!currency) return false;
        localStorage.setItem(STORAGE_KEYS.LAST_CURRENCY, currency);
        return true;
    } catch (e) {
        console.error('Error saving last currency:', e.message);
        return false;
    }
}

function loadLastCurrency() {
    try {
        return localStorage.getItem(STORAGE_KEYS.LAST_CURRENCY) || '';
    } catch (e) {
        console.error('Error loading last currency:', e.message);
        return '';
    }
}

function saveRatesCache(ratesData) {
    try {
        if (!ratesData || typeof ratesData !== 'object') return false;
        localStorage.setItem(STORAGE_KEYS.RATES_CACHE, JSON.stringify(ratesData));
        localStorage.setItem(STORAGE_KEYS.RATES_TIMESTAMP, new Date().toISOString());
        return true;
    } catch (e) {
        console.error('Error saving rates cache:', e.message);
        return false;
    }
}

function loadRatesCache() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.RATES_CACHE);
        if (stored === null) return null;
        
        const parsed = JSON.parse(stored);
        if (!parsed.rates || typeof parsed.rates !== 'object') {
            localStorage.removeItem(STORAGE_KEYS.RATES_CACHE);
            localStorage.removeItem(STORAGE_KEYS.RATES_TIMESTAMP);
            return null;
        }
        
        return parsed;
    } catch (e) {
        console.error('Error loading rates cache:', e.message);
        try {
            localStorage.removeItem(STORAGE_KEYS.RATES_CACHE);
            localStorage.removeItem(STORAGE_KEYS.RATES_TIMESTAMP);
        } catch (err) {}
        return null;
    }
}

function getLastUpdated() {
    try {
        return localStorage.getItem(STORAGE_KEYS.RATES_TIMESTAMP) || null;
    } catch (e) {
        return null;
    }
}

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
        'RWF': 'Rwandan Franc',
        'ETB': 'Ethiopian Birr'
    };
    return names[code] || code;
}

// ============================================
// RENDER FUNCTION - State → UI
// ============================================

function render() {
    // 1. Render currency dropdowns
    renderCurrencyDropdowns();
    
    // 2. Update watchlist data with current rates
    updateWatchlistData();
    
    // 3. Render watchlist
    renderWatchlist();
    
    // 4. Update last updated
    updateLastUpdated();
    
    // 5. Set last currency in dropdown
    if (state.lastCurrency && dom.currencySelect) {
        dom.currencySelect.value = state.lastCurrency;
    }
}

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

function renderWatchlist() {
    const container = dom.watchlist;
    const data = state.watchlistData;

    // Update count
    dom.watchlistCount.textContent = `${data.length} ${data.length === 1 ? 'currency' : 'currencies'}`;

    // Empty state
    if (data.length === 0) {
        container.innerHTML = `<li class="watchlist-empty">No currencies in watchlist. Add your favorites!</li>`;
        return;
    }

    // Render items
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

// ============================================
// API FUNCTIONS
// ============================================

async function loadRates() {
    if (state.isLoading) return;

    state.isLoading = true;
    setStatus('loading', 'Fetching live exchange rates...');

    try {
        // Try API
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
        state.error = null;
        
        // Build currencies array
        state.currencies = Object.keys(state.rates)
            .filter(code => code !== 'ETB')
            .sort()
            .map(code => ({
                code: code,
                name: getCurrencyName(code),
                rate: state.rates[code]
            }));

        // Cache rates
        saveRatesCache(data);

        // Render
        render();
        setStatus('success', `✅ Rates updated (${state.currencies.length} currencies)`);

    } catch (error) {
        console.error('Error loading rates:', error);
        
        // Try cache
        const cached = loadRatesCache();
        if (cached && cached.rates) {
            state.rates = cached.rates;
            state.lastUpdated = cached.timestamp || getLastUpdated();
            state.error = null;
            
            state.currencies = Object.keys(state.rates)
                .filter(code => code !== 'ETB')
                .sort()
                .map(code => ({
                    code: code,
                    name: getCurrencyName(code),
                    rate: state.rates[code]
                }));

            render();
            setStatus('error', `⚠️ Using cached rates (${error.message})`);
        } else {
            // No cache - show error
            state.error = error.message;
            render();
            setStatus('error', `❌ Failed to load rates: ${error.message}`);
        }
    } finally {
        state.isLoading = false;
    }
}

// ============================================
// CONVERTER
// ============================================

function handleConvert(event) {
    event.preventDefault();

    const amountInput = dom.amountInput.value.trim();
    const currency = dom.currencySelect.value;

    // Validate amount
    if (!amountInput) {
        showResult('❌ Please enter an amount', true);
        return;
    }

    const amount = Number(amountInput);
    if (isNaN(amount) || amount <= 0) {
        showResult('❌ Please enter a valid amount greater than 0', true);
        return;
    }

    // Validate currency
    if (!currency) {
        showResult('❌ Please select a currency', true);
        return;
    }

    // Check rates
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

    // Calculate
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
    
    // Save last currency
    state.lastCurrency = currency;
    saveLastCurrency(currency);
    
    setStatus('success', `✅ Converted ${amount} ETB to ${currency}`);
}

// ============================================
// WATCHLIST
// ============================================

function addToWatchlist(currencyCode) {
    if (!currencyCode || !state.rates || !state.rates[currencyCode]) {
        setStatus('error', '❌ Invalid currency selected');
        return;
    }

    // Check duplicates
    if (state.watchlist.includes(currencyCode)) {
        setStatus('error', `❌ ${currencyCode} is already in your watchlist`);
        return;
    }

    // Add to state
    state.watchlist.push(currencyCode);
    
    // Persist
    saveWatchlist();
    
    // Render
    render();
    
    setStatus('success', `✅ Added ${currencyCode} to watchlist`);
}

function removeFromWatchlist(currencyCode) {
    if (!currencyCode) return;

    const index = state.watchlist.indexOf(currencyCode);
    if (index === -1) return;

    // Remove from state
    state.watchlist.splice(index, 1);
    
    // Persist
    saveWatchlist();
    
    // Render
    render();
    
    setStatus('success', `✅ Removed ${currencyCode} from watchlist`);
}

// ============================================
// EVENT LISTENERS
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

// Remove from watchlist (event delegation)
dom.watchlist.addEventListener('click', (event) => {
    const removeBtn = event.target.closest('.watchlist-remove');
    if (!removeBtn) return;

    const currencyCode = removeBtn.dataset.c;
    if (!currencyCode) return;

    removeFromWatchlist(currencyCode);
});

// Real-time validation
dom.amountInput.addEventListener('input', function() {
    const val = this.value.trim();
    if (val && (isNaN(Number(val)) || Number(val) <= 0)) {
        this.classList.add('error');
    } else {
        this.classList.remove('error');
    }
});

// ============================================
// INITIALIZATION
// ============================================

function init() {
    console.log('🚀 Initializing Birr Watch...');
    
    // Load from localStorage
    state.watchlist = loadWatchlist();
    state.lastCurrency = loadLastCurrency();
    
    console.log(`📋 Loaded ${state.watchlist.length} watchlist items`);
    console.log(`💱 Last currency: ${state.lastCurrency || 'none'}`);
    
    // Load rates
    loadRates().then(() => {
        // After rates load, restore last currency
        if (state.lastCurrency && dom.currencySelect) {
            dom.currencySelect.value = state.lastCurrency;
        }
        console.log('✅ Birr Watch ready!');
    });
}

// Start app
document.addEventListener('DOMContentLoaded', init);