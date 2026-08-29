# 🇪🇹 Birr Watch

A complete, single-page currency converter app that loads live Ethiopian Birr (ETB) exchange rates and manages a persistent watchlist.

## ✨ Features

### 💱 Currency Converter
- **Live rates** from Exchange Rate API
- **Loading state** with spinner animation
- **Error handling** with clear messages
- **Input validation**: rejects empty, zero, negative, or non-numeric input
- **Formatted results** with currency symbols
- **Last currency remembered** across sessions

### ⭐ Watchlist
- **Add currencies** (no duplicates allowed)
- **Remove currencies** with one click
- **Empty state** message when empty
- **Rendered from state** (never from DOM)
- **Persists** to localStorage

### 💾 Persistence
- Watchlist saved to localStorage
- Last currency saved to localStorage
- Rates cached for offline use
- Data survives page reloads

## 🚀 Quick Start

```bash
# Open in browser
open index.html

# Or use a local server
python -m http.server 8000
# Then visit: http://localhost:8000

📁 File structure
birr-watch/
├── index.html          # Complete HTML structure
├── style.css      # All styles (responsive design)
├── app.js          # All JavaScript (state → render → events)
├── README.md           # This file
└── .gitignore          # Git ignore rules

🎯 How It Works
State → Render → Events Loop

1. STATE
   ├── rates: { USD: 0.0177, ... }
   ├── currencies: [{ code, name, rate }]
   ├── watchlist: ['USD', 'KES']
   ├── watchlistData: [{ code, name, rate }]
   ├── lastCurrency: 'USD'
   ├── isLoading: false
   ├── error: null
   └── lastUpdated: '2024-...'

2. RENDER
   ├── renderCurrencyDropdowns()
   ├── updateWatchlistData()
   ├── renderWatchlist()
   └── updateLastUpdated()

3. EVENTS
   ├── Convert: handleConvert()
   ├── Add Watchlist: addToWatchlist()
   └── Remove Watchlist: removeFromWatchlist()