import Footer from './Footer'
import { motion } from 'framer-motion'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker, DatePicker } from '@mui/x-date-pickers'
import { TextField, TextareaAutosize } from '@mui/material'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import axios from 'axios'

const Mantencion = () => {
  const [dateTime, setDateTime] = useState(null)
  const [userId, setUserId] = useState(null)
  const [email, setEmail] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const handleDateTimeChange = (date) => {
    const formattedDateTime = date
      ? dayjs(date).format('DD/MM/YYYY HH:mm')
      : null
    setDateTime(formattedDateTime)
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setUserId(user?.id)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await axios.post('http://localhost:5000/api/requests', {
      correo: email,
      comentarios: descripcion,
      fecha_solicitud: dateTime,
      id_user: userId,
      estado: 'Pendiente',
    })

    if (response.status === 200 || response.status === 201) {
      // TODO: Show success message
    }

    console.log(response.data)
  }

  return (
    <div className="bg-[#ECECEA]">
      <section className="text-gray-600 body-font bg-[#ECECEA]">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <motion.h1
              className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-800"
              initial={{ opacity: 0, left: 500, scale: 0.5 }}
              whileInView={{ opacity: 1, left: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Servicio de Mantenciones
              <br className="hidden lg:inline-block" />
            </motion.h1>
            <p className="mb-8 leading-relaxed mr-20">
              Bienvenid@ a la sección de mantenimiento, aquí podrás solicitar
              una mantención para tu libro favorito, solo debes llenar el
              formulario y nosotros nos encargaremos del resto.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-[#C97A76] border-0 py-2 px-6 focus:outline-none hover:bg-[#ba666c] text-lg">
                Mis solicitudes
              </button>
            </div>
          </div>
          <motion.div
            className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"
            initial={{ opacity: 0, left: 100, scale: 0.5 }}
            whileInView={{ opacity: 1, left: 0, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="/img/mantenimiento.png"
            />
          </motion.div>
        </div>
      </section>

      <motion.section
        className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-90 mt-8"
        initial={{ opacity: 0, y: 200, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-[#C97A76] md:dark:bg-gray-800">
          <div className="px-6 py-6 md:px-8 md:py-0">
            <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">
              Ingresa{' '}
              <span className="lg:text-white text-gray-600 md:text-white">
                fecha y hora
              </span>{' '}
              para la mantención
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-200 md:text-gray-200">
              Te solicitamos estos datos para poder verificar la disponibilidad
              de nuestros técnicos.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
          <form className="my-4">
            <div className="flex flex-col p-1.5 overflow-hidden rounded-lg m-2">
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <TextField
                  label="Correo electrónico"
                  className="mt-2 mb-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <DatePicker
                  className="mt-2 border-gray-200"
                  disablePast
                  label="Fecha de mantención"
                  value={dateTime}
                  onChange={handleDateTimeChange}
                  accessibilityLabel="Select a date"
                  renderInput={(params) => (
                    <TextField {...params} error={false} />
                  )}
                />
                <TimePicker
                  className="mt-4"
                  label="Hora de mantención"
                  ampmInClock={false}
                  ampm={false}
                  value={dateTime}
                  onChange={handleDateTimeChange}
                  renderInput={(params) => (
                    <TextField {...params} error={false} />
                  )}
                />
                <p className="font-bold text-gray-600 mt-6 underline">
                  Fecha y hora seleccionadas: {dateTime || 'Ninguna'}
                </p>
              </LocalizationProvider>
              <TextareaAutosize
                className="border border-gray-400 mt-8 py-4 rounded placeholder:font-bold placeholder:text-center"
                placeholder="Proporcione detalles sobre su solicitud de mantenimiento."
                onChange={(e) => setDescripcion(e.target.value)}
              ></TextareaAutosize>
            </div>
            <button
              className="w-full mt-2 py-3 font-bold text-sm tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-[#C97A76] rounded-md hover:bg-[#e06f69] focus:bg-[#C97A76] focus:outline-none"
              onClick={handleSubmit}
            >
              Envíar solicitud
            </button>
          </form>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}

export default Mantencion
