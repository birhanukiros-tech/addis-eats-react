/**
 * Validated, Persistent Signup Form
 * Complete implementation with localStorage persistence
 */

// ============================================
// CONSTANTS & CONFIGURATION
// ============================================

const STORAGE_KEY = 'signup_entries';
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;

// ============================================
// DOM REFERENCES
// ============================================

const dom = {
    form: document.getElementById('signupForm'),
    nameInput: document.getElementById('name'),
    phoneInput: document.getElementById('phone'),
    errorArea: document.getElementById('errorArea'),
    signupCount: document.getElementById('signupCount'),
    entriesList: document.getElementById('entriesList'),
    clearBtn: document.getElementById('clearEntries')
};

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
    // Check name length (at least 2 characters)
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
        if (!Array.isArray(entries)) {
            throw new Error('Entries must be an array');
        }
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

        // Validate each entry has required fields
        const validEntries = parsed.filter(entry => 
            entry && 
            typeof entry === 'object' &&
            typeof entry.name === 'string' &&
            typeof entry.phone === 'string' &&
            entry.name.trim().length > 0 &&
            entry.phone.trim().length > 0
        );

        if (validEntries.length !== parsed.length) {
            console.warn('Some entries were invalid and removed');
            saveEntries(validEntries);
        }

        return validEntries;
    } catch (error) {
        // Handle JSON parse errors
        console.error('Error loading entries:', error.message);
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
    dom.errorArea.textContent = message;
    dom.errorArea.className = 'error-area';

    if (message) {
        dom.errorArea.classList.add(type);
        
        // Auto-clear success messages after 3 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (dom.errorArea.classList.contains('success')) {
                    showMessage('', '');
                }
            }, 3000);
        }
    }
}

/**
 * Update the signup count display
 * @param {Array} entries - Array of entries
 */
function updateCount(entries) {
    const count = entries ? entries.length : 0;
    dom.signupCount.textContent = count;
    dom.signupCount.style.transition = 'transform 0.3s ease';
    dom.signupCount.style.transform = 'scale(1.2)';
    setTimeout(() => {
        dom.signupCount.style.transform = 'scale(1)';
    }, 300);
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
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 1000 / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch (e) {
        return 'Recently';
    }
}

/**
 * Render the list of entries
 * @param {Array} entries - Array of entry objects
 */
