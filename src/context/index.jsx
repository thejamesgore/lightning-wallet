import React, { useContext, createContext, useState } from 'react'

export const StateContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

export const StateContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <StateContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
