import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Books = ({ loggedIn }) => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    genre: "all",
    minPrice: 0,
  });
  const [minPrice, setMinPrice] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      console.log("API response:", response);
      console.log("API data:", response.data);

      if (Array.isArray(response.data.data)) {
        const booksData = response.data.data.map((book) => {
          const precio = parseFloat(book.precio);
          return {
            ...book,
            precio: Number.isFinite(precio) ? precio : 0, // Asignar un valor predeterminado en caso de precio inválido
          };
        });
        setBooks(booksData);
      } else {
        console.log(
          "La respuesta de la API no es un array válido:",
          response.data
        );
        // Puedes mostrar un mensaje de error o tomar otra acción apropiada aquí
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterBooks = (books) => {
    return books.filter((book) => {
      return (
        book.precio >= filters.minPrice &&
        (filters.genre === "all" ||
          book.genero.toLowerCase() === filters.genre.toLowerCase())
      );
    });
  };

  const filteredBooks = filterBooks(books);

  const handleGenreChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      genre: event.target.value,
    }));
  };

  const handlePriceChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: parseFloat(event.target.value),
    }));
  };

  return (
    <>
      <section className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="mr-4">
            <label htmlFor="genre">Genre:</label>
            <select
              id="genre"
              name="genre"
              value={filters.genre}
              onChange={handleGenreChange}
            >
              <option value="all">All</option>
              <option value="fantasía">Fantasía</option>
              <option value="romance">Romance</option>
              <option value="terror">Terror</option>
            </select>
          </div>
          <div>
            <label htmlFor="minPrice">Min Price:</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handlePriceChange}
            />
            <span>${minPrice}</span>
          </div>
        </div>
      </section>

      <div className="flex justify-center mx-auto mt-12">
        <div className="flex w-full">
          {filteredBooks.map((book) => (
            <Card className="w-60" key={book.id}>
              <CardHeader shadow={false} floated={false} className="h-86">
                <img src={book.imagen} className="w-full h-80" />
              </CardHeader>
              <CardBody>
                <div className="flex items-center justify-between mb-2">
                  <Typography color="blue-gray" className="font-medium">
                    {book.titulo}
                  </Typography>
                  <Typography color="blue-gray" className="font-medium">
                    ${book.precio}
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75"
                >
                  {book.descripcion}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75"
                >
                  Stock: {book.stock}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
                >
                  Comprar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Books;
