/**
 * Theme Toggle Functionality
 * Requirements: #1 - Theme toggle with localStorage persistence
 */

(function() {
    // Constants
    const THEME_KEY = 'preferred-theme';
    const DARK_CLASS = 'dark-theme';
    const LIGHT_EMOJI = '🌙';
    const DARK_EMOJI = '☀️';
    
    // Get DOM elements
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    /**
     * Apply theme based on preference
     * @param {string} theme - 'dark' or 'light'
     */
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add(DARK_CLASS);
            if (themeToggleBtn) {
                themeToggleBtn.textContent = `${DARK_EMOJI} Light Mode`;
            }
        } else {
            body.classList.remove(DARK_CLASS);
            if (themeToggleBtn) {
                themeToggleBtn.textContent = `${LIGHT_EMOJI} Dark Mode`;
            }
        }
    }

    /**
     * Toggle theme between dark and light
     */
    function toggleTheme() {
        const isDark = body.classList.contains(DARK_CLASS);
        const newTheme = isDark ? 'light' : 'dark';
        
        // Apply theme
        applyTheme(newTheme);
        
        // Save preference to localStorage
        try {
            localStorage.setItem(THEME_KEY, newTheme);
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    }

    /**
     * Initialize theme from localStorage
     */
    function initTheme() {
        try {
            // Get saved theme preference
            const savedTheme = localStorage.getItem(THEME_KEY);
            
            // Check for system preference if no saved preference
            if (savedTheme === null) {
                // Check system dark mode preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const defaultTheme = prefersDark ? 'dark' : 'light';
                applyTheme(defaultTheme);
                localStorage.setItem(THEME_KEY, defaultTheme);
            } else {
                applyTheme(savedTheme);
            }
        } catch (error) {
            console.error('Error loading theme preference:', error);
            // Default to light theme if error
            applyTheme('light');
        }
    }

    // Add event listener to toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Initialize theme on load
    initTheme();

    // Listen for system theme changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', (e) => {
        // Only change if user hasn't manually set a preference
        if (localStorage.getItem(THEME_KEY) === null) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });

})();