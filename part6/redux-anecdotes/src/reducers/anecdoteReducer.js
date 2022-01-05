import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return [...state.map((e) => (e.id === action.data.id ? action.data : e))]
    case 'CREATE':
      return [...state, action.data]
    case 'INIT':
      return action.data.anecdotes
    default:
      return state
  }
}

export const vote = (anecdote) => async (dispatch) => {
  const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
  dispatch({ type: 'VOTE', data: updatedAnecdote })
}

export const create = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.create({ content, votes: 0 })
  dispatch({ type: 'CREATE', data: newAnecdote })
}

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch({ type: 'INIT', data: { anecdotes } })
}

export default reducer
