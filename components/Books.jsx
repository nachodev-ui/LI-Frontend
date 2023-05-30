import { useCart } from '@/hooks/useCart'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react'
import { formatPrice } from '@/utils/cartUtils'
import { Toaster, toast } from 'sonner'

const Books = ({ books }) => {
  const { addToCart } = useCart()

  const handleSonnerAddToCart = async () => {
    toast.success('Añadido al carro', {
      position: 'bottom-right',
      duration: 5000,
    })
  }

  return (
    <>
      {books.map((book) => (
        <div className="px-8 my-12" key={book.id}>
          <Card className="w-60 h-90 bg-[#f8f8f8]">
            <CardHeader shadow={true} floated={true} className="rounded-sm">
              <div
                className="w-full h-0"
                style={{ paddingBottom: '133.33%' }} // 3:4
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
                Género: {book.genero}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75"
              >
                Stock: {book.stock}
              </Typography>
              <Typography className="text-lg mt-4 text-gray-800">
                {formatPrice(book.precio)}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Toaster />
              {book.stock > 0 ? (
                <Button
                  fullWidth={true}
                  className="bg-[#313131] shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
                  onClick={() => {
                    addToCart(book)
                    handleSonnerAddToCart()
                  }}
                >
                  <span className="text-white">Añadir al carro</span>
                </Button>
              ) : (
                <Button fullWidth={true} className="bg-[#212121]" disabled>
                  <span className="text-white">Sin stock</span>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  )
}

export default Books
