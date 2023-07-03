import { useEffect, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react'
import { formatPrice } from '@/utils/cartUtils'
import { Toaster, toast } from 'sonner'
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

const ITEMS_PER_PAGE = 5

const Books = ({ books }) => {
  const router = useRouter()
  const currentPage = router.pathname
  const { addToCart } = useCart()
  const [active, setActive] = useState(1)
  const [userType, setUserType] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE)
  const [pagedBooks, setPagedBooks] = useState(books.slice(0, ITEMS_PER_PAGE))

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const userType = user?.tipo_usuario

    if (userType === 'Cliente') {
      setUserType('Cliente')
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    setPagedBooks(
      books.slice((active - 1) * ITEMS_PER_PAGE, active * ITEMS_PER_PAGE)
    )
  }, [books, active])

  const handlePageChange = (pageNumber) => {
    setActive(pageNumber)
  }

  const next = () => {
    if (active === 5) return

    setActive(active + 1)
  }

  const prev = () => {
    if (active === 1) return

    setActive(active - 1)
  }

  const handleSonnerAddToCart = async () => {
    toast.success('Añadido al carro', {
      position: 'bottom-right',
      duration: 5000,
    })
  }

  useEffect(() => {
    // Si la página es 'libros'
    if (window.location.pathname === '/libros') {
      if (
        active === 1 ||
        active === 2 ||
        active === 3 ||
        active === 4 ||
        active === 5
      ) {
        // Scroll hasta el top con animación suave
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      } else {
        // Scroll hasta el top de la sección
        window.scrollTo(0, 600)
      }
    }
  })

  return (
    <div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 mt-12 justify-center">
        {pagedBooks.map((book) => (
          <div className="px-8 my-12" key={book.isbn}>
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
                {(userType === 'Cliente' || !userType) && book.stock > 0 ? (
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
      </div>
      {currentPage === '/libros' && (
        <div className="flex justify-center gap-4 mt-4">
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-2 rounded-full"
            onClick={prev}
            disabled={active === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Anterior
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <IconButton
                className="bg-brown-400 rounded-full"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </IconButton>
            ))}
          </div>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-2 rounded-full"
            onClick={next}
            disabled={active === 5}
          >
            Siguiente
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default Books
