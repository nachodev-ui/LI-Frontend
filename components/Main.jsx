import { useState, useEffect } from 'react'
import Books from './Books'
import axios from 'axios'
import { useFilters } from '@/hooks/useFilters'

const Main = () => {
  const [books, setBooks] = useState([])
  const { filterBooks } = useFilters()
  const filteredBooks = filterBooks(books)

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books')
      if (Array.isArray(response.data.data)) {
        const booksData = response.data.data.map((book) => {
          const precio = parseFloat(book.precio)
          return {
            ...book,
            precio: Number.isFinite(precio) ? precio : 0,
          }
        })
        setBooks(booksData)
      } else {
        console.log(
          'La respuesta de la API no es un array válido:',
          response.data
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  // "popular" significa que tiene mucho stock.
  const popularBooks = [...filteredBooks]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 5)

  return (
    <div className="mx-auto flex items-center flex-wrap pb-12">
      <div className="w-full items-centerr mt-4 mx-auto">
        <p className="font-bold text-gray-800 text-4xl mb-8 text-center">
          Lo más destacado de la semana
        </p>
      </div>

      <div className="w-full mx-auto px-6">
        <div className="flex flex-wrap justify-center">
          <Books books={popularBooks} />
        </div>
      </div>
    </div>
  )
}

export default Main
