import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa';


const NavLinks = () => {
  return (
    <>
      <div>
        <Link to='/'>Go Home</Link>
        <Link to='/login' className='cursor-pointer'><FaUserCircle size={40} color="white" /></Link>
      </div>
      <Outlet />
    </>
  )
}

export default NavLinks