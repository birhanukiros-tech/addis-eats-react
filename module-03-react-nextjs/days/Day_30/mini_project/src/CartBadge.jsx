import { useContext } from "react";
import { CartContext } from "./CartProvider";

function CartBadge() {
  const { items } = useContext(CartContext);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#067b43", padding: "15px 20px", borderRadius: "12px", marginBottom: "25px" }}>
      <h2 style={{ margin: 0, fontSize: "18px", color: "#ffffff", fontWeight: "bold" }}>🍽️ Addis Eats</h2>
      <div style={{ background: "#ffcc00", color: "#ffffff", padding: "8px 16px", borderRadius: "20px", fontWeight: "bold", fontSize: "14px" }}>
        🛒 Cart: {items.length} items
      </div>
    </div>
  );
}

export default CartBadge;
