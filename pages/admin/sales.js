import Example from '@/components/Navbar'
import Footer from '@/components/Footer'
import Ceo from '@/components/Ceo'
import AdminCompras from '@/components/admin/AdminCompras'
import { withAdmin } from '@/secure/withAdmin'

const sales = () => {
  return (
    <div>
      <Ceo page="Gestión de compras" />
      <Example />

      <AdminCompras />

      <Footer />
    </div>
  )
}

export default withAdmin(sales)
