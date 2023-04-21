import { HomeIcon, UserIcon, DocumentTextIcon } from "@heroicons/react/24/solid";

const links = [
    { href: '/', text: 'Inicio', icon: <HomeIcon className="w-4 h-4" /> },
    { href: '/perfil', text: 'Perfil', icon: <UserIcon className="w-4 h-4" />},
    { href: '/historial', text: 'Mi historial', icon: <DocumentTextIcon className="w-4 h-4" /> },
];

export default links;