import Example from '@/components/Navbar'
import Footer from '@/components/Footer'
import AdminBooks from '@/components/admin/AdminBooks'
import Alphilia from '@/components/admin/Alphilia'
import { withAdmin } from '@/secure/withAdmin'

const books = () => {
  return (
    <div>
      <Example />

      <AdminBooks />

      <Alphilia />

      <Footer />
    </div>
  )
}

export default withAdmin(books)
