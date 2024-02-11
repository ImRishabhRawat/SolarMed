import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
      <Link to={"/"} className="flex items-center gap-3">
          <p className="logo font-[Wingdings] font-bold text-5xl ">R</p>
          <span className=" font-['Helvetica_Now_Display'] font-extralight  text-md md:text-xl">SolarMed</span>
          
    </Link>

  )
}

export default Logo
