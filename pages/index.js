import Example from '@/components/Navbar'
import Slide from '@/components/Slide'
import Main from '@/components/Main'
import Footer from '@/components/Footer'
import Ceo from '@/components/Ceo'
// import { CartProvider } from '@/context/cart'

const index = () => {
  return (
    <>
      <Ceo page="Inicio" />

      <Example />

      <Slide />

      <Main />

      <Footer />
    </>
  )
}

export default index
