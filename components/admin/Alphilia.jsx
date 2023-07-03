import { useEffect, useState } from 'react'
import { formatPrice } from '@/utils/cartUtils'
import axios from 'axios'

const Alphilia = () => {
  const [bookData, setBookData] = useState([])

  const fetchBooks = async () => {
    const { data } = await axios.get('http://localhost:9001/api/books')
    setBookData(data)
    console.log(data)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <div>
      <section className="flex flex-col items-center justify-center w-full p-4 space-y-4 mt-20 rounded-lg">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-3xl">
                <span className={`font-bold text-gray-800`}>
                  Lista de libros de Alphilia
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
                          Idioma
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Genero
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Precio
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Stock
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookData.map((book) => (
                        <tr key={book.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex-shrink-0 h-20 w-14">
                              <img className="h-20 w-16" src={book.foto} />
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
                              {book.idioma}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {book.genero}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatPrice(book.precio)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 text-center">
                              {book.stock}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full space-y-4 mt-20 rounded-lg bg-[#F7F7F7] p-20">
                    <h1 className="text-xl font-bold text-center text-gray-700 lg:text-left lg:text-2xl title-font ">
                      No hay libros de Alphilia
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

export default Alphilia
