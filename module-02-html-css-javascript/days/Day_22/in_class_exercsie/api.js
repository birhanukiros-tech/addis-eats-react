/**
 * API Service for fetching exchange rates
 */

// Configuration
const API_CONFIG = {
    BASE_URL: 'https://api.exchangerate-api.com/v4/latest/ETB',
    FALLBACK_URL: 'https://api.frankfurter.app/latest?from=ETB',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000
};

/**
 * Fetch exchange rates with retry logic
 * @returns {Promise<Object>} Exchange rates data
 */
async function fetchExchangeRates(retryCount = 0) {
    try {
        // Primary API call
        const response = await fetchWithTimeout(API_CONFIG.BASE_URL, {
            timeout: API_CONFIG.TIMEOUT
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Validate response structure
        if (!data.rates || typeof data.rates !== 'object') {
            throw new Error('Invalid response structure: missing rates');
        }

        return {
            base: 'ETB',
            rates: data.rates,
            timestamp: new Date().toISOString(),
            success: true
        };

    } catch (error) {
        console.error('Primary API error:', error.message);

        // Retry logic
        if (retryCount < API_CONFIG.RETRY_ATTEMPTS) {
            console.log(`Retrying... (${retryCount + 1}/${API_CONFIG.RETRY_ATTEMPTS})`);
            await delay(API_CONFIG.RETRY_DELAY);
            return fetchExchangeRates(retryCount + 1);
        }

        // Try fallback API
        try {
            console.log('Trying fallback API...');
            const fallbackData = await fetchFallbackRates();
            return fallbackData;
        } catch (fallbackError) {
            console.error('Fallback API error:', fallbackError.message);
            throw new Error('All API attempts failed. Please try again later.');
        }
    }
}

/**
 * Fetch rates from fallback API
 * @returns {Promise<Object>} Exchange rates data
 */
async function fetchFallbackRates() {
    const response = await fetchWithTimeout(API_CONFIG.FALLBACK_URL, {
        timeout: API_CONFIG.TIMEOUT
    });

    if (!response.ok) {
        throw new Error(`Fallback HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data.rates || typeof data.rates !== 'object') {
        throw new Error('Invalid fallback response');
    }

    return {
        base: 'ETB',
        rates: data.rates,
        timestamp: new Date().toISOString(),
        success: true
    };
}

/**
 * Fetch with timeout wrapper
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise<Response>} Fetch response
 */
function fetchWithTimeout(url, options = {}) {
    const { timeout = 10000, ...fetchOptions } = options;

    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Request timeout after ${timeout}ms`));
        }, timeout);

        fetch(url, fetchOptions)
            .then(response => {
                clearTimeout(timer);
                resolve(response);
            })
            .catch(error => {
                clearTimeout(timer);
                reject(error);
            });
    });
}

/**
 * Delay helper for retry logic
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get available currencies from rates
 * @param {Object} rates - Exchange rates object
 * @returns {Array} Array of currency objects
 */
function getAvailableCurrencies(rates) {
    if (!rates || typeof rates !== 'object') {
        return [];
    }

    // Common currency names mapping
    const currencyNames = {
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

    return Object.keys(rates)
        .filter(code => code !== 'ETB') // Exclude base currency
        .sort()
        .map(code => ({
            code: code,
            name: currencyNames[code] || code,
            rate: rates[code]
        }));
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchExchangeRates,
        getAvailableCurrencies
    };
}