# 🇪🇹 Birr Watch - Exercises

A step-by-step implementation of a currency converter with watchlist functionality.

## 📋 Exercise Requirements

### Exercise 1: Scaffolding
- [x] HTML with empty containers (status, convert form, result, currency select, watchlist ul)
- [x] State object in app.js

### Exercise 2: Render with Fake Data
- [x] render() function with hard-coded rates
- [x] Currency dropdown fills correctly
- [x] No network calls yet

### Exercise 3: Real API Integration
- [x] loadRates() fetches from live endpoint
- [x] Checks res.ok
- [x] Stores data.rates in state
- [x] Handles loading states
- [x] Handles error messages

### Exercise 4: Converter Form
- [x] preventDefault on submit
- [x] Reads and validates amount with Number()
- [x] Looks up rate from state
- [x] Shows formatted result

### Exercise 5: Watchlist
- [x] Add button with duplicate guard
- [x] renderWatchlist() from state
- [x] Delegated click listener for removal
- [x] data-c attribute for currency code

### Exercise 6: Persistence
- [x] save() and load() with localStorage
- [x] Called from init()
- [x] Watchlist survives reload

## 🚀 Quick Start

```bash
# Open in browser
open index.html

# Or use live server
npx live-server