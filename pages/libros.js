import ComplexNavbar from '@/components/Navbar'
import Ceo from '@/components/Ceo'
import Books from '@/components/Books'
import Footer from '@/components/Footer'
import { Filters } from '@/components/Filters'
import { useBooks } from '@/hooks/useBooks'
import { useFilters } from '@/hooks/useFilters'

const Libros = () => {
  const { books } = useBooks()
  const { filterBooks } = useFilters()
  const filteredBooks = filterBooks(books)

  return (
    <div>
      <Ceo page="Libros" description="Libros" />

      <ComplexNavbar />

      <section className="flex flex-col w-1/2">
        <h2 className="font-bold text-gray-700 text-xl mt-12 mx-8">
          Filtra por tu género favorito
        </h2>

        <Filters />
      </section>

      <Books books={filteredBooks} />

      <Footer />
    </div>
  )
}

export default Libros
