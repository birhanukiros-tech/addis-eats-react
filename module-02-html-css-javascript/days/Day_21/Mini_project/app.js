/**
 * Validated, Persistent Signup Form
 * Requirements: Complete validation, storage, and persistence
 */

// ============================================
// CONFIGURATION
// ============================================

const STORAGE_KEY = 'signup_entries';
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;

// ============================================
// DOM REFERENCES
// ============================================

const form = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const errorArea = document.getElementById('errorArea');
const signupCount = document.getElementById('signupCount');
const entriesList = document.getElementById('entriesList');
const clearBtn = document.getElementById('clearEntries');

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validate the form inputs
 * @param {string} name - Trimmed name value
 * @param {string} phone - Trimmed phone value
 * @returns {string} - Error message or empty string if valid
 */
function validate(name, phone) {
    // Check name length
    if (name.length < 2) {
        return '❌ Name must be at least 2 characters long.';
    }

    // Check phone against Ethiopian regex
    if (!PHONE_REGEX.test(phone)) {
        return '❌ Invalid phone number. Use 0912345678 or +251912345678.';
    }

    // All valid
    return '';
}

// ============================================
// STORAGE HELPERS
// ============================================

/**
 * Save entries to localStorage as JSON
 * @param {Array} entries - Array of entry objects
 * @returns {boolean} - Success status
 */
function saveEntries(entries) {
    try {
        // Validate entries is an array
        if (!Array.isArray(entries)) {
            throw new Error('Entries must be an array');
        }

        // Stringify and save
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        return true;
    } catch (error) {
        console.error('Error saving entries:', error.message);
        return false;
    }
}

/**
 * Load entries from localStorage
 * @returns {Array} - Array of entry objects or empty array
 */
function loadEntries() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        // Handle null (no data)
        if (stored === null) {
            return [];
        }

        // Parse JSON
        const parsed = JSON.parse(stored);

        // Handle corrupt data (not an array)
        if (!Array.isArray(parsed)) {
            console.warn('Corrupt data detected, removing...');
            localStorage.removeItem(STORAGE_KEY);
            return [];
        }

        return parsed;
    } catch (error) {
        // Handle JSON parse errors or other issues
        console.error('Error loading entries:', error.message);
        // Remove corrupt data
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.error('Failed to remove corrupt data:', e.message);
        }
        return [];
    }
}

// ============================================
// UI UPDATE FUNCTIONS
// ============================================

/**
 * Display a message in the error area
 * @param {string} message - Message to display
 * @param {string} type - 'error' or 'success'
 */
function showMessage(message, type = 'error') {
    // Use textContent for security
    errorArea.textContent = message;
    errorArea.className = 'error-area';

    if (message) {
        errorArea.classList.add(type);
    }
}

/**
 * Update the signup count display
 * @param {Array} entries - Array of entries
 */
function updateCount(entries) {
    const count = entries ? entries.length : 0;
    signupCount.textContent = count;
}

/**
 * Render the list of entries
 * @param {Array} entries - Array of entry objects
 */
function renderEntries(entries) {
    if (!entries || entries.length === 0) {
        entriesList.innerHTML = '<div class="no-entries">No signups yet</div>';
        return;
    }

    // Sort by newest first
    const sorted = [...entries].reverse();

    // Build entries HTML
    const html = sorted.map(entry => `
        <div class="entry-item">
            <span class="entry-name">${escapeHTML(entry.name)}</span>
            <span class="entry-phone">${escapeHTML(entry.phone)}</span>
            <span class="entry-time">${formatTime(entry.timestamp)}</span>
        </div>
    `).join('');

    entriesList.innerHTML = html;
}

/**
 * Escape HTML to prevent XSS (extra safety)
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format timestamp for display
 * @param {string} timestamp - ISO timestamp
 * @returns {string} - Formatted time
 */
function formatTime(timestamp) {
    if (!timestamp) return 'Just now';
    
    try {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000 / 60); // minutes

        if (diff < 1) return 'Just now';
        if (diff < 60) return `${diff}m ago`;
        if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
        return date.toLocaleDateString();
    } catch (e) {
        return 'Recently';
    }
}

// ============================================
// CORE FUNCTIONS
// ============================================

/**
 * Refresh the entire UI from storage
 */
function refreshUI() {
    const entries = loadEntries();
    updateCount(entries);
    renderEntries(entries);
}

/**
 * Add a new signup entry
 * @param {string} name - User's name
 * @param {string} phone - User's phone
 * @returns {boolean} - Success status
 */
function addEntry(name, phone) {
    // Load existing entries
    const entries = loadEntries();

    // Create new entry
    const newEntry = {
        id: Date.now(),
        name: name,
        phone: phone,
        timestamp: new Date().toISOString()
    };

    // Add to array
    entries.push(newEntry);

    // Save
    if (saveEntries(entries)) {
        refreshUI();
        return true;
    }

    return false;
}

/**
 * Clear all entries
 */
function clearAllEntries() {
    if (confirm('Are you sure you want to delete all signups?')) {
        if (saveEntries([])) {
            refreshUI();
            showMessage('✅ All entries cleared.', 'success');
        }
    }
}

// ============================================
// FORM HANDLING
// ============================================

/**
 * Handle form submission
 * @param {Event} event - Submit event
 */
function handleSubmit(event) {
    // REQUIREMENT: preventDefault on submit
    event.preventDefault();

    // Clear previous messages
    showMessage('');

    // REQUIREMENT: values trimmed before use
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    // REQUIREMENT: Validate with regex
    const error = validate(name, phone);

    // REQUIREMENT: Show clear error messages with textContent
    if (error) {
        showMessage(error, 'error');
        return;
    }

    // All valid - save the entry
    if (addEntry(name, phone)) {
        // Clear form
        form.reset();
        showMessage('✅ Signup successful! Welcome aboard! 🎉', 'success');
        
        // Focus on name for next entry
        nameInput.focus();
    } else {
        showMessage('❌ Failed to save. Please try again.', 'error');
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Form submit
form.addEventListener('submit', handleSubmit);

// Clear all entries
clearBtn.addEventListener('click', clearAllEntries);

// Real-time validation hints (optional UX improvement)
nameInput.addEventListener('blur', function() {
    if (this.value.trim().length > 0 && this.value.trim().length < 2) {
        showMessage('⚠️ Name must be at least 2 characters.', 'error');
    }
});

phoneInput.addEventListener('blur', function() {
    const phone = this.value.trim();
    if (phone.length > 0 && !PHONE_REGEX.test(phone)) {
        showMessage('⚠️ Phone must be 0912345678 or +251912345678', 'error');
    }
});

// Clear messages on input (UX improvement)
nameInput.addEventListener('input', function() {
    if (errorArea.classList.contains('error') || errorArea.classList.contains('success')) {
        showMessage('');
    }
});

phoneInput.addEventListener('input', function() {
    if (errorArea.classList.contains('error') || errorArea.classList.contains('success')) {
        showMessage('');
    }
});

// ============================================
// INITIALIZATION
// ============================================

// REQUIREMENT: Restore entries on reload
document.addEventListener('DOMContentLoaded', function() {
    refreshUI();
    console.log('✅ Signup form initialized');
    console.log(`📊 Found ${signupCount.textContent} entries`);
});

// ============================================
// EXPOSE FOR TESTING (Optional)
// ============================================

if (typeof window !== 'undefined') {
    window.__app = {
        validate,
        saveEntries,
        loadEntries,
        refreshUI,
        addEntry,
        clearAllEntries
    };
}
