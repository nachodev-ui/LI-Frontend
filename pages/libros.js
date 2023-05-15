import ComplexNavbar from "@/components/Navbar";
import Ceo from "@/components/Ceo";
import Books from "@/components/Main";
import { Filters } from "@/components/Filters";

const Libros = ({ books }) => {
  return (
    <>
      <Ceo page="Libros" description="Libros" />

      <ComplexNavbar />

      <section className="flex flex-col w-1/4">
        <h2 className="font-bold text-gray-700 text-xl mt-12 mx-8">
          Filtra por tu género favorito
        </h2>

        <Filters />
      </section>

      <section className="">
        <Books books={books} />
      </section>
    </>
  );
};

export default Libros;
