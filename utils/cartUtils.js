export const calculateSubTotal = (cart) => {
  return cart.reduce((acc, book) => acc + book.precio * book.quantity, 0)
}

export const formatPrice = (price) => {
  return price.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  })
}

export const calculateIVA = (subTotal) => {
  return Math.floor(subTotal * 0.19)
}

export const calculateTotal = (subTotal, iva) => {
  return subTotal + iva
}
