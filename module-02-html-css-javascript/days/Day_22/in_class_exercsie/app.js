/**
 * Birr Watch - Main Application
 * Requirements: All features implemented with localStorage persistence
 */

// ============================================
// STATE
// ============================================

const state = {
    rates: null,          // Exchange rates object
    currencies: [],       // Available currencies array
    watchlist: [],        // Array of currency codes
    watchlistData: [],    // Full watchlist data with rates
    isLoading: false,
    error: null,
    lastUpdated: null
};

// ============================================
// DOM REFS
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
    conversionResult: $('#conversionResult'),
    
    watchlistContainer: $('#watchlistContainer'),
    addWatchlistBtn: $('#addWatchlistBtn'),
    watchlistCount: $('#watchlistCount'),
    
    lastUpdated: $('#lastUpdated')
};

// ============================================
// UI HELPERS
// ============================================

/**
 * Set status message
 * @param {string} type - 'loading', 'success', 'error'
 * @param {string} message - Status message
 */
function setStatus(type, message) {
    const status = dom.status;
    const icon = dom.statusIcon;
    const text = dom.statusText;

    // Reset classes
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
    }
}

/**
 * Show conversion result
 * @param {number} amount - Amount in ETB
 * @param {string} currency - Currency code
 * @param {number} rate - Exchange rate
 * @param {number} result - Converted amount
 */
function showConversionResult(amount, currency, rate, result) {
    const container = dom.conversionResult;
    container.innerHTML = `
        <div>
            <span class="result-amount">${formatCurrency(amount, 'ETB')}</span>
            = 
            <span class="result-amount">${formatCurrency(result, currency)}</span>
        </div>
        <div class="result-rate">
            1 ETB = ${rate.toFixed(4)} ${currency}
        </div>
    `;
    container.classList.add('show');
}

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted string
 */
function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Update last updated time
 */
function updateLastUpdated() {
    const timestamp = state.lastUpdated || new Date().toISOString();
    try {
        const date = new Date(timestamp);
        dom.lastUpdated.textContent = date.toLocaleString();
    } catch (e) {
        dom.lastUpdated.textContent = 'Just now';
    }
}

// ============================================
// RENDER FUNCTIONS
// ============================================

/**
 * Render currency dropdowns
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
        <option value="">Add currency to watchlist...</option>
        ${available.map(c => `
            <option value="${c.code}">${c.code} - ${c.name}</option>
        `).join('')}
    `;

    // Disable select if no available currencies
    dom.watchlistSelect.disabled = available.length === 0;
}

/**
 * Render watchlist
 */
