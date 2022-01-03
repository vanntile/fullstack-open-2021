import React, { useState } from 'react'
import { handleChange } from '../lib/utils'

const WritePost = ({ submit, notify }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()

    if (title === '' && author === '') return notify({ message: 'Missing both title and author', type: 'error' })

    if (submit({ author, title, url })) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <h2>Create a new blogpost</h2>

      <label htmlFor="title">title</label>
      <input value={title} onChange={handleChange(setTitle)} type="text" name="title" />

      <label htmlFor="author">author</label>
      <input value={author} onChange={handleChange(setAuthor)} type="text" name="author" />

      <label htmlFor="url">URL</label>
      <input value={url} onChange={handleChange(setUrl)} type="text" name="url" />

      <button type="submit">Create</button>
    </form>
  )
}

export default WritePost
