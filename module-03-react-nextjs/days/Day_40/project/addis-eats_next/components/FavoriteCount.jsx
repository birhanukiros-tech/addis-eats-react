"use client";

import { useFavorites } from "./FavoritesProvider";

function FavoriteCount() {
  const { favoritesCount } = useFavorites();

  if (favoritesCount === 0) {
    return null;
  }

  return (
    <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-red-100 px-1.5 py-0.5 text-xs font-bold text-red-600">
      {favoritesCount}
    </span>
  );
}
export default FavoriteCount;
