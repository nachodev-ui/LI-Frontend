import TopBar from './TopBar'
import SideBar from './SideBar'
import { useState, useEffect, Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { useDark } from '@/hooks/useDark'

const colors = {
  light: {
    background: 'bg-gray-100',
  },
  dark: {
    background: 'bg-[#333]',
  },
}

const ProfileLayout = ({ children }) => {
  const [showNav, setShowNav] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { darkMode } = useDark()

  const color = darkMode ? colors.dark : colors.light

  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setShowNav(false)
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener('resize', handleResize)
    }

    return () => {
      removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={`transition-all duration-[400ms] ${color.background}`}>
      <TopBar showNav={showNav} setShowNav={setShowNav} />

      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showNav={showNav} />
      </Transition>

      <main
        className={`pt-16 transition-all duration-[400ms] ${
          showNav && !isMobile ? 'pl-56' : ''
        }`}
      >
        <div className="px-4 md:px-16">{children}</div>
      </main>
    </div>
  )
}

export default ProfileLayout
