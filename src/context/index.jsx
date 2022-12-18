import React, { useContext, createContext, useState } from 'react'

import axios from 'axios'

export const StateContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

export const StateContextProvider = ({ children }) => {
  // Theme management
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Wallet Generation

  // Wallet balance management
  const [balance, setBalance] = useState(0)
  const getWalletBalance = () => {
    const headers = {
      'X-Api-Key': process.env.REACT_APP_READ_KEY,
    }
    axios
      .get('https://legend.lnbits.com/api/v1/wallet', { headers })
      .then((res) => {
        setBalance(res.data.balance / 1000)
      })
      .catch((err) => console.log(err))

    return balance
  }

  return (
    <StateContext.Provider
      value={{ theme, toggleTheme, getWalletBalance, balance }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
