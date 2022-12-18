import React, { useState, useEffect, useContext } from 'react'
import * as cheerio from 'cheerio'
import axios from 'axios'

import { StateContext } from '../context'

const Home = () => {
  const { generateWallet, readKey, theme } = useContext(StateContext)

  return (
    <div className="cursor-pointer justify-center mt-32 flex flex-col items-center max-w-[580px] ml-5 ">
      <div>
        <h1>
          <span className="font-bold">Warning:</span> This is an experimental
          bitcoin lightning wallet made as a proof of concept built upon LNbits.
        </h1>
        <h2>
          This can be used as a temporary hot wallet or for testing. All wallet
          information is stored locally on your device.
        </h2>
      </div>
      {!readKey ? (
        <button
          onClick={generateWallet}
          className={`font-semibold text-[16px] mt-4 ${
            theme === 'dark' ? 'text-white' : ''
          } leading-[26px]  min-h-[52px] px-8 mt-2 ml-18 rounded-[10px] bg-slate-400`}
        >
          Generate new wallet
        </button>
      ) : null}
    </div>
  )
}

export default Home
