import React, { useState } from 'react'
import { userSignin, googleSignin } from '../authFunctions'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = event => {
    const { name, value } = event.target
    if (name === 'user-email') setEmail(value)
    if (name === 'user-pwd') setPassword(value)
  }

  const handleSignin = async (event) => {
    event.preventDefault()
    const res = await userSignin(email, password)
    setEmail('')
    setPassword('')
    if (res && res.error) { setError(res.error) }
    else navigate('/todos')
  }

  const handleGoogleSignin = async () => {
    const res = await googleSignin()
    if (res && res.error) { setError(res.error) }
    else navigate('/todos')
  }

  return (
    <div>
      <h1>Sign In</h1>
      {error}

      <form onSubmit={handleSignin}>
        <div className='user-email'>
          <label>Email</label>
          <input
            type="email"
            name="user-email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className='user-pwd'>
          <label>Password</label>
          <input
            type="password"
            name="user-pwd"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="signin--btns">
          <button type='submit'>Sign in</button>
          <button
            type='button'
            onClick={handleGoogleSignin}
          >Sign in with Google</button>
        </div>
        <p>Don't have an account? <Link to='/signup'>Sign up now</Link></p>
        <p>Forgot your password? <Link to='/forgot-password'>Reset your password</Link></p>
      </form>
    </div>
  )
}

export default Login