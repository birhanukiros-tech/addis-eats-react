# Addis Eats - Week 1 Capstone Project

## Custom Architecture Contributions

*   **useFetch.js**: Custom hook that handles dynamic network API fetches from `dishes.json` and uses an AbortController cleanup method to cancel outdated requests during fast filtering.
*   **cartReducer.js**: A pure state transitions function managing explicit operations for adding items, removing items, and wiping the layout cart container cleanly.
*   **CartProvider.jsx**: Context wrapper component that stores the global state value and shares cross-screen items, dispatch keys, and calculated totals using memoization optimizations.
*   **CartBadge.jsx**: Independent context tracking consumer component that updates header badge item metrics instantly via a useContext call hook.
