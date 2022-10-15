import React from 'react'

const Signup = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <div className='user-name'>
          <label htmlFor="user-name">Username</label>
          <input type="text" id='user-name' />
        </div>
        <div className='user-email'>
          <label htmlFor="user-email">Email</label>
          <input type="email" id='user-email' />
        </div>
        <div className='user-pwd'>
          <label htmlFor="user-pwd">Password</label>
          <input type="password" id='user-pwd' />
        </div>
        <div className="signup--btns">
          <button type='submit'>Sign up</button>
          <button type='button'>Sign in with Google</button>
        </div>
      </form>
    </div>
  )
}

export default Signup