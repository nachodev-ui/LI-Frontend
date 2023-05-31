import { DarkContext } from '@/context/darkMode'
import { useContext } from 'react'

export function useDark() {
  const { darkMode, setDarkMode } = useContext(DarkContext)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return { darkMode, toggleDarkMode }
}
