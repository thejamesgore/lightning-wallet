import React, { useContext, useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'
import { Home, Receive, Send, Wallet, Restore } from './pages/'
import { Sidebar, Navbar } from './components'

import { StateContext } from './context'

const App = () => {
  const { balance, getWalletBalance, backUp, readKey } =
    useContext(StateContext)

  useEffect(() => {
    setInterval(getWalletBalance(), 3000)
  }, [backUp])

  return (
    <div className="relative sm:-8 p-4 min-h-screen bg-slate-200 dark:bg-[#131318] flex flex-row">
      <div className="sm:flex hidden relative">
        <div className="">
          <div className="dark:text-slate-300 absolute ml-40 top-8 font-bold w-[580px]">
            {readKey ? <p>BALANCE: {balance} sats</p> : null}
          </div>
          <Sidebar />
        </div>
      </div>
      <div className="flex-1 max-sm:w-full  mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {!readKey ? null : (
            <>
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/send" element={<Send />} />
              <Route path="/receive" element={<Receive />} />
              <Route path="/restore" element={<Restore />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  )
}

export default App
