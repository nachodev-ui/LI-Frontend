import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function withAdminOrTechnician(Component) {
  return function WrappedComponent(props) {
    const router = useRouter()
    const [userType, setUserType] = useState('')

    useEffect(() => {
      const user = localStorage.getItem('user')
      const userType = JSON.parse(user)?.tipo_usuario

      setUserType(userType)

      if (userType !== 'Administrador' && userType !== 'Técnico') {
        router.replace('/') // redirecciona al home si no es admin ni técnico
      }

      if (!user) {
        router.replace('/') // redirecciona al home si no hay usuario
      }
    }, [userType])

    return <Component {...props} />
  }
}

export function withAdmin(Component) {
  return function WrappedComponent(props) {
    const router = useRouter()
    const [userType, setUserType] = useState('')

    useEffect(() => {
      const user = localStorage.getItem('user')
      const userType = JSON.parse(user)?.tipo_usuario

      setUserType(userType)

      if (userType !== 'Administrador') {
        router.replace('/') // redirecciona al home si no es admin
      }

      if (!user) {
        router.replace('/') // redirecciona al home si no hay usuario
      }
    }, [userType])

    return <Component {...props} />
  }
}
