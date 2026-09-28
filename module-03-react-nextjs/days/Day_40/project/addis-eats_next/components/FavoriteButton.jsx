"use client";

import { useFavorites } from "./FavoritesProvider";

function FavoriteButton({ dish }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(dish.id);

  function handleToggle() {
    toggleFavorite(dish);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={
        favorite
          ? `Remove ${dish.name} from favorites`
          : `Add ${dish.name} to favorites`
      }
      className={`flex h-10 w-10 items-center justify-center rounded-full border bg-white text-xl shadow-sm transition ${
        favorite
          ? "border-red-200 text-red-500"
          : "border-[var(--border)] text-gray-500 hover:text-red-500"
      }`}
    >
      {favorite ? "♥" : "♡"}
    </button>
  );
}

export default FavoriteButton;
