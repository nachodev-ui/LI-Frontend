import { HomeIcon, BookOpenIcon, PhoneIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const links = [
    { href: '/', text: 'Inicio', icon: <HomeIcon className="w-5 h-5" /> },
    { href: '/libros', text: 'Libros', icon: <BookOpenIcon className="w-5 h-5" /> },
    { href: '/contacto', text: 'Contacto', icon: <PhoneIcon className="w-5 h-5" />},
];

export default links;