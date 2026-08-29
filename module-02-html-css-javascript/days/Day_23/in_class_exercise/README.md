# 🍽️ Addis Eats

A food discovery app for Addis Ababa - find and explore the best restaurants in the city.

## Features

- 🏙️ **Browse Restaurants** - View all restaurants with details
- 🔍 **Search** - Find restaurants by name, cuisine, or description
- 🎯 **Filter** - Filter by cuisine, price range, and rating
- 🛒 **Cart** - Add items to cart with quantity management
- 💾 **Persistence** - Cart saves to localStorage
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive** - Works on all screen sizes

## Quick Start

```bash
# Open in browser
open index.html

# Or use a local server
python -m http.server 8000
# Visit: http://localhost:8000

📁 File Structure

addis-eats/
├── index.html          # Semantic scaffold with empty containers
├── styles.css          # Responsive layout + component styles
├── app.js              # State, load, render, and core events
├── data/
│   └── menu.json       # Restaurant data (modelled JSON)
├── README.md           # This file
└── .gitignore          # Git ignore rules