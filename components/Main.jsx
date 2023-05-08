import { useState } from "react";
import { motion } from "framer-motion";
import Books from "./Books";

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [filters, setFilters] = useState({
    genre: "all",
    minPrice: 0,
  });

  return (
    <div className="mx-auto flex items-center flex-wrap pb-12">
      <div className="w-full xl:px-20 px-4 container items-center justify-between mt-0 py-3">
        <p className="font-bold text-gray-800 text-4xl">Lo más destacado</p>
      </div>

      <div className="w-full pl-16 container items-center justify-between">
        <div
          className="flex flex-wrap justify-center md:justify-start xl:justify-start"
        >
          <Books  />
        </div>
      </div>
    </div>
  );
};

export default Main;
