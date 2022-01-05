import React from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { hideNotification, notify } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createHandler = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.create({ content, votes: 0 })
    dispatch(create(newAnecdote))

    // Notification
    dispatch(notify(`New anecdote: "${content}"`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
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
