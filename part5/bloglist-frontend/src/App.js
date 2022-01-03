import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import WritePost from './components/WritePost'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [notification, setNotification] = useState()
  const createBlogRef = useRef()

  const notify = (data, timeout = 3500) => {
    setNotification(data)
    setTimeout(() => {
      setNotification(null)
    }, timeout)
  }

  const fetchPosts = async () => {
    setPosts(await blogService.getAll())
  }

  const updatePost = async (post) => {
    setPosts(posts.map((e) => (e.id === post.id ? post : e)))
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const userData = await loginService.login({ username, password })
      setUser(userData)
      window.localStorage.setItem('user', JSON.stringify(userData))
      blogService.setToken(userData.token)

      return true
    } catch (e) {
      console.error(e)
      notify({ message: 'Wrong username or password', type: 'error' })
    }
  }

  const handleCreate = async (postData) => {
    try {
      setPosts([...posts, await blogService.create(postData)])
      createBlogRef.current.toggleVisibility()
      notify({ message: `New blog post: ${postData.title} by ${postData.author}`, type: 'success' })

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
    const initialData = async () => {
      const parsedUser = JSON.parse(window.localStorage.getItem('user'))

      if (parsedUser) {
        setUser(parsedUser)
        blogService.setToken(parsedUser.token)
      }

      await fetchPosts()
    }

    initialData()
  }, [])

  return (
    <div>
      <h1>Blogs</h1>
      <Notification {...notification} />
      {user === null ? (
        <Login submit={handleLogin} notify={notify} />
      ) : (
        <>
          <p>
            {user.name} logged in. <button onClick={logout}>logout</button>
          </p>
          <Togglable buttonLabel="Create new blogpost" ref={createBlogRef}>
            <WritePost submit={handleCreate} notify={notify} />
          </Togglable>
          <h2>Existing posts</h2>
          {posts
            .sort((a, b) => b.likes - a.likes)
            .map((e) => (
              <Blog key={e.id} blog={e} user={user} refetch={fetchPosts} update={updatePost} notify={notify} />
            ))}
        </>
      )}
    </div>
  )
}

export default App
