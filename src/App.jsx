import React, { useContext, useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import { Home, Receive, Send, Wallet } from './pages/'
import { Sidebar, Navbar } from './components'

import { useStateContext } from './context'

import axios from 'axios'

const App = () => {
  return (
    <div className="relative sm:-8 p-4 min-h-screen bg-slate-200 dark:bg-[#131318] flex flex-row">
      <div className="sm:flex hidden relative">
        <div className="">
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
