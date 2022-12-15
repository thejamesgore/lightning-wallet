import React, { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import { Home, Receive, Send, Wallet } from './pages/'
import { Sidebar } from './components'

import axios from 'axios'

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-slate-200  min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
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
