import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client';

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
    }
  }
`;




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ variables: { email, password }});
      console.log('User logged in:', response.data.login.email);
    } catch (err) {
      console.error('Login error:', err.message);
    };
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type='submit' className='cursor-pointer'>Log In</button>
      </form>

      <Link to='/signup'>Create New Account</Link>
    </div>
  )
}

export default Login