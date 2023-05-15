import { ThemeProvider } from '@material-tailwind/react'
import { FiltersProvider } from '@/context/filters'
import '../styles/globals.css'
import { CartProvider } from '@/context/cart'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <FiltersProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </FiltersProvider>
    </ThemeProvider>
  )
}

export default App
