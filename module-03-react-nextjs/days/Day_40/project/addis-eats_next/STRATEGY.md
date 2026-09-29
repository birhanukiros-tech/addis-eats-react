# Addis Eats Rendering Strategy

## Overview

Addis Eats uses the Next.js App Router. Rendering is chosen based on what each page needs.

The project uses a combination of:

- Static rendering
- Dynamic rendering
- Server Components
- Client Components
- Loading and error states
- Dynamic routes

The goal is to keep pages server-rendered when possible and use Client Components only when browser interaction or client-side state is required.

---

## Static Pages

Several pages can be statically generated because they do not require request-specific server data.

Examples include:

- `/`
- `/cart`
- `/checkout`
- `/favorites`
- `/orders`
- `/signin`
- `/admin`
- `/admin/login`
- `/admin/dishes`
- `/admin/orders`
- `/order-confirmation`

Some of these pages contain Client Components for interaction, but their routes can still have a statically generated page shell.

---

## Dynamic Pages

The menu routes use server-side data and route information.

### `/menu`

The menu page:

- Reads menu data on the server.
- Reads the URL search parameters.
- Filters dishes by category.
- Filters dishes by search text.
- Displays the appropriate menu results.

Because the page uses `searchParams`, Next.js treats the route as dynamic.

The page also contains:

```js
export const revalidate = 3600;
```

This expresses that the data can be revalidated after one hour. However, using dynamic request information such as `searchParams` can still make the route dynamic.

---

## Dynamic Dish Route

### `/menu/[id]`

The dish details page uses a dynamic route:

```text
/menu/[id]
```

Examples:

```text
/menu/1
/menu/4
/menu/15
```

The page receives the dish ID from the route and loads the matching dish.

It also uses:

```js
generateStaticParams();
```

to provide known dish IDs during the build process.

If the requested dish does not exist, the page uses:

```js
notFound();
```

which displays the project's custom Not Found page.

---

## Server Components

Server Components are used when a component does not need browser-only features.

Examples include:

- Home page
- Menu page
- Dish details page
- Menu layout
- Footer
- DishCard

Server Components allow the application to load and render data without automatically sending all component JavaScript to the browser.

---

## Client Components

Client Components are used when the application needs:

- `useState`
- `useEffect`
- Context
- localStorage
- browser APIs
- event handlers
- client-side navigation
- interactive forms

Examples include:

- CartProvider
- FavoritesProvider
- AuthProvider
- OrderProvider
- AdminAuthProvider
- CartDrawer
- AddToCartButton
- FavoriteButton
- SignInForm
- CheckoutForm
- Admin dashboard
- Admin dish management
- Admin order management
- ThemeProvider
- ThemeToggle

---

## Data Loading

Menu data is stored in:

```text
public/menu-data.json
```

The application loads this data on the server through:

```text
lib/dishes.js
```

The server reads the JSON file directly instead of making a request to:

```text
http://localhost:3000
```

This is important because a production build should not depend on a development server running on localhost.

---

## Loading and Not Found States

The project uses Next.js reserved files for user feedback.

Examples:

```text
app/menu/loading.js
app/menu/[id]/loading.js
app/not-found.js
```

These provide better feedback while content is loading or when a requested page does not exist.

---

## Rendering Decision

The general rule used in Addis Eats is:

```text
Does the component need browser interaction or browser APIs?
            |
       +----+----+
       |         |
      No        Yes
       |         |
   Server      Client
 Component    Component
```

Server Components are preferred when possible.

Client Components are introduced only where interaction, state, localStorage, or browser APIs are required.

---

## Production Build

The project was tested with:

```bash
npm run build
```

The production build completed successfully.

This confirms that the application can be compiled by Next.js for production.

