import { useReducer, createContext, useEffect } from 'react'
import { cartReducer, cartInitialState } from '../reducers/cart'

export const CartContext = createContext()

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (book) =>
    dispatch({
      type: 'ADD_TO_CART',
      payload: book,
    })

  const removeFromCart = (book) =>
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: book,
    })

  const clearCart = (book) =>
    dispatch({
      type: 'CLEAR_CART',
      payload: book,
    })

  return { state, addToCart, removeFromCart, clearCart }
}

export function CartProvider({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

  // Guardar el estado del carrito en el almacenamiento local cada vez que se actualiza.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state))
    }
  }, [state])

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        clearCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
