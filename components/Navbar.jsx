import React, { useEffect } from 'react'
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Chip,
} from '@material-tailwind/react'
import {
  ChevronDownIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  ArrowRightOnRectangleIcon,
  Square3Stack3DIcon,
  RocketLaunchIcon,
  BookOpenIcon,
  ShoppingBagIcon,
  WrenchIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Toaster, toast } from 'sonner'
import {} from '../styles/Navbar.module.css'
import axios from 'axios'
import { el, hr } from 'date-fns/locale'

const colors = {
  blue: 'bg-blue-50 text-blue-500',
  orange: 'bg-orange-50 text-orange-500',
  green: 'bg-green-50 text-green-500',
  'blue-gray': 'bg-blue-gray-50 text-blue-gray-500',
  purple: 'bg-purple-50 text-purple-500',
  teal: 'bg-teal-50 text-teal-500',
  cyan: 'bg-cyan-50 text-cyan-500',
  pink: 'bg-pink-50 text-pink-500',
}

const navListMenuItems = [
  {
    color: 'blue',
    icon: FlagIcon,
    title: 'Mantención',
    description: 'Realizamos mantención a tus libros favoritos.',
    href: '/mantenciones',
  },
  {
    color: 'green',
    icon: RocketLaunchIcon,
    title: (
      <div className="flex items-center gap-1">
        Despacho{' '}
        <Chip
          size="sm"
          color="green"
          variant="ghost"
          value="¡Seguimiento!"
          className="capitalize"
        />
      </div>
    ),
    description: 'Ofrecemos despacho y seguimiento de tu compra.',
    href: '/delivery',
  },
  {
    color: 'purple',
    icon: ShoppingBagIcon,
    title: 'Carro de compras',
    description: 'Revisa tu carro de compras y realiza tu compra.',
    href: '/cart',
  },
]

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const renderItems = navListMenuItems.map(
    ({ icon, title, description, color, href }, key) => (
      <a href={href} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className={`rounded-lg p-5 ${colors[color]}`}>
            {React.createElement(icon, {
              strokeWidth: 2,
              className: 'h-6 w-6',
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm"
            >
              {title}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  )

  return (
    <>
      <React.Fragment>
        <Menu
          open={isMenuOpen}
          handler={setIsMenuOpen}
          offset={{ mainAxis: 20 }}
          placement="bottom"
          allowHover={true}
        >
          <MenuHandler>
            <Typography as="div" variant="small" className="font-normal">
              <ListItem
                className="flex items-center gap-2 py-2 pr-4"
                selected={isMenuOpen || isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((cur) => !cur)}
              >
                <Square3Stack3DIcon className="h-[18px] w-[18px]" />
                Servicios
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`hidden h-3 w-3 transition-transform lg:block ${
                    isMenuOpen ? 'rotate-180' : ''
                  }`}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`block h-3 w-3 transition-transform lg:hidden ${
                    isMobileMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </ListItem>
            </Typography>
          </MenuHandler>
          <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
            <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
          </MenuList>
        </Menu>
        <div className="block lg:hidden">
          <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
        </div>
      </React.Fragment>
    </>
  )
}

const navListItemUser = [
  {
    icon: <BookOpenIcon className="h-[18px] w-[18px]" />,
    title: 'Libros',
    href: '/libros',
  },
  {
    icon: <ShoppingBagIcon className="h-[18px] w-[18px]" />,
    title: 'Mi carro',
    href: '/compras',
  },
]

const navListItemAdmin = [
  {
    icon: <WrenchIcon className="h-[18px] w-[18px]" />,
    title: 'Gestionar mantenciones',
    href: '/mantenciones',
  },
  {
    icon: <UserGroupIcon className="h-[18px] w-[18px]" />,
    title: 'Gestionar usuarios',
    href: '/users',
  },
  {
    icon: <BookOpenIcon className="h-[18px] w-[18px]" />,
    title: 'Gestionar libros',
    href: '/libros',
  },
  {
    icon: <ShoppingBagIcon className="h-[18px] w-[18px]" />,
    title: 'Gestionar compras',
    href: '/compras',
  },
]

const navListItemTechnician = [
  {
    icon: <WrenchIcon className="h-[18px] w-[18px]" />,
    title: 'Mantenciones',
    href: '/mantenciones',
  },
]

function NavList() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [isTechnician, setIsTechnician] = React.useState(false)
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [isCliente, setIsCliente] = React.useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const userType = user?.tipo_usuario

    if (userType === 'Técnico') {
      setIsTechnician(true)
    } else if (userType === 'Administrador') {
      setIsAdmin(true)
    } else if (userType === 'Cliente') {
      setIsCliente(true)
    }

    setIsAuthenticated(!!user)
    console.log(isTechnician)
    console.log(isAdmin)
    console.log(isCliente)
  }, [])

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('authToken')
      setIsAuthenticated(!!token) // !!token convierte el token en un booleano
    }

    checkToken()
  }, [])

  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      {isAdmin && (
        <>
          {navListItemAdmin.map((adminHead) => (
            <Typography
              as="a"
              key={adminHead.href}
              href={adminHead.href}
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              <ListItem className="flex items-center gap-2 py-2 pr-4">
                {adminHead.icon}
                {adminHead.title}
              </ListItem>
            </Typography>
          ))}
        </>
      )}

      {isTechnician && (
        <>
          {navListItemTechnician.map((technicianHead) => (
            <Typography
              as="a"
              key={technicianHead.href}
              href={technicianHead.href}
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              <ListItem className="flex items-center gap-2 py-2 pr-4">
                {technicianHead.icon}
                {technicianHead.title}
              </ListItem>
            </Typography>
          ))}
        </>
      )}
      {isCliente && (
        <>
          {navListItemUser.map((userHead) => (
            <Typography
              as="a"
              key={userHead.href}
              href={userHead.href}
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              <ListItem className="flex items-center gap-2 py-2 pr-4">
                {userHead.icon}
                {userHead.title}
              </ListItem>
            </Typography>
          ))}
          <NavListMenu />
        </>
      )}
      {isAuthenticated && (
        <Typography
          as="a"
          href="/"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <UserCircleIcon className="h-[18px] w-[18px]" />
            Mi perfil
          </ListItem>
        </Typography>
      )}
    </List>
  )
}

export default function Example() {
  const [openNav, setOpenNav] = React.useState(false)
  const [isNavbarBlurred, setIsNavbarBlurred] = React.useState(false)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setIsAuthenticated(false)

    toast.success('Tu sesión ha sido cerrada, ¡vuelve pronto!', {
      position: 'bottom-right',
      duration: 5000,
    })

    router.push('/')
  }

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const shouldNavbarBeBlurred = scrollTop > 0 // Verifica si el scroll está en la parte superior

      setIsNavbarBlurred(shouldNavbarBeBlurred)
    }

    window.addEventListener('scroll', handleScroll)

    const checkToken = async () => {
      const token = localStorage.getItem('authToken')
      setIsAuthenticated(!!token) // !!token convierte el token en un booleano
    }

    checkToken()

    // Limpia el evento de scroll cuando el componente se desmonta
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Navbar
      className={`sticky inset-0 z-10 h-max max-w-full py-2 px-3 lg:px-8 lg:py-3 ${
        isNavbarBlurred ? 'blur-on-scroll' : ''
      }`}
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          Librería Imagina
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        {isAuthenticated ? (
          <div className="hidden gap-2 lg:flex">
            <Button
              variant="text"
              size="sm"
              color="blue-gray"
              onClick={handleLogout}
            >
              <div className="inline-flex items-center">
                <ArrowRightOnRectangleIcon className="h-6 w-6 mr-2" />
                Cerrar sesión
              </div>
            </Button>
          </div>
        ) : (
          <div className="hidden gap-2 lg:flex">
            <Link href="/login">
              <Button variant="text" size="sm" color="blue-gray" fullWidth>
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#F6C38C]" size="sm">
                Registrar
              </Button>
            </Link>
          </div>
        )}
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-between gap-2 lg:hidden">
          {isAuthenticated ? (
            <Button
              variant="text"
              size="sm"
              color="blue-gray"
              onClick={handleLogout}
            >
              <div className="inline-flex items-center justify-center">
                <ArrowRightOnRectangleIcon className="h-6 w-6 mr-2" />
                Cerrar sesión
              </div>
            </Button>
          ) : (
            <div className="flex w-full justify-between items-center px-24 lg:hidden">
              <Link href="/login">
                <Button variant="text" size="sm" color="blue-gray">
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#F6C38C]" size="sm">
                  Registrar
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Collapse>
    </Navbar>
  )
}
