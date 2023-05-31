import { createContext, useState } from 'react'

// 1. Crear el contexto
export const DarkContext = createContext()

// 2. Crear el Provider, para proveer el contexto
export function DarkProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <DarkContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </DarkContext.Provider>
  )
}
