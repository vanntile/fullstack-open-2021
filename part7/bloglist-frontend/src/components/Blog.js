import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const blogStyle = {
    padding: '12px 8px',
    border: '1px solid black',
    borderRadius: 4,
    marginBottom: 8,
  }

  const [visible, setVisible] = useState(false)

  const likeHandler = () => {
    const { id, title, author, url, likes } = blog
    try {
      dispatch(updateBlog({ id, title, author, url, likes: likes + 1 }))
    } catch (e) {
      dispatch(setNotification({ message: e.error, type: 'error' }))
    }
  }

  const deleteHandler = () => {
    try {
      if (window.confirm(`Do you want to delete post "${blog.title}" by "${blog.author}"?`)) {
        dispatch(removeBlog(blog.id))
      }
    } catch (e) {
      dispatch(setNotification({ message: e.error, type: 'error' }))
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} <span style={{ fontStyle: 'italic' }}>by</span> {blog.author}{' '}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide details' : 'show details'}</button>
      {visible && (
        <>
          <p>URL: {blog.url}</p>
          <p>
            Likes: {blog.likes} <button onClick={likeHandler}>like</button>
          </p>
          <p>User: {blog.user.name}</p>
          {user.username === blog.user.username && <button onClick={deleteHandler}>delete</button>}
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
