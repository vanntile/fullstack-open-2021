import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleChange } from '../lib/utils'
import { setNotification } from '../reducers/notificationReducer'
import { login, logout } from '../reducers/userReducer'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()

    if (username === '' || password === '')
      return dispatch(setNotification({ message: 'A name is needed', type: 'error' }))

    dispatch(login({ username, password }))
  }

  return user ? (
    <p>
      {user.name} logged in. <button onClick={() => dispatch(logout())}>logout</button>
    </p>
  ) : (
    <form onSubmit={submitHandler}>
      <h2>Login into this application</h2>

      <label htmlFor="current-username">username</label>
      <input value={username} onChange={handleChange(setUsername)} type="text" name="current-username" required />

      <label htmlFor="current-password">password</label>
      <input value={password} onChange={handleChange(setPassword)} type="password" name="current-password" required />

      <button type="submit">Login</button>
    </form>
  )
}

export default Login
