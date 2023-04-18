import { forwardRef } from "react";
import Link from "next/link";
import { HomeIcon, QueueListIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import links from "@/data/links";

const SideBar = forwardRef(({ showNav, currentPage }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img
            className="w-32 h-auto"
            src="/img/zyro-image.png"
            alt="company logo"
          />
        </picture>
      </div>

      {links.map( links =>  (
        <div className="flex flex-col" key={links.id}>
          <Link href={links.href}>
            <div
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                router.pathname === links.text
                ? "bg-cyan-100 text-cyan-900"
                : "text-gray-400 hover:bg-cyan-100 hover:text-cyan-700"
              }`} 
            > 

              <div className="mr-2">
                <QueueListIcon className="h-5 w-5" /> 
              </div>

              <div>
                <p>{links.text}</p>
              </div>

            </div>
          </Link>
        </div>
      ))}

    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
