import React, { useContext, createContext, useState } from 'react'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <StateContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
