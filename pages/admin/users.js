import AdminUsers from '@/components/admin/AdminUsers'
import Ceo from '@/components/Ceo'
import Example from '@/components/Navbar'
import Footer from '@/components/Footer'
import { withAdmin } from '@/secure/withAdmin'

const users = () => {
  return (
    <div>
      <Ceo page="Administración de Usuarios" />

      <Example />

      <AdminUsers />

      <Footer />
    </div>
  )
}

export default withAdmin(users)
