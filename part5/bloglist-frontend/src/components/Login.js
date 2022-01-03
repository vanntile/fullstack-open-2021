import React, { useState } from 'react'
import { handleChange } from '../lib/utils'

const Login = ({ submit, notify }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()

    if (username === '' || password === '') return notify({ message: 'A name is needed', type: 'error' })

    if (submit({ username, password })) {
      setUsername('')
      setPassword('')
    }
  }

  return (
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
