import { useState, useEffect, useRef } from "react";
import fetchDishes from "./api";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";

function Menu() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDishes(category, controller.signal);
        setDishes(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();

    return () => {
      controller.abort();
    };
  }, [category]);

  const filteredDishes = dishes.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToOrder = (price) => {
    setTotal(prevTotal => prevTotal + price);
  };

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
      <h1 style={{ textAlign: 'center', color: '#d32f2f' }}>🍽️ Addis Eats Menu</h1>
      
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

      <DishList shownDishes={filteredDishes} onAddToOrder={handleAddToOrder} isLoading={loading} />

      <OrderForm total={total} />
    </div>
  );
}

export default Menu;