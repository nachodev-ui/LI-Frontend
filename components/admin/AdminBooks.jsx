import { useEffect, useState } from 'react'
import axios from 'axios'
import EditBook from '../modals/EditBook'
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
} from '@material-tailwind/react'
import { formatPrice } from '@/utils/cartUtils'
import { toast, Toaster } from 'sonner'
import { format, parse } from 'date-fns'

const AdminBooks = () => {
  const [bookData, setBookData] = useState([])
  const [addBook, setAddBook] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const fetchBooks = async () => {
    const { data } = await axios.get('http://localhost:5000/api/books')
    setBookData(data.data)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchAddBook = async () => {
    try {
      const bookToAdd = {
        ...addBook,
        fecha_publicacion: '01/01/2021',
      }

      const { data } = await axios.post(
        'http://localhost:5000/api/books',
        bookToAdd
      )

      toast.success('Libro agregado exitosamente')
      setBookData((prevBooks) => [...prevBooks, data.data])
      setAddBook({})
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`)
      setBookData((prevBooks) => prevBooks.filter((book) => book.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateBookData = (updatedData) => {
    setBookData((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === updatedData.id) {
          return { ...book, ...updatedData }
        }
        return book
      })
    )
  }

  const handleEditBook = (book) => {
    setSelectedBook(book)
    setModalOpen(true)
  }

  return (
    <div>
      <section className="flex flex-col items-center justify-center w-full p-4 space-y-4 mt-20 rounded-lg">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-3xl">
                <span className={`font-bold text-gray-800`}>
                  Lista de libros de la tienda
                </span>
              </h1>
              <div className="overflow-hidden  sm:rounded-lg mb-24 pt-14">
                {bookData.length > 0 ? (
                  <table className="min-w-full p-12 divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Imagen
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Titulo
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Autor
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Editorial
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                          Precio
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookData.map((book) => (
                        <tr key={book.id}>
                          {/* Book image */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex-shrink-0 h-20 w-14">
                              <img className="h-20 w-16" src={book.imagen} />
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {book.titulo}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {book.autor}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {book.editorial}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatPrice(book.precio)}
                            </div>
                          </td>
                          <td className="flex flex-col justify-center ml-4 px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              className="text-blue-800 font-semibold text-sm rounded-full mr-4 mb-2 px-2 py-1"
                              onClick={() => handleEditBook(book)}
                            >
                              Editar
                            </button>
                            <button
                              className="text-red-800 font-semibold text-sm rounded-full mr-4 mb-2 px-2 py-1"
                              onClick={() => handleDeleteBook(book.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full space-y-4 mt-20 rounded-lg bg-[#F7F7F7] p-20">
                    <h1 className="text-xl font-bold text-center text-gray-700 lg:text-left lg:text-2xl title-font ">
                      Actualmente no hay libros
                    </h1>
                  </div>
                )}
              </div>
              {selectedBook && (
                <EditBook
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                  bookData={selectedBook}
                  onUpdateBookData={handleUpdateBookData}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full p-4 space-y-4 mt-18 rounded-lg">
        <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-3xl mb-8">
          <span className={`font-bold text-gray-800`}>
            Rellena los campos para agregar un libro
          </span>
        </h1>
        <Card className="w-3/4 bg-[#f1f1f1]">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none"
          ></CardHeader>
          <CardBody>
            <div className="flex flex-col px-20">
              <div className="flex flex-row">
                <div className="flex flex-col w-1/2 py-2">
                  <Typography variant="h6">ISBN</Typography>
                  <input
                    type="text"
                    class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    onChange={(e) =>
                      setAddBook({
                        ...addBook,
                        isbn: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="flex flex-col w-1/2 ml-2 py-2">
                  <Typography variant="h6">Titulo</Typography>

                  <input
                    type="text"
                    class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    onChange={(e) =>
                      setAddBook({
                        ...addBook,
                        titulo: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-1/2 mr-2 py-2">
                  <Typography variant="h6">Autor</Typography>
                  <input
                    type="text"
                    class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    onChange={(e) =>
                      setAddBook({
                        ...addBook,
                        autor: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="flex flex-col w-1/2 ml-2 py-2">
                  <Typography variant="h6" className="text-gray-950">
                    Editorial
                  </Typography>
                  <input
                    type="text"
                    class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    onChange={(e) =>
                      setAddBook({
                        ...addBook,
                        editorial: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-1/2 mr-2 py-2">
                  <Typography variant="h6">Paginas</Typography>
                  <input
                    type="number"
                    class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    onChange={(e) =>
                      setAddBook({
                        ...addBook,
                        paginas: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="flex flex-col w-1/2 ml-2 py-2">
                  <Typography variant="h6">Precio</Typography>

                  <input
                    type="number"
                    class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    onChange={(e) =>
                      setAddBook({
                        ...addBook,
                        precio: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-1/2 mr-2 py-2">
                  <Typography variant="h6">Imagen</Typography>
                  <input
                    type="url"
                    class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    placeholder="URL Imagen"
                    onChange={(e) =>
                      setAddBook({
                        ...addBook,
                        imagen: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="flex flex-col w-1/2 ml-2 py-2">
                  <Typography variant="h6">Genero</Typography>
                  <input
                    type="text"
                    class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    onChange={(e) =>
                      setAddBook({
                        ...addBook,
                        genero: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-1/2 mr-2 py-2">
                  <Typography variant="h6">Idioma</Typography>
                  <select
                    id="userType"
                    class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) =>
                      setAddBook({
                        ...addBook,
                        idioma: e.target.value,
                      })
                    }
                  >
                    <option value="">Seleccionar Idioma</option>
                    <option value="Español">Español</option>
                    <option value="Ingles">Ingles</option>
                    <option value="Frances">Frances</option>
                  </select>
                </div>
                <div className="flex flex-col w-1/2 ml-2 py-2">
                  <Typography variant="h6">Fecha Publicacion</Typography>

                  <input
                    type="date"
                    class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    onChange={(e) =>
                      setAddBook({
                        ...addBook,
                        fecha_publicacion: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-1/2 mr-2 py-2">
                  <Typography variant="h6">Stock</Typography>
                  <input
                    type="number"
                    class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    onChange={(e) =>
                      setAddBook({
                        ...addBook,
                        stock: e.target.value,
                      })
                    }
                  ></input>
                </div>
                <div className="flex flex-col w-1/2 ml-2 py-2">
                  <Typography variant="h6">Descripción</Typography>
                  <input
                    type="text"
                    class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                    onChange={(e) =>
                      setAddBook({
                        ...addBook,
                        descripcion: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <Toaster position="bottom-center" reverseOrder={false} />

              <Button
                onClick={() => fetchAddBook()}
                className="w-1/3 flex justify-center items-center mx-auto my-10 bg-[#7b4d1f] hover:bg-[#906030] text-white font-bold rounded hover:shadow-none"
              >
                Agregar libro
              </Button>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  )
}

export default AdminBooks
