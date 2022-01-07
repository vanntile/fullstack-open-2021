import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../graphql'
import { handleChange } from '../lib/utils'

const Login = ({ show, notify, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      notify({ message: error.graphQLErrors[0].message, type: 'error' })
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      window.localStorage.setItem('user-token', JSON.stringify({ value: token }))
    }
  }, [result.data]) // eslint-disable-line

  const submitHandler = (event) => {
    event.preventDefault()

    if (username === '' || password === '') return notify({ message: 'A name is needed', type: 'error' })

    login({ variables: { username, password } })
  }

  return show ? (
    <form onSubmit={submitHandler}>
      <h2>Login into this application</h2>

      <label htmlFor="current-username">username</label>
      <input value={username} onChange={handleChange(setUsername)} type="text" name="current-username" required />

      <label htmlFor="current-password">password</label>
      <input value={password} onChange={handleChange(setPassword)} type="password" name="current-password" required />

      <button type="submit">Login</button>
    </form>
  ) : null
}

export default Login
