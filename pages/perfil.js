import Ceo from '@/components/Ceo'
import ProfileLayout from '@/components/ProfileLayout'
import UserProfile from '@/components/UserProfile'

const perfil = () => {
  return (
    <ProfileLayout>
      <Ceo page="Perfil" />

      <UserProfile />
    </ProfileLayout>
  )
}

export default perfil
