import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find((n) => n.id === id)
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>
        has {anecdote.votes} {anecdote.votes === 1 ? 'vote' : 'votes'}
      </div>
      <div>
        for more info see{' '}
        <a href={anecdote.info} target="_blank">
          {anecdote.info}
        </a>
      </div>
    </div>
  )
}

export default Anecdote
