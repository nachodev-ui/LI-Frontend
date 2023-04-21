import ComplexNavbar from "@/components/Navbar"
import Slide from "@/components/Slide"
import Main from "@/components/Main"
import Footer from "@/components/Footer"
import ceo from "@/data/ceo"

const index = () => {

  return (
    <div>
      {ceo("Inicio")}

      <ComplexNavbar />

      <Slide />

      <Main />

      <Footer />
    </div>
  )
}

export default index