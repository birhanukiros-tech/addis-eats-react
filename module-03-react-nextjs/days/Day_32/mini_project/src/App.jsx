import React, { createContext, useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, useSearchParams, Navigate, useLocation } from "react-router-dom";
import useCartStore from "./cartStore";
import useAuth from "./useAuth";
import Layout from "./Layout";
import DishDetail from "./DishDetail";
import RequireAuth from "./RequireAuth";

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
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      <h1>Welcome to Addis Eats! 🍽️ 🇪🇹</h1>
      <p style={{ color: "#666", fontSize: "18px" }}>
        Experience authentic flavors delivered directly through seamless transitions.</p>

      <Link to="/menu" style=
      {{ display: "inline-block", 
      background: "#e67e22", 
      color: "white", 
      padding: "12px 24px", 
      textDecoration: "none",
       borderRadius: "5px", 
       fontWeight: "bold", 
       marginTop: "15px" }}>
        Browse Our Menu
      </Link>
    </div>
  );
}

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");
  
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetch("/dishes.json")
      .then((res) => res.json())
      .then((data) => setDishes(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredDishes = currentCategory
    ? dishes.filter((dish) => dish.category.toLowerCase() === currentCategory.toLowerCase())
    : dishes;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Our Menu Marketplace</h2>
      
      <div style={{ marginBottom: "25px", display: "flex", gap: "10px" }}>

        <button onClick={() => setSearchParams({})} 
        style={{ padding: "6px 12px", 
        fontWeight: !currentCategory ? "bold" : "normal" }}>
            All Items
        </button>

        <button onClick={() => setSearchParams({ category: "Vegan" })} 
        style={{ padding: "6px 12px", 
        fontWeight: currentCategory === "Vegan" ? "bold" : "normal" }}>
        🌱 Vegan
        </button>

        <button onClick={() => setSearchParams({ category: "Main" })} 
        style={{ padding: "6px 12px", 
        fontWeight: currentCategory === "Main" ? "bold" : "normal" }}>
        🍛 Main Dishes
        </button>

        <button onClick={() => setSearchParams({ category: "Grill" })} 
        style={{ padding: "6px 12px", 
        fontWeight: currentCategory === "Grill" ? "bold" : "normal" }}>
        🥩 Grill
        </button>

      </div>

      <div style={{ display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", 
        gap: "20px" }}>

        {filteredDishes.map((dish) => (
          <div key={dish.id} style={{ border: "1px solid #eee", 
          borderRadius: "8px", padding: "15px", 
          display: "flex", flexDirection: "column", 
          justifyContent: "space-between", 
          boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>

            <div>
              <img src={dish.image} alt={dish.name} 
              style={{ width: "100%", height: "140px", 
              objectFit: "cover", borderRadius: "6px", 
              marginBottom: "10px" }} />

              <h3 style={{ margin: "5px 0" }}>{dish.name}</h3>

               <p style={{ color: "#e67e22",
                 fontWeight: "bold", margin: "5px 0" }}>
                    {dish.price} ETB
                </p>

            </div>
            <div style={{ display: "flex", flexDirection: "column", 
                gap: "5px", marginTop: "10px" }}>

              <Link to={`/menu/${dish.id}`} 
              style={{ display: "block", textAlign: "center", 
              background: "#34495e", color: "white", 
              padding: "6px", textDecoration: "none", 
              borderRadius: "4px", fontSize: "13px" }}>

                View Recipe Details
              </Link>

              <button 
                onClick={() => addItem(dish)}
                style={{ background: "#2ecc71", 
                    color: "white", border: "none", 
                    padding: "6px", borderRadius: "4px", 
                    cursor: "pointer", fontSize: "13px", 
                    fontWeight: "bold" }}>
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cart() {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Selection Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty. Go back to the 
            <Link to="/menu">Menu</Link> to add food!</p>
      ) : (
        <div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((item, index) => (
              <li key={index} style={{ display: "flex", 
              justifyContent: "space-between", 
              padding: "10px 0", 
              borderBottom: "1px solid #eee" }}>
                <span>{item.name} - {item.price} ETB</span>

                <button 
                  onClick={() => remove(item.id)}
                  style={{ background: "#e74c3c", 
                    color: "white", border: "none", 
                    padding: "3px 8px", borderRadius: "4px", 
                    cursor: "pointer" }}>
                
                  Remove
                </button>
              </li>
            ))}

          </ul>
          <div style={{ marginTop: "20px" }}>
            <button 
              onClick={clear}
              style={{ background: "#7f8c8d", 
                color: "white", border: "none", 
                padding: "8px 15px", borderRadius: "4px", 
                cursor: "pointer", marginRight: "10px" }}
            >
              Clear Cart
            </button>

            <Link to="/checkout" 
            style={{ display: "inline-block", 
            background: "#2ecc71", color: "white", 
            padding: "8px 15px", textDecoration: "none", 
            borderRadius: "4px", fontWeight: "bold" }}>
              Proceed to Checkout Guard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Checkout() {
  return (
    <div style={{ padding: "20px", color: "green" }}>
      <h2>🔐 Checkout Validation Cleared</h2>
      <p>Excellent! Your secure access point route worked perfectly.</p>
    </div>
  );
}

function Login() {
  const { login, user } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (user) return <Navigate to={from} replace />;

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h3>Authentication Required</h3>
      <p>Please log in to continue on to your secure checkout route profile window.</p>

      <button onClick={login} 
      style={{ padding: "10px 20px", 
      background: "#e74c3c", color: "white", 
      border: "none", borderRadius: "4px", 
      cursor: "pointer", fontWeight: "bold" }}>
    Simulate Authorization Login
      </button>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>404 - Resource Missing</h2>
      <p>The requested route or dish entity could not be verified.</p>
      <Link to="/">Return to Home Base</Link>
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
            <Route path="menu" element={<Menu />} />
            <Route path="menu/:id" element={<DishDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="checkout" element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            } />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
