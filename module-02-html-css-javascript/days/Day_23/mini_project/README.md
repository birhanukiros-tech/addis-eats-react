# 🍽️ Addis Eats - Module Project Core

A complete food discovery app for Addis Ababa with live search, filters, cart, and localStorage persistence.

## Features

- 🏙️ **Browse Restaurants** - View all restaurants in a responsive grid
- 🔍 **Live Search** - Search as you type by name, cuisine, or dish
- 🎯 **Filters** - Filter by cuisine, price range, and rating
- 🛒 **Cart** - Add items with quantity management (add/update/remove)
- 💰 **Computed Total** - Live ETB total using reduce()
- 💾 **Persistence** - Cart saves to localStorage and survives reload
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive** - Works on mobile, tablet, and desktop
- ♿ **Accessible** - Semantic HTML5 with ARIA labels

## Quick Start

```bash
# Open in browser
open index.html

# Or use a local server
python -m http.server 8000
# Visit: http://localhost:8000

###Data Source
Data is loaded from data/menu.json with:
Restaurant name, cuisine, price tier, rating
Description, dishes, and images
Featured status for highlighting

📁 File structure

addis-eats/
├── index.html          # Semantic HTML5 with accessibility
├── styles.css          # Responsive CSS (mobile-first)
├── app.js              # State → Render → Events loop
├── data/
│   └── menu.json       # Restaurant data
├── README.md           # Documentation
└── .gitignore