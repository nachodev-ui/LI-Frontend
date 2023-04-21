import ProfileLayout from "@/components/ProfileLayout"
import ceo from "@/data/ceo"

const historial = () => {
  return (
    <div>
        {ceo("Historial")}

        <ProfileLayout />

        <p className="font-bold text-3xl text-gray-700 mb-16"></p>
    </div>
  )
}

export default historial