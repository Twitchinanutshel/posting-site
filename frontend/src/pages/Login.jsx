import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  return (
    <div>
      <input
        type='text'
        id='email'
        placeholder='Enter Email Address'
        onChange={(e) => { setEmail(e.target.value) }}
        required
      />
      <input
        type='password'
        id='password'
        placeholder='Enter Password'
        onChange={(e) => { setPassword(e.target.value) }}
        required
      />
      <button className='cursor-pointer'>Log In</button>
      <Link to='/signup'>Create New Account</Link>
    </div>
  )
}

export default Login