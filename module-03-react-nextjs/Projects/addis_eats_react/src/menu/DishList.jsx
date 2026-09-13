import { useState } from "react";
import DishCard from "./DishCard";
import CartDrawer from "../cart/CartDrawer";

function DishList({ dishes }) {
    const [isCartOpen, setIsCartOpen] = useState(false);

    function handleAddToCart() {
        setIsCartOpen(true);
    }

    function handleCloseCart() {
        setIsCartOpen(false);
    }

    return (
        <>
            <div className="dish-list">
                {dishes.map((dish) => (
                    <DishCard
                        key={dish.id}
                        dish={dish}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>

            {isCartOpen && (
                <CartDrawer onClose={handleCloseCart} />
            )}
        </>
    );
}

export default DishList;