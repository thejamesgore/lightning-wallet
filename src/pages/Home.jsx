import React, { useState, useEffect, useContext } from 'react'
import * as cheerio from 'cheerio'
import axios from 'axios'

import { StateContext } from '../context'

const Home = () => {
  const { generateWallet } = useContext(StateContext)

  // const generateWallet = async () => {
  //   const num = Math.floor(100000 + Math.random() * 900000)

  //   const walletAdd = await axios.get(
  //     `https://legend.lnbits.com/wallet?nme=${num}`
  //   )
  // }

  return (
    <div onClick={generateWallet} className="cursor-pointer">
      Generate new wallet
    </div>
  )
}

export default Home
