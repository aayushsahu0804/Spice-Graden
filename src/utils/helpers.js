/**
 * Format a price in Indian Rupees
 */
export const formatPrice = (amount) => `₹${Number(amount).toFixed(2)}`;

/**
 * Generate a short order ID
 */
export const generateOrderId = () =>
  "0" + Date.now().toString().slice(-10);

/**
 * Calculate cart totals
 */
export const calcTotals = (cart) => {
  const itemTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxes = Math.round(itemTotal * 0.05);
  const grandTotal = itemTotal + taxes;
  return { itemTotal, taxes, grandTotal };
};

/**
 * Truncate long text
 */
export const truncate = (str, max = 60) =>
  str.length > max ? str.slice(0, max) + "…" : str;
