import ceo from "@/data/ceo"

const Contacto = () => {
  return (
    <div>
      {ceo("Contacto")}

      <p className="text-gray-700 text-3xl mb-16 font-bold">Contacto</p>

      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
      </div>
    </div>
  )
}

export default Contacto