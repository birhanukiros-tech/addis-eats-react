# Addis Eats - Hardened & Resilient Infrastructure

An application safety and performance upgrade implementing modular code splitting, independent error boundary regions, and top-layer portal dialog modals.

## Core Resilience Architecture
* **Code Splitting & Lazy Loading:** The higher-security `/checkout` route view is loaded lazily behind a custom `Suspense` skeleton wrapper. This ensures that customers who are simply browsing menu files never download checkout component data until they actively select the secure checkout link.
* **Isolated Fault Tolerance (Error Boundaries):** Independent error boundary modules protect the `/menu` and `/cart` sections. If an edge-case item parsing error crashes the shopping cart module, the error is isolated inside that specific area. The top layout header frame, navigation links, and food menu grid continue to operate normally.
* **Top-Layer Portals (`createPortal`):** Quick preview screens break free from nested card wrappers by rendering into separate nodes at the top of the body tree. They track focus management to remain completely keyboard-accessible.

## Application Routes Map
* `/` - Application Home Index Landing frame.
* `/menu` - Catalog browsing layout displaying filterable query nodes with built-in Error Boundaries.
* `/menu/:id` - Dynamic target route mapping for granular individual item data lookups.
* `/cart` - Order staging component protected by its own isolated Error Boundary.
* `/checkout` - Higher security view lazy-loaded behind a lazy bundle split and a custom Suspense skeleton.
* `/login` - Simple verification point allowing users to join operational roles.
* `*` - Catch-all template tracking dead logic flows without interrupting background app runtime loops.