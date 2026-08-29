# 🍽️ Addis Eats - Module Project Core

A complete food discovery app for Addis Ababa with live search, filters, cart, and checkout.

## Features

- 🏙️ **Browse Restaurants** - Responsive grid layout
- 🔍 **Live Search** - Search as you type
- 🎯 **Filters** - Cuisine, price, rating
- 🛒 **Cart** - Add, update, remove items
- 💰 **Computed Total** - Live ETB total with reduce()
- ✅ **Checkout** - Name and phone validation
- 💾 **Persistence** - Cart saves to localStorage
- 🌙 **Dark Mode** - Theme toggle
- 📱 **Responsive** - Mobile, tablet, desktop

## Quick Start

```bash
# Open in browser
open index.html

# Or use local server
npx serve
# Visit: http://localhost:3000
 File Structure
text
addis-eats/
├── index.html          # HTML with checkout form
├── styles.css          # CSS with error styles
├── app.js              # JavaScript (refactored)
├── data/
│   └── menu.json       # Restaurant data
├── TEST_PLAN.md        # Test plan
├── README.md
└── .gitignore