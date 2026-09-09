import React, {
  createContext,
  useState,
  useEffect,
  lazy,
  Suspense,
} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useSearchParams,
  Navigate,
  useLocation,
} from "react-router-dom";
import useCartStore from "./cartStore";
import useAuth from "./useAuth";
import Layout from "./Layout";
import DishDetail from "./DishDetail";
import RequireAuth from "./RequireAuth";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./ui/Modal";
import "./App.css";

const Checkout = lazy(() => import("./Checkout"));

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    setTimeout(() => {
      setUser({ name: "Habesha Coder" });
      setLoading(false);
    }, 400);
  };
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function Home() {
  return (
    <div className="center-view">
      <h1>Welcome to Addis Eats! 🍽️ 🇪🇹</h1>
      <p className="sub-text">
        Experience authentic flavors delivered directly through seamless
        transitions.
      </p>
      <Link to="/menu" className="action-btn">
        Browse Our Menu
      </Link>
    </div>
  );
}

function MenuFallback() {
  return (
    <div className="fallback-box">
      <h3>🍲 Menu Region Unavailable</h3>
      <p>
        A catalog parsing error occurred. The shopping context remains fully
        active.
      </p>
    </div>
  );
}

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

  const addItem = useCartStore((state) => state.addItem);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    fetch("/dishes.json")
      .then((res) => res.json())
      .then((data) => setDishes(data))
      .catch((err) => console.error(err));
  }, []);

  const handleOpenModal = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const filteredDishes = currentCategory
    ? dishes.filter(
        (dish) => dish.category.toLowerCase() === currentCategory.toLowerCase(),
      )
    : dishes;

  return (
    <div className="page-wrapper">
      <h2>Our Menu Marketplace</h2>

      <div className="filter-bar">
        <button
          onClick={() => setSearchParams({})}
          className={`filter-btn ${!currentCategory ? "active" : ""}`}
        >
          All Items
        </button>
        <button
          onClick={() => setSearchParams({ category: "Vegan" })}
          className={`filter-btn ${currentCategory === "Vegan" ? "active" : ""}`}
        >
          🌱 Vegan
        </button>
        <button
          onClick={() => setSearchParams({ category: "Main" })}
          className={`filter-btn ${currentCategory === "Main" ? "active" : ""}`}
        >
          🍛 Main Dishes
        </button>
        <button
          onClick={() => setSearchParams({ category: "Grill" })}
          className={`filter-btn ${currentCategory === "Grill" ? "active" : ""}`}
        >
          🥩 Grill
        </button>
      </div>

      <div className="menu-grid">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="menu-card">
            <div>
              <img src={dish.image} alt={dish.name} className="card-thumb" />
              <h3 className="card-title">{dish.name}</h3>
              <p className="card-price">{dish.price} ETB</p>
            </div>
            <div className="btn-group">
              <button
                onClick={() => handleOpenModal(dish)}
                className="secondary-link"
                style={{ border: "none", cursor: "pointer" }}
              >
                Quick Preview Modal
              </button>
              <Link to={`/menu/${dish.id}`} className="secondary-link">
                View Deep Details
              </Link>
              <button onClick={() => addItem(dish)} className="primary-btn">
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedDish && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedDish.name}
        >
          <img
            src={selectedDish.image}
            alt={selectedDish.name}
            className="card-thumb"
            style={{ height: "200px" }}
          />
          <p>
            <strong>Category:</strong> {selectedDish.category}
          </p>
          <p>{selectedDish.description}</p>
          <p className="card-price">{selectedDish.price} ETB</p>
          <button
            onClick={() => {
              addItem(selectedDish);
              setIsModalOpen(false);
            }}
            className="primary-btn"
            style={{ width: "100%", padding: "10px" }}
          >
            Add to Order & Close
          </button>
        </Modal>
      )}
    </div>
  );
}

function CartFallback() {
  return (
    <div className="fallback-box">
      <h3>🛒 Cart Region Recovering</h3>
      <p>
        The cart encountered an error, but you can continue browsing the menu
        sheets safely.
      </p>
    </div>
  );
}

function Cart() {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);
  const [triggerCrash, setTriggerCrash] = useState(false);

  if (triggerCrash) {
    throw new Error("Deliberate simulation crash in the Cart component tree.");
  }

  return (
    <div className="page-wrapper">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Your Selection Cart</h2>
        <button
          onClick={() => setTriggerCrash(true)}
          className="remove-btn"
          style={{ fontSize: "11px", padding: "4px 8px" }}
        >
          💥 Test Error Boundary
        </button>
      </div>

      {items.length === 0 ? (
        <p>
          Your cart is empty. Go back to the <Link to="/menu">Menu</Link> to add
          food!
        </p>
      ) : (
        <div>
          <ul className="list-container">
            {items.map((item, index) => (
              <li key={index} className="cart-item-row">
                <span>
                  {item.name} - {item.price} ETB
                </span>
                <button onClick={() => remove(item.id)} className="remove-btn">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="button-row">
            <button onClick={clear} className="mute-btn">
              Clear Cart
            </button>
            <Link
              to="/checkout"
              className="primary-btn"
              style={{
                display: "inline-block",
                textDecoration: "none",
                padding: "10px 20px",
              }}
            >
              Proceed to Checkout Guard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Login() {
  const { login, user } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (user) return <Navigate to={from} replace />;

  return (
    <div className="center-view">
      <h3>Authentication Required</h3>
      <p>
        Please log in to continue on to your secure checkout route profile
        window.
      </p>
      <button onClick={login} className="action-btn">
        Simulate Authorization Login
      </button>
    </div>
  );
}

function NotFound() {
  return (
    <div className="center-view">
      <h2>404 - Resource Missing</h2>
      <p>The requested route or dish entity could not be verified.</p>
      <Link to="/" className="back-navigation">
        Return to Home Base
      </Link>
    </div>
  );
}

function RouteSkeleton() {
  return (
    <div className="center-view">
      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#e67e22" }}>
        ⏳ Loading secure checkout files...
      </div>
      <p className="sub-text" style={{ fontSize: "14px" }}>
        Please wait while Suspense pieces the bundle together.
      </p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route
              path="menu"
              element={
                <ErrorBoundary fallback={<MenuFallback />}>
                  <Menu />
                </ErrorBoundary>
              }
            />

            <Route path="menu/:id" element={<DishDetail />} />

            <Route
              path="cart"
              element={
                <ErrorBoundary fallback={<CartFallback />}>
                  <Cart />
                </ErrorBoundary>
              }
            />

            <Route path="login" element={<Login />} />

            <Route
              path="checkout"
              element={
                <RequireAuth>
                  <Suspense fallback={<RouteSkeleton />}>
                    <Checkout />
                  </Suspense>
                </RequireAuth>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
