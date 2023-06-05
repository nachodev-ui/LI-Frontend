import Router from 'next/router'
import Example from './Navbar'
import CartSteps from './CartSteps'
import Shipping from './Shipping'
import ShippingMethod from './ShippingMethod'
import Swal from 'sweetalert2'
import { formatPrice } from '../utils/cartUtils'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/hooks/useCart'
import { useEffect } from 'react'
import { Toaster, toast } from 'sonner'

export function Cart() {
  const { cart, removeFromCart, addToCart, clearCart } = useCart()
  const router = Router

  const needLoginAlert = () => {
    Swal.fire({
      title: 'Debes iniciar sesión para continuar',
      icon: 'warning',
      iconColor: '#F87171',
      showCancelButton: true,
      confirmButtonText: `Iniciar sesión`,
      confirmButtonColor: '#F87171',
      cancelButtonText: `Cancelar`,
      cancelButtonColor: '#9CA3AF',
      showCloseButton: false, // Desactiva el botón de cerrar en la esquina superior derecha
      allowOutsideClick: false, // Evita que se pueda hacer clic fuera de la alerta para cerrarla
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/login')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        router.push('/')
      }
    })
  }

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      needLoginAlert()
    }
  })

  const handleSonnerAddToCart = async () => {
    toast.success('Libro agregado correctamente', {
      position: 'bottom-right',
      duration: 5000,
    })
  }

  const handleSonnerRemoveFromCart = async () => {
    toast.success('Libro eliminado correctamente', {
      position: 'bottom-right',
      duration: 5000,
    })
  }

  const handleSonnerClearFromCart = async () => {
    toast.success('Carro de compras limpiado correctamente', {
      position: 'bottom-right',
      duration: 5000,
    })
  }

  return (
    <>
      <Example />

      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Carro de compras
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <CartSteps />
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Resumen del pedido</p>
          <p className="text-gray-400">Compruebe sus artículos.</p>

          {cart &&
            cart.map((book) => (
              <div
                key={book.id}
                className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6"
              >
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img
                    className="m-2 h-30 w-28 rounded-md border object-cover object-center"
                    src={book.imagen}
                    alt=""
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold inline-flex">
                      {book.titulo} -{' '}
                      <p className="ml-1 font-thin text-gray-900">
                        {book.autor}
                      </p>
                    </span>

                    <p className="text-lg font-bold">
                      {formatPrice(book.precio)}
                    </p>
                    <span className="inline-flex mt-8 text-gray-500">
                      <Toaster />
                      <button
                        className="h-6 w-6 flex items-center justify-center rounded-md"
                        onClick={() => {
                          removeFromCart(book)
                          handleSonnerRemoveFromCart()
                        }}
                      >
                        <svg
                          className="h-4 w-4 text-gray-600"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M20 12H4" />
                        </svg>
                      </button>
                      <p className="rounded-sm px-2 text-gray-600">
                        Cantidad: {book.quantity}
                      </p>
                      <Toaster />
                      <button
                        className="h-6 w-6 flex items-center justify-center rounded-md"
                        onClick={() => {
                          addToCart(book)
                          handleSonnerAddToCart()
                        }}
                      >
                        <svg
                          className="h-4 w-4 text-gray-800"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </span>
                  </div>

                  <div className="flex-row mt-4">
                    <Toaster />
                    <button
                      onClick={() => {
                        clearCart(book)
                        handleSonnerClearFromCart()
                      }}
                    >
                      <TrashIcon className="sm:flex-col h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

          <ShippingMethod />
        </div>

        <Shipping />
      </div>
    </>
  )
}

export default Cart
