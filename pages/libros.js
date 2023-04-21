import ceo from "@/data/ceo"
import ComplexNavbar from "@/components/Navbar"

const Libros = () => {
  return (
    <div>
      {ceo("Libros")}

      <ComplexNavbar />

      <p className="text-gray-700 text-3xl mb-16 font-bold">Libros</p>
    </div>
  )
}

export default Libros