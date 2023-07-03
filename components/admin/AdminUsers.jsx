import { useEffect, useState } from 'react'
import axios from 'axios'
import EditUser from '../modals/EditUser'
import { useFormik } from 'formik'
import { basicSchema } from '@/schemas'

// Validate username if is 'admin', etc
export const validate = (values) => {
  const errors = {}

  if (
    [
      'admin',
      'superadmin',
      'root',
      'administrator',
      'administrador',
      'null',
    ].includes(values.username)
  ) {
    errors.username = 'No puedes usar ese nombre de usuario'
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden'
  }

  return errors
}

const AdminUsers = () => {
  const [userData, setUserData] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: basicSchema,
    onSubmit: async (values, actions) => {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      try {
        const user = {
          username: values.username,
          correo: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }

        const response = await axios.post(
          'http://localhost:5000/auth/signup',
          user
        )

        if (response.status === 201) {
          actions.resetForm()
          successModal()
          fetchUsers()
        }
      } catch (e) {
        if (e.response.data && Object.keys(e.response.data).length > 0) {
          setShowModal(true)
        } else {
          console.log('Error desconocido')
        }
      }
    },
    validate,
  })

  const fetchUsers = async () => {
    const { data } = await axios.get('http://localhost:5000/api/users')
    setUserData(data.data)
  }

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`)
      setUserData((prevUsers) => prevUsers.filter((user) => user.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleUpdateUserData = (updatedData) => {
    setUserData((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === updatedData.id) {
          return { ...user, ...updatedData }
        }
        return user
      })
    )
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setModalOpen(true)
  }

  return (
    <div>
      <section className="flex flex-col items-center justify-center w-full p-4 space-y-4 mt-24 rounded-lg">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-3xl mb-6 font-bold text-gray-800">
                Usuarios
              </h1>
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Usuario
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Correo
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Dirección y Ciudad
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Teléfono
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Rol
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData.map((user) => (
                      <tr key={user.id}>
                        {user.tipo_usuario !== 'Administrador' ? (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.username}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {user.correo}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {user.direccion === null
                                  ? 'N/A'
                                  : user.direccion}{' '}
                                - {user.ciudad === null ? 'N/A' : user.ciudad}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                +56{' '}
                                {user.telefono === null ? 'N/A' : user.telefono}
                              </div>
                            </td>
                            {user.tipo_usuario === 'Técnico' ? (
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  {user.tipo_usuario}
                                </span>
                              </td>
                            ) : (
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {user.tipo_usuario}
                                </span>
                              </td>
                            )}
                            <td className="flex flex-col justify-center px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                className=" text-blue-800 font-semibold text-sm rounded-full mr-4 mb-2 px-2 py-1"
                                onClick={() => handleEditUser(user)}
                              >
                                Editar
                              </button>
                              <button
                                className=" text-red-800 font-semibold text-sm rounded-full mr-4 mb-2 px-2 py-1"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Eliminar
                              </button>
                            </td>
                          </>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {selectedUser && (
                <EditUser
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                  userData={selectedUser}
                  onUpdateUserData={handleUpdateUserData}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full p-4 space-y-4 mt-24 rounded-lg">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <h1 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-3xl mb-10 font-bold text-gray-800">
                Agrega un nuevo usuario
              </h1>
              <div className="flex flex-col gap-8 bg-[#f9f9f9] px-40 pb-20 pt-10 rounded-xl shadow-xl">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-8 bg-[#f9f9f9] px-24 pb-20 pt-20 rounded-xl shadow-xl"
                  autoComplete="off"
                >
                  <input
                    className={
                      errors.username && touched.username
                        ? 'input-error'
                        : 'text-sm p-2 rounded-xl border'
                    }
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Nombre de usuario"
                  />
                  {errors.username && touched.username && (
                    <p>{errors.username}</p>
                  )}
                  <input
                    className={
                      errors.email && touched.email
                        ? 'input-error'
                        : 'text-sm p-2 rounded-xl border'
                    }
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Ingresa tu correo"
                  />
                  {errors.email && touched.email && <p>{errors.email}</p>}
                  <div className="relative">
                    <input
                      className={
                        errors.password && touched.password
                          ? 'input-error'
                          : 'text-sm rounded-xl border w-full'
                      }
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Mínimo 5 caracteres"
                      onChange={handleChange}
                      value={values.password}
                      onBlur={handleBlur}
                    />
                    <svg
                      className={
                        errors.password && touched.password
                          ? 'bi bi-eye absolute top-1/3 right-3 -translate-y-1/2  cursor-pointer'
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
                    {errors.password && touched.password && (
                      <p className="mt-3">{errors.password}</p>
                    )}
                  </div>
                  <input
                    className={
                      errors.password && touched.password
                        ? 'input-error'
                        : 'text-sm rounded-xl border w-full'
                    }
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p>{errors.confirmPassword}</p>
                  )}
                  <button
                    className="bg-[#CBB8BA] rounded-xl text-white py-2 hover:scale-105 duration-300"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Agregar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminUsers
