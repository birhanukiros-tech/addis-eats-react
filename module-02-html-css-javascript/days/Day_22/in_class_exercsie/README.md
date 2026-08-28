# 🇪🇹 Birr Watch - Ethiopian Birr Currency Converter & Watchlist

A live currency converter application that tracks Ethiopian Birr (ETB) exchange rates, with a persistent watchlist using localStorage.

## ✨ Features

### 🔄 Live Exchange Rates
- Fetches real-time ETB exchange rates from public API
- Automatic fallback to secondary API if primary fails
- Caches rates locally for offline access
- Rate refresh with retry logic

### 💱 Currency Converter
- Convert any amount from ETB to your chosen currency
- Real-time conversion with latest rates
- Clean, user-friendly interface
- Instant results with formatted currency display

### ⭐ Watchlist
- Save your favorite currencies for quick reference
- No duplicate entries allowed
- View rates at a glance
- Remove currencies with one click
- **Persists across browser sessions** using localStorage

### 💾 Persistent Storage
- Watchlist saved to localStorage
- Rates cached for performance
- Handles null and corrupt data gracefully
- Data survives page reloads

## 🚀 Quick Start

### Option 1: Open in Browser
```bash
# Simply open index.html in your browser
open index.html
# OR double-click index.html