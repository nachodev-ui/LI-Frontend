import Example from '../components/Navbar'
import Mantencion from '@/components/Mantencion'
import MaintenanceTech from '@/components/technician/MaintenanceTech'
import Ceo from '@/components/Ceo'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

const API_USER_URL = 'http://localhost:5000/api/users'

const mantenciones = () => {
  const [userType, setUserType] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const id = user?.id

    const getUserType = async () => {
      try {
        const { data } = await axios.get(`${API_USER_URL}/${id}`)
        setUserType(data.data.tipo_usuario)
        localStorage.setItem(user.tipo_usuario, data.data.tipo_usuario)
      } catch (error) {
        console.log(error)
      }
    }

    getUserType()
  }, [])

  return (
    <div className="bg-[#ECECEA]">
      <Ceo page="Mantenciones" />

      <Example />

      {userType === 'Técnico' ? <MaintenanceTech /> : <Mantencion />}
    </div>
  )
}

export default mantenciones
