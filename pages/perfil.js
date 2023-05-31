import Ceo from '@/components/Ceo'
import ProfileLayout from '@/components/ProfileLayout'
import UserProfile from '@/components/UserProfile'
import { useDark } from '@/hooks/useDark'

const colors = {
  light: 'bg-gray-100',
  dark: 'bg-gray-800',
}

const perfil = () => {
  const { darkMode } = useDark()

  const color = darkMode ? colors.dark : colors.light

  return (
    <div className={`${color.dark} min-h-screen`}>
      <ProfileLayout>
        <Ceo page="Perfil" />

        <UserProfile />
      </ProfileLayout>
    </div>
  )
}

export default perfil
