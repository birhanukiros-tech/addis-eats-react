# Addis Eats — Server / Client Component Boundaries

## Server Components

### MenuPage
- Location: `app/menu/page.jsx`
- Server Component
- Fetches dishes with `getDishes()`
- Filters dishes based on the URL category
- Does not use `"use client"`

### DishList
- Location: `components/DishList.jsx`
- Server Component
- Displays the dishes
- Receives dishes through props
- Does not use `"use client"`

### DishPage
- Location: `app/menu/[id]/page.jsx`
- Server Component
- Displays dish details

### Root Layout
- Location: `app/layout.js`
- Server Component
- Wraps the application
- Passes children to `Providers`

---

## Client Components

### CategoryBar
- Location: `components/CategoryBar.jsx`
- Client Component
- Uses `useRouter()`
- Uses `useSearchParams()`
- Handles category button clicks

### FilterShell
- Location: `components/FilterShell.jsx`
- Client Component
- Uses `"use client"`
- Receives server-rendered content through `children`

### Providers
- Location: `components/Providers.jsx`
- Client Component
- Uses `"use client"`
- Provides a place for client-side providers/state

### Error
- Location: `app/menu/error.js`
- Client Component
- Uses `"use client"`
- Required by Next.js for error boundaries

---

## Important Rule

Server Components are the default in the Next.js App Router.

Client Components are used only when we need:

- State
- Event handlers
- Hooks
- Browser APIs
- Interactive UI

We keep the `"use client"` boundary as low as possible.