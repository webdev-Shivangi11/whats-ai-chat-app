import React from 'react'
import logo from "../assets/chatlogo.png"
function Navbar() {
  return (
    <div className=' w-full flex flex-wrap bg-transparent z-10  '>
        <img src={logo}  className='h-18' alt="" />
    </div>
  )
}

export default Navbar