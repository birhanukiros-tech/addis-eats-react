/**
 * Storage Service for localStorage operations
 */

// Constants
const STORAGE_KEYS = {
    WATCHLIST: 'birr_watch_watchlist',
    RATES: 'birr_watch_rates',
    LAST_UPDATED: 'birr_watch_last_updated'
};

/**
 * Save watchlist to localStorage
 * @param {Array} watchlist - Array of currency codes
 * @returns {boolean} Success status
 */
function saveWatchlist(watchlist) {
    try {
        if (!Array.isArray(watchlist)) {
            throw new Error('Watchlist must be an array');
        }
        localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(watchlist));
        return true;
    } catch (error) {
        console.error('Error saving watchlist:', error.message);
        return false;
    }
}

/**
 * Load watchlist from localStorage
 * @returns {Array} Watchlist array or empty array
 */
function loadWatchlist() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
        
        if (stored === null) {
            return [];
        }

        const parsed = JSON.parse(stored);
        
        if (!Array.isArray(parsed)) {
            console.warn('Corrupt watchlist data, resetting...');
            localStorage.removeItem(STORAGE_KEYS.WATCHLIST);
            return [];
        }

        // Filter out any invalid entries
        return parsed.filter(item => typeof item === 'string' && item.length > 0);
    } catch (error) {
        console.error('Error loading watchlist:', error.message);
        try {
            localStorage.removeItem(STORAGE_KEYS.WATCHLIST);
        } catch (e) {
            console.error('Failed to remove corrupt data:', e.message);
        }
        return [];
    }
}

/**
 * Save rates data to localStorage (cached)
 * @param {Object} ratesData - Rates data object
 * @returns {boolean} Success status
 */
function saveRatesCache(ratesData) {
    try {
        if (!ratesData || typeof ratesData !== 'object') {
            throw new Error('Invalid rates data');
        }
        
        localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(ratesData));
        localStorage.setItem(STORAGE_KEYS.LAST_UPDATED, new Date().toISOString());
        return true;
    } catch (error) {
        console.error('Error saving rates cache:', error.message);
        return false;
    }
}

/**
 * Load cached rates from localStorage
 * @returns {Object|null} Cached rates data or null
 */
function loadRatesCache() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.RATES);
        
        if (stored === null) {
            return null;
        }

        const parsed = JSON.parse(stored);
        
        if (!parsed.rates || typeof parsed.rates !== 'object') {
            console.warn('Corrupt rates cache, removing...');
            localStorage.removeItem(STORAGE_KEYS.RATES);
            localStorage.removeItem(STORAGE_KEYS.LAST_UPDATED);
            return null;
        }

        return parsed;
    } catch (error) {
        console.error('Error loading rates cache:', error.message);
        try {
            localStorage.removeItem(STORAGE_KEYS.RATES);
            localStorage.removeItem(STORAGE_KEYS.LAST_UPDATED);
        } catch (e) {
            console.error('Failed to remove corrupt data:', e.message);
        }
        return null;
    }
}

/**
 * Get last updated timestamp
 * @returns {string|null} ISO timestamp or null
 */
function getLastUpdated() {
    try {
        return localStorage.getItem(STORAGE_KEYS.LAST_UPDATED);
    } catch (error) {
        console.error('Error getting last updated:', error.message);
        return null;
    }
}

/**
 * Clear all app data from localStorage
 * @returns {boolean} Success status
 */
function clearAllData() {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        return true;
    } catch (error) {
        console.error('Error clearing data:', error.message);
        return false;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        saveWatchlist,
        loadWatchlist,
        saveRatesCache,
        loadRatesCache,
        getLastUpdated,
        clearAllData,
        STORAGE_KEYS
    };
}