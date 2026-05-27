import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null);
  // orders array for kitchen/waiter dashboards
  const [orders, setOrders] = useState([
    {
      id: "01201066234",
      table: 12,
      items: [
        { name: "Burger", qty: 1, price: 150, status: "Cooking" },
        { name: "Salad", qty: 1, price: 120, status: "Ready" },
      ],
      total: 270,
      placedAt: new Date().toISOString(),
    },
    {
      id: "01201066235",
      table: 1,
      items: [{ name: "Pizza", qty: 2, price: 250, status: "Ready" }],
      total: 500,
      placedAt: new Date().toISOString(),
    },
    {
      id: "01201066236",
      table: 2,
      items: [{ name: "Pasta", qty: 1, price: 200, status: "Ready" }],
      total: 200,
      placedAt: new Date().toISOString(),
    },
  ]);

  const placeOrder = async (cartItems, total, method) => {
  try {
    const response = await fetch("http://https://spice-garden.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       tableNumber:
  Number(localStorage.getItem("tableNumber")) || 1,
        paymentMethod: method,
        items: cartItems.map((item) => ({
          menuItemId: item._id,
          qty: item.qty,
        })),
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    setOrder(data.data);

    return data.data;
  } catch (error) {
    console.error("Order Error:", error);
    return null;
  }
};

  const updateItemStatus = (orderId, itemName, status) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              items: o.items.map((i) =>
                i.name === itemName ? { ...i, status } : i
              ),
            }
          : o
      )
    );
  };

  return (
    <OrderContext.Provider value={{ order, orders, placeOrder, updateItemStatus }}>
      {children}
    </OrderContext.Provider>
  );
};
