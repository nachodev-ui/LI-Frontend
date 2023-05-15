import ProfileLayout from "@/components/ProfileLayout"
import Ceo from "@/components/Ceo"

const historial = () => {
  return (
    <div>
        <Ceo page="Historial" />

        <ProfileLayout />

        <p className="font-bold text-3xl text-gray-700 mb-16"></p>
    </div>
  )
}

export default historial