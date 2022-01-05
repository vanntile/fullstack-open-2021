import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

const App = () => {
  const notification = useSelector((state) => !!state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then((x) => dispatch(initializeAnecdotes(x)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification && <Notification />}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
