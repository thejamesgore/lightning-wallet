import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { lightning } from '../assets'
import { navLinks } from '../constants'

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[120px] h-[48px] rounded-[10px] flex items-center ${
      isActive && isActive === name && 'bg-slate-500'
    } ${!disabled && 'cursor-pointer'} ${styles}`}
    onClick={handleClick}
  >
    {' '}
    {!isActive ? (
      <img src={imgUrl} alt="logo" className="w-1/2 h-1/2" />
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

  return (
    <div className="flex  items-center  flex-col sticky top-5 h-[15vh]">
      {/* This is where the logo goes */}
      <Link to="/">
        <Icon
          styles="w-[80px] h-[80px] bg-slate-300 justify-center	"
          imgUrl={lightning}
        />
      </Link>
      {/*  */}

      <div className="flex-1 flex flex-col justify-between items-center bg-slate-300 rounded-[20px] w-[140px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navLinks.map((link) => (
            <Icon
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
    </div>
  )
}

export default Sidebar
