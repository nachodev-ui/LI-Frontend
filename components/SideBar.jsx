import { forwardRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import links from '@/data/links'
import { useDark } from '@/hooks/useDark'

const colors = {
  light: {
    background: 'bg-[#f7f7f7]',
    text: 'text-gray-600',
    border: 'border-green-500',
    button: 'bg-green-700 hover:bg-green-900',
    icon: 'text-green-700',
    link: 'text-gray-600 hover:text-green-700',
    location: 'text-gray-600',
  },
  dark: {
    background: 'bg-[#222]',
    profileBackground: 'bg-[#444]',
    text: 'text-white',
    border: 'border-blue-300',
    button: 'bg-blue-300 hover:bg-blue-500',
    icon: 'text-blue-200',
    link: 'text-gray-400',
    location: 'text-gray-300',
  },
}

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter()
  const { darkMode } = useDark()

  const color = darkMode ? colors.dark : colors.light

  return (
    <div
      ref={ref}
      className={`fixed w-60 h-full shadow-sm ${color.background}`}
    >
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img
            className="w-32 h-auto"
            src="/img/zyro-image.png"
            alt="company logo"
          />
        </picture>
      </div>

      {links.map((links) => (
        <div className="flex flex-col" key={links.href}>
          <Link href={links.href}>
            <div
              className={`pl-6 py-3 mx-4 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                router.pathname === links.href
                  ? `${color.link} ${color.text} border-l-4 ${color.border}`
                  : 'text-gray-600 hover:text-gray-500 hover:border-l-4 hover:${color.border}'
              }`}
            >
              {links.icon}

              <div className="ml-2">
                <p>{links.text}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
})

SideBar.displayName = 'SideBar'

export default SideBar
