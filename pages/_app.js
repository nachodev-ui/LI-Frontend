import { ThemeProvider } from '@material-tailwind/react'
import { FiltersProvider } from '@/context/filters'
import { CartProvider } from '@/context/cart'
import { DarkProvider } from '@/context/darkMode'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <DarkProvider>
        <FiltersProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </FiltersProvider>
      </DarkProvider>
    </ThemeProvider>
  )
}

export default App
