import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter(({ content }) => content.toLowerCase().includes(state.filter.toLowerCase())),
  )
  const dispatch = useDispatch()

  const voteHandler = (anecdote) => {
    dispatch(vote(anecdote))

    // Notification
    dispatch(setNotification(`You voted for: "${anecdote.content}"`, 5))
  }

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id} className="anecdote">
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteHandler(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
