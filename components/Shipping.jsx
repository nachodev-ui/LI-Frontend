// Crear la transacción

import {
  calculateIVA,
  calculateSubTotal,
  formatPrice,
} from '../utils/cartUtils'
import { useCart } from '@/hooks/useCart'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Shipping = () => {
  const { cart } = useCart()
  const [transactionData, setTransactionData] = useState({})
  const [shippingData, setShippingData] = useState({})
  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(localStorage.getItem('authToken'))
  }, [])

  const handleBuy = async () => {
    try {
      // Datos para la solicitud POST
      const data = {
        buy_order: Math.random().toString(10).slice(2),
        session_id: 'session' + Math.random().toString(10).slice(2),
        amount: total,
        return_url: 'http://localhost:3000/finished',
      }

      // Realizando la solicitud POST para crear la transacción
      const response = await axios
        .post('http://localhost:5000/create', data)
        .catch((error) => {
          console.error('Error creating transaction:', error)
        })

      setTransactionData(response.data)

      // Redirigiendo al usuario a la página de pago de Transbank
      window.location.href =
        response.data.url + '?token_ws=' + response.data.token
    } catch (error) {
      console.error('Error creating transaction:', error)
    }
  }

  const subTotal = calculateSubTotal(cart)
  const iva = calculateIVA(subTotal)
  const total = subTotal + iva

  const { formattedSubTotal, formattedIva, formattedTotal } = {
    formattedSubTotal: formatPrice(subTotal),
    formattedIva: formatPrice(iva),
    formattedTotal: formatPrice(total),
  }

  return (
    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
      <p className="text-xl font-medium">Detalles de envío</p>
      <p className="text-gray-400">
        Completa tu información y revisa tu orden.
      </p>
      <div className="font-bold">
        <label
          htmlFor="billing-address"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Dirección de envío
        </label>
        <div className="flex flex-col sm:flex-row">
          <div className="relative flex-shrink-0 sm:w-7/12">
            <input
              type="text"
              id="billing-address"
              name="billing-address"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Dirección"
              onChange={(e) => {
                setShippingData({ ...shippingData, direccion: e.target.value })
                localStorage.setItem('direccion', e.target.value)
              }}
              value={localStorage.getItem('direccion')}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <img
                className="h-4 w-4 object-contain"
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg"
                alt=""
              />
            </div>
          </div>
          <select
            type="text"
            name="billing-state"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ciudad"
            onChange={(e) => {
              setShippingData({ ...shippingData, ciudad: e.target.value })
              localStorage.setItem('ciudad', e.target.value)
            }}
            value={localStorage.getItem('ciudad')}
          >
            <option value="">Selecciona una región</option>
            <option value="Coquimbo">Coquimbo</option>
            <option value="Valparaíso">Valparaíso</option>
            <option value="Metropolitana de Santiago">
              Metropolitana de Santiago
            </option>
            <option value="Libertador General Bernardo O'Higgins">
              Libertador General Bernardo O'Higgins
            </option>
            <option value="Maule">Maule</option>
          </select>
        </div>

        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">{formattedSubTotal}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">IVA</p>
            <p className="font-semibold text-gray-900">{formattedIva}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">
            {formattedTotal}
          </p>
        </div>
      </div>
      {cart.length > 0 ? (
        <button
          className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          onClick={handleBuy}
        >
          Realizar pago
        </button>
      ) : (
        <button
          className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          disabled
        >
          Realizar pago
        </button>
      )}
    </div>
  )
}

export default Shipping
