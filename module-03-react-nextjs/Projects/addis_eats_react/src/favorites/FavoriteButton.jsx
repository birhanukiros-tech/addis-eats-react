import useFavoritesStore from "./favoritesStore";

function FavoriteButton({ dish }) {
    const favorites = useFavoritesStore(
        (state) => state.favorites
    );

    const addFavorite = useFavoritesStore(
        (state) => state.addFavorite
    );

    const removeFavorite = useFavoritesStore(
        (state) => state.removeFavorite
    );

    const isFavorite = favorites.some(
        (item) => item.id === dish.id
    );

    function handleFavorite() {
        if (isFavorite) {
            removeFavorite(dish.id);
        } else {
            addFavorite(dish);
        }
    }

    return (
        <button
            className="favorite-button"
            onClick={handleFavorite}
        >
            {isFavorite ? "❤️" : "♡"}
        </button>
    );
}

export default FavoriteButton;