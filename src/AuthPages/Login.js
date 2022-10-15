import React from 'react'

const Login = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <div className='user-email'>
          <label htmlFor="user-email">Email</label>
          <input type="email" id='user-email' />
        </div>
        <div className='user-pwd'>
          <label htmlFor="user-pwd">Password</label>
          <input type="password" id='user-pwd' />
        </div>
        <div className="signin--btns">
          <button type='submit'>Sign in</button>
          <button type='button'>Sign in with Google</button>
        </div>
      </form>
    </div>
  )
}

export default Login