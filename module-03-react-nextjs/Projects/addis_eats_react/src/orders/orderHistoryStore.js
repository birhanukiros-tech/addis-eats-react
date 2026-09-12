import { create } from "zustand";

const useOrderHistoryStore = create((set) => ({
    orders: JSON.parse(
        localStorage.getItem("addis_eats_orders")
    ) || [],

    addOrder: (order) => {
        set((state) => {
            const orders = [
                ...state.orders,
                order
            ];

            localStorage.setItem(
                "addis_eats_orders",
                JSON.stringify(orders)
            );

            return { orders };
        });
    }
}));

export default useOrderHistoryStore;