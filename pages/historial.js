import ProfileLayout from '@/components/ProfileLayout'
import Ceo from '@/components/Ceo'
import MantencionesList from '@/components/lists/MantencionesList'
import { useDark } from '@/hooks/useDark'

const colors = {
  light: {
    background: 'bg-[#f7f7f7]',
  },
  dark: {
    background: 'bg-[#212121]',
  },
}

const historial = ({ showNav }) => {
  const { darkMode } = useDark()

  const color = darkMode ? colors.dark : colors.light

  return (
    <div className={`${color.background}`}>
      <Ceo page="Mis manteciones" />

      <ProfileLayout showNav={showNav}>
        <MantencionesList />
      </ProfileLayout>
    </div>
  )
}

export default historial
