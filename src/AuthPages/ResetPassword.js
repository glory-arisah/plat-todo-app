import React, { useState } from 'react'
import { resetPassword } from '../authFunctions'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handlePasswordReset = async (event) => {
    event.preventDefault()
    const res = await resetPassword(email)
    setEmail('')
    if (res && res.error) setError(res.error)
    else setSuccess('Password reset link sent!')
  }

  return (
    <div>
      <h1>Reset your password</h1>
      {error}
      {success}
      <form onSubmit={handlePasswordReset}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset</button>
        <p>Back to <Link to='/'>Login</Link></p>
      </form>
    </div>
  )
}

export default ResetPassword