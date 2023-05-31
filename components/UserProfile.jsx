import { useDark } from '@/hooks/useDark'
import { useEffect, useState } from 'react'
import EditUser from './modals/EditUser'
import axios from 'axios'

const colors = {
  light: {
    background: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-green-500',
    button: 'bg-green-700 hover:bg-green-900',
    icon: 'text-green-700',
    link: 'text-gray-600 hover:text-green-700',
    location: 'text-gray-600',
  },
  dark: {
    background: 'bg-[#333]',
    profileBackground: 'bg-[#444]',
    text: 'text-white',
    border: 'border-blue-300',
    button: 'bg-blue-300 hover:bg-blue-500',
    icon: 'text-blue-200',
    link: 'text-gray-400 hover:text-blue-500',
    location: 'text-gray-300',
  },
}

const URL_API_GET_USER = 'http://localhost:5000/api/users'

const UserProfile = () => {
  const { darkMode, toggleDarkMode } = useDark()
  const [userData, setUserData] = useState({})
  const [modalOpen, setModalOpen] = useState(false)

  const color = darkMode ? colors.dark : colors.light

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'))

    const getUserDataDB = async () => {
      try {
        const res = await axios.get(`${URL_API_GET_USER}/${data.id}`)
        setUserData(res.data.data)
        console.log(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    getUserDataDB()

    if (data) {
      setUserData(data)
    }

    return () => {
      setUserData({})
    }
  }, [])

  const handleUpdateUserData = (updatedData) => {
    setUserData(updatedData)
  }

  return (
    <div
      className={`max-w-4xl flex items-center h-full lg:h-screen flex-wrap mx-auto mt-40 lg:my-0 transition-all duration-[400ms] ${color.background}`}
    >
      <div
        id="profile"
        className={`w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl mb-20 opacity-75 mx-6 lg:mx-0 ${color.profileBackground}`}
      >
        <div className="p-4 md:p-12 text-center lg:text-left">
          <img
            src="https://image.lag.vn/upload/news/23/05/03/ai-art-hoshino-ai-manga-anime-oshi-no-ko-9_THFB.jpg"
            sizes="(max-width: 400px) 100vw, 400px"
            alt="avatar"
            className="rounded-full h-auto w-full overflow-hidden shadow lg:hidden p-12"
          />

          {/*Add Pencil icon in top right to edit user*/}
          <div className="inline-flex">
            <h1 className={`text-3xl font-bold pt-8 lg:pt-0 ${color.text}`}>
              {userData.username}
            </h1>

            <div className="flex justify-between">
              <button
                className={`-translate-y-2 mt-2 mr-2 p-2 rounded-full text-gray-500 hover:text-gray-700 transition-colors duration-300`}
                onClick={() => setModalOpen(true)}
              >
                <svg
                  className={`h-6 w-6 fill-current ${color.icon}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.293 2.293a1 1 0 0 1 1.414 0l1 1a1 1 0 0 1 0
                  1.414l-12 12a1 1 0 0 1-.39.242l-5 1a1.001 1.001
                  0 0 1-1.213-1.213l1-5a1 1 0 0 1 .242-.39l12-12zM16
                  6l-10 10-3.586-3.586L12.828 2H16v4z"
                  />
                </svg>
              </button>
            </div>

            <EditUser
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              userData={userData}
              onUpdateUserData={handleUpdateUserData}
            />
          </div>

          <div
            className={`mx-auto lg:mx-0 w-4/5 border-b-2 opacity-25 ${color.border}`}
          ></div>
          <p
            className={`pt-4 text-xs lg:text-sm flex items-center justify-center lg:justify-start ${color.text}`}
          >
            <svg
              className={`h-4 fill-current pr-4 ${color.icon}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2 4v12h16V4H2zm16 0l-8 5-8-5h16zM2 2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2z" />
            </svg>{' '}
            {userData.correo}
          </p>
          <p
            className={`pt-4 text-xs lg:text-sm flex items-center justify-center lg:justify-start ${color.text}`}
          >
            {/* MAP SVG */}
            <svg
              className={`h-4 fill-current pr-4 ${color.icon}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0
              20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0
              1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95
              3.51A8.03 8.03 0 0 0 16.93 14zm-7.68 0a8.03 8.03
              0 0 0 4.68-1.49A14.44 14.44 0 0 1 11.07
              12H7.85zm-4.68-2.51A8.03 8.03 0 0 0 3.07
              14h3.22a14.44 14.44 0 0 1 .95-3.51H3.17zm.82-2h3.22a14.44
              14.44 0 0 1 .95-3.51A8.03 8.03 0 0 0 3.07
              6H6.3zm4.68 0a8.03 8.03 0 0 0-4.68 1.49A14.44
              14.44 0 0 1 8.93 8H12.15zm4.68 0a8.03 8.03 0 0 0
              1.49 4.68A14.44 14.44 0 0 1 12.93 8h3.22zM10
              8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0
              0 6 3 3 0 0 0 0-6z"
              />
            </svg>{' '}
            Ciudad: {userData.ciudad}
          </p>
          <p
            className={`pt-4 text-xs lg:text-sm flex items-center justify-center lg:justify-start ${color.text}`}
          >
            <svg
              className={`h-4 fill-current pr-4 ${color.icon}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
            </svg>{' '}
            Dirección:{' '}
            {userData.direccion ? userData.direccion : 'No especificada'}
          </p>
          <p
            className={`pt-4 text-xs lg:text-sm flex items-center justify-center lg:justify-start ${color.text}`}
          >
            {/* PHONE SVG */}
            <svg
              className={`h-4 fill-current pr-4 ${color.icon}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 20a10 10 0 1 1 0-20 10 10 0 0
              1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81
              28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44
              0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93
              14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61
              24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4
              1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81
              28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0
              4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03
              8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95
              3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74
              3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03
              8.03 0 0 0 3.07 6z"
                clipRule="evenodd"
              />
            </svg>{' '}
            Telefono: +56
            {userData.telefono ? userData.telefono : 'No especificado'}
          </p>

          <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between"></div>
        </div>
      </div>

      <div className="w-full lg:w-2/5 lg:block mb-20">
        <img
          src="https://image.lag.vn/upload/news/23/05/03/ai-art-hoshino-ai-manga-anime-oshi-no-ko-9_THFB.jpg"
          className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block h-auto"
        />
      </div>
    </div>
  )
}

export default UserProfile
