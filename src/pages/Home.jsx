import React, { useState, useEffect, useContext } from 'react'
import * as cheerio from 'cheerio'
import axios from 'axios'

import { StateContext } from '../context'

const Home = () => {
  const {
    generateWallet,
    readKey,
    theme,
    restoreWallet,
    backUpWallet,
    backUp,
  } = useContext(StateContext)

  const [state, setState] = useState('backup')
  const [input, setInput] = useState('enter key')

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    restoreWallet(input)
  }

  return (
    <div className="  mt-32  max-w-[580px] ml-5 ">
      {!readKey ? (
        <div className="flex flex-col justify-center items-center">
          <div>
            <h1 className="my-2 dark:text-slate-300">
              <span className="font-bold dark:text-slate-300">Warning:</span>{' '}
              This is an experimental custodial bitcoin lightning wallet made as
              a proof of concept.
            </h1>
            <h2 className="my-2 dark:text-slate-300">
              This can be used as a temporary hot wallet or for testing. All
              wallet information is stored locally on your device. If that
              information is removed you will lose wallet functionality and lose
              funds.
            </h2>
            <h2 className="my-2 dark:text-slate-300">
              It is recommended you back up your wallet once it is generated
              before usage so you can restore it if need be.
            </h2>
            <h2 className="dark:text-slate-300">
              By clicking{' '}
              <span className="font-bold dark:text-slate-300">
                Generate New Wallet
              </span>{' '}
              you accept full responsibility for usage and any funds send to and
              from this wallet.
            </h2>
          </div>
          <div className="flex items-cetner justify-evenly dark:text-slate-300 mt-6">
            <button
              onClick={generateWallet}
              className={`font-semibold text-[16px] mt-4 ${
                theme === 'dark' ? 'text-white' : ''
              } leading-[26px]  min-h-[52px] px-8 mt-2 mx-2 ml-18 rounded-[10px] bg-slate-400 dark:text-[#2c2f32]`}
            >
              Generate New Wallet
            </button>
          </div>
          <div>
            <form className="flex flex-col">
              <button
                onClick={handleSubmit}
                className={`font-semibold text-[16px] mt-4 ${
                  theme === 'dark' ? 'text-white' : ''
                } leading-[26px]  min-h-[52px] px-8 mt-2 mx-2 ml-18 rounded-[10px] bg-slate-400 dark:text-[#2c2f32]`}
              >
                Restore Wallet
              </button>
              <input
                className="mt-5 h-[50px] "
                type="text"
                name="backuUp"
                value={input}
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="mt-4  ">
          {backUp && (
            <div className="flex flex-col justify-center items-center w-[380px]">
              <h1 className="break-auto">
                This is your backup key. Make sure you save this if you wish to
                restore your wallet.
              </h1>
              <div>
                <p className="mt-3 break-all">{backUp}</p>
              </div>
            </div>
          )}
          {!backUp && (
            <div>
              <button
                onClick={backUpWallet}
                className={`font-semibold text-[16px] mt-4 ${
                  theme === 'dark' ? 'text-white' : ''
                } leading-[26px]  min-h-[52px] px-8 mt-2 mx-2 ml-18 rounded-[10px] bg-slate-400 dark:text-[#2c2f32]`}
              >
                Generate Back Up
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home
