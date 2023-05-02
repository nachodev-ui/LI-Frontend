import Login from "@/components/Login"
import ceo from "@/data/ceo"

const login = () => {
  return (
    <div>
        {ceo("Login")}

        <Login />
    </div>
  )
}

export default login