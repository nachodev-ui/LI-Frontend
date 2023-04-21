import TopBar from "./TopBar"
import SideBar from "./SideBar"
import { useState, useEffect, Fragment } from "react";
import { Transition } from "@headlessui/react";

const ProfileLayout = ({children}) => {

  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if(innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize)
    }
    
    return () => {
      removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <>
      <TopBar showNav={showNav} setShowNav={setShowNav} />

      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transtition duration-[400ms]"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showNav={showNav} />
      </Transition>

      <main className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? "pl-56" : ""}`}>
        <div className="px-4 md:px-16">
          {children}
        </div>
      </main>

    </>
  )
}

export default ProfileLayout