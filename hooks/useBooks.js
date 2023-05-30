import { useState, useEffect } from 'react'
import axios from 'axios'

export const useBooks = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
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

    fetchBooks()
  }, [])

  return { books, setBooks }
}
