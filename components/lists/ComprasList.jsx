import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const USER_BUYS_URL = 'http://localhost:5000/api/saleBooks/user/'

const handleGetUser = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user.id
  return userId
}

const ComprasList = () => {
  const [compras, setCompras] = useState([])
  const hasFetched = useRef(false)

  // GET Compras by user
  useEffect(() => {
    const getComprasByUser = async () => {
      if (typeof window !== 'undefined' && !hasFetched.current) {
        try {
          hasFetched.current = true

          const res = await axios.get(`${USER_BUYS_URL}${handleGetUser()}`)
          setCompras(res.data.data)
          console.log(res.data.data)
        } catch (err) {
          console.log(err)
        }

        hasFetched.current = false
      }
    }
    getComprasByUser()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 space-y-4 rounded-lg shadow-md">
      <h1 className="font-bold text-2xl text-gray-700 text-center">
        Mis compras realizadas
      </h1>

      <section>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Orden
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Titulo del libro
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Autor(es)
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Editorial
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Cantidad
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {compras.map((sale) => (
                      <tr key={sale.id_venta}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {sale.orden_id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {sale.titulo}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {sale.autor}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {sale.editorial}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 text-center">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                sale.cantidad > 0
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {sale.cantidad}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ComprasList
