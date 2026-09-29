# Addis Eats Client/Server Boundary

## Overview

Next.js App Router uses Server Components by default.

Addis Eats follows this principle by keeping data-driven pages on the server whenever possible and moving only interactive features to Client Components.

---

## Server Components

The following parts of Addis Eats are primarily Server Components:

- `app/page.js`
- `app/menu/page.js`
- `app/menu/[id]/page.js`
- `app/menu/layout.js`
- `app/not-found.js`
- `app/menu/loading.js`
- `app/menu/[id]/loading.js`
- `components/Footer.jsx`
- `components/DishCard.jsx`

### Why?

These components do not need browser-only APIs.

They can:

- render content
- load server-side data
- create links
- display images
- handle routing through Next.js files
- use server-side utilities

---

## Client Components

Interactive components use:

```js
"use client";
```

Examples include:

### State and Context

- `CartProvider`
- `FavoritesProvider`
- `AuthProvider`
- `OrderProvider`
- `AdminAuthProvider`
- `ThemeProvider`

These need React state, effects, Context, or browser storage.

---

### Interactive UI

- `CartDrawer`
- `CartCount`
- `FavoriteButton`
- `FavoriteCount`
- `AddToCartButton`
- `AuthNav`
- `SignInForm`
- `CheckoutForm`
- `ThemeToggle`

These components respond to user actions.

---

### Customer Pages

Client-side behavior is used for:

- `/favorites`
- `/orders`
- `/checkout`
- `/order-confirmation`

These pages need browser state, Context, localStorage, or client-side navigation.

---

### Admin Pages

Interactive admin features use Client Components:

- Admin dashboard
- Dish management
- Order management
- Admin navigation
- Admin authentication guard

These features require state, event handlers, authentication state, and browser interaction.

---

## Browser APIs

Some features require APIs that only exist in the browser.

Examples:

```js
localStorage;
```

is used for:

```text
addis_eats_cart
addis_eats_favorites
addis_eats_user
addis_eats_admin
addis_eats_orders
addis_eats_theme
```

Because `localStorage` is a browser API, components using it must run on the client.

---

## Client-Side Navigation

Client Components can use Next.js navigation hooks when necessary.

Examples include:

```js
useRouter();
useSearchParams();
usePathname();
```

These allow interactive components to:

- redirect users
- read URL parameters
- respond to navigation
- update the interface based on the current route

---

## The Boundary Rule

The project follows this rule:

> Keep components on the server by default. Move only the part that requires browser interaction to the client.

For example:

```text
Server Component
      |
      +-- Dish information
      |
      +-- Image
      |
      +-- Price
      |
      +-- Client Component
              |
              +-- Add to Cart
              |
              +-- Favorite
```

This keeps the application architecture simpler and avoids making the entire page a Client Component unnecessarily.

---

## Why This Matters

Understanding the Client/Server boundary helps Addis Eats:

- keep server-side data loading separate from browser interaction
- reduce unnecessary client-side JavaScript
- use localStorage safely
- organize authentication and cart state
- build interactive features without converting the whole application to Client Components

The main principle is:

```text
Server by default
       ↓
Add "use client" only when needed
```

---

## Summary

Addis Eats uses Server Components for:

- content
- data loading
- routing
- static rendering

It uses Client Components for:

- state
- Context
- localStorage
- forms
- authentication
- cart interaction
- favorites
- theme switching
- admin interaction

This separation forms the main Client/Server boundary of the application.
