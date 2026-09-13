import { Link } from "react-router-dom";
import FavoriteButton from "../favorites/FavoriteButton";
import useCartStore from "../cart/cartStore";
import formatCurrency from "../utils/formatCurrency";

function DishCard({ dish, onAddToCart }) {
    const addToCart = useCartStore((state) => state.addToCart);

    function handleAddToCart() {
        addToCart(dish);
        onAddToCart();
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

                <p>{formatCurrency(dish.price)}</p>

                {dish.spicy && <span>🌶️ Spicy</span>}

                <button
                    type="button"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </article>
    );
}

export default DishCard;