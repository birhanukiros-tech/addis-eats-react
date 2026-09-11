import useFavoritesStore from "./favoritesStore";
import FavoriteButton from "./FavoriteButton";
import { Link } from "react-router-dom";

function Favorites() {
    const favorites = useFavoritesStore(
        (state) => state.favorites
    );

    if (favorites.length === 0) {
        return (
            <div className="favorites-page">
                <h1>Your Favorites</h1>
                <p>You haven't saved any dishes yet.</p>

                <Link to="/menu">
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="favorites-page">
            <h1>Your Favorites</h1>

            <div className="dish-list">
                {favorites.map((dish) => (
                    <article
                        className="dish-card"
                        key={dish.id}
                    >
                        <div className="dish-image-wrapper">
                            <img
                                src={dish.image}
                                alt={dish.name}
                            />
                        </div>

                        <div className="dish-card-content">

                            <div className="dish-title-row">
                                <Link to={`/menu/${dish.id}`}>
                                    <h2>{dish.name}</h2>
                                </Link>

                                <FavoriteButton dish={dish} />
                            </div>

                            <p>{dish.description}</p>

                            <p>{dish.price} ETB</p>

                            {dish.spicy && (
                                <span>🌶️ Spicy</span>
                            )}

                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Favorites;