import ceo from "@/data/ceo"
import ProfileLayout from "@/components/ProfileLayout"

const perfil = () => {
  return (
    <ProfileLayout>
        {ceo("Perfil")}

        <p className="text-gray-800 text-3xl mb-16 font-bold">Mi perfil</p>
        
                
    </ProfileLayout>
  )
}

export default perfil