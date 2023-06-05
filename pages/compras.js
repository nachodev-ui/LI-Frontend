import ProfileLayout from '@/components/ProfileLayout'
import Ceo from '@/components/Ceo'
import ComprasList from '@/components/lists/ComprasList'
import { useDark } from '@/hooks/useDark'

const compras = ({ showNav }) => {
  return (
    <div>
      <Ceo page="Mis compras" />

      <ProfileLayout showNav={showNav}>
        <ComprasList />
      </ProfileLayout>
    </div>
  )
}

export default compras
