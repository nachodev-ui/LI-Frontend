import Register from "@/components/Register"
import ceo from "@/data/ceo"

const register = () => {
  return (
    <div>
        {ceo("Registro")}
        
        <Register />
    </div>
  )
}

export default register