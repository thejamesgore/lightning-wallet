import React, { useState } from 'react'

import { Route, Routes } from 'react-router-dom'

import { Home, Check } from './pages/'

import axios from 'axios'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/check" element={<Check />} />
    </Routes>
  )
}

export default App
