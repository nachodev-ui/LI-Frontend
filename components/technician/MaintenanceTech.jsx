import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { CheckIcon, WrenchIcon } from '@heroicons/react/24/outline'
import { formatDate } from '@/utils/dateUtils'
import Footer from '../Footer'

const MaintenanceTech = () => {
  const [maintenanceTech, setMaintenanceTech] = useState([])
  const [technicianId, setTechnicianId] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user.id

    setTechnicianId(userId)
  }, [])

  const fetchMaintenanceData = () => {
    axios
      .get('http://localhost:5000/api/requests')
      .then((res) => {
        setMaintenanceTech(res.data.data)
        console.log(res.data.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchMaintenanceData()
  }, [])

  const handleUpdateState = (id) => {
    axios
      .put(`http://localhost:5000/api/requests/${id}`, {
        id_tecnico: technicianId,
        estado: 'En proceso',
      })
      .then((res) => {
        fetchMaintenanceData()
        console.log(res.data.message)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleFinishMaintenance = (id) => {
    axios
      .put(`http://localhost:5000/api/requests/${id}`, {
        estado: 'Finalizada',
      })
      .then((res) => {
        fetchMaintenanceData()
        console.log(res.data.message)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <section className="flex flex-col items-center justify-center w-full p-4 space-y-4 mt-24 rounded-lg">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-3xl">
                <span className={`font-bold text-gray-800`}>
                  Solicitudes de Mantención
                </span>
              </h1>
              <div className="overflow-hidden  sm:rounded-lg mb-24 pt-14">
                {maintenanceTech.length > 0 ? (
                  <table className="min-w-full p-12 divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Fecha de solicitud
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Comentarios
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Correo
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {maintenanceTech.map((maintenance) => (
                        <tr key={maintenance.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(maintenance.fecha_solicitud)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {maintenance.comentarios}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {maintenance.estado === 'En proceso' ? (
                              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full p-1">
                                {maintenance.estado}
                                <WrenchIcon className="w-5 h-5 ml-2" />
                              </span>
                            ) : (
                              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full p-1">
                                {maintenance.estado}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {maintenance.correo}
                            </div>
                          </td>
                          {/* Take maintenance */}
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            {maintenance.estado === 'Pendiente' ? (
                              <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-400 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                onClick={() =>
                                  handleUpdateState(maintenance.id)
                                }
                              >
                                Aceptar solicitud
                              </button>
                            ) : null}
                            {maintenance.estado === 'En proceso' ? (
                              <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() =>
                                  handleFinishMaintenance(maintenance.id)
                                }
                              >
                                Finalizar mantención
                              </button>
                            ) : null}
                            {maintenance.estado === 'Finalizada' ? (
                              <p
                                className={`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700`}
                              >
                                Mantención finalizada
                                <CheckIcon className="w-6 h-6 ml-2 bg-green-300 shadow-md text-white rounded-xl" />
                              </p>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full space-y-4 mt-20 rounded-lg bg-[#F7F7F7] p-20">
                    <h1 className="text-xl font-bold text-center text-gray-700 lg:text-left lg:text-2xl title-font ">
                      Actualmente no hay solicitudes de mantención, vuelve más
                      tarde.
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default MaintenanceTech
