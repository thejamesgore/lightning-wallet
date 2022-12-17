import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import { StateContext } from '../context'

import Transactions from '../components/Transactions'

const Wallet = () => {
  const [transactions, setTransactions] = useState()

  const { theme, getWalletBalance, balance } = useContext(StateContext)

  const getTransactions = async () => {
    const headers = {
      'X-Api-Key': process.env.REACT_APP_READ_KEY,
    }
    const TXs = await axios
      .get('https://legend.lnbits.com/api/v1/payments', { headers })
      .then((res) => {
        setTransactions(res.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getWalletBalance()
    getTransactions()
  }, [])

  return (
    <div className="max-w-md ml-5 sm:mt-32  flex-col items-center justify-center ">
      <div>
        <button
          className={`font-semibold w-[80%] text-[16px] mt-4 ${
            theme === 'dark' ? 'text-white' : ''
          } leading-[26px]  min-h-[52px] px-8 mt-2 ml-18 rounded-[10px] bg-slate-400`}
          onClick={() => getWalletBalance()}
        >
          Update balance
        </button>
      </div>
      <div className="w-[80%] mt-8">
        <Transactions transactions={transactions} />
      </div>
    </div>
  )
}

export default Wallet
