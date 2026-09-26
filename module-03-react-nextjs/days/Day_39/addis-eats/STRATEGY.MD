# Addis Eats — Rendering Strategy

| Route | Strategy | Why |
|---|---|---|
| `/` | Static | The homepage content does not depend on the person requesting it and can be prerendered at build time. |
| `/menu` | ISR — 1 hour | Menu data can safely be slightly stale, so the route revalidates every 3600 seconds. |
| `/menu/[id]` | Static via `generateStaticParams` | The known dish IDs are pre-built at build time. |
| `/cart` | Client | The cart belongs to the current user's browser state and is handled on the client side. |
| `/checkout` | Dynamic | Checkout may depend on request-specific session information and live pricing. |
| `/orders/[id]` | Dynamic | An order belongs to a specific user and should not be shared through a static cache. |

## Controls Used

### Menu

```js
export const revalidate = 3600;