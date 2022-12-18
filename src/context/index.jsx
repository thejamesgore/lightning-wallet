import React, { useContext, createContext, useState } from 'react'

import axios from 'axios'
import * as cheerio from 'cheerio'
import { wallet } from '../assets'

export const StateContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

export const StateContextProvider = ({ children }) => {
  //
  // Theme management
  //
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  //
  // End of Theme management
  //

  //
  // Wallet Generation
  //
  const [keys, setKeys] = useState('')
  const generateWallet = async () => {
    const num = Math.floor(100000 + Math.random() * 900000)

    const walletAdd = await axios.get(
      `https://legend.lnbits.com/wallet?nme=${num}`
    )

    console.log(walletAdd.request.responseURL)

    const response = await axios.get(walletAdd.request.responseURL)
    // console.log(response.data)
    const $ = cheerio.load(response.data)
    const data = $('q-card').text()
    // console.log(data)
    setKeys(data)
  }

  const adminKey = keys
    .substring(keys.indexOf('Admin key: ') + 11)
    .substring(0, 32)

  const readKey = keys
    .substring(keys.indexOf('Invoice/read key: ') + 18)
    .substring(0, 32)

  console.log({ adminKey, readKey })
  //
  // End of wallet generation
  //

  //
  // Wallet balance management
  //
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
  //
  // End of balance management
  //

  return (
    <StateContext.Provider
      value={{
        theme,
        balance,
        adminKey,
        readKey,
        toggleTheme,
        getWalletBalance,
        generateWallet,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
