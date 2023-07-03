import { useState, useEffect } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'sonner'

const EditBook = ({ isOpen, onClose, bookData, onUpdateBookData }) => {
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    isbn: '',
    titulo: '',
    autor: '',
    editorial: '',
    precio: '',
    stock: '',
    paginas: '',
    genero: '',
    imagen: '',
  })

  useEffect(() => {
    if (isOpen && bookData) {
      setFormValues({
        isbn: bookData.isbn,
        titulo: bookData.titulo,
        autor: bookData.autor,
        editorial: bookData.editorial,
        precio: bookData.precio,
        stock: bookData.stock,
        paginas: bookData.paginas,
        genero: bookData.genero,
        imagen: bookData.imagen,
      })
    }
  }, [isOpen, bookData])

  if (!isOpen) return null

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = await axios.patch(
        `http://localhost:5000/api/books/${bookData.id}`,
        formValues
      )
      onUpdateBookData(res.data)
      onClose()
      toast.success('Libro actualizado exitosamente')
    } catch (error) {
      console.log(error)
      toast.error('Error al actualizar el libro')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [event.target.id]: event.target.value,
    }))
  }

  return (
    <>
      <div
        className="py-12 bg-gray-900 z-10 absolute top-0 right-0 bottom-0 left-0 overflow-y-auto"
        id="modal"
      >
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
        >
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border">
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
              Datos del libro
            </h1>
            <label
              htmlFor="titulo"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Titulo
            </label>
            <input
              id="titulo"
              className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Nombre del libro"
              value={formValues.titulo}
              onChange={handleChange}
            />
            <label
              htmlFor="autor"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Autor
            </label>
            <div className="relative mb-5 mt-2">
              <input
                id="autor"
                className="text-gray-800 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Nombre del autor"
                value={formValues.autor}
                onChange={handleChange}
              />
            </div>
            <label
              htmlFor="editorial"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Editorial
            </label>
            <div className="relative mb-5 mt-2">
              <input
                id="editorial"
                className="text-gray-800 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Nombre de la editorial"
                value={formValues.editorial}
                onChange={handleChange}
              />
            </div>
            <label
              htmlFor="precio"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Precio
            </label>
            <div className="relative mb-5 mt-2">
              <input
                id="precio"
                className="text-gray-800 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Precio del libro"
                value={formValues.precio}
                onChange={handleChange}
              />
            </div>
            <label
              htmlFor="stock"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Stock
            </label>
            <div className="relative mb-5 mt-2">
              <input
                id="stock"
                className="text-gray-800 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Stock del libro"
                value={formValues.stock}
                onChange={handleChange}
              />
            </div>
            <label
              htmlFor="paginas"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Páginas
            </label>
            <div className="relative mb-5 mt-2">
              <input
                id="paginas"
                className="text-gray-800 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Número de páginas"
                value={formValues.paginas}
                onChange={handleChange}
              />
            </div>
            <label
              htmlFor="genero"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Género
            </label>
            <div className="relative mb-5 mt-2">
              <input
                id="genero"
                className="text-gray-800 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Número de páginas"
                value={formValues.genero}
                onChange={handleChange}
              />
            </div>
            <label
              htmlFor="imagen"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              URL de la imagen
            </label>
            <div className="relative mb-5 mt-2">
              <input
                id="imagen"
                className="text-gray-800 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="URL de la imagen"
                value={formValues.imagen}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-start w-full mt-6">
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar'}
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
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default EditBook
