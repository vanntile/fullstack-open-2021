import React from 'react'
import { connect } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const createHandler = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.create(content)
    props.setNotification(`New anecdote: "${content}"`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createHandler}>
        <input type="text" name="anecdote" />
        <button type="submit">create</button>
      </form>
    </>
  )
}

const ConnectedAnecdoteForm = connect((s) => ({}), { create, setNotification })(AnecdoteForm)
export default ConnectedAnecdoteForm
