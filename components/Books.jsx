import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useState } from "react";

const Books = (props) => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "El Resplandor",
      price: 9.99,
      image:
        "https://images.cdn2.buscalibre.com/fit-in/360x360/06/62/066251a8cf73e93a1f437d66e6f50341.jpg",
      categoria: "Terror",
      autor: "Stephen King",
    },
    {
      id: 2,
      title: "Doctor Sleep",
      price: 9.99,
      image:
        "https://images.cdn2.buscalibre.com/fit-in/360x360/5e/97/5e97b68ae5d27697017d1873ca2d3182.jpg",
      categoria: "Terror",
      autor: "Stephen King",
    },
    {
      id: 3,
      title: "Después",
      price: 9.99,
      image:
        "https://images.cdn1.buscalibre.com/fit-in/360x360/30/fe/30fe1f93a6df3e12d2a6d897088e1d98.jpg",
      categoria: "Ficción literaria",
      autor: "Stephen King",
    },
    {
      id: 4,
      title: "La sangre manda",
      price: 9.99,
      image:
        "https://images.cdn2.buscalibre.com/fit-in/360x360/13/54/1354f3615bc60ef2ac64f033d97fac36.jpg",
      categoria: "Ficción mordenista",
      autor: "Stephen King",
    },
    {
      id: 5,
      title: "El cuervo",
      price: 9.99,
      image:
        "https://images.cdn2.buscalibre.com/fit-in/360x360/31/78/317835028b8ffb763d9358bf4d766627.jpg",
      categoria: "Terror",
      autor: "Edgar Allan Poe",
    },
  ]);

  const handleBuy = (book) => {
    console.log(`You bought ${book.title} for ${book.price}`);
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="flex flex-wrap mr-16 md:mx-auto xl:mx-auto justify-center md:justify-start xl:justify-start container">
      {books.map((book, index) => (
        <motion.div className="item" variants={item} key={index}>
          <Card className="w-60 mx-8 mt-20">
            <CardHeader className="relative h-60">
              <img
                src={book.image}
                alt="imagen libro"
                className="h-full w-full"
              />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h5" className="mb-2">
                {book.title}
              </Typography>
              <Typography>
                <span className="text-gray-500">Autor:</span> {book.autor}
              </Typography>
            </CardBody>
            <CardFooter
              divider
              className="flex items-center justify-between py-3"
            >
              <Typography variant="small">{book.categoria}</Typography>
              <Typography variant="small" color="gray" className="flex gap-1">
                ${book.price}
              </Typography>
            </CardFooter>

            {props.loggedIn && (
              <Button
                className="mx-4 my-3 flex flex-row bg-[#f47856] hover:bg-[#ea6f4d]"
                size="md"
              >
                <span className="flex flex-row mx-auto">Añadir al carro</span>
              </Button>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default Books;