function renderEntries(entries) {
    if (!entries || entries.length === 0) {
        dom.entriesList.innerHTML = '<div class="no-entries">No signups yet. Be the first! 🎉</div>';
        return;
    }

    // Sort by newest first
    const sorted = [...entries].reverse();

    // Build entries HTML
    const html = sorted.map((entry, index) => `
        <div class="entry-item" data-index="${index}">
            <div class="entry-info">
                <span class="entry-name">${escapeHTML(entry.name)}</span>
                <span class="entry-phone">📱 ${escapeHTML(entry.phone)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
                <span class="entry-time">${formatTime(entry.timestamp)}</span>
                <button class="entry-delete" data-id="${entry.id || index}" title="Delete entry">
                    ✕
                </button>
            </div>
        </div>
    `).join('');

    dom.entriesList.innerHTML = html;
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
        name: name.trim(),
        phone: phone.trim(),
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
 * Delete an entry by ID
 * @param {number|string} id - Entry ID
 * @returns {boolean} - Success status
 */
function deleteEntry(id) {
    const entries = loadEntries();
    const filtered = entries.filter(entry => entry.id !== id);
    
    if (filtered.length === entries.length) {
        return false; // No entry found with that ID
    }

    if (saveEntries(filtered)) {
        refreshUI();
        return true;
    }

    return false;
}

/**
 * Clear all entries
 * @returns {boolean} - Success status
 */
function clearAllEntries() {
    if (!confirm('⚠️ Are you sure you want to delete ALL signups?')) {
        return false;
    }

    if (saveEntries([])) {
        refreshUI();
        showMessage('✅ All entries cleared successfully!', 'success');
        return true;
    }

    return false;
}

// ============================================
// FORM HANDLING
// ============================================

/**
 * Handle form submission
 * @param {Event} event - Submit event
 */
function handleSubmit(event) {
    // Prevent default form submission
    event.preventDefault();

    // Clear previous messages
    showMessage('');

    // Get trimmed values
    const name = dom.nameInput.value.trim();
    const phone = dom.phoneInput.value.trim();

    // Validate
    const error = validate(name, phone);

    // Show error if any
    if (error) {
        showMessage(error, 'error');
        
        // Highlight invalid fields
        if (name.length < 2) {
            dom.nameInput.classList.add('error');
            dom.nameInput.classList.remove('success');
        } else {
            dom.nameInput.classList.remove('error');
        }
        
        if (!PHONE_REGEX.test(phone)) {
            dom.phoneInput.classList.add('error');
            dom.phoneInput.classList.remove('success');
        } else {
            dom.phoneInput.classList.remove('error');
        }
        
        return;
    }

    // All valid - save the entry
    if (addEntry(name, phone)) {
        // Clear form
        dom.form.reset();
        dom.nameInput.classList.remove('error', 'success');
        dom.phoneInput.classList.remove('error', 'success');
        
        // Show success
        showMessage(`✅ Welcome ${name}! Signup successful! 🎉`, 'success');
        
        // Focus on name for next entry
        dom.nameInput.focus();
    } else {
        showMessage('❌ Failed to save. Please try again.', 'error');
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Form submit
dom.form.addEventListener('submit', handleSubmit);

// Clear all entries
dom.clearBtn.addEventListener('click', clearAllEntries);

// Delete individual entry (event delegation)
dom.entriesList.addEventListener('click', (event) => {
    const deleteBtn = event.target.closest('.entry-delete');
    if (!deleteBtn) return;

    const id = deleteBtn.dataset.id;
    if (!id) return;

    if (confirm('Delete this signup?')) {
        if (deleteEntry(Number(id))) {
            showMessage('✅ Entry deleted successfully', 'success');
        }
    }
});

// Real-time validation (UX enhancement)
dom.nameInput.addEventListener('input', function() {
    const value = this.value.trim();
    if (value.length > 0 && value.length < 2) {
        this.classList.add('error');
        this.classList.remove('success');
    } else if (value.length >= 2) {
        this.classList.remove('error');
        this.classList.add('success');
    } else {
        this.classList.remove('error', 'success');
    }
    
    // Clear error message on input
    if (dom.errorArea.classList.contains('error')) {
        showMessage('');
    }
});

dom.phoneInput.addEventListener('input', function() {
    const value = this.value.trim();
    if (value.length > 0 && !PHONE_REGEX.test(value)) {
        this.classList.add('error');
        this.classList.remove('success');
    } else if (value.length > 0 && PHONE_REGEX.test(value)) {
        this.classList.remove('error');
        this.classList.add('success');
    } else {
        this.classList.remove('error', 'success');
    }
    
    // Clear error message on input
    if (dom.errorArea.classList.contains('error')) {
        showMessage('');
    }
});

// Clear error on focus
dom.nameInput.addEventListener('focus', function() {
    this.classList.remove('error');
    if (dom.errorArea.classList.contains('error')) {
        showMessage('');
    }
});

dom.phoneInput.addEventListener('focus', function() {
    this.classList.remove('error');
    if (dom.errorArea.classList.contains('error')) {
        showMessage('');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    // Escape to clear messages
    if (event.key === 'Escape') {
        showMessage('');
        dom.nameInput.classList.remove('error', 'success');
        dom.phoneInput.classList.remove('error', 'success');
    }
});

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the app on load
 */
function init() {
    console.log('📝 Initializing Signup Form...');
    
    // Load and render existing entries
    refreshUI();
    
    // Log status
    const entries = loadEntries();
    console.log(`📊 Loaded ${entries.length} entries from localStorage`);
    
    // Auto-focus on name input
    dom.nameInput.focus();
    
    console.log('✅ Signup Form ready!');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// EXPOSE FOR TESTING (Optional)
// ============================================

if (typeof window !== 'undefined') {
    window.__app = {
        validate,
        saveEntries,
        loadEntries,
        addEntry,
        deleteEntry,
        clearAllEntries,
        refreshUI
    };
}