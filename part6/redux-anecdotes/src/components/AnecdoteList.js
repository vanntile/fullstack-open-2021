import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const voteHandler = (id) => {
    dispatch(vote(id))
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
              <button onClick={() => voteHandler(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
