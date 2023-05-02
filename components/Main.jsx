import { useState } from "react";
import { motion } from "framer-motion";
import Books from "./Books";


const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="container mx-auto flex items-center flex-wrap pb-12">
      <div className="w-full xl:px-20 px-4 container items-center justify-between mt-0 py-3">
        <p className="font-bold text-gray-800 text-4xl">Lo más destacado</p>
      </div>

      <div className="w-full pl-16 container items-center justify-between">
        <motion.div
          className="flex flex-wrap justify-center md:justify-start xl:justify-start container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {loggedIn ? <Books loggedIn={loggedIn} /> : <button onClick={handleLogin}>Login</button>}
        </motion.div>
      </div>
    </div>
  );
};

export default Main;
