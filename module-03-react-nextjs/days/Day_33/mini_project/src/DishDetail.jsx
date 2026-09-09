import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useCartStore from "./cartStore";

function DishDetail() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const addItem = useCartStore((state) => state.addItem);

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
    return <div className="center-view">Loading plate details...</div>;
  }

  if (!dish) {
    return (
      <div className="center-view">
        <h3 className="error-text">⚠️ Plate Profile Absent</h3>
        <p>The culinary identifier "{id}" does not exist within current records.</p>
        <Link to="/menu" className="back-navigation">Return to Menu Options</Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Link to="/menu" className="back-navigation">← Back to Menu Catalog</Link>
      <div className="detail-box">
        <img src={dish.image} alt={dish.name} className="detail-thumb" />
        <h2>{dish.name}</h2>
        <span className="category-tag">
          {dish.category} Category
        </span>
        <p className="description-para">{dish.description}</p>
        <h3>Cost: {dish.price} ETB</h3>
        <button onClick={() => addItem(dish)} className="action-btn">
          Add Item To Order Cart
        </button>
      </div>
    </div>
  );
}

export default DishDetail;
