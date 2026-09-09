# Addis Eats - Zustand Store Migration

An architectural upgrade moving high-frequency global shopping variables from traditional React Context providers into an atomic Zustand state warehouse with built-in storage persistence.

## Architectural Selection Rationale
* **Cart Store Selection:** The food order cart changes frequently as users add, modify, or remove items. Moving it into a Zustand store with narrow atomic selectors ensures that a user adding a dish to their cart will only re-render the tiny basket counter badge, instead of forcing the entire parent header frame to re-render.
* **Authentication Session Selection:** The user authorization session is an infrequent, static state change that only fires once during login or logout events. Keeping it in a native React Context is optimal because it does not require rapid mutation scaling or frequent components updates.

## Application Routes Map
* `/` - Application Home Index Landing frame.
* `/menu` - Catalog browsing layout displaying filterable query nodes.
* `/menu?category=Vegan` - Shareable state handling for Vegan filter parameterization.
* `/menu?category=Main` - Shareable state handling for Main filter parameterization.
* `/menu?category=Grill` - Shareable state handling for Grill filter parameterization.
* `/menu/:id` - Dynamic target route mapping for granular individual item data lookups.
* `/cart` - Order staging component accessing tracking data through Zustand store selectors.
* `/checkout` - Higher security view protected completely through automated authorization structural hooks.
* `/login` - Simple verification point allowing users to join operational roles.
* `*` - Catch-all template tracking dead logic flows without interrupting background app runtime loops.