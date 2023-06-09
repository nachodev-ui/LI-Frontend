import { Fragment, useEffect, useState } from 'react'
import {
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { BellIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Popover } from '@headlessui/react'
import { useDark } from '@/hooks/useDark'

const colors = {
  light: {
    background: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-green-500',
    button: 'bg-green-700 hover:bg-green-900',
    icon: 'text-green-700',
    link: 'text-gray-600 hover:text-green-700',
    location: 'text-gray-600',
  },
  dark: {
    background: 'bg-[#333]',
    profileBackground: 'bg-[#444]',
    text: 'text-white',
    border: 'border-blue-300',
    button: 'bg-blue-300 hover:bg-blue-500',
    icon: 'text-blue-200',
    link: 'text-gray-400 hover:text-blue-500',
    location: 'text-gray-300',
  },
}

const TopBar = ({ showNav, setShowNav }) => {
  const { darkMode } = useDark()
  const [userData, setUserData] = useState({})

  const color = darkMode ? colors.dark : colors.light

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'))

    if (data) {
      setUserData(data)
    }

    return () => {
      setUserData({})
    }
  }, [])

  return (
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? 'pl-56 ' : ''
      } ${color.background}`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className={`h-8 w-8 cursor-pointer ${color.text}`}
          onClick={() => setShowNav(!showNav)}
        />
      </div>

      <div className="flex items-center pr-4 md:pr-16">
        <Popover className="relative">
          <Popover.Button
            className={`outline-none mr-5 md:mr-8 cursor-pointer ${color.text}`}
          >
            <BellIcon className="h-6 w-6" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Popover.Panel className="absolute -right-16 sm:right-4 z-50 mt-2 bg-white shadow-sm rounded max-w-xs sm:max-w-sm w-screen">
              <div className="relative p-3">
                <div className="flex justify-between items-center w-full">
                  <p className="text-gray-700 font-medium">Notifications</p>
                  <a className="text-sm text-orange-500" href="#">
                    Marcar todas como leídas
                  </a>
                </div>
                <div className="mt-4 grid gap-4 grid-cols-1 overflow-hidden">
                  <div className="flex">
                    <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                      <CheckIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-700">
                        Título para la notificación
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        Texto notificación
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <picture>
                <img
                  src="/img/avatar.png"
                  className="rounded-full h-8 md:mr-4 border-2 border-white shadow-sm"
                  alt="imagen avatar perfil"
                />
              </picture>
              <span className={`hidden md:block font-medium ${color.text}`}>
                {userData.username}
              </span>
              <ChevronDownIcon className={`ml-2 h-4 w-4 ${color.text}`} />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
              <div className="p-1">
                <Menu.Item>
                  <Link
                    href="#"
                    className="flex hover:bg-cyan-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <Cog6ToothIcon className="h-4 w-4 mr-2" />
                    Cerrar sesión
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}

export default TopBar
