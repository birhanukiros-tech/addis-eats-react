import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function DishDetail() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/dishes.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => String(item.id) === String(id));
        setDish(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading plate details...</div>;
  }

  if (!dish) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h3 style={{ color: "#c0392b" }}>⚠️ Plate Profile Absent</h3>
        <p>The culinary identifier "{id}" does not exist within current records.</p>
        <Link to="/menu">Return to Menu Options</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/menu" style={{ textDecoration: "none", color: "#7f8c8d" }}>← Back to Menu Catalog</Link>
      <div style={{ marginTop: "20px", border: "1px solid #eee", padding: "20px", borderRadius: "8px", background: "#fafafa" }}>
        <img src={dish.image} alt={dish.name} style={{ width: "100%", maxHeight: "320px", objectFit: "cover", borderRadius: "6px", marginBottom: "15px" }} />
        <h2>{dish.name}</h2>
        <span style={{ background: "#e67e22", color: "white", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
          {dish.category} Category
        </span>
        <p style={{ margin: "15px 0", color: "#555", lineHeight: "1.6" }}>{dish.description}</p>
        <h3 style={{ color: "#2c3e50" }}>Cost: {dish.price} ETB</h3>
      </div>
    </div>
  );
}

export default DishDetail;
