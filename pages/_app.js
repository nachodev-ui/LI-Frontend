import { ThemeProvider } from '@material-tailwind/react'
import { FiltersProvider } from '@/context/filters'
import { CartProvider } from '@/context/cart'
import '../styles/globals.css'

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
