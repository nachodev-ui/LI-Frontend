export const getCartInitialState = () => {
  if (typeof window !== "undefined") {
    const cart = window.localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

export const updateCartState = (state) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("cart", JSON.stringify(state));
  }
};
