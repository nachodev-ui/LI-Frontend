import { useId } from "react";
import { useFilters } from "@/hooks/useFilters";
import { Select, Option } from "@material-tailwind/react";

export function Filters() {
  const { filters, setFilters } = useFilters();

  const minPriceFilterId = useId();
  const genreFilterId = useId();

  const handleChangeMinPrice = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };

  const handleChangeGenre = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      genre: event.target.value,
    }));
  };

  return (
    <section>
      {/* <div className="flex gap-4 mx-8">
        <label htmlFor={minPriceFilterId}>Precio mínimo:</label>
        <input
          type="range"
          min="0"
          max="50000"
          id={minPriceFilterId}
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>
      <div className="">
        <label htmlFor={genreFilterId}>Genero:</label>
        <select id={genreFilterId} onChange={handleChangeGenre}>
          <option value="all">All</option>
          < value="Fantasía">Fantasía</ option>
          <option value="romance">Romance</option>
          <option value="Terror">Terror</option>
        </select>
      </div> */}

      <label htmlFor={genreFilterId}></label>
      <div className="flex w-78 flex-col gap-6 mt-8 px-8">
        <Select
          id={genreFilterId}
          onChange={handleChangeGenre}
          color="purple"
          label="Selecciona un género"
        >
          <Option value="all">Todos</Option>
          <Option value="Fantasía">Fantasía</Option>
          <Option value="Romance">Romance</Option>
          <Option value="Terror">Terror</Option>
        </Select>
      </div>
    </section>
  );
}