function renderWatchlist() {
    const container = dom.watchlistContainer;
    const watchlistData = state.watchlistData;

    // Update count
    dom.watchlistCount.textContent = `${watchlistData.length} currencies`;

    if (watchlistData.length === 0) {
        container.innerHTML = '<p class="empty-message">No currencies in watchlist. Add your favorites!</p>';
        return;
    }

    container.innerHTML = watchlistData.map(item => `
        <div class="watchlist-item" data-currency="${item.code}">
            <div class="currency-info">
                <span class="currency-code">${item.code}</span>
                <span class="currency-name">${item.name}</span>
            </div>
            <div class="currency-rate">
                1 ETB = ${item.rate.toFixed(4)} ${item.code}
            </div>
            <div class="currency-actions">
                <button class="btn btn-danger watchlist-remove" data-currency="${item.code}">
                    ✕
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Update UI after data changes
 */
function updateUI() {
    renderCurrencyDropdowns();
    renderWatchlist();
    updateLastUpdated();
}

// ============================================
// DATA FUNCTIONS
// ============================================

/**
 * Load exchange rates
 */
async function loadRates() {
    if (state.isLoading) return;

    state.isLoading = true;
    setStatus('loading', 'Fetching latest exchange rates...');

    try {
        // Try cached rates first
        const cached = loadRatesCache();
        if (cached && cached.rates) {
            console.log('Using cached rates');
            state.rates = cached.rates;
            state.lastUpdated = cached.timestamp || getLastUpdated();
            processRates();
            setStatus('success', 'Rates loaded from cache');
        }

        // Always try to fetch fresh rates
        const data = await fetchExchangeRates();
        state.rates = data.rates;
        state.lastUpdated = data.timestamp;
        
        // Cache the fresh rates
        saveRatesCache(data);
        
        processRates();
        setStatus('success', `Rates updated successfully (${Object.keys(state.rates).length} currencies)`);
        
    } catch (error) {
        console.error('Error loading rates:', error);
        
        // Check if we have cached rates
        if (!state.rates) {
            setStatus('error', error.message || 'Failed to load exchange rates');
            state.error = error.message;
        } else {
            setStatus('success', 'Using cached rates (fresh update failed)');
        }
    } finally {
        state.isLoading = false;
    }
}

/**
 * Process rates data
 */
function processRates() {
    if (!state.rates) return;

    // Get available currencies
    state.currencies = getAvailableCurrencies(state.rates);
    
    // Update watchlist data with current rates
    updateWatchlistData();
    
    // Update UI
    updateUI();
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

// ============================================
// WATCHLIST FUNCTIONS
// ============================================

/**
 * Add currency to watchlist
 * @param {string} currencyCode - Currency code to add
 */
function addToWatchlist(currencyCode) {
    if (!currencyCode || !state.rates[currencyCode]) {
        showConversionResult('Invalid currency selected');
        return;
    }

    // Check for duplicates
    if (state.watchlist.includes(currencyCode)) {
        setStatus('error', `${currencyCode} is already in your watchlist`);
        return;
    }

    // Add to watchlist
    state.watchlist.push(currencyCode);
    
    // Save to localStorage
    saveWatchlist(state.watchlist);
    
    // Update watchlist data
    updateWatchlistData();
    
    // Update UI
    updateUI();
    
    setStatus('success', `Added ${currencyCode} to watchlist`);
}

/**
 * Remove currency from watchlist
 * @param {string} currencyCode - Currency code to remove
 */
function removeFromWatchlist(currencyCode) {
    if (!currencyCode) return;

    const index = state.watchlist.indexOf(currencyCode);
    if (index === -1) return;

    // Remove from watchlist
    state.watchlist.splice(index, 1);
    
    // Save to localStorage
    saveWatchlist(state.watchlist);
    
    // Update watchlist data
    updateWatchlistData();
    
    // Update UI
    updateUI();
    
    setStatus('success', `Removed ${currencyCode} from watchlist`);
}

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handle conversion form submission
 * @param {Event} event - Submit event
 */
function handleConvert(event) {
    event.preventDefault();

    const amount = parseFloat(dom.amountInput.value);
    const currency = dom.currencySelect.value;

    // Validate input
    if (!amount || amount <= 0) {
        setStatus('error', 'Please enter a valid amount');
        dom.conversionResult.classList.remove('show');
        return;
    }

    if (!currency) {
        setStatus('error', 'Please select a currency');
        dom.conversionResult.classList.remove('show');
        return;
    }

    // Get rate
    const rate = state.rates[currency];
    if (!rate) {
        setStatus('error', `Rate for ${currency} not available`);
        dom.conversionResult.classList.remove('show');
        return;
    }

    // Calculate
    const result = amount * rate;
    
    // Show result
    showConversionResult(amount, currency, rate, result);
    setStatus('success', `Converted ${amount} ETB to ${currency}`);
}

/**
 * Handle watchlist add
 */
function handleAddWatchlist() {
    const currency = dom.watchlistSelect.value;
    if (!currency) {
        setStatus('error', 'Please select a currency to add');
        return;
    }
    addToWatchlist(currency);
}

/**
 * Handle watchlist remove (event delegation)
 * @param {Event} event - Click event
 */
function handleWatchlistRemove(event) {
    const removeBtn = event.target.closest('.watchlist-remove');
    if (!removeBtn) return;

    const currency = removeBtn.dataset.currency;
    if (!currency) return;

    removeFromWatchlist(currency);
}

/**
 * Handle keyboard shortcuts
 * @param {KeyboardEvent} event - Keydown event
 */
function handleKeyboardShortcuts(event) {
    // Escape to clear status
    if (event.key === 'Escape') {
        setStatus('success', 'Ready');
        dom.conversionResult.classList.remove('show');
    }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the app
 */
async function initApp() {
    console.log('🚀 Initializing Birr Watch...');

    // Load watchlist from localStorage
    state.watchlist = loadWatchlist();
    console.log(`📋 Loaded ${state.watchlist.length} watchlist items`);

    // Load rates
    await loadRates();
}
    // Set up event listeners
    dom.convertForm.addEventListener('submit', handleConvert);
    dom.addWatchlistBtn.addEventListener('click', handleAddWatchlist);