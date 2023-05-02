import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { motion } from "framer-motion";

const Slide = () => {
  const slides = [
    {
      url: "/img/lib-one.avif",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const imgContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="max-w-[1200px] h-[550px] w-full m-auto py-16 px-4 relative">
      <motion.div
        style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
        className="imgContainer w-full h-full rounded-2xl bg-center bg-cover duration-500"
        variants={imgContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Left Arrow */}
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-1 bg-black/20 text-white cursor-pointer ">
          <BsChevronCompactLeft onClick={prevSlide} size={25} />
        </div>

        {/* Right Arrow */}
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-1 bg-black/20 text-white cursor-pointer ">
          <BsChevronCompactRight onClick={nextSlide} size={25} />
        </div>
      </motion.div>
    </div>
  );
};

export default Slide;
