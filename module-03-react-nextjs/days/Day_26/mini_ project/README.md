# Addis Eats — Day 26 Mini Project

## What it is

This is a static Addis Eats menu built with React and Vite.

The project demonstrates the React fundamentals learned on Day 26:

* JSX
* React components
* Props
* Destructuring
* Component composition
* Arrays
* `map()`
* React keys
* Import and export between components

The project contains a reusable `Dish` component that receives the dish name and price through props.

## Project Components

### Header

Displays the Addis Eats title and menu heading.

### Dish

A reusable component that receives `name` and `price` as props and displays the dish information.

### App

The main component that composes the `Header` and renders the dishes using `map()`.

## How to run

1. Open the project folder in the terminal.
2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL provided by Vite in your browser.


