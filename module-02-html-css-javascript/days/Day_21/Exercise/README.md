# Assignment: LocalStorage and Form Validation

## Overview
This assignment demonstrates the use of localStorage for theme persistence and form data storage, along with form validation.

## Features Implemented

### 1. Theme Toggle with localStorage
- Click the theme toggle button to switch between dark and light modes
- Theme preference is saved to localStorage
- Theme is restored on page load
- System dark mode preference is respected if no manual choice exists

### 2. Storage Helpers
- `save(key, data)`: Saves array data to localStorage with JSON stringification
- `load(key, defaultValue)`: Loads and parses array data from localStorage
- Both functions guard against null values and corrupt data with try/catch

### 3. Signup Form
- Labelled name and phone inputs
- Submit button with preventDefault
- Error area for displaying messages

### 4. Form Validation
- Name: Minimum 2 characters
- Phone: Ethiopian format (09XX XXX XXX)
- Clear, specific error messages

### 5. Data Persistence
- Successful signups are saved to localStorage as JSON
- Form is cleared on success
- Total signup count is displayed and updated on load

## How to Use

1. Open `index.html` in a browser
2. Click the theme toggle button (top right) to switch themes
3. Fill in the signup form with valid data
4. Submit to save the entry
5. Refresh the page to see persisted data

## File Structure