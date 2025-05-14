import React from 'react'
import { Link } from 'react-router-dom'


const Login = () => {
  return (
    <div>
      <input
        type='text'
        id='email'
        placeholder='Enter Email Address'
        required
      />
      <input
        type='password'
        id='password'
        placeholder='Enter Password'
        required
      />
      <button className='cursor-pointer'>Log In</button>
      <Link to='/signup'>Create New Account</Link>
    </div>
  )
}

export default Login