import Tracking from '@/components/Tracking'
import Example from '@/components/Navbar'
import Footer from '@/components/Footer'
import Ceo from '@/components/Ceo'

const tracking = () => {
  return (
    <div>
      <Ceo page="Seguimiento" />

      <Example />

      <Tracking />

      <Footer />
    </div>
  )
}

export default tracking
