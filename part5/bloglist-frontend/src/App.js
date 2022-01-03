import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import WritePost from './components/WritePost'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [notification, setNotification] = useState()

  const notify = (data, timeout = 3500) => {
    setNotification(data)
    setTimeout(() => {
      setNotification(null)
    }, timeout)
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const userData = await loginService.login({ username, password })
      setUser(userData)
      console.log(userData)
      window.localStorage.setItem('user', JSON.stringify(userData))
      blogService.setToken(userData.token)

      return true
    } catch (e) {
      console.error(e)
      notify({ message: 'Wrong username or password', type: 'error' })
    }
  }

  const handleCreate = async ({ author, title }) => {
    try {
      setPosts([...posts, await blogService.postNew({ author, title })])
      notify({ message: `New blog post: ${title} by ${author}`, type: 'success' })

      return true
    } catch (e) {
      console.error(e)
      notify({ message: e.error, type: 'error' })
    }
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setPosts(blogs))
  }, [])

  useEffect(() => {
    const parsedUser = JSON.parse(window.localStorage.getItem('user'))

    if (parsedUser) {
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  return (
    <div>
      <h1>Blogs</h1>
      <Notification {...notification} />
      {user == null ? (
        <Login submit={handleLogin} notify={notify} />
      ) : (
        <>
          <p>
            {user.name} logged in. <button onClick={logout}>logout</button>
          </p>
          <WritePost submit={handleCreate} notify={notify} />
          {posts.map((e) => (
            <Blog key={e.id} blog={e} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
