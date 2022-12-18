import { light } from '@mui/material/styles/createPalette'
import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { StateContext } from '../context'

import {
  lightning,
  lightMode,
  darkMode,
  hamburger,
  hamburgerOpen,
} from '../assets'
import { navLinks } from '../constants'

const Navbar = () => {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState('dashboard')
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const { theme, toggleTheme, balance, getWalletBalance, readKey } =
    useContext(StateContext)

  useEffect(() => {
    setInterval(getWalletBalance(), 10000)
  }, [])

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      {/* Small screen navigation */}

      <div className="sm:hidden flex justify-between items-center relative">
        <div className="flex  items-center flex-row">
          <div className="w-[40px] h-[40px] rounded-[10px] mr-4 dark:bg-[#2c2f32] bg-slate-300 flex justify-center items-center cursor-pointer">
            <img
              src={lightning}
              alt="user"
              className={`w-[60%] h-[60%] object-contain ${
                theme === 'dark' ? 'filterIcon' : ''
              }`}
            />
          </div>
          <div className="w-[40px] h-[40px] rounded-[10px] dark:bg-[#2c2f32] bg-slate-300 flex justify-center items-center cursor-pointer">
            <img
              src={theme === 'light' ? lightMode : darkMode}
              alt="user"
              className="w-[60%] h-[60%] object-contain dark:filterIcon"
              onClick={toggleTheme.bind(null)}
            />
          </div>
          {readKey ? (
            <h1 className="dark:text-slate-300 font-bold ml-4 ">
              BALANCE: {balance} Sats
            </h1>
          ) : null}
        </div>

        <img
          src={toggleDrawer === false ? hamburger : hamburgerOpen}
          alt="menu"
          className={`w-[34px] h-[34px] object-contain cursor-pointer ${
            theme === 'dark' ? 'filterIcon' : ''
          }`}
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-slate-300 z-10 shadow-secondary py-4 ${
            !toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 cursor-pointer  ${
                  isActive === link.name && 'bg-[#fff]'
                }`}
                onClick={() => {
                  setIsActive(link.name)
                  setToggleDrawer(false)
                  navigate(link.link)
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? 'grayscale-0' : 'grayscale'
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            {/* <CustomButton
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if (address) navigate('create-campaign')
                else connect()
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
