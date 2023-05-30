const ShippingMethod = () => {
  return (
    <div className="mb-8">
      <p className="mt-8 text-lg font-medium">Métodos de envío</p>
      <form className="mt-5 grid gap-6">
        <div className="relative">
          <input
            className="peer hidden"
            id="radio_1"
            type="radio"
            name="radio"
            readOnly
          />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label
            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            htmlFor="radio_1"
          >
            <img
              className="w-14 object-contain"
              src="https://media.istockphoto.com/id/1302438914/es/vector/icono-del-cami%C3%B3n-de-entrega-r%C3%A1pida-env%C3%ADo-r%C3%A1pido-dise%C3%B1o-para-sitios-web-y-aplicaciones-m%C3%B3viles.jpg?s=612x612&w=0&k=20&c=yMtEbO4d3z0VC2bFtZhey7X7MLnnBFIrw62Gy06KXXA="
              alt="Imagén de un camión de envío rápido, lo cuál describe el método de envío"
            />
            <div className="ml-5">
              <span className="mt-2 font-semibold">Despacho</span>
              <p className="text-slate-500 text-sm leading-6">
                Despacho: 2-4 Días
              </p>
            </div>
          </label>
        </div>
      </form>
    </div>
  )
}

export default ShippingMethod
