import React from 'react'

const ResetPassword = () => {
  return (
    <div>
      <h1>Reset your password</h1>
      <form>
        <label htmlFor="user-email">Email</label>
        <input type="email" id='user-email' />
        <button type="submit">Reset</button>
      </form>
    </div>
  )
}

export default ResetPassword