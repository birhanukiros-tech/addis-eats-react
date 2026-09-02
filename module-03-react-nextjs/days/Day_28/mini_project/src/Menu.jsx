import { useState } from "react";
import dishes from "./data"; 
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import OrderForm from "./OrderForm";

function Menu() {
  // 1. Core State Management Hooks
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);

  // 2. Derived State: Filters the dishes array automatically when "category" state shifts
  const shown = category === "All"
    ? dishes
    : dishes.filter(d => d.category === category);

  // 3. Callback Handler Function: Updates the state total when an item button is clicked
  const handleAddToOrder = (price) => {
    setTotal(prevTotal => prevTotal + price);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#d32f2f' }}>🍽️Interactive Addis Eats Menu</h1>
      
      {/* Passing selected category state down, along with the setter function */}
      <CategoryBar selected={category} onSelect={setCategory} />

      {/* Visual tracker showing live calculation updates */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#eee', padding: '10px 15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Current Order Balance:</h3>
        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#2e7d32' }}>{total} ETB</span>
      </div>

      {/* Passing the automatically filtered list and the price click action */}
      <DishList shownDishes={shown} onAddToOrder={handleAddToOrder} />

      {/* Passing total balance down to form for clear submission tracking */}
      <OrderForm total={total} />
    </div>
  );
}

export default Menu;
