import React from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createHandler = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(create(content))
    dispatch(setNotification(`New anecdote: "${content}"`, 5))
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

export default AnecdoteForm
