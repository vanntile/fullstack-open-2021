import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, refetch, update, notify }) => {
  const blogStyle = {
    padding: '12px 8px',
    border: '1px solid black',
    borderRadius: 4,
    marginBottom: 8,
  }

  const [visible, setVisible] = useState(false)

  const likeHandler = async () => {
    const { id, title, author, url, likes } = blog
    try {
      const post = await blogService.update({ id, title, author, url, likes: likes + 1 })
      await update(post)
    } catch (e) {
      notify({ message: e.error, type: 'error' })
    }
  }

  const deleteHandler = async () => {
    try {
      if (window.confirm(`Do you want to delete post "${blog.title}" by "${blog.author}"?`)) {
        await blogService.remove({ id: blog.id })
        await refetch()
      }
    } catch (e) {
      notify({ message: e.error, type: 'error' })
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
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
}

export default Blog
