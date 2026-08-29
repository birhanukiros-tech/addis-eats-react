# 🍽️ Addis Eats - Module Project Core

A complete food discovery app for Addis Ababa with live search, filters, cart, and localStorage persistence.

## Features

- 🏙️ **Browse Restaurants** - View all restaurants in a responsive grid
- 🔍 **Live Search** - Search as you type by name, cuisine, or dish
- 🎯 **Filters** - Filter by cuisine, price range, and rating
- 🛒 **Cart** - Add items with quantity management (add/update/remove)
- 💰 **Computed Total** - Live ETB total using reduce()
- ✅ **Checkout Validation** - Validate name and Ethiopian phone number
- 💾 **Persistence** - Cart saves to localStorage and survives reload
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive** - Works on mobile, tablet, and desktop
- ♿ **Accessible** - Semantic HTML5 with ARIA labels

## Quick Start

# Option 1: Open directly in browser
open index.html

# Option 2: Use VS Code Live Server
# Right-click index.html -> Open with Live Server

# Option 3: Use any static server (Node.js)
npx serve
# or
npx http-server
# Then visit: http://localhost:3000 or http://localhost:8080

📁 File Strucuter
addis-eats/
├── index.html          # Semantic HTML5 with accessibility + checkout form
├── styles.css          # Responsive CSS (mobile-first) + error styles
├── app.js              # Vanilla JavaScript: State → Render → Events loop
├── data/
│   └── menu.json       # Restaurant data (JSON)
├── TEST_PLAN.md        # Manual test plan
├── README.md           # Documentation
└── .gitignore          # Git ignore rules