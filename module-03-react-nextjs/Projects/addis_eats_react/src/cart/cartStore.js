import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],

  addToCart: (dish) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === dish.id);

      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === dish.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        };
      }

      return {
        cart: [
          ...state.cart,
          {
            ...dish,
            quantity: 1,
          },
        ],
      };
    });
  },

  increaseQuantity: (id) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    }));
  },

  decreaseQuantity: (id) => {
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id)
    }));
  },
  clearCart: () =>{
    set({cart:[] });
  }
}));

export default useCartStore;
