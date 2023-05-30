import { useId } from 'react'
import { useFilters } from '@/hooks/useFilters'
import { Select, Option } from '@material-tailwind/react'
import { useBooks } from '@/hooks/useBooks'
import { useEffect, useState } from 'react'

export function Filters() {
  const { setFilters } = useFilters()
  const { books } = useBooks()
  const [uniqueGenres, setUniqueGenres] = useState([])

  useEffect(() => {
    const getUniquesGenres = (books) => {
      const genres = books.map((book) => book.genero)
      return [...new Set(genres)]
    }

    setUniqueGenres(getUniquesGenres(books))
  }, [books])

  const genreFilterId = useId()

  const handleChangeGenre = (value) => {
    setFilters((prevState) => ({
      ...prevState,
      genre: value,
    }))
  }

  return (
    <section className="flex flex-row">
      <label htmlFor={genreFilterId}></label>
      <div className="w-80 gap-6 mt-8 px-8">
        <Select
          id={genreFilterId}
          onChange={handleChangeGenre}
          color="purple"
          label="Selecciona un género"
        >
          <Option value="all">Todos los géneros</Option>
          {uniqueGenres.map((genre, index) => (
            <Option key={index} value={genre}>
              {genre}
            </Option>
          ))}
        </Select>
      </div>
    </section>
  )
}
