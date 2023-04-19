import ceo from "@/data/ceo"

const Libros = () => {
  return (
    <div>
      {ceo("Libros")}

      <p className="text-gray-700 text-3xl mb-16 font-bold">Libros</p>
    </div>
  )
}

export default Libros