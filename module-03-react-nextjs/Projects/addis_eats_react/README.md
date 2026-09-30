# Addis Eats

Addis Eats is a React-based food ordering application designed for customers in Addis Ababa. The application allows customers to browse Ethiopian dishes, search and filter the menu, view dish details, manage their cart, complete checkout, place orders, and view their order history.

The project also includes an admin dashboard for managing menu items and customer orders.

## Live Demo

**Live Website:** https://addis-eats-react-seven.vercel.app

The Addis Eats React application is deployed on Vercel as a production website.

---

## Features

### Customer Features

* Browse the Addis Eats menu
* Search dishes by name
* Filter dishes by category
* View individual dish details
* Manage cart quantities
* Remove items from the cart
* View a right-side cart drawer with items, quantities, prices, and total
* Proceed directly from the cart to checkout
* Complete checkout with form validation
* Select delivery and payment options
* Place orders and receive order confirmation
* View order history
* Add and remove favorite dishes
* Toggle between light and dark themes
* Responsive design for different screen sizes
* Loading, empty, and error states

### Admin Features

* Admin authentication
* Protected admin routes
* Admin dashboard
* View menu items
* Add new dishes
* Edit existing dishes
* Delete dishes with confirmation
* Enable or disable menu dishes
* View customer orders
* Update order status
* View sales information
* View top-selling dishes and revenue chart

---

## Technologies Used

* **React** — Component-based UI development
* **Vite** — Development server and build tool
* **React Router** — Client-side routing, dynamic routes, and protected routes
* **Zustand** — Global state management
* **JavaScript (ES6+)** — Application logic and interactivity
* **CSS3** — Responsive styling, layouts, and light/dark themes
* **Local Storage** — Storing application data such as orders, favorites, and preferences
* **JSON** — Local menu data
* **Git and GitHub** — Version control and project history
* **Vercel** — Production deployment

---

## React Concepts Demonstrated

* Components and reusable UI
* Props and component communication
* State management with `useState`
* Side effects with `useEffect`
* Custom hooks
* React Context
* Global state management with Zustand
* React Router
* Dynamic routes
* Protected routes
* Form handling and validation
* Conditional rendering
* Loading, empty, and error states
* Error boundaries
* Lazy loading and `Suspense`
* Responsive UI design
* Production build and deployment

---

## UI/UX

The Addis Eats interface was designed in Figma before the React implementation.

### Design System

* **Primary color:** `#176B4D`
* **Accent color:** `#E9B949`
* **Background color:** `#FFFAF0`
* **Surface color:** `#FFFFFF`
* **Text color:** `#222222`
* **Muted text:** `#666666`
* **Border color:** `#D6D6D6`

The design includes reusable components such as:

* Navigation
* Buttons
* Food cards
* Category filters
* Search
* Cart components
* Forms
* Checkout components
* Order history
* Admin dashboard cards
* Sales chart

The React application follows the planned UI/UX design while adding responsive behavior and interactive functionality.

---

## Project Structure

```text
addis_eats_react/
│
├── public/
│   ├── images/
│   └── menu-data.json
│
├── src/
│   ├── api/
│   ├── auth/
│   ├── admin/
│   ├── cart/
│   ├── checkout/
│   ├── favorites/
│   ├── menu/
│   ├── orders/
│   ├── theme/
│   ├── ui/
│   ├── utils/
│   ├── App.jsx
│   ├── Home.jsx
│   ├── Layout.jsx
│   ├── ErrorBoundary.jsx
│   ├── index.css
│   └── main.jsx
│
├── PROFILE.md
├── README.md
├── package.json
├── vercel.json
└── .gitignore
```

---

## Installation & Running

### 1. Clone the repository

```bash
git clone https://github.com/IBT-Qiyas-Full-Stack-Academy/sq6-birhanu-kiros.git
```

### 2. Open the project folder

```bash
cd sq6-birhanu-kiros
```

The Addis Eats React project is located at:

```text
module-03-react-nextjs/Projects/addis_eats_react
```

### 3. Open the React project

```bash
cd module-03-react-nextjs/Projects/addis_eats_react
```

### 4. Install dependencies

```bash
npm install
```

### 5. Start the development server

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

---

## What Each Command Means

* `git clone` → Downloads the project repository from GitHub
* `cd` → Enters the required project folder
* `npm install` → Installs the required project dependencies
* `npm run dev` → Starts the React development server
* `npm run build` → Creates an optimized production build

---

## Demo Login

### Admin Login

The admin authentication is configured as a demonstration authentication flow for the capstone project.

Enter any non-empty username and password to access the admin dashboard.

### Customer Login

The customer checkout login also accepts any non-empty username and password for demonstration purposes.

---

## Customer Workflow

1. Browse the Addis Eats home page.
2. Open the menu.
3. Search for dishes.
4. Filter dishes by category.
5. View individual dish details.
6. Add dishes to the cart.
7. Manage quantities using the cart drawer.
8. Proceed directly from the cart to checkout.
9. Sign in to continue checkout.
10. Complete the checkout form.
11. Select delivery and payment options.
12. Place the order.
13. View the order confirmation.
14. View order history.
15. Reorder previous items when needed.

---

## Admin Workflow

1. Sign in through the admin login.
2. Access the protected admin dashboard.
3. View dashboard statistics.
4. View menu items.
5. Add new dishes.
6. Edit existing dishes.
7. Enable or disable dishes.
8. Delete dishes with confirmation.
9. View customer orders.
10. Update order statuses.
11. View sales information.
12. View the top-selling dishes chart.

---

## Production Deployment

The application is deployed using **Vercel**.

The deployment is connected to the GitHub repository, allowing new changes to be deployed automatically after pushing commits.

### Deployment Workflow

```text
Local Development
       ↓
Git Commit
       ↓
Git Push
       ↓
GitHub
       ↓
Vercel detects the new commit
       ↓
Install dependencies
       ↓
npm run build
       ↓
Production deployment
       ↓
Live Addis Eats website
```

### Production Build

The production build is created using:

```bash
npm run build
```

Vite processes the React application and generates the optimized production files inside the `dist` directory.

Vercel then publishes the production build.

---

## React Router Production Configuration

The project includes a `vercel.json` file to support React Router client-side routes in production.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This configuration allows routes such as:

```text
/menu
/menu/:id
/cart
/checkout
/orders
/admin
/admin/login
```

to continue working when users directly visit or refresh those URLs in the deployed application.

---

## Production Testing

The deployed application was tested on the live Vercel environment.

Testing included:

* Home page
* Menu browsing
* Menu search
* Category filtering
* Dish details
* Cart functionality
* Cart quantities
* Checkout
* Form validation
* Order placement
* Order confirmation
* Order history
* Favorites
* Light/dark theme
* Admin login
* Protected admin routes
* Admin dashboard
* Menu management
* Dish enable/disable
* Order management
* Sales chart
* Loading states
* Empty states
* Error states
* React Router navigation
* Direct route refresh
* Browser console
* Production build

The production application was verified to load correctly without browser console errors.

---

## Git and Deployment Workflow

The project uses Git and GitHub for version control.

Typical development workflow:

```bash
git status
git add .
git commit -m "describe the change"
git push
```

After pushing a new commit to GitHub, Vercel can automatically create a new deployment.

This allows the live application to stay synchronized with the latest production-ready version of the project.

---

## Author

**Birhanu Kiros**

React / Full-Stack Software Development Bootcamp Student
**IBT College of Canada**

Built as part of the **CodeOps Module 3 React Capstone Project**.
