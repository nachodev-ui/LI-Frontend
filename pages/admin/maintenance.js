import AdminMaintenance from '@/components/admin/AdminMaintenance'
import Ceo from '@/components/Ceo'
import Example from '@/components/Navbar'
import { withAdminOrTechnician } from '@/secure/withAdmin'

const maintenance = () => {
  return (
    <div>
      <Ceo page="Administración de Mantenciones" />

      <Example />

      <AdminMaintenance />
    </div>
  )
}

export default withAdminOrTechnician(maintenance)
