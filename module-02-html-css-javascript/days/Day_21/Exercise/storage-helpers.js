/**
 * Storage Helper Functions
 * Requirements: #2 - Write save() and load() helpers
 */

/**
 * Save an array to localStorage with JSON stringification
 * @param {string} key - Storage key
 * @param {Array} data - Array to save
 * @throws {Error} - Throws if data is not an array or if storage fails
 */
function save(key, data) {
    try {
        // Validate input is an array
        if (!Array.isArray(data)) {
            throw new Error('Data must be an array');
        }

        // Stringify the array to JSON
        const jsonData = JSON.stringify(data);
        
        // Save to localStorage
        localStorage.setItem(key, jsonData);
        
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error.message);
        return false;
    }
}

/**
 * Load an array from localStorage with JSON parsing
 * @param {string} key - Storage key
 * @param {Array} defaultValue - Default value if nothing is found
 * @returns {Array} - Parsed array or default value
 */
function load(key, defaultValue = []) {
    try {
        // Get data from localStorage
        const storedData = localStorage.getItem(key);
        
        // Check if data exists
        if (storedData === null) {
            return defaultValue;
        }

        // Parse the JSON data
        const parsedData = JSON.parse(storedData);
        
        // Validate parsed data is an array
        if (!Array.isArray(parsedData)) {
            console.warn('Stored data is not an array, returning default');
            return defaultValue;
        }

        return parsedData;
    } catch (error) {
        // Handle corrupt data or JSON parse errors
        console.error('Error loading from localStorage:', error.message);
        
        // Remove corrupt data to prevent recurring errors
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Failed to remove corrupt data:', e.message);
        }
        
        return defaultValue;
    }
}

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { save, load };
}