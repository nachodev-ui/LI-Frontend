import AdminMaintenance from '@/components/admin/AdminMaintenance'
import Ceo from '@/components/Ceo'
import Example from '@/components/Navbar'
import Router from 'next/router'
import { useEffect } from 'react'

const maintenance = () => {
  const router = Router

  useEffect(() => {
    const user = localStorage.getItem('user')
    const userType = user?.tipo_usuario

    if (userType !== 'Administrador') {
      router.push('/')
    }
  }, [])

  return (
    <div>
      <Ceo page="Administración de Mantenciones" />

      <Example />

      <AdminMaintenance />
    </div>
  )
}

export default maintenance
