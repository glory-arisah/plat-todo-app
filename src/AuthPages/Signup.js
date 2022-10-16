import React, { useState } from 'react'
import { userRegistration, googleSignin } from '../authFunctions'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = event => {
    const { name, value } = event.target
    if (name === 'user-name') setDisplayName(value)
    if (name === 'user-email') setEmail(value)
    if (name === 'user-pwd') setPassword(value)
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    setDisplayName('')
    setEmail('')
    setPassword('')
    const res = await userRegistration(displayName, email, password)
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
      <h1>Sign Up</h1>
      {error && error}
      <form onSubmit={handleSignup}>
        <div className='user-name'>
          <label>Username</label>
          <input
            type="text"
            name='user-name'
            value={displayName}
            onChange={handleChange}
          />
        </div>
        <div className='user-email'>
          <label>Email</label>
          <input
            type="email"
            name='user-email'
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className='user-pwd'>
          <label>Password</label>
          <input
            type="password"
            name='user-pwd'
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="signup--btns">
          <button type='submit'>Sign up</button>
          <button
            type='button'
            onClick={handleGoogleSignin}
          >Sign in with Google</button>
        </div>
      </form>
    </div>
  )
}

export default Signup