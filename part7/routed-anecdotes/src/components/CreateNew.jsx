import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const [content, resetContent] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [info, resetInfo] = useField('text')
  const history = useHistory()

  const resetFields = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })

    resetFields()

    props.notify({ type: 'success', message: `A new anecdote "${content.value}" has been created` })
    history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button type="submit">create</button>
        <button
          onClick={(e) => {
            e.preventDefault()
            resetFields()
          }}
        >
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew
