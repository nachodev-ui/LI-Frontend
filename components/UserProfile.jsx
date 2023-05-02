import { UserIcon } from "@heroicons/react/24/outline";

const UserProfile = () => {
  return (
    <div className="h-80 w-full block items-center bg-cyan-200 flex-wrap justify-between rounded-2xl">
        <div className="h-16">
            <a className="block px-8 py-6 m-0 text-size-sm whitespace-nowrap text-slate-700">
                <img src="/img/zyro-image.png" className="inline h-full max-w-full max-h-8" alt="logo_empresa" />
                <span className="ml-2 font-semibold">Librería Imagina</span>
            </a>
        </div>

        <div className="items-center block w-auto max-h-screen overflow-auto grow basis-full">
            <ul className="flex flex-col pl-0 mb-0">
                <li className="mt-2 w-full">
                    <a className="py-3 text-size-sm my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors">
                        <div className="shadow-md mr-2 flex h-5 w-5 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                            <UserIcon />
                        </div>
                        <span className="ml-1 opacity-100 pointer-events-none">Dashboard</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
  );
};

export default UserProfile;
