import React, { useState, useEffect, useRef } from 'react'
import { useCart } from '@/hooks/useCart'
import axios from 'axios'
import queryString from 'query-string'
import Router from 'next/router'
import Example from '@/components/Navbar'

function finished() {
  const [transactionData, setTransactionData] = useState({})
  const [userData, setUserData] = useState({})
  const { cart } = useCart()
  const isUpdatingStock = useRef(false)
  const hasFetched = useRef(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    const router = Router

    if (!authToken) {
      router.push('/login')
    }
  }, [])

  // Obtener los datos del usuario
  useEffect(() => {
    const getFetchUserData = async () => {
      if (typeof window !== 'undefined' && !hasFetched.current) {
        try {
          hasFetched.current = true

          const user = JSON.parse(localStorage.getItem('user'))
          const userId = user.id

          const { data } = await axios.get(
            `http://localhost:5000/api/users/${userId}`
          )

          setUserData(data.data)
        } catch (error) {
          console.log(error)
        }

        hasFetched.current = false
      }
    }

    getFetchUserData()
  }, [])

  // Obtener los datos de la transacción y guardarlos en la base de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken')
        const router = Router

        if (!authToken) {
          router.push('/login')
        }

        const user = JSON.parse(localStorage.getItem('user'))
        const userId = user.id

        const { data } = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        )
        setUserData(data.data)

        const values = queryString.parse(window.location.search)
        const token = values.token_ws

        const { data: transactionData, status } = await axios.get(
          `http://localhost:5000/status/${token}`
        )

        if (status === 200 || status === 201) {
          setTransactionData(transactionData)
          await axios.post('http://localhost:5000/api/sale', {
            estado_transaccion: transactionData.status,
            monto: transactionData.amount,
            id_sesion: transactionData.session_id,
            fecha_transaccion: transactionData.transaction_date,
          })

          setIsLoading(false)
          localStorage.removeItem('cart')
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false) // Actualizar isLoading a false en caso de error
      }
    }

    fetchData()
  }, [])

  // Actualizar el stock de los libros (procedure) y guardar los libros vendidos en la base de datos
  useEffect(() => {
    // Skip the API call if it's already in progress
    if (
      isUpdatingStock.current ||
      cart.length === 0 ||
      !transactionData.buy_order ||
      !userData.id
    )
      return

    // Set the flag that we're updating the stock
    isUpdatingStock.current = true

    Promise.all(
      cart.map(async (item) => {
        const bookData = {
          libroId: item.id,
          cantidadVendida: item.quantity,
        }

        return axios
          .post('http://localhost:5000/stock', bookData)
          .then((response) => {
            console.log('UPDATE STOCK --> ', bookData)
            console.log('API Response --> ', response.data.message)
            if (response.data.message === 'Stock actualizado') {
              const saleBook = {
                orden_id: transactionData.buy_order,
                cliente_id: userData.id,
                titulo: item.titulo,
                autor: item.autor,
                editorial: item.editorial,
                cantidad: item.quantity,
              }

              console.log('Sale Book --> ', saleBook)

              axios
                .post('http://localhost:5000/api/saleBooks', saleBook)
                .then((response) => {
                  console.log('Sale Book Response --> ', response.data)
                })

              localStorage.removeItem('cart')
            }

            return response.data
          })
          .catch((error) => {
            console.log('API Error --> ', error)
          })
      })
    ).finally(() => {
      // Clear the flag when all API calls have completed
      isUpdatingStock.current = false
    })
  }, [cart, transactionData, userData])

  return (
    <div>
      <Example />

      {/* Mostrando los datos de la transacción si están disponibles */}
      {transactionData && (
        <section>
          <div className="bg-gray-100 h-screen justify-center items-center flex">
            <div className="container mx-auto">
              <div className="flex justify-center px-6">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                  <div
                    className="w-full h-auto bg-gray-300 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg bg-center relative"
                    style={{
                      backgroundImage:
                        'url(' +
                        'https://i.ibb.co/2KRLcCt/payment-Success-Bg.png' +
                        ' )',

                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      objectFit: 'cover',
                    }}
                  ></div>
                  <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <svg
                      viewBox="0 0 24 24"
                      className="text-[#009460] w-16 h-16 mx-auto my-6"
                    >
                      <path
                        fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                      ></path>
                    </svg>
                    <h3 className="text-2xl text-center">
                      ¡Gracias por tu compra!
                    </h3>
                    <div className="px-8 pb-4 pt-6 text-center md:text-start flex-col">
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Nombre
                        </label>
                        <p className="text-gray-700 text-base">
                          {userData.username}
                        </p>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Tu dirección
                        </label>
                        <p className="text-gray-700 text-base">
                          {userData.direccion}
                        </p>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Correo
                        </label>
                        <p className="text-gray-700 text-base">
                          {userData.correo}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default finished
