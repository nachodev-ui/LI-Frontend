import { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import links from "@/data/links";

const SideBar = forwardRef(({ showNav }, ref) => {
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
        <div className="flex flex-col" key={links.href}>
          <Link href={links.href}>
            <div
              className={`pl-6 py-3 mx-4 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                router.pathname === links.href
                ? "bg-gray-200 text-gray-700 font-bold"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
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
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
