import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import { StateContext } from '../context'

const Wallet = () => {
  const [transactions, setTransactions] = useState()

  const { theme, getWalletBalance, balance } = useContext(StateContext)

  const getTransactions = () => {
    const headers = {
      'X-Api-Key': process.env.REACT_APP_READ_KEY,
    }
    axios
      .get('https://legend.lnbits.com/api/v1/payments', { headers })
      .then((res) => {
        setTransactions(res.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getWalletBalance()
  }, [])

  return (
    <div className="max-w-md ml-5  items-center justify-center ">
      <h1 className="dark:text-slate-300 font-bold uppercase">
        Balance: {balance} sats
      </h1>
      <button
        className={`font-semibold text-[16px] mt-4 ${
          theme === 'dark' ? 'text-white' : ''
        } leading-[26px]  min-h-[52px] px-8 mt-2 ml-18 rounded-[10px] bg-slate-400`}
        onClick={() => getWalletBalance()}
      >
        Update balance
      </button>
    </div>
  )
}

export default Wallet
