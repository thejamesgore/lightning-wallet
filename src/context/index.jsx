import React, { useContext, createContext } from 'react'

import axios from ' axios'

const StateContext = createContext()

export const StateContextprovider = ({ children }) => {
  const getTings = () => {
    const data = axios.get(`http://url.com/`)

    return data
  }

  return (
    <StateContext.Provider
      value={{
        getTings,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
