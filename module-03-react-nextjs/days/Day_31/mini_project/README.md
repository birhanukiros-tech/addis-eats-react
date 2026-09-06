# Addis Eats - Routed Application

A Full-Stack React development mini-project mapping a split workflow architecture across modular view components using react-router-dom.

## Application Routes Map
* `/` - Application Home Index Landing frame.
* `/menu` - Catalog browsing layout displaying filterable query nodes.
* `/menu?category=Vegan` - Shareable state handling for Vegan filter parameterization.
* `/menu?category=Main` - Shareable state handling for Main filter parameterization.
* `/menu?category=Grill` - Shareable state handling for Grill filter parameterization.
* `/menu/:id` - Dynamic target route mapping for granular individual item data lookups.
* `/cart` - Order staging component accessing tracking data through upper app context providers.
* `/checkout` - Higher security view protected completely through automated authorization structural wraps.
* `/login` - Simple verification point allowing users to join operational roles.
* `*` - Catch-all template tracking dead logic flows without interrupting background app runtime loops.