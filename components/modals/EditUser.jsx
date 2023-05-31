import axios from 'axios'
import { useState, useEffect } from 'react'

const EditUser = ({ isOpen, onClose, userData, onUpdateUserData }) => {
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    username: '',
    telefono: '',
    ciudad: '',
    direccion: '',
  })

  useEffect(() => {
    if (isOpen && userData) {
      setFormValues({
        username: userData.username || '',
        telefono: userData.telefono || '',
        ciudad: userData.ciudad || '',
        direccion: userData.direccion || '',
      })
    }
  }, [isOpen, userData])

  if (!isOpen) return null

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.id]: event.target.value,
    })
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/users/update/${userData.id}`,
        formValues
      )

      onUpdateUserData(res.data.data)
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/${userData.id}`
      )
      const { username, telefono, ciudad, direccion } = res.data.data
      setFormValues({
        usernae: username || '',
        telefono: telefono || '',
        ciudad: ciudad || '',
        direccion: direccion || '',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div
        className="py-12 bg-black z-10 absolute top-0 right-0 bottom-0 left-0 overflow-y-auto"
        id="modal"
      >
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
        >
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border">
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
              Datos de tu cuenta
            </h1>
            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Nombre de usuario
            </label>
            <input
              id="name"
              className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Nombre de usuario"
              value={formValues.username}
              onChange={handleChange}
            />
            <label
              htmlFor="ciudad"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Télefono
            </label>
            <div className="relative mb-5 mt-2">
              <div className="absolute text-gray-600 flex items-center px-4 border-r h-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-phone"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M8 4h8m-4 -4v8m4 4v8m-8 -4h8" />
                </svg>
              </div>
              <input
                id="telefono"
                className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border"
                placeholder="9 XXXX XXXX"
                value={formValues.telefono}
                onChange={handleChange}
              />
            </div>
            <label
              htmlFor="ciudad"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Ciudad
            </label>
            <div className="relative mb-5 mt-2">
              <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-map-pin"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="11" r="3" />
                  <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                </svg>
              </div>
              <input
                id="ciudad"
                className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Ciudad de residencia"
                value={formValues.ciudad}
                onChange={handleChange}
              />
            </div>
            <label
              htmlFor="direccion"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Dirección
            </label>
            <div className="relative mb-5 mt-2">
              <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-map-pin"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="11" r="3" />
                  <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.915 0l-4.242 -4.243a8 8 0 1 1 11.415 0z" />
                </svg>
              </div>
              <input
                id="direccion"
                className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Ingresa tu dirección"
                value={formValues.direccion}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-800 tracking-wide">
                Adjuntar Imagen
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      <img
                        className="has-mask h-36 object-center"
                        src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                        alt="freepik image"
                      />
                    </div>
                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">Drag and drop</span> files here{' '}
                      <br /> or{' '}
                      <a
                        href=""
                        id=""
                        className="text-blue-600 hover:underline"
                      >
                        select a file
                      </a>{' '}
                      from your computer
                    </p>
                  </div>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-start w-full mt-6">
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Actualizando...' : 'Actualizar'}
              </button>
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
            <button
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              onClick={onClose}
              aria-label="close modal"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUser
