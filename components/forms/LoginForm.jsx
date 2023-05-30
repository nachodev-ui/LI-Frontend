import { useState } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import axios from 'axios'
import Error from '../modals/Error'

const validate = (values) => {
  const errors = {}

  // Regex para validar el correo
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

  if (!values.correo) {
    errors.correo = 'El correo es requerido'
  } else if (!emailRegex.test(values.correo)) {
    errors.correo = 'El correo no es válido'
  }

  if (!values.password) {
    errors.password = 'La contraseña es requerida'
  }

  return errors
}

const LoginForm = () => {
  const [error, setError] = useState('')
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [authToken, setAuthToken] = useState('')
  const router = useRouter()

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false)
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/signin',
        values
      )
      if (response.data && response.data.data) {
        const { token, user } = response.data.data
        console.log(token, user)

        if (token) {
          localStorage.setItem('authToken', token)
          setAuthToken(token)

          if (user) {
            localStorage.setItem('user', JSON.stringify(user))
          }

          router.push('/')
        } else {
          console.log('Error desconocido')
        }
      }
    } catch (error) {
      const { response } = error
      console.log(response.data)

      const { message } = response.data

      setError(message)
      setIsErrorModalOpen(true)
    }
  }

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        correo: '',
        password: '',
      },
      onSubmit,
      validate,
    })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="text-sm p-2 mt-8 rounded-xl border"
        type="email"
        name="correo"
        placeholder="Correo electrónico"
        value={values.correo}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.correo && errors.correo && <p>{errors.correo}</p>}
      <div className="relative">
        <input
          className="text-sm p-2 rounded-xl border w-full"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Contraseña"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <svg
          className={
            errors.password && touched.password
              ? 'bi bi-eye absolute top-1/4 right-3 -translate-y-1/2  cursor-pointer'
              : 'bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer'
          }
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="gray"
          viewBox="0 0 16 16"
          onClick={toggleShowPassword}
        >
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
        </svg>
        {touched.password && errors.password && (
          <p className="mt-3">{errors.password}</p>
        )}
      </div>
      <button
        className="bg-[#664040] rounded-xl text-white py-2 hover:scale-105 duration-300"
        type="submit"
      >
        Login
      </button>
      <Error isOpen={isErrorModalOpen} onClose={handleCloseErrorModal}>
        {error}
      </Error>
    </form>
  )
}

export default LoginForm
