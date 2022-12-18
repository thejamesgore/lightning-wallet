import React, { useState, useEffect, useContext } from 'react'
import * as cheerio from 'cheerio'
import axios from 'axios'

import { StateContext } from '../context'

const Home = () => {
  const { generateWallet, readKey, theme, restoreWallet } =
    useContext(StateContext)

  return (
    <div className="cursor-pointer  mt-32  max-w-[580px] ml-5 ">
      {!readKey ? (
        <div className="flex flex-col justify-center items-center">
          <div>
            <h1 className="my-2 dark:text-slate-300">
              <span className="font-bold dark:text-slate-300">Warning:</span>{' '}
              This is an experimental custodial bitcoin lightning wallet made as
              a proof of concept built upon LNbits API.
            </h1>
            <h2 className="my-2 dark:text-slate-300">
              This can be used as a temporary hot wallet or for testing. All
              wallet information is stored locally on your device. If that
              information is removed you will lose wallet functionality and lose
              funds.
            </h2>
            <h2 className="my-2 dark:text-slate-300">
              It is recommended you back up your wallet before usage so you can
              restore it if need be.
            </h2>
            <h2 className="dark:text-slate-300">
              By clicking{' '}
              <span className="font-bold dark:text-slate-300">
                Generate new wallet
              </span>{' '}
              you accept full responsibility for usage and funds send to and
              from this wallet.
            </h2>
          </div>
          <div className="flex items-cetner justify-evenly dark:text-slate-300">
            <button
              onClick={generateWallet}
              className={`font-semibold text-[16px] mt-4 ${
                theme === 'dark' ? 'text-white' : ''
              } leading-[26px]  min-h-[52px] px-8 mt-2 mx-2 ml-18 rounded-[10px] bg-slate-400 dark:text-[#2c2f32]`}
            >
              Generate new wallet
            </button>
            <button
              onClick={restoreWallet}
              className={`font-semibold text-[16px] mt-4 ${
                theme === 'dark' ? 'text-white' : ''
              } leading-[26px]  min-h-[52px] px-8 mt-2 mx-2 ml-18 rounded-[10px] bg-slate-400 dark:text-[#2c2f32]`}
            >
              Restore Wallet
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Home
