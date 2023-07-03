import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL_SHIPPING = 'http://localhost:9001'

const steps = [
  { name: 'En preparación' },
  { name: 'En camino' },
  { name: 'Entregado' },
]

const Tracking = () => {
  const [userId, setUserId] = useState(null)
  const [shippingData, setShippingData] = useState(null)
  const [idEnvio, setIdEnvio] = useState('')

  const fetchShipping = async () => {
    if (idEnvio !== '') {
      const { data } = await axios.get(
        `${API_URL_SHIPPING}/api/envios/${idEnvio}`
      )
      setShippingData(data[0]) // Extrayendo el primer objeto del array de respuesta
    }
  }

  useEffect(() => {
    fetchShipping()
  }, [idEnvio])

  useEffect(() => {
    const user = localStorage.getItem('user')
    const user_id = JSON.parse(user).id
    setUserId(user_id)
  }, [])

  const handleChange = (e) => {
    setIdEnvio(e.target.value)
    if (e.target.value === '') {
      setShippingData(null) // Si el input está vacío, se borra la data de envío
    }
  }

  return (
    <>
      {/* Image presentation */}
      <div
        className="flex flex-col items-center justify-center h-screen bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://static.vecteezy.com/system/resources/previews/002/027/546/original/illustration-of-delivery-man-deliver-to-customer-fast-and-secure-delivery-service-concept-vector.jpg")',
        }}
      >
        <div className="bg-white bg-opacity-70 rounded p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Rastrea tu envío en tiempo real
          </h2>
          <p className="mt-2 text-gray-700">
            Solo ingresa el identificador de tu envío y podrás ver el estado de
            tu pedido.
          </p>
        </div>
      </div>

      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold mb-10">Rastrea tu envío</h1>
        <div className="flex flex-col items-center justify-center w-80 mb-20">
          <input
            type="text"
            value={idEnvio}
            onChange={handleChange}
            placeholder="Ingresa el identificador"
            className="border border-gray-300 rounded-md px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-center"
          />
        </div>
        <div className="py-6 w-full flex justify-center items-center">
          <div className="flex items-center justify-center w-3/4 relative">
            {steps.map((step, idx) => (
              <div className="flex flex-col items-center w-1/4" key={idx}>
                <div
                  className={`w-12 h-12 rounded-full z-10 bg-white border-4 ${
                    shippingData && shippingData.estado_envio === step.name
                      ? 'border-[#B56F00]'
                      : 'border-gray-300'
                  }`}
                />
                <div className="mt-2 font-semibold">{step.name}</div>
              </div>
            ))}
            <hr className="absolute w-full border-t-2 border-gray-200 top-1/2 transform -translate-y-1/2 z-0 mx-16" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Tracking
