

const Filters = ({filtro, setFiltro}) => {
  return (
    <div>
        <form>
            <div>
                <label>Filtrar por categoría</label>
                <select
                    value={filtro}
                    onChange={ e => setFiltro(e.target.value)}
                >
                    <option value="">Todas</option>
                    <option value="aventura">Aventura</option>
                    <option value="terror">Terror</option>
                    <option value="comedia">Comedia</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filters