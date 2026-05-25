import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [flashMsg, setFlashMsg] = useState(null);

  // Total item count (sum of all qty)
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  // ADD ITEM
  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.name === item.name);
      if (exists) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });

    // Show flash popup
    setFlashMsg({ name: item.name, visible: true });
    setTimeout(() => setFlashMsg(null), 2000);
  }, []);

  // REMOVE ITEM
  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  // UPDATE QTY
  const updateQty = (name, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === name
          ? {
              ...item,
              qty:
                type === "inc"
                  ? item.qty + 1
                  : item.qty > 1
                  ? item.qty - 1
                  : 1,
            }
          : item
      )
    );
  };
const clearCart = () => {
  setCart([]);
};
  return (
    <CartContext.Provider
      value={{
  cart,
  cartCount,
  flashMsg,
  addToCart,
  removeFromCart,
  updateQty,
 clearCart,
}}
    >
      {children}
    </CartContext.Provider>
  );
};
