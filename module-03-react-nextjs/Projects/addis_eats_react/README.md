# Addis Eats
Addis Eats is a React- based food ordering application that allows customer to browse Ethiopian dishes, manage their cart, complete checkout and place their order.it also inculdes an admin dashboard for managing menu items and customer orders.

## Features

### Customer Features

- Browse the Addis Eats menu
- Search dishes by name
- Filter dishes by category
- View individual dish details
- Manage cart quantites
- Remove item from the cart
- View a right side cart drawer items, quantities, prices, and total
- Proceed directly from the cart to checkout
- Complete checkout with form validation
- Select delivery and payment options
- Place orders and receive order confirmation
- View order history
- Add and remove favorite dishes 
- Toggle between light and dark themes
- Responsive design for different screen sizes

### Admin Features

- admin authentication
- Protected admin routes
- admin dashboard
- View menu items
- Add new dishes
- Edit existing dishes
- Delete dishes with confirmation
- View customer orders
- Update order status

## Technologies Used

- **React** —  Componenet based UI development.
- **Vite** —  Development server and build tool
- **React Router** — Client-side routing, dynamic outes, and protected routes
- **Zustand** —  Global cart state managment
- **JavaScript (Es6+)** —  Application logic and interactivity
- **CSS3** —  Responisve styling, layouts,and light/dark themes.
- **Local Storage** — Storing application data such as orders,favaorites and preferences
- **Json** —  Local menu data
- **Git and GitHub** —  Version Control and project history

## React Concept Demonstrated

- Components and reusable UI
- Props and Component communication
- State management with `useState`
- Side effects with `useEffect`
- Custom hooks
- React Context
- Global state management with `Zustand`
- React Router
- Dynamic and protected routes
- form handling and validation
- Conditonal rendering
- Loading, empty, and error states
- Error boundaries
- Lazy loadning and `Suspense`
- Responsive UI design 

## UI/UX

The Addis Eats interface was designed in figma before the react implementation.

### Design System

- **Primary  color:** `#176B4D`
- **Accent color:** `#E9B949`
- **Background color:** `#FFFA0)`
- **typography:** Inter

The design includes reusable components such as navigation, buttons, food cards, cart components, forms, and admin dashboard elements.

The React application follows the planned UI/UX design while adding responsive behavior and interactive functionality.

## Project Structure

addis_eats_react/
|—— public/
|   |——images/
|   |__ menu-data.json
|
|—— src/
|   |—— api/
|   |—— auth/
|   |—— admin/
|   |—— cart/
|   |—— checkout/
|   |—— favorites/
|   |—— menu/
|   |—— orders/
|   |—— theme/
|   |—— ui/
|   |—— utils/
|   |—— App.jsx
|   |—— Home.jsx
|   |—— Layout.jsx
|   |—— ErrorBoundary.jsx
|   |—— main.jsx
|—— PROFILE.md
|—— README.md
|—— package.json
|—— gitignore

## Installation & Running

1. Clone the repository
 `git clone https://github.com/IBT-Qiyas-Full-Stack-Academy/sq6-birhanu-kiros.git`

2. Open the project folder
`cd sq6-birhanu-kiros`

3. Install dependecies

`npm install`

4. Start the development server
 `npm run dev`
 then open the local url shown in the terminal,usually:
 `http://localhost:5173`

 ### what each command means

 - `git clone` → downloads the project from Github
 - `cd` → eneters the project folder
 - `npm install` → installs the required packages
 - `npm run dev` → starts the react development server

 ## Demo Credentials

 ### Admin Login 

- **Username:** `Birhanu`
- **Password:** `admin123`
use these credentials to access the protected admin dashboard and tesr menu and order managment features.

## Customer and Admin workflow

### Customer workflow

1. Browse the Addis Eats home page.
2. Open the menu and search or filter the category
3. View indivdual dish detail.
4. Add dishes to the cart.
5. Mange quantities using the cart dawer,
6. proceed directly to checkout.
7. Complete the checkout form.
8. Place the order.
9. View the order confirmation and order history.
10. Reorder previous items when needed.

### Admin workflow

1. Sign in through the admin login.
2. Access the protected admin dashboard.
3. View and manage menu items.
4. Add new dishes.
5. Edit existing dishes.
6. Deete dishes with confirmation.
7. View customer orders
8. Update order statuses.

## Author
**Birhanu Kiros**

React / Full-Stack Software development Bootcamp student at `IBT College of Canada.`

Built as part of the CodeOps Module 3 React capstone project.