import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (dish) => set((state) => ({ items: [...state.items, dish] })),
      remove: (id) => set((state) => ({ items: state.items.filter((d) => d.id !== id) })),
      clear: () => set({ items: [] })
    }),
    { name: "addis-eats-cart" }
  )
);
export default useCartStore;
