"use client";

import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext(null);

const ORDERS_STORAGE_KEY = "addis_eats_orders";

function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);

      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error("Failed to save orders:", error);
    }
  }, [orders, isLoaded]);

  function createOrder(orderData) {
    const newOrder = {
      id: `AE-${Date.now()}`,
      ...orderData,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setOrders((currentOrders) => [newOrder, ...currentOrders]);

    return newOrder;
  }

  function getOrderById(id) {
    return orders.find((order) => order.id === id);
  }

    function updateOrderStatus(id, status) {
        setOrders((currentOrders) =>
            currentOrders.map((order) =>
            order.id === id
                ? {
                    ...order,
                    status,
                }
                : order
            )
        );
        }  
  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        updateOrderStatus,
        isLoaded,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}

export default OrderProvider;
