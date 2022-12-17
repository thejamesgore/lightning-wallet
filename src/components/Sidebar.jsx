import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { lightning, lightningDM, lightMode, darkMode } from '../assets'
import { navLinks } from '../constants'
import { StateContext } from '../context'

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[120px] h-[48px] rounded-[10px] flex items-center  
    } ${isActive && isActive === name && 'bg-[#ffffff] '} ${
      !disabled && 'cursor-pointer'
    } ${styles}`}
    onClick={handleClick}
  >
    {' '}
    {!isActive ? (
      <>
        <img src={imgUrl} alt="logo" className="w-1/2 h-1/2 fill-slate-50 " />
      </>
    ) : (
      <>
        <img
          src={imgUrl}
          alt="logo"
          className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`}
        />
        <p>{name}</p>
      </>
    )}
  </div>
)

const Sidebar = () => {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState('dashboard')
  const { theme, toggleTheme, getWalletBalance } = useContext(StateContext)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="flex items-center  flex-col sticky top-5 h-[15vh]">
      {/* This is where the logo goes */}
      <div>
        <Icon
          styles="w-[80px] h-[80px] bg-slate-300 dark:bg-[#2c2f32] justify-center	"
          imgUrl={theme === 'light' ? lightning : lightningDM}
        />
      </div>
      {/*  */}

      <div className="flex-1 sm:flex  flex-col justify-between items-center bg-slate-300 dark:bg-[#1c1c24] rounded-[20px] w-[140px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navLinks.map((link) => (
            <Icon
              styles={`${theme === 'dark' ? 'filterIcon' : ''}`}
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name)
                  navigate(link.link)
                }
              }}
            />
          ))}
        </div>
      </div>
      {/* Light / Dark Button */}
      <div className="flex-1 flex flex-col justify-between items-center bg-slate-300 dark:bg-[#1c1c24] rounded-[20px] w-[140px] py-4 mt-12">
        <div
          className="flex-1 flex ml-14 justify-center items-center "
          onClick={toggleTheme.bind(null)}
        >
          <Icon imgUrl={theme === 'dark' ? `${darkMode}` : `${lightMode}`} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
