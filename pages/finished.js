import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import queryString from 'query-string'
import { useCart } from '@/hooks/useCart'
import Router from 'next/router'

function finished() {
  const [transactionData, setTransactionData] = useState({})
  const { cart } = useCart()
  const isUpdatingStock = useRef(false)

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    const router = Router

    if (!authToken) {
      router.push('/login')
    }
  })

  useEffect(() => {
    const getFetchTransactionStatus = async () => {
      if (typeof window !== 'undefined') {
        try {
          const values = queryString.parse(window.location.search)
          const token = values.token_ws

          const { data, status } = await axios.get(
            `http://localhost:5000/status/${token}`
          )

          if (status === 200) setTransactionData(data)
        } catch (error) {
          console.error('Error fetching transaction status:', error)
        }
      }
    }

    getFetchTransactionStatus()
  }, [])

  useEffect(() => {
    // Skip the API call if it's already in progress
    if (isUpdatingStock.current) return

    if (cart.length > 0) {
      isUpdatingStock.current = true // Set the flag

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
    }
  }, [cart])

  return (
    <div>
      {/* Mostrando los datos de la transacción si están disponibles */}
      {transactionData && (
        <div>
          <h2>Estado de la transacción: </h2>
          <p>VCI: {transactionData.vci}</p>
          <p>Amount: {transactionData.amount}</p>
          <p>Status: {transactionData.status}</p>
          <p>Buy order: {transactionData.buy_order}</p>
          <p>Session id: {transactionData.session_id}</p>
          <p>Accounting date: {transactionData.accounting_date}</p>
          <p>Transaction date: {transactionData.transaction_date}</p>
        </div>
      )}
    </div>
  )
}

export default finished
