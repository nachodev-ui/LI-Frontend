import { useEffect, useRef, useState } from 'react'
import { formatDate } from '@/utils/dateUtils'
import { motion } from 'framer-motion'
import { TruckIcon, WrenchIcon } from '@heroicons/react/24/outline'
import { useDark } from '@/hooks/useDark'
import axios from 'axios'
import Link from 'next/link'
import Footer from '../Footer'

const USER_MAINTENANCE_URL = 'http://localhost:5000/api/requests'

const colors = {
  light: {
    background: 'bg-[#f7f7f7]',
    title: 'text-gray-800 font-bold',
    paragraph: 'text-gray-800',
    button: 'bg-green-700 hover:bg-green-900',
    icon: 'text-green-700',
    link: 'text-gray-600 hover:text-green-700',
    location: 'text-gray-600',
  },
  dark: {
    background: 'bg-gray-900',
    title: 'text-white font-bold',
    paragraph: 'text-gray-300',
    border: 'border-blue-300',
    button: 'bg-blue-300 hover:bg-blue-500',
    icon: 'text-blue-200',
    link: 'text-gray-400',
    location: 'text-gray-300',
  },
}

const handleGetUser = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user.id
  return userId
}

const MantencionesList = () => {
  const { darkMode } = useDark()
  const [mantenciones, setMantenciones] = useState([])
  const hasFetched = useRef(false)

  const color = darkMode ? colors.dark : colors.light

  // GET Mantenciones by user
  useEffect(() => {
    const getMantencionesByUser = async () => {
      if (typeof window !== 'undefined' && !hasFetched.current) {
        try {
          hasFetched.current = true

          const res = await axios.get(
            `${USER_MAINTENANCE_URL}/${handleGetUser()}`
          )

          setMantenciones(res.data.data)
          console.log(res.data.data)
        } catch (err) {
          console.log(err)
        }

        hasFetched.current = false
      }
    }
    getMantencionesByUser()
  }, [])

  // Left to right animation
  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <div className={`${color.background}`}>
      <motion.section
        className={`body-font shadow-md ${color.background}`}
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <div className="container flex flex-col items-center px-5 py-16 mx-auto md:flex-row lg:px-28">
          <div className="flex flex-col items-center w-full pt-0 mb-16 text-left lg:flex-grow md:w-1/2 xl:mr-20 md:pr-24 md:items-start md:text-left md:mb-0 lg:text-center">
            <h1
              className={`mb-8 text-2xl text-center lg:text-left lg:text-4xl title-font ${color.title}`}
            >
              Solicitudes de Mantención
            </h1>
            <p
              className={`mb-8 text-base leading-relaxed text-center lg:text-left lg:text-1xl ${color.paragraph}`}
            >
              ¡Bienvenido a la sección de solicitudes de mantención! Aquí podrás
              ver el estado de tus solicitudes de mantención.
            </p>
          </div>
          <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
            <img
              className={`object-cover object-center rounded-lg hidden sm:block bg-cover bg-[#F7F7F7]`}
              alt="hero"
              src="/img/maintenance-bg.png"
            />
          </div>
        </div>
      </motion.section>

      <section className="flex flex-col items-center justify-center w-full p-4 space-y-4 mt-24 rounded-lg shadow-md">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-3xl">
                <span className={`font-bold ${color.title}`}>
                  Solicitudes de Mantención
                </span>
              </h1>
              <div className="overflow-hidden  sm:rounded-lg mb-24 pt-14">
                {mantenciones.length > 0 ? (
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
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mantenciones.map((mantencion) => (
                        <tr key={mantencion.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(mantencion.fecha_solicitud)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {mantencion.comentarios}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {mantencion.estado === 'En transporte' ? (
                              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full p-1">
                                {mantencion.estado}
                                <TruckIcon className="w-5 h-5 ml-2" />
                              </span>
                            ) : (
                              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                {mantencion.estado}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {mantencion.correo}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full space-y-4 mt-20 rounded-lg bg-[#F7F7F7] p-20">
                    <h1 className="text-2xl font-bold text-center text-gray-700 lg:text-left lg:text-4xl title-font ">
                      Aún no tienes ninguna solicitud
                    </h1>
                    <p className="mb-8 text-base leading-relaxed text-center text-gray-700 lg:text-left text-md lg:text-1xl">
                      ¡No te preocupes! Puedes solicitar una mantención en la
                      sección de mantenciones.
                    </p>
                    <Link href="/mantenciones">
                      <span className="inline-flex items-center px-6 py-2 mt-4 text-base font-medium text-white bg-[#E3917A] rounded-md shadow-sm hover:bg-[#E3917A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E3917A]">
                        Solicitar mantención
                        <WrenchIcon className="w-5 h-5 ml-2" />
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <Footer />
      </section>
    </div>
  )
}

export default MantencionesList
