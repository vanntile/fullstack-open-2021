import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import WritePost from './components/WritePost'
import { createBlog, initializeBlog } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const posts = useSelector(({ posts }) => posts)
  const user = useSelector(({ user }) => user)
  const createBlogRef = useRef()

  const handleCreate = async (postData) => {
    try {
      dispatch(createBlog(postData))
      createBlogRef.current.toggleVisibility()
      dispatch(setNotification({ message: `New blog post: ${postData.title} by ${postData.author}`, type: 'success' }))

      return true
    } catch (e) {
      console.error(e)
      dispatch(setNotification({ message: e.error, type: 'error' }))
    }
  }

  useEffect(() => {
    const parsedUser = JSON.parse(window.localStorage.getItem('user'))

    if (parsedUser) dispatch(setUser(parsedUser))

    dispatch(initializeBlog())
  }, [dispatch])

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <Login />
      {user && (
        <>
          <Togglable buttonLabel="Create new blogpost" ref={createBlogRef}>
            <WritePost submit={handleCreate} />
          </Togglable>
          <h2>Existing posts</h2>
          <div>
            {posts
              .sort((a, b) => b.likes - a.likes)
              .map((e) => (
                <Blog key={e.id} blog={e} />
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App
