import React, { useContext, useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'
import { Home, Receive, Send, Wallet } from './pages/'
import { Sidebar, Navbar } from './components'

import { StateContext } from './context'

const App = () => {
  const { balance, getWalletBalance } = useContext(StateContext)

  useEffect(() => {
    getWalletBalance()
  }, [])

  return (
    <div className="relative sm:-8 p-4 min-h-screen bg-slate-200 dark:bg-[#131318] flex flex-row">
      <div className="sm:flex hidden relative">
        <div className="">
          <div className="absolute ml-40 top-8 font-bold w-[580px]">
            <p>{balance ? `BALANCE: ${balance}sats` : ''}</p>
          </div>
          <Sidebar />
        </div>
      </div>
      <div className="flex-1 max-sm:w-full  mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />Z
          <Route path="/send" element={<Send />} />
          <Route path="/receive" element={<Receive />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
