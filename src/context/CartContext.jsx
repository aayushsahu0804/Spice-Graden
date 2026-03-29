import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ADD ITEM
  const addToCart = (item) => {
    const exists = cart.find((i) => i.name === item.name);

    if (exists) {
      setCart(
        cart.map((i) =>
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  // REMOVE ITEM
  const removeFromCart = (name) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  // UPDATE QTY
  const updateQty = (name, type) => {
    setCart(
      cart.map((item) =>
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

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
};