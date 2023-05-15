import { useCart } from '@/hooks/useCart'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react'

const Books = ({ books }) => {
  const { addToCart } = useCart()

  return (
    <>
      {books.map((book) => (
        <div className="grid grid-cols-1 px-8 my-12" key={book.id}>
          <Card className="w-60 h-90 bg-[#f8f8f8]" key={book.id}>
            <CardHeader shadow={true} floated={true} className="rounded-sm">
              <div
                className="w-full h-0"
                style={{ paddingBottom: '133.33%' }} // 3:4 aspect ratio
              >
                <img
                  src={book.imagen}
                  alt="Imagen"
                  className="object-cover absolute inset-0 w-full h-full"
                />
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-between mb-2">
                <Typography className="font-bold text-gray-700">
                  {book.titulo}
                </Typography>
              </div>
              <Typography className="text-sm text-gray-800 opacity-75">
                {book.descripcion}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75"
              >
                Stock: {book.stock}
              </Typography>
              <Typography className="font-bold mt-4">${book.precio}</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                fullWidth={true}
                className="bg-[#F6C38C] shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
                onClick={() => addToCart(book)}
                {...books}
              >
                <span className="text-white">Añadir al carro</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  )
}

export default Books
