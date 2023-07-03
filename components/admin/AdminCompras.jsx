import { useEffect, useState } from 'react'
import axios from 'axios'
import { formatPrice } from '@/utils/cartUtils'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const AdminCompras = () => {
  const [compraData, setCompraData] = useState([])

  const fetchCompras = async () => {
    const { data } = await axios.get('http://localhost:5000/api/sale')
    setCompraData(data.data)
    console.log(data.data)
  }

  useEffect(() => {
    fetchCompras()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) {
      return '' // o un valor predeterminado si no hay fecha
    }

    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return '' // o un valor predeterminado si la fecha es inválida
    }

    return format(date, 'dd-MM-yyyy HH:mm', { locale: es })
  }

  return (
    <div>
      <section className="flex flex-col items-center justify-center w-full p-4 space-y-4 mt-24 rounded-lg">
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <h1 className="text-xl font-bold text-center text-gray-700 lg:text-left lg:text-2xl title-font ">
            Visualización de Compras
          </h1>
        </div>

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden  sm:rounded-lg mb-24 pt-14">
                {compraData.length > 0 ? (
                  <table className="min-w-full p-12 divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          ID Venta
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          ID Cliente
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          ID Envio
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Estado Transacción
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Estado Envío
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Monto
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          ID Sesión
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Fecha de Compra
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                      {compraData.map((compra) => (
                        <tr key={compra.id_venta}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {compra.id_venta}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {compra.id_cliente}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {compra.id_envio}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {compra.estado_transaccion}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {compra.estado_envio}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatPrice(compra.monto)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {compra.id_sesion}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(compra.fecha_transaccion)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full space-y-4">
                    <h1 className="text-xl font-bold text-center text-gray-700 lg:text-left lg:text-2xl title-font ">
                      No hay compras
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminCompras
