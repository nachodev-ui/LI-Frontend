import { useContext } from "react";
import { FiltersContext } from "@/context/filters";

export function useFilters() {
   const { filters, setFilters } = useContext(FiltersContext);

  const filterBooks = (books) => {
    return books.filter((book) => {
      return (
        book.precio >= filters.minPrice &&
        (filters.genre === "all" || book.genero === filters.genre)
      );
    });
  };

  return { filters, filterBooks, setFilters };
}
