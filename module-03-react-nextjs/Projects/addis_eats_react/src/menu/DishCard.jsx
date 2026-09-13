import { Link } from "react-router-dom";
import FavoriteButton from "../favorites/FavoriteButton";
import useCartStore from "../cart/cartStore";
import { useState } from "react";
import formatCurrency from "../utils/formatCurrency";

function DishCard({ dish }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const [added, setAdded] = useState(false)

    function handleAddToCart() {
        addToCart(dish);
        setAdded(true);

        setTimeout(() =>{
            setAdded(false);
        }, 1500);
    }
    return (
        <article className="dish-card">
            <div className="dish-image-wrapper">
                <img src={dish.image} alt={dish.name} />
            </div>

            <div className="dish-card-content">
                <div className="dish-title-row">
                    <Link to={`/menu/${dish.id}`}>
                        <h2>{dish.name}</h2>
                    </Link>
                    
                     <FavoriteButton dish={dish} />
                </div>

                <p>{dish.description}</p>
                <p>{formatCurrency(dish.price)} </p>
                {dish.spicy &&  <span>🌶️ Spicy</span>}

                <button onClick={handleAddToCart}>Add to Cart</button>

                {added && (
                    <p className="cart-feedback">✓ Added to cart </p>
                )}
            </div>

        </article>
    );
}

export default DishCard;