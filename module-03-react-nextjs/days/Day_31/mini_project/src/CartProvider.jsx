import { createContext, useReducer, useMemo } from "react";
import cartReducer from "./CartReducer";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const total = state.items.reduce((sum, item) => sum + item.price, 0);

  const contextValue = useMemo(() => {
    return {
      items: state.items,
      dispatch,
      total
    };
  }, [state.items, total]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
