import React, { useContext, createContext, useState } from 'react'

import axios from 'axios'
import * as cheerio from 'cheerio'
import CryptoJS from 'crypto-js'
import { Navigate } from 'react-router-dom'

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
  const [wallet, setWallet] = useState('')

  const generateWallet = async () => {
    const num = Math.floor(100000 + Math.random() * 900000)

    const walletAdd = await axios.get(
      `https://legend.lnbits.com/wallet?nme=${num}`
    )
    setWallet(walletAdd)
    localStorage.setItem('walletAdd', walletAdd.request.responseURL)

    console.log(walletAdd.request.responseURL)

    const response = await axios.get(walletAdd.request.responseURL)

    const $ = cheerio.load(response.data)
    const data = $('q-card').text()

    setKeys(data)
  }
  //
  // End of wallet generation
  //

  //
  // Back up wallet
  //
  //

  const backUp = wallet.substring(
    wallet.indexOf('https://legend.lnbits.com/wallet?usr=') + 37
  )
  const backUpWallet = () => {
    // if (localStorage.getItem('walletAdd')) {
    // }
    console.log(
      wallet.substring(
        wallet.indexOf('https://legend.lnbits.com/wallet?usr=') + 37
      )
    )
    return wallet
  }
  //
  // End of back up wallet
  //

  //
  // Wallet restoration
  //
  const restoreWallet = async (input) => {
    if (localStorage.getItem('walletAdd')) {
      const newWallet = localStorage.getItem('walletAdd')

      setWallet(newWallet)

      const response = await axios.get(newWallet)

      const $ = cheerio.load(response.data)
      const data = $('q-card').text()

      setKeys(data)
    } else {
      console.log()
      const string = 'https://legend.lnbits.com/wallet?usr=' + input

      console.log(string)
      localStorage.setItem('walletAdd', string)
      const response = await axios.get(string)

      const $ = cheerio.load(response.data)
      const data = $('q-card').text()

      setKeys(data)
    }
    getWalletBalance()
  }
  //
  // End of wallet restoration
  //

  const adminKey = keys
    .substring(keys.indexOf('Admin key: ') + 11)
    .substring(0, 32)

  const readKey = keys
    .substring(keys.indexOf('Invoice/read key: ') + 18)
    .substring(0, 32)

  //
  // End of wallet generation
  //

  //
  // Wallet balance management
  //
  const [balance, setBalance] = useState(0)
  const getWalletBalance = () => {
    if (readKey) {
      const headers = {
        'X-Api-Key': readKey,
      }
      axios
        .get('https://legend.lnbits.com/api/v1/wallet', { headers })
        .then((res) => {
          setBalance(res.data.balance / 1000)
        })
        .catch((err) => console.log(err))

      return balance
    } else return null
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
        wallet,
        backUp,
        toggleTheme,
        getWalletBalance,
        generateWallet,
        backUpWallet,
        restoreWallet,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
