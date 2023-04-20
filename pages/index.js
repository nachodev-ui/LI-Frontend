import { useState } from "react"
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import ComplexNavbar from "@/components/Navbar"
import ceo from "@/data/ceo"
import { motion } from "framer-motion"

const index = () => {

  const slides = [
    {
      url: "/img/lib-one.avif",
    },
    {
      url: "https://img.freepik.com/vector-gratis/gente-negocios-trabajando-centro-control-ilustracion-plana-pantallas-grandes_74855-10493.jpg?w=1480&t=st=1681982421~exp=1681983021~hmac=22f81c36d8118a51c3d2110a16c4eac91ede35f0a583fa5be65e8554d27c8e8f",
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
  }

  return (
    <div>
      {ceo("Inicio")}

      <ComplexNavbar />

      <div className="max-w-[1200px] h-[550px] w-full m-auto py-16 px-4 relative">
        
        <div 
          style={{ backgroundImage: `url(${slides[currentSlide].url})` }} 
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500">  

          {/* Left Arrow */}
          <div 
            className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-1 bg-black/20 text-white cursor-pointer ">
            <BsChevronCompactLeft onClick={prevSlide} size={25} />
          </div>

          {/* Right Arrow */}
          <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-1 bg-black/20 text-white cursor-pointer ">
            <BsChevronCompactRight onClick={nextSlide} size={25} />
          </div>

        </div>

      </div>

    </div>
  )
}

export default index