# Addis Eats — Day 27 React Menu

## Project Overview

Addis Eats is a food menu application that I am rebuilding with React as part of my Full Stack Software Development training.

In Day 26, I learned the basic React concepts including JSX, components, props, composition, lists, `map()`, and keys.

In Day 27, I extended the Addis Eats menu using more structured React patterns such as PropTypes, default props, conditional rendering, children, filtering, early returns, and stable keys.

This version uses static menu data. Interactive features such as clickable category filters and state will be added in Day 28.

---

## Day 27 Goals

The goal of this project is to build a typed and filtered React menu using reusable components.

The project includes:

- A `Dish` component
- PropTypes validation
- A default currency value
- Conditional rendering of a spicy badge
- A reusable `Card` component
- The `children` prop
- Category filtering
- An empty state
- `map()` for rendering lists
- Stable keys using each dish's `id`

---

## Components

### Dish.jsx

The `Dish` component displays information about one dish.

It uses:

- `name` prop
- `price` prop
- `spicy` prop
- `currency` default
- PropTypes validation
- Conditional spicy badge

---

### Card.jsx

The `Card` component is a reusable wrapper.

It uses the `children` prop so that different content can be placed inside the card.

---

### Menu.jsx

The `Menu` component:

- Receives the menu data through props
- Filters dishes by category
- Shows an empty state when no dishes match
- Uses `map()` to render the filtered dishes
- Uses each dish's `id` as a stable React key

---

### data.js

Contains the static Addis Eats menu data.

Each dish includes:

- `id`
- `name`
- `price`
- `category`
- `spicy`

---

## React Concepts Practiced

### Props

Props are used to pass data from a parent component to a child component.

### PropTypes

PropTypes describe the expected type of props.

### Default Props

The currency uses `ETB` as its default value when no currency is provided.

### Conditional Rendering

The spicy badge is rendered conditionally using `&&`.

### Children

The `Card` component uses `children` to render whatever content is placed inside it.

### filter()

The menu is filtered according to the selected category.

### Early Return

The menu shows an empty state when no dishes match the category.

### map()

The filtered dishes are rendered as React components using `map()`.

### Keys

Each rendered dish uses its stable `id` as the React key.

---

## Current Status

Day 27 focuses on static data and React rendering patterns.

There is no interactive category filter yet.

Interactive state and clickable filtering will be added in Day 28.

---

## Technologies

- React
- JavaScript
- JSX
- Vite
- PropTypes
- CSS

---

## Project Structure

```text
addis-eats-react/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── Dish.jsx
│   ├── Card.jsx
│   ├── Menu.jsx
│   └── data.js
│
├── index.html
├── package.json
└── README.md