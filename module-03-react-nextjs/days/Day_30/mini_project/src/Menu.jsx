import { useState, useEffect, useRef, useContext } from "react";
import useFetch from "./useFetch";
import { CartContext } from "./CartProvider";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";
import CartBadge from "./CartBadge";

function Menu() {
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { total } = useContext(CartContext);
  const searchInputRef = useRef(null);

  const { data: dishes, loading, error } = useFetch("/dishes.json", category);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const filteredDishes = dishes.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
        <p style={{ color: 'red', fontWeight: 'bold', fontSize: '18px' }}>{error}</p>
        <button onClick={() => setCategory("All")} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Reset Menu
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
      <CartBadge />
      
      <div style={{ marginBottom: '20px' }}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="🔍 Search for an Ethiopian dish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
      </div>

      <CategoryBar selected={category} onSelect={setCategory} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#eee', padding: '10px 15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Current Order Balance:</h3>
        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#2e7d32' }}>{total} ETB</span>
      </div>

      <DishList shownDishes={filteredDishes} isLoading={loading} />

      <OrderForm />
    </div>
  );
}

export default Menu;
