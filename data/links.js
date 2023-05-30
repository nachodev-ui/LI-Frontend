import {
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/solid'

const links = [
  {
    href: '/',
    text: 'Inicio',
    icon: <HomeIcon className="w-4 h-4" />,
  },
  {
    href: '/perfil',
    text: 'Perfil',
    icon: <UserIcon className="w-4 h-4" />,
  },
  {
    href: '/historial',
    text: 'Mantenciones',
    icon: <DocumentTextIcon className="w-4 h-4" />,
  },
  {
    href: '/compras',
    text: 'Mis compras',
    icon: <ShoppingBagIcon className="w-4 h-4" />,
  },
]

export default links
