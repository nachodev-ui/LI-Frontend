// Leer el estado inicial del carrito del almacenamiento local.
let cartFromLocalStorage = []

if (typeof window !== 'undefined') {
  cartFromLocalStorage = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : []
}

export const cartInitialState = cartFromLocalStorage || []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
}

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    const { id } = action.payload
    const productInCartIndex = state.findIndex((book) => book.id === id)

    if (productInCartIndex >= 0) {
      const newState = structuredClone(state)
      newState[productInCartIndex].quantity += 1

      return newState
    }

    console.log('action.payload', action.payload)

    return [
      ...state,
      {
        ...action.payload,
        quantity: 1,
      },
    ]
  },

  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload
    const newState = state.filter((book) => book.id !== id)

    return newState
  },

  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    return []
  },
}

export const cartReducer = (state, action) => {
  const { type: actionType } = action

  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}
