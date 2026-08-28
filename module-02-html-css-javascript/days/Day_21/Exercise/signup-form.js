/**
 * Signup Form Functionality
 * Requirements: #3, #4, #5, #6 - Form validation and localStorage storage
 */

(function() {
    // Constants
    const STORAGE_KEY = 'signup-entries';
    
    // Ethiopian phone number regex
    // Matches: 09XX XXX XXX (with or without spaces)
    const ETHIOPIAN_PHONE_REGEX = /^09\d{2}\s?\d{3}\s?\d{3}$/;

    // Get DOM elements
    const form = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const errorArea = document.getElementById('errorArea');
    const signupCountSpan = document.getElementById('signupCount');

    /**
     * Validate the form data
     * @param {string} name - Trimmed name
     * @param {string} phone - Trimmed phone
     * @returns {Object} - { isValid: boolean, errorMessage: string }
     */
    function validateForm(name, phone) {
        // Check name length (at least 2 characters)
        if (name.length < 2) {
            return {
                isValid: false,
                errorMessage: 'Name must be at least 2 characters long.'
            };
        }

        // Check phone against Ethiopian regex
        if (!ETHIOPIAN_PHONE_REGEX.test(phone)) {
            return {
                isValid: false,
                errorMessage: 'Phone number must be in Ethiopian format: 09XX XXX XXX'
            };
        }

        return {
            isValid: true,
            errorMessage: ''
        };
    }

    /**
     * Display error message in the error area
     * @param {string} message - Error message to display
     * @param {string} type - 'error' or 'success'
     */
    function showMessage(message, type = 'error') {
        errorArea.textContent = message;
        errorArea.className = 'error-area';
        
        if (message) {
            errorArea.classList.add(type);
        }
    }

    /**
     * Update signup count display
     */
    function updateSignupCount() {
        try {
            const entries = load(STORAGE_KEY, []);
            const count = Array.isArray(entries) ? entries.length : 0;
            
            if (signupCountSpan) {
                signupCountSpan.textContent = count;
            }
        } catch (error) {
            console.error('Error updating signup count:', error);
        }
    }

    /**
     * Add new signup entry
     * @param {string} name - User's name
     * @param {string} phone - User's phone number
     * @returns {boolean} - Success status
     */
    function addSignupEntry(name, phone) {
        try {
            // Load existing entries
            const entries = load(STORAGE_KEY, []);
            
            // Create new entry
            const newEntry = {
                id: Date.now(),
                name: name,
                phone: phone,
                timestamp: new Date().toISOString()
            };
            
            // Add to array
            entries.push(newEntry);
            
            // Save back to localStorage
            const saved = save(STORAGE_KEY, entries);
            
            if (saved) {
                updateSignupCount();
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error adding signup entry:', error);
            return false;
        }
    }

    /**
     * Handle form submission
     * @param {Event} event - Form submit event
     */
    function handleSubmit(event) {
        // Requirement #4: preventDefault
        event.preventDefault();
        
        // Clear previous messages
        showMessage('', '');
        
        // Get trimmed values
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        
        // Validate form
        const validation = validateForm(name, phone);
        
        if (!validation.isValid) {
            // Requirement #5: Show clear, specific message
            showMessage(validation.errorMessage, 'error');
            return;
        }
        
        // Requirement #6: On success, save entry
        const saved = addSignupEntry(name, phone);
        
        if (saved) {
            // Clear form
            form.reset();
            
            // Show success message
            showMessage('✅ Signup successful! Welcome aboard!', 'success');
            
            // Update count (already done in addSignupEntry)
        } else {
            showMessage('❌ Failed to save signup. Please try again.', 'error');
        }
    }

    /**
     * Initialize the form and load existing data
     */
    function initForm() {
        // Add form submit listener
        if (form) {
            form.addEventListener('submit', handleSubmit);
        }
        
        // Update signup count on load
        updateSignupCount();
        
        // Clear any previous error messages
        showMessage('', '');
        
        console.log('Signup form initialized successfully');
        console.log(`Found ${signupCountSpan ? signupCountSpan.textContent : '0'} existing signups`);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initForm);
    } else {
        initForm();
    }

})();