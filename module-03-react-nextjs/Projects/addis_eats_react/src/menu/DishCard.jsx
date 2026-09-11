import { useState } from "react";

function DishCard({ dish }) {
    const [imageLoading, setImageLoading] = useState(true);

    return (
        <article className="dish-card">

            <div className="dish-image-wrapper">
                {imageLoading && (
                    <div className="image-skeleton"></div>
                )}

                <img
                    src={dish.image}
                    alt={dish.name}
                    onLoad={() => setImageLoading(false)}
                />
            </div>

            <div className="dish-card-content">
                <h2>{dish.name}</h2>

                <p>{dish.description}</p>

                <p>{dish.price} ETB</p>

                {dish.spicy && <span>🌶️ Spicy</span>}
            </div>

        </article>
    );
}

export default DishCard;