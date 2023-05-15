import { useReducer, createContext } from 'react'

export const StoreContext = createContext()

const initialState = {
  cart: {
    cartItems: [],
  },
}

// Función reductora para la lógica funcional.
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
        const newItem = action.payload
        const existItem = state.cart.cartItems.find(book => book.id === newItem.id)

        // Actualizar si existe el item en el carrito.
        const cartItems = existItem ? state.cart.cartItems.map(book => book.id === existItem.id ? newItem : book)
        // Si no existe
        : [...state.cart.cartItems, newItem]

        return { ...state, cart: {...state.cart, cartItems} }
    }

    default:
      return state
  }
}

// Función para el Store y envolver a los children.
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
