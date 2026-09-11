import { create } from "zustand";

const useFavoritesStore = create((set) => ({
    favorites: JSON.parse(
        localStorage.getItem("addis_eats_favorites")
    ) || [],

    addFavorite: (dish) => {
        set((state) => {
            const favorites = [
                ...state.favorites,
                dish
            ];

            localStorage.setItem(
                "addis_eats_favorites",
                JSON.stringify(favorites)
            );

            return { favorites };
        });
    },

    removeFavorite: (id) => {
        set((state) => {
            const favorites = state.favorites.filter(
                (dish) => dish.id !== id
            );

            localStorage.setItem(
                "addis_eats_favorites",
                JSON.stringify(favorites)
            );

            return { favorites };
        });
    }
}));

export default useFavoritesStore;